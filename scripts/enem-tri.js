/* ENEM Bíblico — nota no estilo TRI (Teoria de Resposta ao Item, modelo logístico de 3 parâmetros).
   P(acerto | θ) = c + (1 − c) / (1 + e^(−1,7·a·(θ − b)))
   a = discriminação, b = dificuldade, c = chance de acertar no chute (5 alternativas → 0,2).
   Sem pré-teste, b parte da dificuldade marcada no banco (F/M/D). Com provas suficientes,
   b é recalibrado pelos próprios resultados (cada b fica perto do valor inicial, mas se move
   conforme a taxa real de acerto). θ é estimado por EAP e a nota vai de 0 (errar tudo) a 1000 (acertar tudo). */
(function () {
  const B0 = { F: -1.0, M: 0.1, D: 1.1 };
  const A = 1.3, C = 0.2, DK = 1.7;
  const PTS = []; for (let t = -4; t <= 4.0001; t += 0.1) PTS.push(t);
  const PRIOR = PTS.map(t => Math.exp(-t * t / 2));

  const p = (t, b) => C + (1 - C) / (1 + Math.exp(-DK * A * (t - b)));

  // x: vetor 0/1 por item (na ordem do banco); bs: dificuldade de cada item
  function theta(x, bs) {
    let num = 0, den = 0;
    PTS.forEach((t, k) => {
      let L = PRIOR[k];
      for (let i = 0; i < x.length; i++) { const pi = p(t, bs[i]); L *= x[i] ? pi : 1 - pi; }
      num += t * L; den += L;
    });
    return num / den;
  }

  // recalibra cada b com θ fixos (MAP com priori N(b0, 0,6²)), alternando com θ algumas vezes
  function calibra(X, b0, voltas = 8) {
    let bs = b0.slice(), th = X.map(x => theta(x, bs));
    for (let v = 0; v < voltas; v++) {
      bs = b0.map((bi0, i) => {
        let best = bi0, bestL = -Infinity;
        for (let b = -3; b <= 3.0001; b += 0.05) {
          let L = -((b - bi0) ** 2) / (2 * 0.36);
          for (let j = 0; j < X.length; j++) { const pi = p(th[j], b); L += Math.log(X[j][i] ? pi : 1 - pi); }
          if (L > bestL) { bestL = L; best = b; }
        }
        return best;
      });
      th = X.map(x => theta(x, bs));
    }
    return { bs, th };
  }

  /** X: matriz [pessoa][item] de 0/1; dif: letra F/M/D de cada item.
      calibrar: true usa os resultados para ajustar as dificuldades. */
  function notas(X, dif, calibrar) {
    const b0 = dif.map(d => B0[d] ?? 0);
    const r = calibrar && X.length ? calibra(X, b0) : { bs: b0, th: X.map(x => theta(x, b0)) };
    // escala 0–1000: errar tudo = 0, acertar tudo = 1000 (com as dificuldades atuais)
    const tMin = theta(r.bs.map(() => 0), r.bs), tMax = theta(r.bs.map(() => 1), r.bs);
    const esc = t => Math.max(0, Math.min(1000, 1000 * (t - tMin) / (tMax - tMin)));
    return { notas: r.th.map(t => Math.round(esc(t) * 10) / 10), dificuldades: r.bs };
  }

  const api = { notas, theta, B0 };
  if (typeof window !== 'undefined') window.EnemTRI = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
