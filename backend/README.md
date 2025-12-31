# Backend - NestJS API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your settings (see configuration below)

3. Setup Supabase:
   - Create a project at https://supabase.com
   - Get your project URL and service key
   - Get your database connection string from Supabase dashboard

4. Start Qdrant (for vector storage):
```bash
docker run -p 6333:6333 qdrant/qdrant
```

5. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Database (Supabase)

The application uses **Supabase** (PostgreSQL) with TypeORM. 

### Supabase Configuration

You can configure Supabase in two ways:

**Option 1: Connection String (Recommended)**
```env
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

**Option 2: Individual Parameters**
```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_SERVICE_KEY=your-service-key
DB_HOST=db.[PROJECT_REF].supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=postgres
```

### Supabase Storage

The application uses Supabase Storage for file uploads. Make sure to:
1. Create a storage bucket named `knowledge-files` in Supabase dashboard
2. Set bucket to public or configure RLS policies

### Database Migrations

On first run, tables will be created automatically if `DB_SYNCHRONIZE=true` (development only).

For production, use migrations:
```bash
npm run migration:generate -- -n MigrationName
npm run migration:run
```

## API Documentation

When running in development mode, Swagger documentation is available at:
- http://localhost:8000/api/docs

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── entities/              # TypeORM entities
├── modules/               # Feature modules
│   ├── setup/            # Setup wizard
│   ├── auth/             # Authentication
│   ├── users/            # User management
│   ├── clients/          # Client management
│   ├── bots/             # Bot management
│   ├── knowledge/        # Knowledge base
│   ├── chat/             # Chat engine
│   └── analytics/        # Analytics
└── database/             # Database configuration
```

## Setup Wizard

The setup wizard runs automatically on first boot. It guides through:
1. Root admin creation
2. OpenAI configuration
3. Language defaults
4. Database initialization
5. Storage configuration
6. Validation

Once completed, setup is locked unless `ALLOW_SETUP_RESET=true` in environment.

