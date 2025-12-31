# Implementation Plan: Multilingual AI Chatbot SaaS Platform (NestJS)

## Phase 1: Project Setup and Foundation ✅

### 1.1 NestJS Backend Structure
```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── database/
│   ├── entities/
│   ├── modules/
│   │   ├── setup/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── clients/
│   │   ├── bots/
│   │   ├── knowledge/
│   │   ├── chat/
│   │   └── analytics/
│   ├── common/
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── interceptors/
│   └── services/
│       ├── openai.service.ts
│       ├── qdrant.service.ts
│       ├── file-processing.service.ts
│       └── encryption.service.ts
├── test/
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### 1.2 Technology Stack
- **Backend**: NestJS 10.x + TypeScript
- **ORM**: TypeORM (PostgreSQL)
- **Validation**: class-validator + class-transformer
- **Authentication**: @nestjs/jwt + @nestjs/passport
- **File Processing**: pdf-parse, mammoth (docx), cheerio (URL scraping)
- **Vector DB**: @qdrant/js-client-rest
- **AI**: openai (Node.js SDK)
- **Language Detection**: franc (language detection)

### 1.3 Frontend Structure
```
frontend/
├── app/
│   ├── (auth)/
│   ├── (admin)/
│   ├── (client)/
│   └── setup/
├── components/
├── lib/
├── hooks/
└── types/
```

---

## Phase 2: Database Schema (TypeORM Entities)

### 2.1 Core Entities
- `User` - Platform users
- `Role` - User roles (root_admin, client_admin)
- `Client` - Multi-tenant clients
- `ClientApiKey` - Encrypted OpenAI keys
- `Bot` - Chatbot instances
- `BotSetting` - Widget configuration
- `KnowledgeSource` - Uploaded knowledge
- `Embedding` - Vector embeddings (metadata only, vectors in Qdrant)
- `Conversation` - Chat sessions
- `Message` - Individual messages
- `SystemSetting` - Platform settings
- `UsageLog` - Usage tracking
- `SetupWizard` - Setup progress

---

## Phase 3: Setup Wizard Implementation

### 3.1 Backend Endpoints
```
POST   /api/setup/check-status
POST   /api/setup/step-1          # Root Admin
POST   /api/setup/step-2          # OpenAI Config
POST   /api/setup/step-3          # Language Defaults
POST   /api/setup/step-4          # Database Init
POST   /api/setup/step-5          # Storage Config
POST   /api/setup/step-6          # Validation
POST   /api/setup/complete
```

### 3.2 Setup Module
- `SetupModule`
- `SetupController`
- `SetupService`
- Validation for each step
- Database migration trigger
- OpenAI API test

---

## Phase 4: Authentication & Authorization

### 4.1 Auth Module
- JWT strategy
- Local strategy (email/password)
- Role-based guards
- Tenant isolation middleware

### 4.2 Endpoints
```
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

---

## Phase 5: Client & Bot Management

### 5.1 Root Admin APIs
```
GET    /api/admin/clients
POST   /api/admin/clients
GET    /api/admin/clients/:id
PUT    /api/admin/clients/:id
DELETE /api/admin/clients/:id
POST   /api/admin/clients/:id/suspend
```

### 5.2 Client Admin APIs
```
GET    /api/client/bots
POST   /api/client/bots
GET    /api/client/bots/:id
PUT    /api/client/bots/:id
DELETE /api/client/bots/:id
POST   /api/client/api-key
```

---

## Phase 6: Knowledge Management

### 6.1 File Processing Service
- PDF: `pdf-parse`
- DOCX: `mammoth`
- TXT: Direct read
- URL: `cheerio` + `axios`
- Text chunking (sentence-aware)

### 6.2 Embedding Service
- OpenAI embeddings API
- Qdrant integration
- Batch processing
- Language tagging

### 6.3 Endpoints
```
POST   /api/client/knowledge/upload
POST   /api/client/knowledge/url
POST   /api/client/knowledge/manual
GET    /api/client/knowledge
DELETE /api/client/knowledge/:id
```

---

## Phase 7: Multilingual Support

### 7.1 Language Detection
- `franc` library for detection
- Store in conversation
- Manual override support

### 7.2 Translation Strategy
- User query → translate (if needed)
- Search embeddings
- Response → translate back
- Use OpenAI for translation

### 7.3 RTL Support
- CSS direction detection
- RTL-aware components

---

## Phase 8: Chat Engine

### 8.1 Chat Service
- Bot validation
- Language detection
- Vector search (Qdrant)
- Prompt building
- OpenAI API call
- Usage logging

### 8.2 Endpoints
```
POST   /api/widget/chat/init
POST   /api/widget/chat/message
GET    /api/widget/chat/history/:sessionId
```

---

## Phase 9: Widget Development

### 9.1 Widget Features
- Vanilla JavaScript
- iframe-compatible
- Lightweight bundle
- Customizable branding

### 9.2 Embed Snippet
```html
<script src="https://yourdomain.com/widget.js" data-bot-id="BOT_ID"></script>
```

---

## Phase 10: Import/Export

### 10.1 Export Service
- Full platform export
- Single client export
- ZIP generation
- Schema versioning

### 10.2 Import Service
- Schema validation
- Data restoration
- File restoration
- Embedding rebuild

---

## Phase 11: Analytics

### 11.1 Analytics Service
- Chats per language
- Top questions
- Knowledge gaps
- Token usage

### 11.2 Endpoints
```
GET    /api/client/analytics/overview
GET    /api/client/analytics/languages
GET    /api/admin/analytics/platform
```

---

## Phase 12: Security & Performance

### 12.1 Security
- Tenant isolation
- API key encryption (AES-256)
- Rate limiting
- Domain whitelist
- Input validation

### 12.2 Performance
- Query optimization
- Caching (Redis)
- Async processing
- Connection pooling

---

## Implementation Order

1. ✅ Project structure
2. ✅ Database entities
3. Setup wizard
4. Authentication
5. Client/Bot management
6. Knowledge management
7. Chat engine
8. Multilingual support
9. Widget
10. Import/Export
11. Analytics
12. Security & optimization

---

## Key Dependencies

### Backend (NestJS)
```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "typeorm": "^0.3.17",
  "pg": "^8.11.3",
  "openai": "^4.20.0",
  "@qdrant/js-client-rest": "^1.7.0",
  "pdf-parse": "^1.1.1",
  "mammoth": "^1.6.0",
  "cheerio": "^1.0.0",
  "franc": "^6.1.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2"
}
```

### Frontend (Next.js)
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@tanstack/react-query": "^5.0.0",
  "axios": "^1.6.0",
  "zod": "^3.22.0"
}
```

