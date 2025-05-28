# API de Despesas Pessoais

Uma API RESTful construída com NestJS, Prisma ORM e PostgreSQL para gerenciar despesas pessoais.

## Funcionalidades

- Operações CRUD para despesas
- Filtro de despesas por data e categoria
- Autenticação JWT
- Cache com Redis
- Documentação Swagger
- Banco de dados PostgreSQL com Prisma ORM

## Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL
- Redis
- npm ou yarn
- Docker e Docker Compose

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mauFade/expenses-nest
cd expenses
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais de banco de dados e Redis.

4. Inicie os serviços com Docker Compose:

```bash
docker-compose up -d
```

5. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

6. Inicie a aplicação:

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Documentação da API

Quando a aplicação estiver rodando, você pode acessar a documentação Swagger em:

```
http://localhost:3000/api
```

## Variáveis de Ambiente

- `DATABASE_URL`: String de conexão do PostgreSQL
- `REDIS_URL`: String de conexão do Redis
- `JWT_SECRET`: Chave secreta para tokens JWT
- `PORT`: Porta da aplicação (padrão: 3000)

## Estrutura do Projeto

```
src/
├── expenses/           # Módulo de despesas
│   ├── dto/           # Objetos de Transferência de Dados
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   └── expenses.module.ts
├── prisma/            # Configuração do Prisma
│   └── schema.prisma
├── app.module.ts      # Módulo raiz
└── main.ts           # Ponto de entrada da aplicação
```

## Endpoints da API

### Despesas

- `GET /expenses` - Listar todas as despesas (com filtros)
- `GET /expenses/:id` - Obter despesa por ID
- `POST /expenses` - Criar nova despesa
- `PUT /expenses/:id` - Atualizar despesa
- `DELETE /expenses/:id` - Excluir despesa

### Parâmetros de Consulta

- `month`: Filtrar por mês (01-12)
- `year`: Filtrar por ano
- `category`: Filtrar por categoria

## Configuração do Docker

O projeto inclui um arquivo `docker-compose.yml` que configura:

- PostgreSQL 15
- Redis 7

Para iniciar os serviços:

```bash
docker-compose up -d
```

Para parar os serviços:

```bash
docker-compose down
```

Para parar os serviços e remover os volumes (isso apagará todos os dados):

```bash
docker-compose down -v
```
