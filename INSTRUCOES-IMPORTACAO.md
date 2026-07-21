# 📥 Instruções para Importar Dados do CSV

## 🎯 Opções Disponíveis

Você tem **2 opções** para importar os dados do CSV para o Firebase:

### 1. 🌐 Interface Web (Recomendado)
**Arquivo:** `import-csv.html`

#### Como usar:
1. Abra o arquivo `import-csv.html` no navegador
2. Clique em "🔄 Atualizar Estatísticas" para ver o estado atual
3. **Escolha uma opção:**
   - **📂 Selecionar Arquivo CSV:** Arraste e solte ou clique para selecionar
   - **📋 Usar Dados Padrão:** Usa os dados pré-carregados
4. Visualize o preview dos dados
5. Clique em "⬆️ Importar para Firebase" para importar
6. Acompanhe o progresso da importação

#### Vantagens:
- ✅ Interface visual amigável
- ✅ Preview dos dados antes da importação
- ✅ Barra de progresso em tempo real
- ✅ Estatísticas do banco
- ✅ Opção de limpar banco
- ✅ Mensagens de feedback

---

### 2. 💻 Script Node.js (Linha de Comando)
**Arquivo:** `import-csv.js`

#### Pré-requisitos:
```bash
npm install firebase-admin csv-parser
```

#### Configuração:
1. Baixe a chave de serviço do Firebase Console
2. Renomeie para `serviceAccountKey.json`
3. Coloque na mesma pasta do script

#### Como usar:
```bash
# Importar dados de membros
node import-csv.js import

# Limpar coleção de membros
node import-csv.js clear

# Ver estatísticas de membros
node import-csv.js stats

# Importar dados da agenda
node import-csv.js import-agenda

# Limpar coleção da agenda
node import-csv.js clear-agenda

# Ver ajuda
node import-csv.js
```

#### Vantagens:
- ✅ Execução rápida
- ✅ Ideal para automação
- ✅ Logs detalhados
- ✅ Não precisa de navegador

---

## 📊 Dados que Serão Importados

### 📋 Formato do CSV
O arquivo CSV deve ter o seguinte formato:

```csv
nome,data_nascimento,cidade
João Silva Santos,15/03/1990,Patu
Maria Oliveira Costa,22/07/1985,Patu
```

### ✅ Requisitos:
- **Cabeçalho obrigatório:** nome, data_nascimento, cidade
- **Formato da data:** DD/MM/YYYY (ex: 15/03/1990)
- **Codificação:** UTF-8
- **Separador:** vírgula (,)
- **Tamanho máximo:** 5MB

### 📁 Dados Padrão:
- **Total de registros:** 66 membros
- **Campos:** Nome, Data de Nascimento, Cidade
- **Cidade:** Todos de Patu
- **Numeração:** Automática sequencial
- **Idade:** Calculada automaticamente

## ⚠️ Importante

### Antes de Importar:
1. **Backup:** Faça backup dos dados existentes se necessário
2. **Configuração:** Certifique-se que o Firebase está configurado
3. **Regras:** Verifique as regras de segurança do Firestore

### Durante a Importação:
- ✅ Não feche o navegador/terminal
- ✅ Aguarde a conclusão da importação
- ✅ Verifique as mensagens de erro se houver

### Após a Importação:
1. ✅ Verifique as estatísticas
2. ✅ Teste o sistema principal
3. ✅ Confirme que os dados estão corretos

## 🔧 Solução de Problemas

### Erro de Configuração do Firebase:
```
❌ Erro: Firebase não configurado
```
**Solução:** Verifique se as configurações do Firebase estão corretas

### Erro de Permissão:
```
❌ Erro: Permissão negada
```
**Solução:** Verifique as regras de segurança do Firestore

### Erro de Conexão:
```
❌ Erro: Falha na conexão
```
**Solução:** Verifique sua conexão com a internet

## 📈 Estatísticas Esperadas

Após a importação bem-sucedida:
- **Total de membros:** 66
- **Próximo número:** 67
- **Cidade:** 66 membros de Patu
- **Idades:** Variando de 0 a 64 anos

## 🎉 Próximos Passos

Após a importação:
1. ✅ Abra o sistema principal (`index.html`)
2. ✅ Verifique se os dados aparecem corretamente
3. ✅ Teste as funcionalidades de busca e filtro
4. ✅ Confirme que tudo está funcionando

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Confirme as configurações do Firebase
3. Verifique as regras de segurança
4. Teste a conexão com o Firebase
