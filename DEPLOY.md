# Deploying Wallify to Vercel

This guide will walk you through deploying your Wallify app to Vercel, making it accessible online to anyone.

## Prerequisites

1. A [GitHub](https://github.com) account
2. A [Vercel](https://vercel.com) account (you can sign up with your GitHub account)

## Step 1: Prepare Your Code

Make sure your code is ready for deployment:

- The HTML, CSS, and JavaScript files should be in the root directory
- The API files should be in the `/api` directory
- The `vercel.json` configuration file should be properly set up

## Step 2: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Initialize Git in your project (if not already done):
   ```
   git init
   ```
3. Add your files:
   ```
   git add .
   ```
4. Commit your changes:
   ```
   git commit -m "Initial commit for Wallify"
   ```
5. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/wallify.git
   ```
6. Push your code:
   ```
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option 1: Deploy through the Vercel Dashboard (Recommended for beginners)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." and select "Project"
4. Select your GitHub repository
5. Vercel will automatically detect your project settings
6. Click "Deploy"

### Option 2: Deploy using the Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
2. Login to Vercel:
   ```
   vercel login
   ```
3. From your project directory, deploy:
   ```
   vercel
   ```
4. Follow the prompts. When asked about the settings, the default ones should work.
5. For production deployment, use:
   ```
   vercel --prod
   ```

## Step 4: Access Your Deployed App

After the deployment is complete, Vercel will provide you with a URL where your app is hosted, such as:
```
https://wallify-yourusername.vercel.app
```

You can share this URL with anyone to access your Wallify app!

## Important Notes

1. **In-memory Storage**: The current implementation uses in-memory storage for the API, which means data will be reset whenever the serverless functions restart. For a production app, consider using a database like MongoDB, Fauna, or Supabase.

2. **Environment Variables**: If you need to use API keys or other secrets, use Vercel's environment variables feature in the project settings.

3. **Custom Domain**: You can configure a custom domain in the Vercel dashboard if you own one.

## Troubleshooting

If you encounter any issues with your deployment:

1. Check the Vercel deployment logs in the dashboard
2. Ensure your `vercel.json` configuration is correct
3. Make sure your API endpoints are properly structured

Need more help? Visit [Vercel's documentation](https://vercel.com/docs) or [contact support](https://vercel.com/help). 