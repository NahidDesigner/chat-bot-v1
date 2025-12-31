# Multilingual AI Chatbot SaaS Platform

A multi-tenant SaaS platform that enables businesses to deploy AI-powered, multilingual chatbots on their websites.

## Features

- 🤖 AI-powered chatbots with knowledge base
- 🌍 Multilingual support (any language)
- 🔒 Multi-tenant architecture with data isolation
- 📊 Analytics and chat history
- 🔄 Full import/export for server migration
- 🎨 Customizable widget branding
- ⚡ Fast response times (< 2s)

## Tech Stack

- **Backend**: NestJS (TypeScript/Node.js)
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL) + TypeORM
- **Storage**: Supabase Storage (for file uploads)
- **Vector DB**: Qdrant
- **AI**: OpenAI API

## Project Structure

```
ai-chatbot-platform/
├── backend/          # NestJS backend
├── frontend/         # Next.js frontend
├── widget/           # JavaScript widget for client sites
└── docker/           # Docker configurations
```

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account (free tier available)
- Docker (for Qdrant, optional - can use Qdrant Cloud)

### Installation

1. Clone the repository
2. Create a Supabase project (see `backend/SUPABASE_SETUP.md`)
3. Setup backend: `cd backend && npm install`
4. Setup frontend: `cd frontend && npm install`
5. Configure environment variables (see `backend/SUPABASE_SETUP.md`)
6. Run setup wizard on first boot

## Development

### Backend
```bash
cd backend
npm run start:dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## License

Proprietary
