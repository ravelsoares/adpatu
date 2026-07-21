# Cartas Extras — Prompts (4 cartas surpresa)

Cada cadete pode ganhar **cada uma das 4 cartas apenas UMA vez**. Caem com **30% de chance** no momento que a 4ª figurinha normal do pacote é revelada — disparam uma cena especial estilo FIFA walkout (fundo holográfico arco-íris, fanfarra, flip lento). Não contam pro álbum 50/50, não vão pro ranking. **Surpresa total.**

> 🎨 Estética sugerida: cartas no estilo **holográfica de TCG / FUT Walkout** — borda arco-íris, conteúdo central com a "piada interna" / personagem / cena da resenha. Pode ser caricatural, meme, fotografia editada, ilustração — fica a seu critério criativo.

> 📐 Formato: **3:4 vertical** (ex.: 810×1080 ou 900×1200). Salve em `images/extras/` com os nomes exatos abaixo.

---

## Nome dos arquivos esperados

| ID interno | Arquivo |
|---|---|
| `ex-1` | `images/extras/ex-1.png` |
| `ex-2` | `images/extras/ex-2.png` |
| `ex-3` | `images/extras/ex-3.png` |
| `ex-4` | `images/extras/ex-4.png` |

Se a imagem não existir, o código mostra a carta com fundo holográfico animado e só o título — então pode subir as imagens uma de cada vez sem quebrar nada.

---

## Como editar título e descrição

No [album-efesios.html](album-efesios.html), procure pela constante `CARTAS_EXTRAS` (logo depois do array `FIGURINHAS`). Cada entrada tem `title` e `desc` — edite como quiser. Os placeholders atuais são genéricos só pra você ver funcionando:

```js
const CARTAS_EXTRAS = [
    { id: 'ex-1', num: 'X1', title: 'Carta Extra 1', image: '/images/extras/ex-1.png', desc: 'Uma surpresa pra você.' },
    { id: 'ex-2', num: 'X2', title: 'Carta Extra 2', image: '/images/extras/ex-2.png', desc: 'Outra surpresa.' },
    { id: 'ex-3', num: 'X3', title: 'Carta Extra 3', image: '/images/extras/ex-3.png', desc: 'Mais uma surpresa.' },
    { id: 'ex-4', num: 'X4', title: 'Carta Extra 4', image: '/images/extras/ex-4.png', desc: 'Última surpresa.' }
];
```

---

## 💡 Sugestões de tema (você escolhe)

Como é "pra resenha", podem ser:

- **Caricaturas dos próprios cadetes** mais marcantes (ilustração estilo cartoon ou caricatura realista)
- **Memes internos** da turma / momentos famosos / falas marcantes
- **Personagens bíblicos secundários** em pose engraçada
- **"Easter eggs"** que só quem é do grupo entende
- **Conquistas figurativas** (tipo "Mestre da Pontualidade", "Rei da Resenha", etc)
- **Mascotes inventados** com personalidade

O importante é que **cada carta seja inesperada e gere conversa** — "irmão, qual carta extra você tirou?"

---

## 📋 Workflow recomendado

1. Decide a "piada"/conceito das 4 cartas com a liderança
2. Gera as imagens (IA ou design manual) em **3:4 vertical**
3. Salva como `ex-1.png` … `ex-4.png` em `images/extras/`
4. Edita o `title` e `desc` na constante `CARTAS_EXTRAS` no álbum
5. Commit + push (Action faz deploy)
6. Cadetes começam a ver o bônus em ~30% dos próximos pacotes

---

## 🎬 Como funciona pro cadete (recap)

1. Cadete abre pacote normal
2. Revela as 4 figurinhas como sempre
3. **Se ganhou bônus** (30% chance):
   - Tela escurece e aparece **"🎉 BÔNUS!"** em pixel font
   - Texto **"VOCÊ GANHOU UMA CARTA EXTRA"**
   - Carta entra de baixo com glow arco-íris (holográfico)
   - Toca pra revelar → flip 3D → flash → fanfarra
4. Vai pro summary com a 5ª carta no fim
5. Cadete confirma → carta salva em `cartasExtras` no Firestore
6. No álbum, aparece a seção **"✨ CARTAS EXTRAS ✨"** no rodapé — **só** com as cartas que ele tem, sem indicar quantas ainda existem

**Cadete NÃO sabe:**
- Quantas cartas extras existem no total
- Se as que tirou são as únicas ou se ainda tem mais
- Quando vai cair a próxima

Pura curiosidade e resenha. 🎉
