/**
 * Hostinger Entry Point
 * This file serves as the entry point for Hostinger's Node.js Web Apps
 * It simply imports and runs the compiled NestJS application
 */

// Check if the built application exists
const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, 'backend', 'dist', 'main.js');

if (!fs.existsSync(distPath)) {
  console.error('ERROR: Application not built. Please run: npm run build');
  console.error('Expected file:', distPath);
  process.exit(1);
}

// Import and run the NestJS application
// Note: This will work after the build step creates backend/dist/main.js
try {
  require(distPath);
} catch (error) {
  console.error('ERROR: Failed to start application:', error.message);
  console.error('Make sure you have run: npm run build');
  process.exit(1);
}

