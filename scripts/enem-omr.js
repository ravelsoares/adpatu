/* ENEM Bíblico — leitura do cartão-resposta por foto (OMR) com OpenCV.js.
   O cartão impresso não tem marcas de canto: a âncora são os 3 blocos de respostas
   (retângulos com borda). Medidas em mm, com origem no canto da área útil da folha A4
   (medidas tiradas do próprio cartão de enem-biblico.html). */
(function () {
  const G = {
    blocos: [0, 64.7, 129.41], by: 66.23, bw: 58.7, bh: 80.05,
    bub: { x0: 15.46, dx: 6.795, y0: 5.91, dy: 7.552, r: 2.6 },
    cad: { y: 48.28, xs: [45.57, 69.73, 100.73, 126.4], r: 2.5 },
    nome: [0, 25.52, 91.06, 13]
  };
  // área desenhada no "scan" corrigido
  const X0 = -4, Y0 = 20, W_MM = 196, H_MM = 130, S = 6;

  function cornersOf(cv, cnt) {
    const hull = new cv.Mat(); cv.convexHull(cnt, hull);
    const peri = cv.arcLength(hull, true);
    const ap = new cv.Mat(); cv.approxPolyDP(hull, ap, 0.025 * peri, true);
    let pts = null;
    if (ap.rows === 4) { pts = []; for (let i = 0; i < 4; i++) pts.push([ap.data32S[i * 2], ap.data32S[i * 2 + 1]]); }
    const hullArea = cv.contourArea(hull);
    hull.delete(); ap.delete();
    return { pts, hullArea };
  }

  function findBlocks(cv, gray) {
    const bin = new cv.Mat();
    const k = Math.max(15, Math.round(Math.min(gray.cols, gray.rows) / 40) | 1);
    cv.adaptiveThreshold(gray, bin, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY_INV, k, 9);
    const contours = new cv.MatVector(), hier = new cv.Mat();
    cv.findContours(bin, contours, hier, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    const imgA = gray.cols * gray.rows, cand = [];
    for (let i = 0; i < contours.size(); i++) {
      const c = contours.get(i);
      const a = cv.contourArea(c);
      if (a > imgA * 0.006 && a < imgA * 0.4) {
        const { pts, hullArea } = cornersOf(cv, c);
        if (pts && a / hullArea > 0.85) {
          const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
          const s1 = (d(pts[0], pts[1]) + d(pts[2], pts[3])) / 2, s2 = (d(pts[1], pts[2]) + d(pts[3], pts[0])) / 2;
          const asp = Math.max(s1, s2) / Math.min(s1, s2);
          if (asp > 1.0 && asp < 1.85) {
            const cx = pts.reduce((s, p) => s + p[0], 0) / 4, cy = pts.reduce((s, p) => s + p[1], 0) / 4;
            cand.push({ pts, a: hullArea, cx, cy, long: Math.max(s1, s2), short: Math.min(s1, s2) });
          }
        }
      }
      c.delete();
    }
    contours.delete(); hier.delete(); bin.delete();
    // borda grossa gera contorno interno e externo: fica o maior
    cand.sort((p, q) => q.a - p.a);
    const uniq = [];
    for (const c of cand) if (!uniq.some(u => Math.hypot(u.cx - c.cx, u.cy - c.cy) < u.short * 0.25)) uniq.push(c);
    // trio de blocos de tamanho parecido, alinhados e com espaçamento ≈ 64,7 mm (≈ 1,10 × largura)
    let best = null;
    for (let i = 0; i < uniq.length; i++) for (let j = i + 1; j < uniq.length; j++) for (let l = j + 1; l < uniq.length; l++) {
      const t = [uniq[i], uniq[j], uniq[l]];
      const as = t.map(x => x.a), mx = Math.max(...as), mn = Math.min(...as);
      if (mn / mx < 0.7) continue;
      // ordena pela maior separação
      const pairs = [[0, 1], [0, 2], [1, 2]].map(([p, q]) => [p, q, Math.hypot(t[p].cx - t[q].cx, t[p].cy - t[q].cy)]).sort((x, y) => y[2] - x[2]);
      const [e1, e2, far] = pairs[0]; const mid = 3 - e1 - e2;
      const dA = Math.hypot(t[e1].cx - t[mid].cx, t[e1].cy - t[mid].cy), dB = Math.hypot(t[e2].cx - t[mid].cx, t[e2].cy - t[mid].cy);
      const sh = (t[0].short + t[1].short + t[2].short) / 3;
      if (Math.abs(dA - dB) > 0.15 * far) continue;
      const ratio = (far / 2) / sh; // esperado 64,7 / 58,7 = 1,10
      if (ratio < 0.95 || ratio > 1.3) continue;
      const score = mn - Math.abs(ratio - 1.1) * mx;
      if (!best || score > best.score) best = { score, blocos: [t[e1], t[mid], t[e2]] };
    }
    return best && best.blocos;
  }

  // posição em px do "scan" corrigido
  const P = (x, y) => [(x - X0) * S, (y - Y0) * S];

  function warpWith(cv, gray, blocos, flip) {
    const ord = flip ? blocos.slice().reverse() : blocos;
    let u = [ord[2].cx - ord[0].cx, ord[2].cy - ord[0].cy];
    const n = Math.hypot(...u); u = [u[0] / n, u[1] / n];
    const v = [-u[1], u[0]];
    const src = [], dst = [];
    ord.forEach((b, i) => {
      const lab = b.pts.map(p => ({ p, a: p[0] * u[0] + p[1] * u[1], b: p[0] * v[0] + p[1] * v[1] }));
      const pick = f => lab.reduce((m, x) => (f(x) > f(m) ? x : m)).p;
      const tl = pick(x => -(x.a + x.b)), br = pick(x => x.a + x.b), tr = pick(x => x.a - x.b), bl = pick(x => x.b - x.a);
      const x0 = G.blocos[i], y0 = G.by;
      [[tl, x0, y0], [tr, x0 + G.bw, y0], [br, x0 + G.bw, y0 + G.bh], [bl, x0, y0 + G.bh]].forEach(([p, x, y]) => { src.push(...p); dst.push(...P(x, y)); });
    });
    const sM = cv.matFromArray(12, 1, cv.CV_32FC2, src), dM = cv.matFromArray(12, 1, cv.CV_32FC2, dst);
    const H = cv.findHomography(sM, dM, 0);
    const out = new cv.Mat();
    cv.warpPerspective(gray, out, H, new cv.Size(W_MM * S, H_MM * S), cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar(255));
    sM.delete(); dM.delete(); H.delete();
    return out;
  }

  function sampler(mat) {
    const w = mat.cols, h = mat.rows, d = mat.data;
    // branco/preto de referência pela área dos blocos
    const hist = new Uint32Array(256); let tot = 0;
    const [ax, ay] = P(0, G.by), [bx, by] = P(188, G.by + G.bh);
    for (let y = ay | 0; y < by; y += 2) for (let x = ax | 0; x < bx; x += 2) { hist[d[y * w + x]]++; tot++; }
    const pct = q => { let acc = 0; for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc >= q * tot) return i; } return 255; };
    const white = pct(0.75), black = Math.min(pct(0.02), white - 40);
    const dk = (x, y) => { const X = Math.round(x), Y = Math.round(y); if (X < 0 || Y < 0 || X >= w || Y >= h) return 0; return Math.max(0, Math.min(1, (white - d[Y * w + X]) / (white - black))); };
    const ring = (cx, cy, r) => { // contraste do anel (mm) contra o entorno
      let a = 0, b = 0;
      for (let k = 0; k < 32; k++) { const t = k * Math.PI / 16, c = Math.cos(t), s = Math.sin(t);
        for (const rr of [r - .25, r, r + .2]) a += dk(...P(cx + rr * c, cy + rr * s));
        b += dk(...P(cx + (r + 1.3) * c, cy + (r + 1.3) * s)); }
      return a / 96 - b / 32;
    };
    const fill = (cx, cy, r) => { let s = 0, n = 0;
      for (let y = -r; y <= r; y += .25) for (let x = -r; x <= r; x += .25) if (x * x + y * y <= r * r) { s += dk(...P(cx + x, cy + y)); n++; }
      return s / n; };
    return { ring, fill };
  }

  // acha o deslocamento (dx,dy) de uma linha de bolinhas que melhor encaixa nos anéis impressos
  function alinha(sp, centros, r, lim = 1.6) {
    let best = { s: -1e9, dx: 0, dy: 0 };
    for (let dy = -lim; dy <= lim; dy += .2) for (let dx = -lim; dx <= lim; dx += .2) {
      let s = 0; for (const [x, y] of centros) s += sp.ring(x + dx, y + dy, r);
      if (s > best.s) best = { s, dx, dy };
    }
    return best;
  }

  function decide(fills, limiar) {
    const ord = fills.map((f, i) => [f, i]).sort((a, b) => b[0] - a[0]);
    const [m1, i1] = ord[0], m2 = ord[1][0];
    if (m1 < limiar) return { v: '', st: m1 > limiar * 0.8 ? 'duvida' : 'ok' };
    if (m2 >= limiar && m2 > m1 * 0.7) return { v: '*', st: 'dupla' };
    return { v: i1, st: (m1 < limiar * 1.15 || m2 > limiar * 0.8) ? 'duvida' : 'ok' };
  }

  /** lê o cartão. img: HTMLImageElement/Canvas. Devolve {resp[30], status[30], caderno, scan, nome, marcas} */
  function ler(cv, img) {
    const r = lerMat(cv, cv.imread(img));
    // imagens para conferência
    const scan = document.createElement('canvas'); cv.imshow(scan, r.m);
    const nome = document.createElement('canvas');
    const [nx, ny] = P(G.nome[0] - 1, G.nome[1] - 1);
    nome.width = (G.nome[2] + 2) * S; nome.height = (G.nome[3] + 2) * S;
    nome.getContext('2d').drawImage(scan, -nx, -ny);
    r.m.delete(); delete r.m;
    return Object.assign(r, { scan, nome });
  }

  function lerMat(cv, src) {
    const sc = Math.min(1, 1600 / Math.max(src.cols, src.rows));
    if (sc < 1) cv.resize(src, src, new cv.Size(Math.round(src.cols * sc), Math.round(src.rows * sc)), 0, 0, cv.INTER_AREA);
    // tinta azul aparece melhor no menor dos canais
    const ch = new cv.MatVector(); cv.split(src, ch);
    const gray = new cv.Mat(); cv.min(ch.get(0), ch.get(1), gray); cv.min(gray, ch.get(2), gray);
    ch.delete(); src.delete();
    const det = new cv.Mat(); cv.GaussianBlur(gray, det, new cv.Size(5, 5), 0);
    const blocos = findBlocks(cv, det); det.delete();
    if (!blocos) { gray.delete(); throw new Error('Não encontrei os 3 quadros de respostas. Fotografe o cartão inteiro, de frente, com boa luz.'); }

    // dois sentidos possíveis (foto de cabeça para baixo): vence o que tem as bolinhas da cor do caderno
    let best = null;
    for (const flip of [false, true]) {
      const m = warpWith(cv, gray, blocos, flip), sp = sampler(m);
      const al = alinha(sp, G.cad.xs.map(x => [x, G.cad.y]), G.cad.r, 3);
      if (!best || al.s > best.al.s) { best && best.m.delete(); best = { m, sp, al }; } else m.delete();
    }
    gray.delete();
    const { m, sp } = best;

    // respostas
    const centros = [], fillsAll = [];
    for (let q = 0; q < 30; q++) {
      const bi = Math.floor(q / 10), r = q % 10;
      const cs = [0, 1, 2, 3, 4].map(l => [G.blocos[bi] + G.bub.x0 + l * G.bub.dx, G.by + G.bub.y0 + r * G.bub.dy]);
      const al = alinha(sp, cs, G.bub.r);
      const c2 = cs.map(([x, y]) => [x + al.dx, y + al.dy]);
      centros.push(c2);
      fillsAll.push(c2.map(([x, y]) => sp.fill(x, y, 1.7)));
    }
    const flat = fillsAll.flat().sort((a, b) => a - b);
    const vazio = flat[Math.floor(flat.length * 0.4)], cheio = flat[Math.floor(flat.length * 0.9)];
    const limiar = Math.max(vazio + 0.15, (vazio + cheio) / 2);
    const resp = [], status = [];
    fillsAll.forEach(f => { const d = decide(f, limiar); resp.push(d.v === '' ? '' : d.v === '*' ? '*' : 'ABCDE'[d.v]); status.push(d.st); });

    // cor do caderno
    const cc = G.cad.xs.map(x => [x + best.al.dx, G.cad.y + best.al.dy]);
    const cf = cc.map(([x, y]) => sp.fill(x, y, 1.6));
    const dc = decide(cf, Math.max(vazio + 0.15, limiar * 0.9));
    const caderno = typeof dc.v === 'number' ? dc.v + 1 : null;

    return { resp, status, caderno, cadStatus: dc.st, m, centros, cadCentros: cc };
  }

  const api = { ler, lerMat, G, P, S };
  if (typeof window !== 'undefined') window.EnemOMR = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
