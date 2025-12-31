# Deployment Guide - Hostinger Node.js

## Prerequisites

1. **Supabase Project** - Set up and configured
2. **Qdrant Instance** - Either Qdrant Cloud or self-hosted
3. **OpenAI API Key** - For AI functionality
4. **Hostinger Account** - With Node.js app feature enabled

## Pre-Deployment Checklist

### 1. Database Setup (Supabase)

- [ ] Create Supabase project
- [ ] Get database connection string
- [ ] Get service role key
- [ ] Create storage bucket: `knowledge-files`
- [ ] Test database connection locally

### 2. Environment Variables

Prepare all environment variables (see `.env.production.example`):

**Required:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `SUPABASE_DB_URL`
- `JWT_SECRET` (generate a secure random string)
- `OPENAI_API_KEY`
- `QDRANT_URL`
- `QDRANT_API_KEY` (if using Qdrant Cloud)

**Optional but Recommended:**
- `CORS_ORIGINS` (your frontend domain)
- `ENCRYPTION_KEY` (32 characters)

### 3. Generate JWT Secret

```bash
# Generate a secure random secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Test Build Locally

```bash
cd backend
npm install
npm run build
npm run start:prod
```

Verify the app starts without errors.

## Hostinger Deployment Steps

### Step 1: Prepare Git Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Chatbot Platform"
   ```

2. **Push to Remote Repository**:
   - Create a repository on GitHub, GitLab, or Bitbucket
   - Add remote and push:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Verify Repository Structure**:
   - Ensure `backend/` directory is in the root
   - Verify `package.json` exists in `backend/`
   - Check `.gitignore` excludes sensitive files

### Step 2: Create Node.js App in Hostinger

1. Log in to Hostinger control panel
2. Navigate to **Node.js Apps** (new feature)
3. Click **Create New App**
4. Fill in:
   - **App Name**: `ai-chatbot-backend`
   - **Repository**: Connect your Git repository
   - **Branch**: `main` or `master`
   - **Node Version**: `18.x` or `20.x`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Root Directory**: Leave empty (or set to `backend` if Hostinger requires it)

### Step 3: Configure Build Settings

Hostinger will automatically detect your repository. Verify:
1. **Repository URL**: Correct Git repository
2. **Branch**: `main` or `master`
3. **Build Command**: `cd backend && npm install && npm run build`
   - Or if Hostinger auto-detects: `npm run build` (from backend directory)
4. **Start Command**: `cd backend && npm run start:prod`
   - Or: `npm run start:prod` (from backend directory)
5. **Working Directory**: Set to `backend` if Hostinger has this option

### Step 4: Configure Environment Variables

In Hostinger's Node.js app settings, add all environment variables:

1. Go to **Environment Variables** section
2. Add each variable from `.env.production.example`
3. **Important**: Never commit `.env` file to Git

**Critical Variables:**
```
NODE_ENV=production
PORT=3000
SUPABASE_DB_URL=...
JWT_SECRET=...
OPENAI_API_KEY=...
```

### Step 5: Deploy

1. Click **Deploy** or push to your repository
2. Wait for build to complete
3. Check deployment logs for errors

### Step 6: Verify Deployment

1. Check health endpoint: `https://your-app.hostinger.com/api/health`
2. Check API docs: `https://your-app.hostinger.com/api/docs` (if enabled)
3. Test setup wizard: `https://your-app.hostinger.com/api/setup/check-status`

## Post-Deployment

### 1. Run Database Migrations

Since `DB_SYNCHRONIZE=false` in production, you need to run migrations:

**Option A: Via Hostinger SSH (if available)**
```bash
cd backend
npm run migration:run
```

**Option B: Enable synchronize temporarily (first deployment only)**
- Set `DB_SYNCHRONIZE=true` in environment
- Deploy once
- Set back to `false`
- Redeploy

**Option C: Run migrations locally pointing to production DB**
```bash
# Temporarily point to production database
SUPABASE_DB_URL=your-production-db-url npm run migration:run
```

### 2. Complete Setup Wizard

1. Access your deployed app
2. Complete the setup wizard via API or frontend
3. This creates root admin and initial configuration

### 3. Configure CORS

Update `CORS_ORIGINS` with your frontend domain:
```
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 4. Set Up Custom Domain (Optional)

1. In Hostinger, configure custom domain
2. Update CORS_ORIGINS to include custom domain
3. Redeploy if needed

## Troubleshooting

### Build Fails

- Check Node.js version matches (18+)
- Verify all dependencies in `package.json`
- Check build logs for specific errors

### Database Connection Errors

- Verify `SUPABASE_DB_URL` is correct
- Check password is properly URL-encoded
- Ensure SSL is enabled (handled automatically)

### App Crashes on Start

- Check environment variables are set
- Verify port is available (Hostinger may assign port)
- Check application logs

### 502 Bad Gateway

- App may not be starting
- Check start command: `npm run start:prod`
- Verify `PORT` environment variable

## Monitoring

### Health Check Endpoint

```bash
curl https://your-app.hostinger.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Logs

Access logs via Hostinger control panel:
- **Node.js Apps** → Your App → **Logs**

## Production Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong `JWT_SECRET` (32+ characters)
3. ✅ Set `DB_SYNCHRONIZE=false` in production
4. ✅ Enable CORS only for your domains
5. ✅ Use HTTPS (Hostinger handles this)
6. ✅ Monitor logs regularly
7. ✅ Set up backups (Supabase handles this)
8. ✅ Use environment-specific configurations

## Scaling Considerations

- Hostinger may have resource limits
- Consider upgrading plan for higher traffic
- Monitor database connection pool
- Consider CDN for static assets (if any)

## Next Steps

After backend is deployed:
1. Deploy frontend (separate Hostinger app or different hosting)
2. Update frontend API URL to point to backend
3. Test full integration
4. Set up monitoring/analytics

