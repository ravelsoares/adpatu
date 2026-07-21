# PINs dos Cadetes — Álbum de Efésios

Senhas de 4 dígitos (não sequenciais) para acesso ao álbum em [/umadcamp/album](/umadcamp/album).

> **Distribuição:** entregue cada PIN apenas ao cadete correspondente. Eles são pessoais e dão acesso ao álbum individual de figurinhas em qualquer dispositivo.

> **Atenção:** os PINs estão no código-fonte do site (cliente). Não use para nada sensível — funciona como "etiqueta de identificação" da igreja, não como senha de banco.

---

## 🎖️ Lista dos 29 Cadetes

| # | Cadete | PIN |
|---|--------|-----|
| 1 | Elaine | **7392** |
| 2 | Jonas | **4815** |
| 3 | Suzana | **6172** |
| 4 | Jonnas | **9534** |
| 5 | Mirià | **2867** |
| 6 | Sara | **5193** |
| 7 | Ana Júlia | **8426** |
| 8 | Mikael | **3759** |
| 9 | Nicolas Cortez | **6048** |
| 10 | Natália | **9281** |
| 11 | Simone | **4673** |
| 12 | Elias | **7195** |
| 13 | Ritinha | **2548** |
| 14 | Rayssa | **5827** |
| 15 | Asafe | **8361** |
| 16 | Syllas | **3947** |
| 17 | Moisés | **6293** |
| 18 | Silvia | **9518** |
| 19 | Olga | **4072** |
| 20 | Aniely | **7836** |
| 21 | Judson | **2419** |
| 22 | Shemilla | **5294** |
| 23 | Álvaro | **8625** |
| 24 | Isadora | **3187** |
| 25 | Italwan | **6741** |
| 26 | Thiago | **9483** |
| 27 | Vitória | **4215** |
| 28 | Nicolas Leite | **7596** |
| 29 | Daniel | **2934** |
| 30 | Ravel | **6829** |
| 31 | Luciano | **3582** |
| 32 | Keyllha | **7146** |
| 33 | Abinoã | **9407** |
| 34 | Gerlany | **2576** |
| 35 | Pedro Lucas | **5068** |

---

## 📝 Como o cadete acessa

1. Abre [/umadcamp/album](/umadcamp/album)
2. Digita o nome (qualquer capitalização — vira maiúsculo automaticamente, com ou sem acento)
3. Quando o sistema reconhece o nome, aparece um ✓ verde e o campo do PIN é desbloqueado
4. Digita os 4 dígitos do PIN → entra direto

Após entrar, o navegador lembra do cadete. Em outro dispositivo, basta digitar nome + PIN de novo — as figurinhas estão sincronizadas na nuvem.

---

## ✏️ Como alterar / adicionar / remover

Edite a constante `CADETES` em [album-efesios.html](album-efesios.html). Estrutura:

```js
const CADETES = {
    'NOME NORMALIZADO': { pin: '0000', display: 'Nome com Acentos' },
    ...
};
```

A chave deve ser **sem acentos** e **em MAIÚSCULAS** (é assim que `normalize()` compara com o que o usuário digita). O `display` é o nome bonito mostrado na UI.

**Regras de PIN:**
- 4 dígitos
- Evite sequências (`1234`, `4321`, `1111`)
- Único por cadete (não obrigatório, mas recomendado)
