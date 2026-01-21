# GitHub Token Setup for Vercel

## Overview

Admin panel now uses GitHub API to commit changes directly to the repository. This requires a GitHub token to be added to Vercel environment variables.

## Setup Steps

### 1. Add Environment Variable to Vercel

1. Go to Vercel project dashboard: https://vercel.com/multimediadrws-projects/drwfoundation

2. Click **Settings** tab

3. Click **Environment Variables** in the left sidebar

4. Click **Add New** button

5. Fill in:
   - **Key**: `GITHUB_TOKEN`
   - **Value**: `<your-github-token>` (Get from Vercel team admin)
   - **Environments**: Select all (Production, Preview, Development)

6. Click **Save**

### 2. Redeploy

After adding the environment variable:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button
4. Or push a new commit to trigger automatic deployment

## How It Works

When admin saves an article or laporan:

1. API receives the save request
2. Uses GitHub API with the token to commit changes
3. File is updated directly in the repository
4. Changes are immediately visible in GitHub
5. Next deployment will include the changes

## Benefits

✅ **Persistent**: Changes committed to Git repository  
✅ **Version Control**: Full Git history of all edits  
✅ **No Database Needed**: Uses GitHub as storage  
✅ **Automatic Backups**: Git provides version history  
✅ **Free**: No additional costs  

## Testing

After setup:

1. Login to admin panel
2. Edit an article or laporan
3. Click "Simpan"
4. Check GitHub repository - new commit should appear
5. Changes are permanent and versioned

## Security Note

The GitHub token has write access to the repository. Keep it secure:
- ✅ Added to Vercel environment variables (secure)
- ✅ Not committed to repository (.env.local in .gitignore)
- ❌ Never share the token publicly

## Token Permissions

The token needs these permissions:
- `repo` - Full control of private repositories
- Allows reading and writing files via GitHub API

## Troubleshooting

### Error: "Failed to commit to GitHub"

**Possible causes:**
1. GitHub token not set in Vercel
2. Token expired or invalid
3. No write permissions

**Solution:**
- Verify token is added to Vercel environment variables
- Check token has `repo` scope
- Redeploy after adding token

### Error: "Authentication failed"

**Possible causes:**
1. Token not loaded in environment
2. Token format incorrect

**Solution:**
- Ensure token starts with `ghu_` or `ghp_`
- Verify no extra spaces in environment variable
- Redeploy to reload environment variables
