# Central do Amor — configuração do Firebase

A página `central-do-amor.html` usa **Login com Google** (Firebase Auth) + **Firestore**
(coleções `central-amor-cantadas` e `central-amor-usuarios`). Não usa Storage.

URL amigável (depois do deploy): **/amor** ou **/umadcamp/amor**.

> Estes arquivos `.md` são ignorados no deploy (`firebase.json`), não vão para o ar.

---

## 1) Ativar o Login com Google  ✅ (passo obrigatório)

**Console Firebase → Build → Authentication → Get started**
1. Aba **Sign-in method** → **Add new provider** → **Google** → **Enable**.
2. Escolha um *e-mail de suporte do projeto* e salve.
3. Ainda em Authentication → aba **Settings → Authorized domains**, confirme que estão lá:
   - `umadcamp-patu.firebaseapp.com`
   - `umadcamp-patu.web.app`
   - o seu domínio próprio, se tiver (ex.: `umadcamp.com.br`)
   - `localhost` (para testar na sua máquina)

Sem esse passo o botão "Entrar com Google" abre o popup e dá erro de domínio não autorizado.

---

## 2) Regras do Firestore

> ⚠️ **ATENÇÃO:** ao adicionar a Central do Amor, é fácil acabar **substituindo** todo o
> ruleset pelo bloco novo — e aí o **ranking dos cadetes** (`cadetes_pontuacao`), o álbum, o
> desafio etc. quebram com "Missing or insufficient permissions". Para evitar isso, **cole o
> arquivo `firestore.rules` inteiro** (deste projeto), que já tem **todas** as coleções juntas.

**Console Firebase → Firestore Database → aba "Regras"** → apague o que estiver lá e cole o
conteúdo completo de **`firestore.rules`** (na raiz do projeto). Ele cobre:

- `cadetes_pontuacao` (ranking dos cadetes), `album-efesios`, `desafio-1corintios`,
  `tapago_posts`, `agenda`, `agenda-adpatu`, `membros`, `config`, `ebd_videos` — leitura/escrita liberadas (como antes);
- `central-amor-cantadas` e `central-amor-usuarios` — com login Google.

Depois clique em **Publicar**.

> Se algo ainda falhar, é uma coleção que não está na lista acima — me avise o nome (aparece no
> erro do Console F12) que eu adiciono. Para confirmar que o problema é de regras, dá pra testar
> temporariamente com um ruleset totalmente aberto (`allow read, write: if true;`) — mas **não
> deixe assim em produção**.

---

## 3) Ajustes rápidos na própria página

Tudo fica no topo do `<script>` em `central-do-amor.html`, bloco **CONFIG**:

- `REVEAL_AT` — **data/hora da revelação** (igual para todos). Padrão: `2026-06-13T12:00:00`.
  Antes desse momento aparece a contagem regressiva ("Volte daqui a X horas e X minutos…");
  depois, aparece o botão **"Descobrir meu par perfeito"** que revela que o par é **Deus**.
- `QUESTIONS` — as perguntas do questionário (pode editar/adicionar à vontade).
- `CANTADAS` / `USERS` — nomes das coleções no Firestore.

---

## Como funciona o fluxo
1. Jovem entra com Google (obrigatório).
2. Responde o **questionário do amor** → isso **libera** o mural de cantadas.
3. No mural: publica cantadas, curte as dos outros e vê o **ranking por curtidas**.
4. Um card mostra a contagem regressiva até `REVEAL_AT`.
5. Chegando a hora, o botão revela: **"O seu par perfeito é Deus"** (com versículos). 💘✝️
