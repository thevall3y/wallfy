/**
 * This script helps deploy your application to Vercel with MongoDB
 * It sets up the environment variables properly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read existing .env file if it exists
let envVars = {};
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  }
} catch (err) {
  console.log('No .env file found or error reading it');
}

// Main function
async function deploy() {
  try {
    // Check if vercel is installed
    try {
      execSync('vercel --version', { stdio: 'inherit' });
    } catch (error) {
      console.log('Installing Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }

    // Check Vercel login status
    try {
      execSync('vercel whoami', { stdio: 'pipe' });
    } catch (error) {
      console.log('Please log in to Vercel:');
      execSync('vercel login', { stdio: 'inherit' });
    }

    // MongoDB URI from .env or ask user
    let mongodbUri = envVars.MONGODB_URI;
    
    if (!mongodbUri) {
      console.log('MongoDB URI not found in .env file.');
      mongodbUri = await new Promise(resolve => {
        rl.question('Enter your MongoDB connection string: ', answer => {
          resolve(answer);
        });
      });
    } else {
      console.log('Found MongoDB URI in .env file.');
      const confirm = await new Promise(resolve => {
        rl.question('Use this MongoDB URI? (Y/n): ', answer => {
          resolve(answer.toLowerCase() !== 'n');
        });
      });
      
      if (!confirm) {
        mongodbUri = await new Promise(resolve => {
          rl.question('Enter your MongoDB connection string: ', answer => {
            resolve(answer);
          });
        });
      }
    }

    // Deploy to Vercel
    console.log('Deploying to Vercel...');
    const deployCommand = `vercel --env MONGODB_URI="${mongodbUri}"`;
    execSync(deployCommand, { stdio: 'inherit' });

    console.log('\nDeployment complete!');
    console.log('To deploy to production, run:');
    console.log(`vercel --prod --env MONGODB_URI="${mongodbUri}"`);
  } catch (error) {
    console.error('Error during deployment:', error.message);
  } finally {
    rl.close();
  }
}

// Run the deploy function
deploy(); 