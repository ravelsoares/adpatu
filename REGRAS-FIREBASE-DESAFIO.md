# Regras do Firebase — Desafio 1 Coríntios

O `desafio.html` usa **Firestore** (coleção `desafio-1corintios`) e **Storage** (pasta `desafio-1corintios/`).
Ele tem fallback: se o Storage falhar, salva a foto comprimida no próprio Firestore; se o Firestore
estiver inacessível, mostra dados de exemplo. Mas o ideal é deixar tudo liberado.

> Estes arquivos `.md` são ignorados no deploy (`firebase.json`), então não vão para o ar público.

---

## 1) Firestore — provavelmente JÁ funciona

Como o Álbum de Efésios já grava no Firestore direto do navegador, suas regras de Firestore
muito provavelmente já liberam tudo. **Teste primeiro**: abra o desafio, poste uma leitura e veja
se aparece. Se aparecer e persistir ao recarregar, **não precisa mexer no Firestore**.

Se NÃO funcionar (erro "Missing or insufficient permissions" no console do navegador), abra:

**Console Firebase → Firestore Database → aba "Regras"** e garanta que exista um bloco para a
coleção. Forma mínima e segura (mantém o que você já tem e só adiciona o desafio):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ... mantenha aqui as regras que você JÁ tem (ex.: album-efesios) ...

    // Desafio 1 Coríntios — leitura pública, escrita liberada (evento sem login)
    match /desafio-1corintios/{docId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

> Não apague as regras existentes do álbum — apenas **adicione** o bloco do desafio.

---

## 2) Storage — este é o que você precisa configurar

Nenhuma página usava Storage antes, então pode ser que ele ainda não esteja ativado.

### a) Ativar o Storage
**Console Firebase → Build → Storage → "Começar / Get started"** (escolha o modo de produção;
as regras abaixo cuidam do acesso). O bucket já é `umadcamp-patu.firebasestorage.app`.

### b) Regras do Storage
**Console Firebase → Storage → aba "Regras"** e cole (ou adicione o bloco `match`):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Fotos do Desafio 1 Coríntios:
    // qualquer um lê; grava apenas imagem de até 5 MB
    match /desafio-1corintios/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

Clique em **Publicar**.

---

## 3) Teste rápido
1. Abra `https://SEU-SITE/umadcamp/desafio`
2. Toque em **Postar minha leitura**, preencha nome/cidade, escolha o capítulo e a foto, publique.
3. Recarregue a página em **outro celular** — o post e o ranking devem aparecer para todos.

Se a foto subir mas você vir no console um aviso "Storage indisponível, salvando no Firestore",
significa que o passo 2 (Storage) ainda não está liberado — revise as regras/ativação.

---

## Observação sobre segurança
As regras acima são **abertas** (qualquer pessoa pode postar), igual ao restante do site do evento.
Para um evento de jovens isso costuma ser aceitável. Se quiser endurecer depois, dá para limitar
tamanho/quantidade ou exigir um campo de "token" simples — me chame que eu ajusto.
