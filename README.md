# Primeira API - Sistema de Gerenciamento de Cursos

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.0+-green.svg)](https://fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44+-orange.svg)](https://orm.drizzle.team/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Uma API REST moderna e robusta construída com **Fastify**, **TypeScript** e **PostgreSQL** para gerenciamento de cursos e usuários, com sistema completo de autenticação, autorização e controle de acesso baseado em roles.

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

Esta é uma API REST completa para gerenciamento de cursos e usuários, desenvolvida como projeto de aprendizado para explorar tecnologias modernas de desenvolvimento backend. A aplicação demonstra boas práticas como:

- **Arquitetura limpa** com separação clara de responsabilidades
- **Type-safety** completo com TypeScript
- **Validação robusta** de dados com Zod
- **ORM moderno** com Drizzle para operações de banco
- **Sistema de autenticação** com JWT e Argon2
- **Controle de acesso** baseado em roles (student/manager)
- **Testes automatizados** com Vitest
- **Documentação automática** com Scalar API Reference
- **Containerização** com Docker para desenvolvimento

## Fluxo da Aplicação

```mermaid
graph TD
    A[Cliente] --> B[Fastify Server]
    B --> C{Validação Zod}
    C -->|Dados Válidos| D[Controller/Route]
    C -->|Dados Inválidos| E[Erro 400 Bad Request]
    D --> F[Verificação JWT]
    F -->|Token Válido| G[Verificação de Role]
    F -->|Token Inválido| H[Erro 401 Unauthorized]
    G -->|Role Permitido| I[Drizzle ORM]
    G -->|Role Negado| J[Erro 403 Forbidden]
    I --> K[PostgreSQL Database]
    K --> L[Resultado]
    L --> M[Resposta JSON]
    M --> A
    
    N[Scalar API Docs] --> B
    O[Drizzle Studio] --> K
    P[Testes Vitest] --> D
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style K fill:#e8f5e8
    style N fill:#fff3e0
    style O fill:#fff3e0
    style P fill:#fce4ec
```

## Tecnologias Utilizadas

### Backend
- **Fastify 5.0** - Framework web rápido e eficiente com foco em performance
- **TypeScript 5.9** - Linguagem de programação tipada para maior segurança
- **PostgreSQL** - Banco de dados relacional robusto e confiável
- **Drizzle ORM 0.44** - ORM moderno, type-safe e performático

### Autenticação e Segurança
- **JWT** - Tokens de autenticação seguros
- **Argon2** - Hash de senhas com salt automático
- **Zod** - Validação de schemas com TypeScript

### Ferramentas de Desenvolvimento
- **Vitest** - Framework de testes rápido e moderno
- **Docker** - Containerização para desenvolvimento consistente
- **Scalar API Reference** - Documentação automática da API moderna
- **TSX** - Executor TypeScript para desenvolvimento

### Qualidade de Código
- **ESLint** - Linting para manter padrões de código
- **Prettier** - Formatação automática de código
- **Husky** - Git hooks para qualidade

## Funcionalidades

### Core
- Sistema completo de usuários com roles (student/manager)
- Autenticação JWT com hash seguro de senhas (Argon2)
- Controle de acesso baseado em roles
- Criar novos cursos com validação
- Listar todos os cursos com paginação
- Buscar curso por ID com tratamento de erros
- Sistema de matrículas (enrollments)
- Validação robusta de dados com Zod
- Respostas padronizadas da API

### Desenvolvimento
- Documentação automática com Scalar API Reference
- Logs estruturados com Pino Pretty
- TypeScript com tipagem completa
- Testes automatizados com Vitest
- Migrações de banco com Drizzle
- Seeds para dados de exemplo

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
   JWT_SECRET=sua-chave-secreta-jwt-aqui
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

### 1. Autenticação
```http
POST /sessions
Content-Type: application/json

{
    "email": "usuario@exemplo.com",
    "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
    "token": "jwt-token-aqui"
}
```

**Resposta de Erro (400):**
```json
{
    "message": "Invalid Credentials"
}
```

### 2. Criar Curso (Requer role: manager)
```http
POST /courses
Authorization: Bearer <jwt-token>
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

### 3. Listar Todos os Cursos
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

### 4. Buscar Curso por ID
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

- **Documentação Scalar API**: `http://localhost:3333/docs`
- **Referência da API**: Interface interativa para testar os endpoints
- **Especificação OpenAPI**: `http://localhost:3333/docs/json`

## Estrutura do Projeto

```
node-primeira-api/
├── src/
│   ├── database/
│   │   ├── client.ts          # Configuração do banco de dados
│   │   ├── schema.ts          # Schemas das tabelas (users, courses, enrollments)
│   │   └── seed.ts            # Dados de exemplo
│   ├── routes/
│   │   ├── create-course.ts   # Rota para criar cursos (role: manager)
│   │   ├── get-courses.ts     # Rota para listar cursos
│   │   ├── get-course-by-id.ts # Rota para buscar curso por ID
│   │   ├── login.ts           # Rota de autenticação (/sessions)
│   │   └── hooks/
│   │       ├── check-role.ts  # Hook de verificação de roles
│   │       └── check-request-jwt.ts # Hook de verificação JWT
│   ├── tests/
│   │   └── factories/
│   │       ├── make-course.ts # Factory para testes
│   │       ├── make-user.ts   # Factory para usuários
│   │       ├── make-session.ts # Factory para sessões
│   │       └── make-enrollments.ts # Factory para matrículas
│   ├── utils/
│   │   └── get-authenticated-user-request.ts # Utilitário para extrair usuário do JWT
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
```

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
JWT_SECRET=chave-secreta-jwt-producao-muito-segura
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