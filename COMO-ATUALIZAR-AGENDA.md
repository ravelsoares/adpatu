# Como Atualizar a Agenda UMADCAMP

## Método 1: Usando a Interface Web (Recomendado)

1. **Abra o arquivo `update-agenda.html`** no seu navegador
2. **Clique em "Limpar Agenda Atual"** para remover eventos antigos
3. **Clique em "Importar Nova Agenda"** para adicionar os novos eventos
4. **Clique em "Ver Agenda Atual"** para verificar se tudo foi importado corretamente

## Método 2: Usando o Script Node.js (Avançado)

Se você tiver o arquivo `serviceAccountKey.json` do Firebase:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Limpe a agenda atual:
   ```bash
   node import-csv.js clear-agenda
   ```

3. Importe a nova agenda:
   ```bash
   node import-csv.js import-agenda
   ```

## Eventos da Nova Agenda (2024)

### SETEMBRO
- 20/09: Congresso Unificado em João Dias
- 24-27/09: Congresso de Jovens em Lucrécia

### OUTUBRO
- 17-19/10: Congresso de Jovens em Candeia
- 18/10: Congresso de Jovens em Almino Afonso
- 31/10: Congresso de Jovens em Pintada

### NOVEMBRO
- 1/11: Congresso de Jovens em Pintada
- 15/11: Aniversário do Conjunto e do círculo de oração da mocidade em Pico Branco
- 22/11: Dejad na Estrada em Patu

### DEZEMBRO
- NÃO HÁ AGENDA

## Verificação

Após atualizar, acesse `agenda.html` para ver os eventos organizados por mês.

## Observações

- A agenda é armazenada no Firebase Firestore
- Os eventos são organizados automaticamente por mês
- As datas são formatadas automaticamente para exibição
- O sistema suporta eventos de um dia ou de múltiplos dias
