# Deployment Checklist - Hostinger Node.js

## Pre-Deployment

### 1. Supabase Setup ✅
- [ ] Create Supabase project
- [ ] Get `SUPABASE_URL`
- [ ] Get `SUPABASE_SERVICE_KEY` (service_role key)
- [ ] Get `SUPABASE_DB_URL` (connection string)
- [ ] Create storage bucket: `knowledge-files`
- [ ] Test connection locally

### 2. Qdrant Setup ✅
- [ ] Set up Qdrant (Cloud or self-hosted)
- [ ] Get `QDRANT_URL`
- [ ] Get `QDRANT_API_KEY` (if using Cloud)
- [ ] Test connection

### 3. OpenAI Setup ✅
- [ ] Get OpenAI API key
- [ ] Verify key works
- [ ] Set usage limits (optional)

### 4. Code Preparation ✅
- [ ] All code committed to Git
- [ ] `.env` files NOT committed
- [ ] Build tested locally: `npm run build`
- [ ] Start tested locally: `npm run start:prod`

### 5. Security ✅
- [ ] Generate secure `JWT_SECRET` (32+ chars)
- [ ] Generate secure `ENCRYPTION_KEY` (32 chars)
- [ ] Review all environment variables
- [ ] Remove any test/development keys

## Git Repository Setup

### 6. Initialize Git Repository ✅
- [ ] `git init` (if not already done)
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] Create remote repository (GitHub/GitLab/Bitbucket)
- [ ] `git remote add origin <repo-url>`
- [ ] `git push -u origin main`
- [ ] Verify all files are pushed (except .env files)

## Hostinger Deployment

### 7. Create Node.js App ✅
- [ ] Log in to Hostinger
- [ ] Navigate to Node.js Apps
- [ ] Click "Deploy from Git" or "Create New App"
- [ ] Connect Git provider (GitHub/GitLab/Bitbucket)
- [ ] Authorize Hostinger access
- [ ] Select repository: `ai-chatbot-platform`
- [ ] Select branch: `main` or `master`

### 8. Configure Build Settings ✅
- [ ] Set root directory: `backend` (if option available)
- [ ] Set build command: `cd backend && npm install && npm run build`
- [ ] Set start command: `cd backend && npm run start:prod`
- [ ] Set Node version: 18.x or 20.x
- [ ] Verify all settings

### 9. Environment Variables ✅
Add all variables from `.env.production.example`:

**Critical:**
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (or Hostinger assigned port)
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_KEY`
- [ ] `SUPABASE_DB_URL`
- [ ] `JWT_SECRET`
- [ ] `OPENAI_API_KEY`
- [ ] `QDRANT_URL`
- [ ] `QDRANT_API_KEY` (if needed)

**Important:**
- [ ] `CORS_ORIGINS` (your frontend domain)
- [ ] `DB_SYNCHRONIZE=false`
- [ ] `SETUP_COMPLETED=false` (first time)
- [ ] `ALLOW_SETUP_RESET=false`

### 10. Deploy ✅
- [ ] Click Deploy or push to repo
- [ ] Monitor build logs
- [ ] Wait for deployment to complete
- [ ] Check for errors

### 11. Database Setup ✅
- [ ] Run migrations (see DEPLOYMENT.md)
- [ ] OR enable `DB_SYNCHRONIZE=true` temporarily
- [ ] Verify tables created
- [ ] Set `DB_SYNCHRONIZE=false` back

### 12. Verify Deployment ✅
- [ ] Health check: `/api/health`
- [ ] Setup status: `/api/setup/check-status`
- [ ] Check application logs
- [ ] Test API endpoints

### 13. Complete Setup Wizard ✅
- [ ] Access setup wizard
- [ ] Complete all 6 steps
- [ ] Create root admin
- [ ] Configure OpenAI
- [ ] Verify setup completion

## Post-Deployment

### 13. Configuration ✅
- [ ] Update `CORS_ORIGINS` with frontend domain
- [ ] Set `SETUP_COMPLETED=true`
- [ ] Configure custom domain (if needed)
- [ ] Update DNS (if custom domain)

### 14. Testing ✅
- [ ] Test authentication
- [ ] Test API endpoints
- [ ] Test file uploads
- [ ] Test chat functionality
- [ ] Monitor logs for errors

### 15. Monitoring ✅
- [ ] Set up error tracking (optional)
- [ ] Monitor application logs
- [ ] Check database connections
- [ ] Monitor API response times

## Troubleshooting

If deployment fails:
- [ ] Check build logs
- [ ] Verify Node.js version
- [ ] Check environment variables
- [ ] Verify database connection
- [ ] Check port configuration
- [ ] Review application logs

## Next Steps

After successful deployment:
- [ ] Deploy frontend
- [ ] Connect frontend to backend API
- [ ] Test full integration
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Document API endpoints

