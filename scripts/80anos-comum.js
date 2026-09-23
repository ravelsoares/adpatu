/* ===== 80 anos AD Patu · código compartilhado (inscrição, área do obreiro, recepção) ===== */
var FIREBASE_CONFIG_80 = {
    apiKey: "AIzaSyCjQ4sgU_EmRi-RTrzchIS60bumYC-M9QQ",
    authDomain: "umadcamp-patu.firebaseapp.com",
    projectId: "umadcamp-patu",
    storageBucket: "umadcamp-patu.firebasestorage.app",
    messagingSenderId: "1043102355965",
    appId: "1:1043102355965:web:734bcffb30d37a7d2b8994"
};

// Coleções no Firestore (as regras ficam em firestore.rules)
var COL_INSCRICOES_80 = 'inscricoes-80anos'; // id do documento = CPF só com números
var DOC_CONFIG_80 = 'config-80anos/geral';   // materiais, liberação do certificado etc.

// Dias da EBO com check-in (chave = dia de novembro/2026)
var DIAS_EBO_80 = [
    { dia: '26', rotulo: 'Qui · 26/11', tema: 'Medite', inicio: '2026-11-26T00:00:00-03:00' },
    { dia: '27', rotulo: 'Sex · 27/11', tema: 'Ensine', inicio: '2026-11-27T00:00:00-03:00' },
    { dia: '28', rotulo: 'Sáb · 28/11', tema: 'Persevere', inicio: '2026-11-28T00:00:00-03:00' }
];

// Valores padrão quando o documento de configuração ainda não existe
var CONFIG_PADRAO_80 = {
    certificadoLiberado: false, // a recepção libera depois da última palestra
    presencaMinima: 3,          // quantos dias de presença dão direito ao certificado
    materiais: []               // [{ titulo, descricao, url }]
};

function cpfSoNumeros(v) {
    return String(v || '').replace(/\D/g, '').slice(0, 11);
}

function cpfFormatar(v) {
    var n = cpfSoNumeros(v);
    return n.replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

function cpfValido(v) {
    var n = cpfSoNumeros(v);
    if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
    for (var t = 9; t < 11; t++) {
        var soma = 0;
        for (var i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i);
        var dv = (soma * 10) % 11 % 10;
        if (dv !== Number(n[t])) return false;
    }
    return true;
}

// Aplica a máscara de CPF enquanto a pessoa digita
function cpfMascarar(input) {
    input.addEventListener('input', function () {
        input.value = cpfFormatar(input.value);
    });
}

function contarPresencas(inscrito) {
    var p = (inscrito && inscrito.presenca) || {};
    return DIAS_EBO_80.filter(function (d) { return p[d.dia]; }).length;
}

function escaparHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function iniciarFirebase80() {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG_80);
    return firebase.firestore();
}

function lerConfig80(db) {
    return db.doc(DOC_CONFIG_80).get().then(function (snap) {
        var c = snap.exists ? snap.data() : {};
        return {
            certificadoLiberado: c.certificadoLiberado === true,
            presencaMinima: Number(c.presencaMinima) || CONFIG_PADRAO_80.presencaMinima,
            materiais: Array.isArray(c.materiais) ? c.materiais : []
        };
    });
}
