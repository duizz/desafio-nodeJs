# Primeira API - Sistema de Gerenciamento de Cursos

Uma API REST moderna construída com **Fastify**, **TypeScript** e **PostgreSQL** para gerenciamento de cursos.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Fluxo da Aplicação](#fluxo-da-aplicação)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)

## Sobre o Projeto

Esta é uma API REST para gerenciamento de cursos, desenvolvida como projeto de aprendizado. A aplicação permite criar, listar e buscar cursos específicos, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## Fluxo da Aplicação

```mermaid
graph TD
    A[Cliente] --> B[Fastify Server]
    B --> C{Validação Zod}
    C -->|Dados Válidos| D[Controller/Route]
    C -->|Dados Inválidos| E[Erro 400]
    D --> F[Drizzle ORM]
    F --> G[PostgreSQL Database]
    G --> H[Resultado]
    H --> I[Resposta JSON]
    I --> A
    
    J[Swagger Docs] --> B
    K[Drizzle Studio] --> G
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style G fill:#e8f5e8
    style J fill:#fff3e0
    style K fill:#fff3e0
```

## Tecnologias Utilizadas

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Linguagem de programação tipada
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno e type-safe
- **Zod** - Validação de schemas
- **Docker** - Containerização do banco de dados
- **Swagger/OpenAPI** - Documentação da API

## Funcionalidades

- Criar novos cursos
- Listar todos os cursos
- Buscar curso por ID
- Validação de dados com Zod
- Documentação automática da API
- Logs estruturados
- TypeScript com tipagem completa

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd node-primeira-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## Configuração

1. **Inicie o banco de dados PostgreSQL**
   ```bash
   docker-compose up -d
   ```

2. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
   ```

3. **Execute as migrações do banco**
   ```bash
   npm run db:migrate
   ```

## Uso

### Desenvolvimento
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

### Visualizar o banco de dados
```bash
npm run db:studio
```

Acesse `http://localhost:4983` para visualizar e gerenciar os dados.

## Endpoints da API

### 1. Criar Curso
```http
POST /courses
Content-Type: application/json

{
    "title": "Nome do Curso"
}
```

**Resposta:**
```json
{
    "courseId": "uuid-do-curso"
}
```

### 2. Listar Todos os Cursos
```http
GET /courses
```

**Resposta:**
```json
{
    "courses": [
        {
            "id": "uuid-do-curso",
            "title": "Nome do Curso"
        }
    ]
}
```

### 3. Buscar Curso por ID
```http
GET /courses/{id}
```

**Resposta:**
```json
{
    "course": {
        "id": "uuid-do-curso",
        "title": "Nome do Curso",
        "description": "Descrição do curso (opcional)"
    }
}
```

## Documentação da API

Quando o projeto estiver rodando em modo de desenvolvimento, você pode acessar:

- **Documentação Swagger**: `http://localhost:3333/docs`
- **Referência da API**: Interface interativa para testar os endpoints

## Estrutura do Projeto

```
node-primeira-api/
├── src/
│   ├── database/
│   │   ├── client.ts      # Configuração do banco de dados
│   │   └── schema.ts      # Schemas das tabelas
│   ├── routes/
│   │   ├── create-course.ts
│   │   ├── get-courses.ts
│   │   └── get-course-by-id.ts
│   └── server.ts          # Configuração do servidor
├── drizzle/               # Migrações do banco
├── docker-compose.yml     # Configuração do PostgreSQL
├── package.json
└── tsconfig.json
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run db:generate` | Gera novas migrações do banco |
| `npm run db:migrate` | Executa as migrações pendentes |
| `npm run db:studio` | Abre o Drizzle Studio para visualizar dados |

## Testando a API

Você pode usar o arquivo `request.http` incluído no projeto para testar os endpoints, ou usar ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) (extensão do VS Code)

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Desenvolvido como projeto de aprendizado para explorar tecnologias modernas de desenvolvimento backend.

---

Se este projeto te ajudou, considere dar uma estrela!
