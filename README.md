# Primeira API - Sistema de Gerenciamento de Cursos

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.0+-green.svg)](https://fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.29+-orange.svg)](https://orm.drizzle.team/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Uma API REST moderna e robusta construída com **Fastify**, **TypeScript** e **PostgreSQL** para gerenciamento de cursos, com foco em performance, type-safety e boas práticas de desenvolvimento.

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
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)

## Sobre o Projeto

Esta é uma API REST para gerenciamento de cursos, desenvolvida como projeto de aprendizado para explorar tecnologias modernas de desenvolvimento backend. A aplicação demonstra boas práticas como:

- **Arquitetura limpa** com separação clara de responsabilidades
- **Type-safety** completo com TypeScript
- **Validação robusta** de dados com Zod
- **ORM moderno** com Drizzle para operações de banco
- **Testes automatizados** com Vitest
- **Documentação automática** com Swagger/OpenAPI
- **Containerização** com Docker para desenvolvimento

## Fluxo da Aplicação

```mermaid
graph TD
    A[Cliente] --> B[Fastify Server]
    B --> C{Validação Zod}
    C -->|Dados Válidos| D[Controller/Route]
    C -->|Dados Inválidos| E[Erro 400 Bad Request]
    D --> F[Drizzle ORM]
    F --> G[PostgreSQL Database]
    G --> H[Resultado]
    H --> I[Resposta JSON]
    I --> A
    
    J[Swagger Docs] --> B
    K[Drizzle Studio] --> G
    L[Testes Vitest] --> D
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style G fill:#e8f5e8
    style J fill:#fff3e0
    style K fill:#fff3e0
    style L fill:#fce4ec
```

## Tecnologias Utilizadas

### Backend
- **Fastify** - Framework web rápido e eficiente com foco em performance
- **TypeScript** - Linguagem de programação tipada para maior segurança
- **PostgreSQL** - Banco de dados relacional robusto e confiável
- **Drizzle ORM** - ORM moderno, type-safe e performático

### Ferramentas de Desenvolvimento
- **Zod** - Validação de schemas com TypeScript
- **Vitest** - Framework de testes rápido e moderno
- **Docker** - Containerização para desenvolvimento consistente
- **Swagger/OpenAPI** - Documentação automática da API

### Qualidade de Código
- **ESLint** - Linting para manter padrões de código
- **Prettier** - Formatação automática de código
- **Husky** - Git hooks para qualidade

## Funcionalidades

### Core
-  Criar novos cursos com validação
-  Listar todos os cursos com paginação
-  Buscar curso por ID com tratamento de erros
-  Validação robusta de dados com Zod
-  Respostas padronizadas da AP 
### Desenvolvimento
-  Documentação automática com Swagger
-  Logs estruturados para debugging
-  TypeScript com tipagem completa
-  Testes automatizados com Vitest
-  Migrações de banco com Drizzle

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
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

4. **Opcional: Popule o banco com dados de exemplo**
   ```bash
   npm run db:seed
   ```

## Uso

### Desenvolvimento
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

### Produção
```bash
npm run build
npm start
```

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
    "title": "Nome do Curso",
    "description": "Descrição opcional do curso"
}
```

**Resposta de Sucesso (201):**
```json
{
    "success": true,
    "data": {
        "courseId": "uuid-do-curso"
    }
}
```

**Resposta de Erro (400):**
```json
{
    "success": false,
    "error": "Dados inválidos",
    "details": ["Título é obrigatório"]
}
```

### 2. Listar Todos os Cursos
```http
GET /courses?page=1&limit=10
```

**Resposta:**
```json
{
    "success": true,
    "data": {
        "courses": [
            {
                "id": "uuid-do-curso",
                "title": "Nome do Curso",
                "description": "Descrição do curso",
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 1
        }
    }
}
```

### 3. Buscar Curso por ID
```http
GET /courses/{id}
```

**Resposta de Sucesso (200):**
```json
{
    "success": true,
    "data": {
        "course": {
            "id": "uuid-do-curso",
            "title": "Nome do Curso",
            "description": "Descrição do curso",
            "createdAt": "2024-01-01T00:00:00Z"
        }
    }
}
```

**Resposta de Erro (404):**
```json
{
    "success": false,
    "error": "Curso não encontrado"
}
```

## Documentação da API

Quando o projeto estiver rodando, você pode acessar:

- **Documentação Swagger**: `http://localhost:3333/docs`
- **Referência da API**: Interface interativa para testar os endpoints
- **Especificação OpenAPI**: `http://localhost:3333/docs/json`

## Estrutura do Projeto

```
node-primeira-api/
├── src/
│   ├── database/
│   │   ├── client.ts          # Configuração do banco de dados
│   │   ├── schema.ts          # Schemas das tabelas
│   │   └── seed.ts            # Dados de exemplo
│   ├── routes/
│   │   ├── create-course.ts   # Rota para criar cursos
│   │   ├── get-courses.ts     # Rota para listar cursos
│   │   └── get-course-by-id.ts # Rota para buscar curso por ID
│   ├── tests/
│   │   └── factories/
│   │       └── make-course.ts # Factory para testes
│   ├── app.ts                 # Configuração da aplicação
│   └── server.ts              # Configuração do servidor
├── drizzle/                   # Migrações do banco
├── docker/                    # Scripts Docker
├── docker-compose.yml         # Configuração do PostgreSQL
├── package.json
├── tsconfig.json
├── vitest.config.ts           # Configuração dos testes
└── README.md
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm test` | Executa todos os testes |
| `npm run db:generate` | Gera novas migrações do banco |
| `npm run db:migrate` | Executa as migrações pendentes |
| `npm run db:seed` | Popula o banco com dados de exemplo |
| `npm run db:studio` | Abre o Drizzle Studio para visualizar dados |


## Testes

O projeto utiliza **Vitest** para testes automatizados, garantindo qualidade e confiabilidade do código.

### Executando Testes
```bash
# Todos os testes
npm test


### Estrutura de Testes
- **Testes unitários** para funções isoladas
- **Testes de integração** para rotas da API
- **Factories** para criar dados de teste consistentes
- **Cobertura de código** para identificar áreas não testadas



## Deploy

### Docker
```bash
# Build da imagem
docker build -t primeira-api .

# Executar container
docker run -p 3333:3333 primeira-api
```

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
```

## Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Padrões de Contribuição
- Siga o estilo de código existente
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos

## Licença

Este projeto está sob a licença **ISC**. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Desenvolvido como projeto de aprendizado para explorar tecnologias modernas de desenvolvimento backend.

**Contato:**
- GitHub: [@duizz](https://github.com/duizz)

## Agradecimentos

- Comunidade Fastify por um framework incrível
- Equipe Drizzle por um ORM moderno e type-safe
- Comunidade TypeScript por uma linguagem fantástica

---

**Se este projeto te ajudou, considere dar uma estrela!**