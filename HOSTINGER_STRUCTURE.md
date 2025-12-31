# Hostinger Node.js Project Structure

## ✅ Updated Structure (Hostinger Standard)

Based on Hostinger's requirements, the project now follows their standard:

```
project/
├── package.json          # Root package.json with "start" script
├── server.js             # Entry point for Hostinger
├── backend/              # NestJS application
│   ├── package.json
│   ├── src/
│   │   └── main.ts      # NestJS entry (compiles to dist/main.js)
│   └── dist/            # Build output (created during build)
└── .env.example
```

## Key Changes Made

### 1. Root `package.json`
- ✅ Has `"start"` script: `node backend/dist/main.js`
- ✅ Has `"build"` script: `cd backend && npm install && npm run build`
- ✅ Specifies `engines.node`: `>=18.0.0 <23.0.0`
- ✅ Points `main` to compiled output

### 2. Root `server.js`
- ✅ Entry point that Hostinger can detect
- ✅ Imports the compiled NestJS app from `backend/dist/main.js`
- ✅ Error handling if build is missing

### 3. Port Configuration
- ✅ Updated `main.ts` to prioritize `process.env.PORT` (Hostinger requirement)
- ✅ Falls back to config or default port

## Hostinger Configuration

### Build Settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (or just `npm start` - Hostinger will use the "start" script)
- **Root Directory**: Leave empty (root of repo)
- **Node Version**: 18, 20, or 22

### Environment Variables:
Add all variables from `backend/.env.production.example`:
- `NODE_ENV=production`
- `PORT` (Hostinger will set this automatically)
- `SUPABASE_URL=...`
- `SUPABASE_SERVICE_KEY=...`
- `SUPABASE_DB_URL=...`
- `JWT_SECRET=...`
- `OPENAI_API_KEY=...`
- `QDRANT_URL=...`
- And all others...

## Deployment Flow

1. **Hostinger clones repo**
2. **Runs build**: `npm run build`
   - Installs backend dependencies
   - Compiles TypeScript to `backend/dist/`
3. **Runs start**: `npm start`
   - Executes `node backend/dist/main.js`
   - App listens on `process.env.PORT`

## Migration Strategy

If you need to run migrations:

1. **Option 1: Via SSH** (if Hostinger provides SSH)
   ```bash
   cd backend
   npm run migration:run
   ```

2. **Option 2: Add to build script** (first deployment only)
   ```json
   "build": "cd backend && npm install && npm run build && npm run migration:run"
   ```

3. **Option 3: Enable synchronize temporarily**
   - Set `DB_SYNCHRONIZE=true` in environment
   - Deploy once
   - Set back to `false`

## Verification

After deployment, check:
- ✅ Health endpoint: `https://your-app.hostinger.com/api/health`
- ✅ Setup status: `https://your-app.hostinger.com/api/setup/check-status`
- ✅ Application logs in Hostinger dashboard

## Troubleshooting

**Error: "Cannot find module backend/dist/main.js"**
- Build step didn't run successfully
- Check build logs in Hostinger
- Verify `npm run build` completes without errors

**Error: "Port already in use"**
- Make sure using `process.env.PORT` (already fixed in main.ts)
- Hostinger sets PORT automatically

**Error: "Database connection failed"**
- Verify `SUPABASE_DB_URL` is set correctly
- Check SSL configuration (handled automatically)

