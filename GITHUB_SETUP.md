# Setting Up Your GitHub Repository

Follow these steps to create a GitHub repository for your Task Manager App:

## 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Fill in the repository details:
   - Repository name: `task-manager-app` (or any name you prefer)
   - Description: "A full-stack task management application built with Next.js, Express, and PostgreSQL"
   - Visibility: Public or Private (your choice)
   - Do NOT initialize with README, .gitignore, or license (since you already have these files)
4. Click "Create repository"

## 2. Initialize Git in Your Local Project

Navigate to your project directory and initialize Git:

```bash
cd /Users/bengur/src/task-manager-app
git init
```

## 3. Add Your Files to Git

```bash
# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Full-stack Task Manager App"
```

## 4. Connect Your Local Repository to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/task-manager-app.git

# Push your code to GitHub
git push -u origin main
```

Note: If your default branch is named `master` instead of `main`, use:

```bash
git push -u origin master
```

## 5. Verify Your Repository

Go to `https://github.com/YOUR_USERNAME/task-manager-app` to see your code on GitHub.

## Additional Tips

### .gitignore

The project already includes appropriate .gitignore files, but make sure they exclude:

- Node modules: `node_modules/`
- Environment files: `.env`
- Build directories: `.next/`, `build/`, `dist/`
- Database files: `*.db`

### Environment Variables

Remember that your `.env` files are not pushed to GitHub (for security reasons). You'll need to:

1. Create a `.env.example` file with the structure but not the actual values
2. Document the required environment variables in your README

### GitHub Actions (Optional)

Consider setting up GitHub Actions for CI/CD:

1. Create a `.github/workflows` directory
2. Add workflow files for testing and deployment
3. Configure automatic deployment to Vercel/Railway

### Collaborating

To add collaborators:
1. Go to your repository on GitHub
2. Click "Settings" > "Manage access"
3. Click "Invite a collaborator" and enter their GitHub username or email
