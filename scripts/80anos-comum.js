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
    { dia: '26', rotulo: 'Qui · 26/11', tema: 'Meditar', inicio: '2026-11-26T00:00:00-03:00' },
    { dia: '27', rotulo: 'Sex · 27/11', tema: 'Ensinar', inicio: '2026-11-27T00:00:00-03:00' },
    { dia: '28', rotulo: 'Sáb · 28/11', tema: 'Perseverar', inicio: '2026-11-28T00:00:00-03:00' }
];

// Fotos do evento: pastas públicas do Google Drive (uma ou mais por dia).
// A recepção publica os links em Configurações → Fotos (documento config-80anos/fotos);
// as pastas abaixo são só o valor padrão caso o documento não exista.
var DRIVE_KEY_80 = 'AIzaSyCM05uKadKIX5xxtWt3FlyKp8nANwV4Kpc';
var DOC_FOTOS_80 = 'config-80anos/fotos';
var FOTOS_80 = [
    { dia: '25', rotulo: 'Qua · 25/11', titulo: 'Abertura', pastas: ['1dHSz-mXnZn0Ep8eQXFjdj5XiSd0s0dGG'] },
    { dia: '26', rotulo: 'Qui · 26/11', titulo: 'EBOCAMP', pastas: ['1TcqIjA0q11uWQiZJKCF2sIduwr1wRmJI'] },
    { dia: '27', rotulo: 'Sex · 27/11', titulo: 'EBOCAMP', pastas: [] },
    { dia: '28', rotulo: 'Sáb · 28/11', titulo: 'Jubileu de Carvalho', pastas: [] }
];

// Lista fotos e vídeos das pastas, em ordem de nome
function listarFotos80(pastas) {
    var todos = [];
    function pagina(pasta, token) {
        var url = 'https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent("'" + pasta + "' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')")
            + '&key=' + DRIVE_KEY_80 + '&fields=nextPageToken,files(id,name,mimeType)&pageSize=1000&orderBy=name'
            + (token ? '&pageToken=' + token : '');
        return fetch(url).then(function (r) {
            if (!r.ok) throw new Error('Drive ' + r.status);
            return r.json();
        }).then(function (d) {
            todos = todos.concat(d.files || []);
            if (d.nextPageToken) return pagina(pasta, d.nextPageToken);
        });
    }
    return pastas.reduce(function (p, pasta) {
        return p.then(function () { return pagina(pasta); });
    }, Promise.resolve()).then(function () { return todos; });
}

// Aceita o link da pasta do Drive (ou só o id) e devolve o id
function idPastaDrive(texto) {
    var t = String(texto || '').trim();
    var m = t.match(/\/folders\/([\w-]{10,})/) || t.match(/[?&]id=([\w-]{10,})/) || t.match(/^([\w-]{10,})$/);
    return m ? m[1] : '';
}

// Aplica em FOTOS_80 as pastas publicadas pela recepção ({ pastas: { '26': ['id', ...] } }).
// Lê pela API REST do Firestore para não precisar carregar o SDK na página de fotos.
function carregarFotos80() {
    var url = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_CONFIG_80.projectId
        + '/databases/(default)/documents/' + DOC_FOTOS_80 + '?key=' + FIREBASE_CONFIG_80.apiKey;
    return fetch(url).then(function (r) {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error('Firestore ' + r.status);
        return r.json();
    }).then(function (doc) {
        var mapa = doc && doc.fields && doc.fields.pastas && doc.fields.pastas.mapValue && doc.fields.pastas.mapValue.fields;
        if (!mapa) return FOTOS_80;
        FOTOS_80.forEach(function (d) {
            if (!mapa[d.dia]) return;
            d.pastas = ((mapa[d.dia].arrayValue && mapa[d.dia].arrayValue.values) || [])
                .map(function (v) { return v.stringValue; }).filter(Boolean);
        });
        return FOTOS_80;
    }).catch(function (err) {
        console.error(err);
        return FOTOS_80;
    });
}

function miniaturaFoto80(id, largura) {
    return 'https://lh3.googleusercontent.com/d/' + id + '=w' + largura;
}

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
