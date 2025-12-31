/**
 * PM2 Ecosystem Config (Optional - for advanced deployments)
 * Not required for Hostinger, but useful if you need PM2
 */
module.exports = {
  apps: [
    {
      name: 'ai-chatbot-backend',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};

