# API - Restaurant

A **API RocketLog** é um projeto que simula a gestão de entregas de encomendas, permitindo o controle de **usuários, autenticação, entregas, status e logs de entregas**.  
O objetivo principal é praticar o desenvolvimento de uma aplicação **Node.js com TypeScript**, utilizando **Prisma ORM** para comunicação com o banco de dados, além de boas práticas de arquitetura, autenticação JWT e containers com Docker.

---

## 🛠 **Tecnologias e Ferramentas**

Aqui estão as tecnologias utilizadas no desenvolvimento deste projeto:

- **Node.js**: Ambiente de execução do servidor.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Express**: Framework para criação de rotas e controle da API.
- **Prisma ORM**: Mapeamento objeto-relacional para banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Zod**: Validação de dados de entrada.
- **JWT (JSON Web Token)**: Autenticação de usuários.
- **Bcrypt**: Criptografia de senhas.
- **Docker & Docker Compose**: Criação e gerenciamento de containers para o ambiente de desenvolvimento.
- **Jest**: Testes automatizados.
- **Insomnia**: Testes de rotas e requisições.
- **Git & GitHub**: Controle de versão e hospedagem do código.

---

## ⚙️ **Funcionalidades**

A RocketLog conta com as seguintes funcionalidades principais:

- **Usuários**
  - Cadastro de usuários com senha criptografada.
  - Login com autenticação JWT.
  - Diferenciação de perfis (ex.: `customer`).

- **Entregas**
  - Criação de novas entregas vinculadas a usuários.
  - Listagem de todas as entregas com dados do cliente.
  - Alteração do status da entrega: `processing`, `shipped`, `delivered`.

- **Logs de Entregas**
  - Criação de logs para registrar alterações e eventos das entregas.
  - Restrições para evitar logs em pedidos já entregues.
  - Consulta detalhada de uma entrega (com logs e usuário associado).

- **Autenticação & Autorização**
  - Login seguro com token JWT.
  - Proteção de rotas.
  - Validações de permissões (usuário só pode acessar suas próprias entregas).

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
