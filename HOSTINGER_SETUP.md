# Hostinger Setup Instructions

## Issue: "Unsupported framework or invalid project structure"

Hostinger is having trouble auto-detecting the framework because the backend is in a subdirectory. Here's how to fix it:

## Solution 1: Manual Configuration (Recommended)

When setting up in Hostinger:

1. **Select Repository**: Choose your GitHub repo `NahidDesigner/chat-bot-v1`

2. **Framework Detection**: If it shows an error, click "Configure manually" or "Advanced settings"

3. **Set Root Directory**: 
   - Look for "Root Directory" or "Working Directory" option
   - Set it to: `backend`

4. **Build Command**:
   ```
   npm install && npm run build
   ```
   (This will run from the `backend` directory)

5. **Start Command**:
   ```
   npm run start:prod
   ```
   (This will run from the `backend` directory)

6. **Node Version**: Select `18.x` or `20.x`

## Solution 2: Move Backend to Root (Alternative)

If Hostinger doesn't support subdirectories, you can restructure:

1. Move all `backend/` files to root
2. Update paths in configuration files
3. Push changes to Git

**However, Solution 1 is preferred** as it keeps the project structure clean.

## Solution 3: Use Express Framework Detection

Since NestJS is built on Express, you can try:

1. In Hostinger, manually select framework: **Express**
2. Set root directory: `backend`
3. Configure build/start commands manually

## Environment Variables

Don't forget to add all environment variables in Hostinger's settings:

- `NODE_ENV=production`
- `PORT=3000` (or Hostinger's assigned port)
- `SUPABASE_URL=...`
- `SUPABASE_SERVICE_KEY=...`
- `SUPABASE_DB_URL=...`
- `JWT_SECRET=...`
- `OPENAI_API_KEY=...`
- `QDRANT_URL=...`
- And all others from `backend/.env.production.example`

## Troubleshooting

If you still get errors:

1. **Check Root Directory**: Make sure it's set to `backend`
2. **Verify package.json**: Ensure `backend/package.json` exists and has build scripts
3. **Check Node Version**: Use Node 18 or 20
4. **Build Command**: Should run from `backend` directory
5. **Start Command**: Should point to `dist/main.js` or use `npm run start:prod`

## Contact Hostinger Support

If none of the above works, contact Hostinger support and tell them:
- You're deploying a NestJS application
- The backend code is in the `backend/` subdirectory
- You need to set the root directory to `backend`
- Build command: `npm install && npm run build`
- Start command: `npm run start:prod`

