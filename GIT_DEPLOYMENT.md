# Git Deployment Guide for Hostinger

## Repository Setup

### 1. Initialize Git Repository

If you haven't already:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Chatbot Platform"
```

### 2. Create Remote Repository

1. Go to GitHub, GitLab, or Bitbucket
2. Create a new repository
3. **DO NOT** initialize with README (you already have one)
4. Copy the repository URL

### 3. Connect and Push

```bash
# Add remote
git remote add origin <your-repo-url>

# Rename branch to main (if needed)
git branch -M main

# Push to remote
git push -u origin main
```

## Repository Structure

Your repository should look like this:

```
ai-chatbot-platform/
├── .git/
├── .gitignore
├── .gitattributes
├── README.md
├── DEPLOYMENT_CHECKLIST.md
├── GIT_DEPLOYMENT.md
├── IMPLEMENTATION_PLAN.md
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .env.production.example
│   ├── DEPLOYMENT.md
│   ├── SUPABASE_SETUP.md
│   ├── src/
│   └── ...
└── (frontend/ - when ready)
```

## Hostinger Git Deployment

### Step 1: Connect Repository in Hostinger

1. Log in to Hostinger control panel
2. Navigate to **Node.js Apps**
3. Click **Create New App** or **Deploy from Git**
4. Select your Git provider (GitHub, GitLab, Bitbucket)
5. Authorize Hostinger to access your repositories
6. Select your repository: `ai-chatbot-platform`
7. Select branch: `main` (or `master`)

### Step 2: Configure Build Settings

Hostinger will detect your project. Configure:

**Build Settings:**
- **Root Directory**: `backend` (if Hostinger has this option)
- **Build Command**: 
  ```
  cd backend && npm install && npm run build
  ```
  OR if Hostinger runs from backend directory:
  ```
  npm install && npm run build
  ```

**Start Settings:**
- **Start Command**:
  ```
  cd backend && npm run start:prod
  ```
  OR:
  ```
  npm run start:prod
  ```

**Node Version:**
- Select `18.x` or `20.x`

### Step 3: Environment Variables

In Hostinger's environment variables section, add all variables from `backend/.env.production.example`:

**Critical Variables:**
```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres.xxxxx:[PASSWORD]@...
JWT_SECRET=your-secure-random-secret-32-chars-min
OPENAI_API_KEY=sk-your-openai-key
QDRANT_URL=https://your-qdrant-instance.qdrant.io
QDRANT_API_KEY=your-qdrant-key
```

**Important:**
- Never commit `.env` files to Git
- All sensitive data goes in Hostinger's environment variables
- Use strong secrets (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### Step 4: Deploy

1. Click **Deploy** or **Save & Deploy**
2. Hostinger will:
   - Clone your repository
   - Run `npm install` in backend directory
   - Run build command
   - Start the application
3. Monitor deployment logs
4. Wait for "Deployment successful" message

### Step 5: Verify Deployment

1. **Check Health Endpoint:**
   ```
   https://your-app.hostinger.com/api/health
   ```
   Should return: `{"status":"healthy","timestamp":"..."}`

2. **Check Setup Status:**
   ```
   https://your-app.hostinger.com/api/setup/check-status
   ```

3. **View Logs:**
   - Go to Hostinger → Your App → Logs
   - Check for any errors

## Automatic Deployments

Hostinger typically supports automatic deployments on Git push:

1. **Enable Auto-Deploy** (if available):
   - Go to app settings
   - Enable "Auto-deploy on push"
   - Select branch (usually `main`)

2. **Deploy Process:**
   - Push to `main` branch
   - Hostinger detects changes
   - Automatically rebuilds and redeploys

## Manual Deployment

If auto-deploy is disabled or you want to deploy manually:

1. Go to Hostinger → Your App
2. Click **Deploy** or **Redeploy**
3. Select branch (if prompted)
4. Wait for deployment to complete

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Check `package.json` has all dependencies
- Verify `npm install` runs successfully
- Check Node.js version matches

**Error: "Command not found"**
- Verify build/start commands are correct
- Check working directory is set to `backend`

### App Won't Start

**Error: "Port already in use"**
- Check `PORT` environment variable
- Hostinger may assign port automatically
- Try removing `PORT` or using `process.env.PORT`

**Error: "Database connection failed"**
- Verify `SUPABASE_DB_URL` is correct
- Check password is URL-encoded
- Verify SSL is enabled (handled automatically)

### Environment Variables Not Working

- Verify variables are set in Hostinger (not just in `.env` file)
- Check variable names match exactly (case-sensitive)
- Restart app after adding variables

## Best Practices

1. ✅ **Never commit secrets** - Use environment variables
2. ✅ **Test locally first** - Build and run locally before deploying
3. ✅ **Use branches** - Deploy from `main`, develop in feature branches
4. ✅ **Monitor logs** - Check Hostinger logs regularly
5. ✅ **Version control** - Keep all code in Git
6. ✅ **Documentation** - Keep deployment docs updated

## Post-Deployment

After successful deployment:

1. Complete setup wizard via API
2. Test all endpoints
3. Configure CORS with your frontend domain
4. Set up monitoring
5. Configure custom domain (if needed)

## Updating the App

To update your deployed app:

1. Make changes locally
2. Test locally: `npm run build && npm run start:prod`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
4. Hostinger will auto-deploy (if enabled) or manually deploy
5. Verify deployment in logs

## Repository Checklist

Before deploying, ensure:

- [ ] `.gitignore` excludes `.env` files
- [ ] All code is committed
- [ ] `package.json` has correct scripts
- [ ] `package.json` specifies Node.js version
- [ ] Repository is pushed to remote
- [ ] Environment variables documented (but not committed)
- [ ] Build works locally
- [ ] Start command works locally

