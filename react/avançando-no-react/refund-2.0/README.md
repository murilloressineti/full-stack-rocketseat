# Refund - Sistema de Reembolso 2.0 - Rocketseat Full-Stack

O **Refund 2.0** é a evolução do projeto de sistema de **solicitações de reembolso**, desenvolvido durante a formação **Full-Stack da Rocketseat**.  
Esta nova versão integra **uma API em Node.js** com **um front-end moderno em React**, permitindo a gestão completa de reembolsos, com autenticação, upload de comprovantes e interface responsiva e intuitiva.

---

## 🛠 **Tecnologias e Ferramentas**

Aqui estão as tecnologias utilizadas no desenvolvimento deste projeto:

### 🔹 Backend (API)  
- **Node.js** + **Express**: Servidor HTTP
- **TypeScript**: Tipagem estática
- **Prisma ORM**: Banco de dados
- **Zod**: Validação de dados
- **JWT**: Autenticação segura
- **Bcrypt**: Criptografia de senhas
- **Multer (DiskStorage)**: Upload de comprovantes
- **Insomnia**: Testes de rotas

### 🔹 Frontend (Web)  
- **React** (Vite): SPA moderna
- **TailwindCSS**: Estilização responsiva
- **Axios**: Consumo da API
- **TypeScript**: Segurança e tipagem
- **Figma**: Prototipagem de layout
---

## 💻 **Projeto**

Confira abaixo uma prévia e acesse o projeto completo [aqui](https://formrefund.netlify.app/):

<img src="web/src/assets/thumbnail.png" alt="Imagem do Projeto" />

---

## ⚙️ Funcionalidades  

### 👤 Usuários  
- Cadastro com senha criptografada
- Perfis distintos: `employee` e `manager`
- Login seguro com **JWT**
- Acesso controlado às próprias solicitações

### 💸 Solicitações de Reembolso  
- Criação de solicitações vinculadas ao usuário
- Categorias: `food`, `others`, `services`, `transport`, `accommodation`
- Upload de comprovante obrigatório
- Listagem com paginação e filtros por nome
- Visualização detalhada de cada solicitação

### 📂 Uploads  
- Upload de comprovantes (restrições de formato e tamanho)
- Exclusão automática de arquivos inválidos

### 🌐 Interface Web  
- Dashboard intuitivo para listagem de reembolsos
- Busca por nome
- Paginação dinâmica
- Layout moderno e responsivo (Tailwind)

---

## ⚙️ Instalação e Execução

Siga os passos abaixo para clonar o projeto e executá-lo localmente em sua máquina:

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado

### 📥 1. Clone o repositório

```git clone https://github.com/murilloressineti/full-stack-rocketseat.git```

### 📂 2. Acesse a pasta do projeto
```cd full-stack-rocketseat/tree/main/react/avançando-no-react/refund-2.0```

### 📦 3. Instale as dependências
```npm install```

- Crie o arquivo .env com as variáveis:
```DATABASE_URL="postgresql://usuario:senha@localhost:5432/refunddb"```
```JWT_SECRET="seusegredoaqui"```

- Rode as migrations:
```npx prisma migrate dev```

### 🚀 4. Execute o projeto
```npm run dev```

---

## 📝 **Licença**

Este projeto está sob a licença **MIT**. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).

---

## 👨🏻‍💻 **Autor**

Feito por **Murillo Ressineti**, aluno da Rocketseat e desenvolvedor Full-Stack. Conecte-se comigo no LinkedIn para mais informações:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/murilloressineti/)

---

## 📬 **Contato**

Se você tiver dúvidas, sugestões ou gostaria de discutir sobre o projeto, sinta-se à vontade para entrar em contato!
