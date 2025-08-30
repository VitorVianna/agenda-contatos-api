# Agenda de Contatos API (Node.js + MySQL + JWT)

API CRUD simples seguindo boas práticas (camadas separadas, validação, autenticação) para gerenciar **Usuários**, **Endereços** e **Contatos**. Autenticação por **JWT (Bearer Token)**. Pronta para rodar com **Docker Compose** (MySQL + API) ou localmente.

- Banco: MySQL (Sequelize)
- Arquitetura: camadas (Controller → Service → Repository → Model)
- Validação: Joi
- Observabilidade & Segurança: morgan, helmet, CORS
- Docs interativas: Swagger UI em /api/docs
- Coleção Postman: postman/AgendaContatos.postman_collection.json
  
## Stack
- Node.js (Express)
- MySQL (Sequelize ORM)
- JWT (jsonwebtoken), Bcrypt
- Joi (validações)
- Docker & Docker Compose

## Estrutura
```text
src/
  config/database.js
  models/ (Usuario, Endereco, Contato + associations)
  repositories/
  services/
  controllers/
  middlewares/authMiddleware.js
  validators/
  routes/index.js
  app.js
```

## Variáveis de Ambiente
Copie `.env.example` para `.env` e ajuste conforme necessário:
```bash
cp .env.example .env
```

| Variável    | Descrição                                    |
|-------------|-----------------------------------------------|
| PORT        | Porta da API (padrão 3000)                    |
| JWT_SECRET  | Segredo para assinar o token JWT              |
| DB_HOST     | Host do MySQL (use `mysql` no Docker)         |
| DB_PORT     | Porta do MySQL (padrão 3306)                  |
| DB_NAME     | Nome do banco                                 |
| DB_USER     | Usuário do MySQL                              |
| DB_PASS     | Senha do MySQL                                |


## Detalhes sobre o projeto
Entidades
- Usuarios: id, nome, senha(hash), email, dataNascimento, rg, cpf
- Enderecos: id, idUsuario(FK Usuarios[id]), cep, rua, numero, complemento, bairro, cidade, estado
- Contatos: id, idUsuario(FK Usuarios[id]), numeroTelefone

Rotas públicas
- POST /api/auth/register — cria usuário (retorna sem a senha)
- POST /api/auth/login — retorna { token }

Rotas protegidas (Bearer Token)
- GET /api/usuarios | GET /api/usuarios/:id | PUT /api/usuarios/:id | DELETE /api/usuarios/:id
- POST /api/usuarios/:idUsuario/enderecos | GET /api/usuarios/:idUsuario/enderecos
- GET /api/enderecos/:id | PUT /api/enderecos/:id | DELETE /api/enderecos/:id
- POST /api/usuarios/:idUsuario/contatos | GET /api/usuarios/:idUsuario/contatos
- GET /api/contatos/:id | PUT /api/contatos/:id | DELETE /api/contatos/:id

O middleware de autenticação é aplicado dentro do router após router.use(authMiddleware).
O Swagger fica fora do middleware, montado em app.js antes das rotas, em /api/docs.

---
## Rodando com Docker Compose (recomendado)
1) **Crie o .env**:
```bash
cp .env.example .env
# Opcionalmente edite JWT_SECRET e DB_* se desejar
```
2) **Suba os serviços**:
```bash
docker compose up --build
```
1) A API ficará em `http://localhost:3000/api`.

---
## Rodando localmente (sem Docker)
1) Garanta que você tenha um MySQL rodando localmente e crie o banco (ou deixe o Sequelize criar):
```sql
CREATE DATABASE agenda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2) Configure o `.env` com `DB_HOST=127.0.0.1` e credenciais do seu MySQL.

3) Instale as dependências e inicie:
```bash
npm ci
npm run dev
# ou
npm start
```

A API iniciará em `http://localhost:3000/api`. Na primeira execução, as tabelas serão sincronizadas automaticamente (`sequelize.sync()`).

---
## Endpoints (coleção Postman incluída em `postman/AgendaContatos.postman_collection.json`)

**Public:**  
- `POST /api/auth/register` — cria usuário (retorna o usuário sem a senha)  
- `POST /api/auth/login` — retorna `{ token }`

**Protegidos (Bearer Token):**  
- `GET /api/usuarios` — lista usuários
- `GET /api/usuarios/:id` — detalhe
- `PUT /api/usuarios/:id` — atualiza (opcionalmente `senha`)
- `DELETE /api/usuarios/:id` — remove (cascade em endereços/contatos)

**Endereços (do usuário):**
- `POST /api/usuarios/:idUsuario/enderecos`
- `GET /api/usuarios/:idUsuario/enderecos`
- `GET /api/enderecos/:id`
- `PUT /api/enderecos/:id`
- `DELETE /api/enderecos/:id`

**Contatos (do usuário):**
- `POST /api/usuarios/:idUsuario/contatos`
- `GET /api/usuarios/:idUsuario/contatos`
- `GET /api/contatos/:id`
- `PUT /api/contatos/:id`
- `DELETE /api/contatos/:id`

### Exemplo de fluxo (curl)
```bash
# Registrar
curl -X POST http://localhost:3000/api/auth/register       -H "Content-Type: application/json"       -d '{"nome":"Vitor","email":"vitor@exemplo.com","senha":"123456"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login       -H "Content-Type: application/json"       -d '{"email":"vitor@exemplo.com","senha":"123456"}' | jq -r .token)

# Listar usuários
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/usuarios
```

---
## Boas práticas adotadas
- Camadas separadas (Controller → Service → Repository → Model)
- Validação de entrada (Joi)
- Hash de senha (bcrypt)
- JWT com expiração (12h) e middleware de autenticação
- Logs de requisição (morgan), segurança básica (helmet), CORS
- Variáveis de ambiente (.env) e Docker Compose

---
## Testando com Postman/Insomnia
- Importe o arquivo `postman/AgendaContatos.postman_collection.json`
- Ajuste a variável `baseUrl` para `http://localhost:3000/api`
- Após o login, copie o token e cole em **Authorization → Bearer Token** ou use a variável `{{token}}`

---
## Swagger

- URL: http://localhost:3000/api/docs
- Clique em Authorize (esquema bearerAuth) e cole apenas o token (sem Bearer — o Swagger já adiciona).
- O spec fica em src/docs/openapi.js.
- O mount do Swagger está em src/app.js antes de app.use('/api', routes) para não passar no middleware.

---
## Troubleshooting rápido

- Porta 3306 ocupada (se usar MySQL em container): mapeie para 3307:3306 ou use seu MySQL local/externo.
- Conexão ao MySQL externo no Docker (Windows/macOS): DB_HOST=host.docker.internal.
Linux: use extra_hosts e/ou o IP do host/servidor.
- Conflitos npm (ERESOLVE):
-- No container, o Dockerfile já instala somente produção (--omit=dev) e ignora peers de ferramentas de dev.
-- Para desenvolvimento local com ESLint, alinhe versões:
eslint 8.57.0, eslint-config-standard 17.1.0, eslint-plugin-n 16.6.2, eslint-plugin-promise 6.1.1, eslint-plugin-import 2.31.0.

---
## Licença
MIT
