# API - Refunds

A **API Refunds Manager** é um projeto que simula a gestão de **solicitações de reembolso**, permitindo o controle de **usuários, autenticação, uploads de comprovantes e consultas de pedidos de reembolso**.  
O objetivo principal é praticar o desenvolvimento de uma aplicação **Node.js com TypeScript**, utilizando **Prisma ORM** para comunicação com o banco de dados, além de boas práticas de **arquitetura, autenticação JWT e validação com Zod**.

---

## 🛠 **Tecnologias e Ferramentas**

Aqui estão as tecnologias utilizadas no desenvolvimento deste projeto:

- **Node.js**: Ambiente de execução do servidor.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Express**: Framework para criação de rotas e controle da API.
- **Prisma ORM**: Mapeamento objeto-relacional para banco de dados.
- **Zod**: Validação de dados de entrada.
- **JWT (JSON Web Token)**: Autenticação de usuários.
- **Bcrypt**: Criptografia de senhas.
- **Multer + DiskStorage** → Upload e gerenciamento de arquivos. 
- **Insomnia**: Testes de rotas e requisições.
- **Git & GitHub**: Controle de versão e hospedagem do código.

---

## ⚙️ **Funcionalidades**

O Refunds conta com as seguintes funcionalidades principais:

### 👤 **Usuários**
- Cadastro de usuários com senha criptografada.  
- Diferenciação de perfis (`employee` e `manager`).
- Login seguro com autenticação JWT.

### 💸 **Solicitações de Reembolso**
- Criação de uma nova solicitação vinculada ao usuário.
- Categorias disponíveis: `food`, `others`, `services`, `transport`, `accommodation`.
- Valor do reembolso deve ser positivo.
- Upload obrigatório de comprovante (arquivo).
- Consulta detalhada de uma solicitação.
- Listagem paginada de solicitações com filtros.

### 📂 **Uploads**
- Upload de arquivos (comprovantes).
- Restrições de formato e tamanho.
- Exclusão de arquivos inválidos automaticamente.

### 🔐 **Autenticação & Autorização**
- Login seguro com token JWT.
- Proteção de rotas privadas.
- Validações de permissões (usuário só pode acessar suas próprias solicitações).

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
