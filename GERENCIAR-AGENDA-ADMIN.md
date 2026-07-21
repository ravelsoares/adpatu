# Gerenciar Agenda no Admin UMADCAMP

## 📅 Nova Funcionalidade Adicionada

A página de administração (`admin.html`) agora inclui uma seção completa para gerenciar a agenda de eventos da UMADCAMP.

## 🎯 Funcionalidades Disponíveis

### ➕ Adicionar Evento
- Clique em "Adicionar Evento" para abrir o formulário
- Preencha:
  - **Mês**: Selecione o mês do evento
  - **Título**: Nome do evento (ex: "Congresso de Jovens")
  - **Data de Início**: Data de início do evento
  - **Data de Fim**: Data de fim (opcional - deixe vazio para evento de um dia)
  - **Local**: Cidade ou local do evento
- Clique em "Salvar Evento"

### ✏️ Editar Evento
- Na lista de eventos, clique em "Editar" no evento desejado
- O formulário será preenchido com os dados atuais
- Modifique os campos necessários
- Clique em "Atualizar Evento"

### 🗑️ Remover Evento
- Na lista de eventos, clique em "Remover" no evento desejado
- Confirme a remoção na caixa de diálogo

### 🔄 Atualizar Lista
- Clique em "Atualizar Lista" para recarregar os eventos do banco de dados

### 🗑️ Limpar Agenda
- Clique em "Limpar Agenda" para remover TODOS os eventos
- ⚠️ **ATENÇÃO**: Esta ação não pode ser desfeita!

## 📋 Como Usar

1. **Acesse a página admin**: `admin.html`
2. **Digite a senha**: `C3ns02025`
3. **Role para baixo** até a seção "📅 Gerenciar Agenda"
4. **Use os botões** para gerenciar os eventos conforme necessário

## 🎨 Interface

- **Formulário responsivo** que se adapta a diferentes tamanhos de tela
- **Mensagens de feedback** para sucesso e erro
- **Confirmações** para ações destrutivas
- **Design consistente** com o resto da aplicação

## 🔄 Sincronização

- Todos os eventos são salvos no **Firebase Firestore**
- A página `agenda.html` é atualizada automaticamente
- As alterações são refletidas imediatamente

## 📱 Responsividade

- Interface adaptada para **desktop e mobile**
- Formulários que se reorganizam em telas menores
- Botões otimizados para toque

## 🛡️ Segurança

- Acesso protegido por senha de administrador
- Validação de campos obrigatórios
- Confirmações para ações críticas

## 💡 Dicas de Uso

1. **Para eventos de um dia**: Deixe o campo "Data de Fim" vazio
2. **Para eventos de múltiplos dias**: Preencha tanto a data de início quanto a de fim
3. **Use nomes descritivos**: Ex: "Congresso de Jovens", "Aniversário da Mocidade"
4. **Seja específico no local**: Ex: "Patu", "João Dias", "Pico Branco"

## 🔧 Solução de Problemas

- **Evento não aparece**: Clique em "Atualizar Lista"
- **Erro ao salvar**: Verifique se todos os campos obrigatórios estão preenchidos
- **Problemas de conexão**: Verifique sua conexão com a internet
