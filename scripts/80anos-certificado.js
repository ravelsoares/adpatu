/* ===== Certificado da EBO · 80 anos AD Patu (PDF gerado no navegador com jsPDF) ===== */
var JSPDF_URL_80 = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
var LOGO_CERT_80 = '/images/80anos/logo-80.png';

function carregarScript80(src) {
    return new Promise(function (ok, falha) {
        if (window.jspdf) return ok();
        var s = document.createElement('script');
        s.src = src;
        s.onload = ok;
        s.onerror = function () { falha(new Error('Falha ao carregar ' + src)); };
        document.head.appendChild(s);
    });
}

function carregarImagem80(src) {
    return new Promise(function (ok, falha) {
        var img = new Image();
        img.onload = function () {
            var c = document.createElement('canvas');
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            c.getContext('2d').drawImage(img, 0, 0);
            ok({ data: c.toDataURL('image/png'), w: img.naturalWidth, h: img.naturalHeight });
        };
        img.onerror = function () { falha(new Error('Falha ao carregar ' + src)); };
        img.src = src;
    });
}

function gerarCertificado80(nome) {
    return Promise.all([carregarScript80(JSPDF_URL_80), carregarImagem80(LOGO_CERT_80)]).then(function (r) {
        var logo = r[1];
        var doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        var W = 297, H = 210, cx = W / 2;
        var AZUL = [22, 41, 107], CARVALHO = [139, 90, 43], TINTA = [60, 52, 45];

        // Fundo e molduras
        doc.setFillColor(247, 241, 232);
        doc.rect(0, 0, W, H, 'F');
        doc.setDrawColor.apply(doc, AZUL);
        doc.setLineWidth(2.2);
        doc.rect(8, 8, W - 16, H - 16);
        doc.setDrawColor.apply(doc, CARVALHO);
        doc.setLineWidth(0.5);
        doc.rect(12, 12, W - 24, H - 24);

        // Logo
        var lw = 46, lh = lw * logo.h / logo.w;
        doc.addImage(logo.data, 'PNG', cx - lw / 2, 18, lw, lh);

        var y = 18 + lh + 12;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor.apply(doc, AZUL);
        doc.text('CERTIFICADO', cx, y, { align: 'center', charSpace: 2 });

        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor.apply(doc, CARVALHO);
        doc.text('ESCOLA BÍBLICA DE OBREIROS  ·  80 ANOS DA AD PATU', cx, y, { align: 'center', charSpace: 0.6 });

        y += 13;
        doc.setFont('times', 'italic');
        doc.setFontSize(14);
        doc.setTextColor.apply(doc, TINTA);
        doc.text('Certificamos que', cx, y, { align: 'center' });

        // Nome (reduz a fonte se for muito longo)
        y += 13;
        doc.setFont('times', 'bold');
        doc.setTextColor.apply(doc, AZUL);
        var tam = 30;
        doc.setFontSize(tam);
        while (doc.getTextWidth(nome) > 230 && tam > 16) doc.setFontSize(--tam);
        doc.text(nome, cx, y, { align: 'center' });
        doc.setDrawColor.apply(doc, CARVALHO);
        doc.setLineWidth(0.4);
        doc.line(cx - 90, y + 4, cx + 90, y + 4);

        y += 14;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor.apply(doc, TINTA);
        var texto = 'participou da Escola Bíblica de Obreiros com o tema "Obreiros Aprovados: Meditação, Ensino e '
            + 'Fidelidade no Ministério" (1 Timóteo 4.15-16), realizada nos dias 26, 27 e 28 de novembro de 2026, '
            + 'em comemoração aos 80 anos da Assembleia de Deus em Patu/RN.';
        doc.text(doc.splitTextToSize(texto, 215), cx, y, { align: 'center', lineHeightFactor: 1.5 });

        // Assinaturas
        var ya = H - 30;
        doc.setDrawColor.apply(doc, TINTA);
        doc.setLineWidth(0.3);
        doc.line(40, ya, 125, ya);
        doc.line(W - 125, ya, W - 40, ya);
        doc.setFontSize(10);
        doc.text('Pastor Presidente', 82.5, ya + 5, { align: 'center' });
        doc.text('Coordenação da EBO', W - 82.5, ya + 5, { align: 'center' });

        doc.setFontSize(9);
        doc.setTextColor.apply(doc, CARVALHO);
        doc.text('Patu/RN, 28 de novembro de 2026', cx, H - 17, { align: 'center' });

        var arquivo = 'certificado-ebo-80anos-' + nome.toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.pdf';
        doc.save(arquivo);
    });
}
