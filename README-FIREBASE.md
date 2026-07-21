# Configuração do Firebase para o Sistema UMADCAMP

## 📋 Pré-requisitos

1. Conta no Google (para acessar o Firebase Console)
2. Navegador web moderno

## 🚀 Passo a Passo para Configuração

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Adicionar projeto"
3. Digite o nome do projeto (ex: "umadcamp-censo")
4. Aceite os termos e continue
5. Desabilite o Google Analytics (opcional)
6. Clique em "Criar projeto"

### 2. Ativar Firestore Database

1. No painel do projeto, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Selecione uma localização (recomendado: us-central1)
5. Clique em "Concluído"

### 3. Configurar Regras de Segurança

1. Na aba "Regras" do Firestore
2. Substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita para todos (apenas para desenvolvimento)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Clique em "Publicar"

### 4. Obter Configurações do Projeto

1. Clique no ícone de engrenagem (Configurações do projeto)
2. Role para baixo até "Seus aplicativos"
3. Clique no ícone web (</>)
4. Digite um nome para o app (ex: "umadcamp-web")
5. Clique em "Registrar app"
6. Copie as configurações do Firebase

### 5. Configurar o Código

1. Abra o arquivo `index.html`
2. Localize a seção `firebaseConfig`
3. Substitua os valores pelos obtidos no passo anterior:

```javascript
const firebaseConfig = {
    apiKey: "sua-api-key-real",
    authDomain: "seu-projeto-real.firebaseapp.com",
    projectId: "seu-projeto-real-id",
    storageBucket: "seu-projeto-real.appspot.com",
    messagingSenderId: "123456789",
    appId: "sua-app-id-real"
};
```

## 🔒 Regras de Segurança para Produção

Para um ambiente de produção, use regras mais restritivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /membros/{document} {
      allow read, write: if true; // Ajustar conforme necessário
    }
  }
}
```

## 📊 Estrutura dos Dados

Os dados serão armazenados na coleção `membros` com a seguinte estrutura:

```javascript
{
  numero: 1,
  nome: "Nome do Membro",
  dataNascimento: "1990-01-01",
  cidade: "Nome da Cidade",
  idade: 33,
  dataCadastro: timestamp
}
```

## 🛠️ Funcionalidades Implementadas

- ✅ Persistência de dados no Firebase
- ✅ Carregamento automático dos dados
- ✅ Estados de carregamento
- ✅ Tratamento de erros
- ✅ Mensagens de feedback
- ✅ Sincronização em tempo real

## 🚨 Importante

- **Desenvolvimento**: Use as regras de teste para facilitar o desenvolvimento
- **Produção**: Configure regras de segurança apropriadas
- **Backup**: Configure backups automáticos no Firebase
- **Monitoramento**: Use o console do Firebase para monitorar uso

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console do navegador (F12)
2. Confirme se as configurações estão corretas
3. Verifique se o Firestore está ativo
4. Confirme se as regras de segurança permitem acesso
