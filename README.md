# Agenda de Contatos API (Node.js + MySQL + JWT)

API CRUD simples seguindo boas práticas (camadas separadas, validação, autenticação) para gerenciar **Usuários**, **Endereços** e **Contatos**. Autenticação por **JWT (Bearer Token)**. Pronta para rodar com **Docker Compose** (MySQL + API) ou localmente.

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
3) A API ficará em `http://localhost:3000/api` e o MySQL em `localhost:3306`.

### Acessar o banco com seu MySQL local (Workbench/CLI)
- Host: `127.0.0.1`
- Porta: `3306`
- Usuário: valor de `DB_USER` (padrão: root)
- Senha: valor de `DB_PASS` (padrão: secret)
- Database: `DB_NAME` (padrão: agenda)

> **Obs.:** O banco está dentro do container, mas a porta é mapeada, então seu Workbench consegue conectar normalmente.

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
## Licença
MIT
