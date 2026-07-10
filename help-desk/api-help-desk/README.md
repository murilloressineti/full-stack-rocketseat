# Help Desk - Back-end

API REST desenvolvida como projeto de conclusão da formação **Full-Stack da Rocketseat**, responsável por gerenciar toda a lógica de negócio do sistema de Help Desk, incluindo autenticação, autorização, gerenciamento de usuários, chamados e serviços.

A aplicação foi construída utilizando **Node.js**, **Express** e **TypeScript**, seguindo uma arquitetura em camadas, autenticação baseada em **JWT**, validação de dados com **Zod** e persistência em banco de dados **PostgreSQL** utilizando **Prisma ORM**.

---

## 💻 Demonstração

A API está disponível em:

**🔗 https://api-help-desk-deploy.onrender.com/**

> Esta é uma API REST, portanto não possui interface gráfica. Todas as funcionalidades são consumidas pelo Front-end da aplicação.

---

## 🚀 Funcionalidades

A API implementa toda a lógica de negócio do sistema através de autenticação e controle de permissões por perfil de usuário.

### 👑 Administrador

- Cadastro de técnicos com senha provisória.
- Cadastro, edição e exclusão de clientes.
- Cadastro, edição e desativação de serviços (Soft Delete).
- Gerenciamento completo dos chamados.
- Alteração do status de qualquer chamado.
- Visualização de todos os usuários cadastrados.

### 👨‍🔧 Técnico

- Atualização do próprio perfil.
- Alteração obrigatória da senha no primeiro acesso.
- Visualização dos chamados atribuídos.
- Inclusão de serviços adicionais em um chamado.
- Alteração do status dos chamados em atendimento.

### 👤 Cliente

- Cadastro público na plataforma.
- Autenticação via JWT.
- Atualização do próprio perfil.
- Criação de novos chamados.
- Consulta do histórico completo de atendimentos.

---

## 🛠 Tecnologias e Ferramentas

Aqui estão as principais tecnologias utilizadas no desenvolvimento desta API:

* **Runtime & Linguagem:** Node.js + TypeScript.
* **Framework:** Express.
* **Banco de Dados:** PostgreSQL.
* **ORM:** Prisma ORM.
* **Autenticação:**
    * **JWT (JSON Web Token):** Controle de autenticação e autorização.
    * **Bcrypt:** Criptografia de senhas.
* **Validação de Dados:**
    * **Zod:** Validação tipada dos dados recebidos pela API.
* **Arquitetura da Aplicação:**
    * Controllers.
    * Middlewares.
    * Rotas organizadas por recurso.
    * Tratamento centralizado de erros.
* **Boas práticas implementadas:**
    * Soft Delete para serviços.
    * Controle de permissões por Role.
    * Hash de senhas.
    * Validação de autenticação em rotas protegidas.
    * Organização modular do código.

---

## 🏗 Arquitetura

O projeto foi organizado utilizando uma arquitetura simples e modular, separando responsabilidades entre controladores, rotas, middlewares e acesso ao banco de dados.

```text
src
│
├── configs
├── controllers
├── database
├── middlewares
├── routes
├── types
└── utils
```

Entre as principais boas práticas utilizadas estão:

- Arquitetura baseada em Controllers.
- Separação entre regras de negócio e configuração das rotas.
- Tipagem completa com TypeScript.
- Validação centralizada utilizando Zod.
- Autenticação baseada em JWT.
- Criptografia de senhas utilizando Bcrypt.
- Controle de acesso baseado em Roles.
- Tratamento centralizado de erros.
- Utilização do Prisma ORM para abstração do banco de dados.

---

## ⚙️ Executando localmente

### Clone o projeto

```bash
git clone https://github.com/murilloressineti/full-stack-rocketseat
```

### Instale as dependências

```bash
pnpm install
```

### Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

```env
DATABASE_URL="sua_url_do_postgresql"

JWT_SECRET="seu_jwt_secret"

PORT=3333

CLOUDINARY_CLOUD_NAME=seu_cloud_name

CLOUDINARY_API_KEY=sua_api_key

CLOUDINARY_API_SECRET=seu_api_secret
```

### Execute as migrations

```bash
npx prisma migrate dev
```

### Execute a aplicação

```bash
pnpm dev
```

---

## 🌐 Deploy

- **API:** Render
- **Banco de Dados:** Neon PostgreSQL

---

## 👨🏻‍💻 **Autor**

**Murillo Ressineti** — Desenvolvedor Front-end. Graduando em Análise e Desenvolvimento de Sistemas pela **Universidade Mackenzie** e imersão técnica pela **Rocketseat**.

• [LinkedIn](https://www.linkedin.com/in/murilloressineti/) • [E-mail](mailto:murillo@ressineti.com.br) • [Portfólio](https://murilloressineti.com.br/)

---

## 📝 **Licença**

Este projeto está sob a licença **MIT**. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).