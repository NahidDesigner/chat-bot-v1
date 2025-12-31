# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in project details:
   - Name: Your project name
   - Database Password: (save this!)
   - Region: Choose closest to you

## 2. Get Connection Details

### Database Connection String

1. Go to Project Settings → Database
2. Find "Connection string" section
3. Copy the "URI" connection string
4. Replace `[YOUR-PASSWORD]` with your database password
5. Use this as `SUPABASE_DB_URL` in `.env`

Example:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### API Keys

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret) → `SUPABASE_SERVICE_KEY`

⚠️ **Important**: Use `service_role` key (not `anon` key) for backend operations.

## 3. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Click "New bucket"
3. Name: `knowledge-files`
4. Make it **Public** (or configure RLS policies)
5. Click "Create bucket"

## 4. Environment Variables

Add to your `.env` file:

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Or use individual DB parameters
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=postgres
DB_SYNCHRONIZE=true
DB_LOGGING=false
```

## 5. SSL Configuration

Supabase requires SSL connections. The application is configured to:
- Use SSL with `rejectUnauthorized: false` for Supabase connections
- This is safe for Supabase's managed PostgreSQL

## 6. Benefits of Using Supabase

✅ **Built-in Features:**
- PostgreSQL database (fully compatible)
- Storage for file uploads
- Real-time subscriptions (can be used for chat)
- Auto-generated REST APIs (optional)
- Dashboard for data management

✅ **Developer Experience:**
- Easy setup
- Free tier available
- Automatic backups
- Built-in authentication (can be used instead of custom JWT)

## 7. Testing Connection

After setup, test the connection:

```bash
npm run start:dev
```

Check the console for database connection status. If you see errors, verify:
- Connection string is correct
- Password is correct
- SSL is enabled (handled automatically)

