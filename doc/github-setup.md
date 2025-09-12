# GitHub Workflows Setup Guide

Welcome! This guide will help you set up automated workflows for your Fusion application. These workflows automatically handle the boring stuff so you can focus on building great features.

## What You'll Get

By the end of this guide, you'll have four powerful workflows running:

1. **🔍 Pull Request Checks** - Automatically checks your code quality and builds your app when you create pull requests
2. **📦 Version Management** - Automatically updates version numbers and publishes packages when you merge code
3. **🚀 On-Release Hook** - Automatically triggers when GitHub creates a release and schedules deployment
4. **🚀 Deployment Automation** - Automatically deploys your app to different environments when you're ready

## Table of Contents

1. [Understanding Your Workflows](#understanding-your-workflows)
2. [What You Need Before Starting](#what-you-need-before-starting)
3. [Setting Up Azure Authentication](#setting-up-azure-authentication)
4. [Configuring GitHub](#configuring-github)
5. [Customizing Your Workflows](#customizing-your-workflows)
6. [Testing Everything Works](#testing-everything-works)
7. [When Things Go Wrong](#when-things-go-wrong)

## Additional Guides

- **[Azure Authentication Setup](./azure-setup.md)** - Complete guide for setting up Azure authentication
- **[Changesets Guide](./working-with-changesets.md)** - Detailed guide for version management with Changesets

## Understanding Your Workflows

Let's explore the four workflows that will automate your development process!

### 🔍 **Pull Request Checks** ([`pr.yml`](../.github/workflows/pr.yml))

**What it does**: Every time you create a pull request, this workflow automatically checks your code.

**Why you need it**: Instead of manually checking if your code builds and follows style guidelines, this workflow does it automatically. It's like having a code reviewer that never sleeps!

**What happens**:
- When you create a PR → Workflow checks your code quality
- When you mark PR as "ready for review" → Workflow runs more thorough checks
- When you push new commits → Workflow re-checks everything
- If something's wrong → Workflow tells you exactly what to fix

**The magic**: It's smart enough to know the difference between a draft PR (where you're still working) and a ready PR (where you want thorough checking).

### 📦 **Version Management** ([`ci.yml`](../.github/workflows/ci.yml))

**What it does**: This workflow uses the Changesets action to automatically handle version numbers and publishing.

**How it works**:
- **Checks for changesets**: The workflow runs `changesets/action` to detect if there are any changesets in your code
- **Creates release PR**: If changesets are found, it creates a new branch and opens a PR with version bumps and changelog updates
- **Creates GitHub release**: When the release PR is merged to main, the workflow creates a GitHub release

**The Changesets action handles**:
- Detecting changesets in your repository
- Creating version bump PRs with proper changelog updates
- Creating GitHub releases when the release PR is merged
- Managing draft status to prevent incomplete releases

**📚 Want to learn more about Changesets?** Check out our [Complete Changesets Guide](./working-with-changesets.md) for detailed instructions, best practices, and troubleshooting tips!

### 🚀 **On-Release Hook** ([`on-release.yml`](../.github/workflows/on-release.yml))

**What it does**: This workflow is triggered automatically when GitHub creates a release, and schedules a job for deployment.

**Why you need it**: Instead of manually triggering deployments, this workflow automatically detects when you publish a release and starts the deployment process.

**What happens**:
- You create a GitHub release → Workflow automatically triggers
- Workflow extracts package name and version from the release tag
- Workflow schedules the deployment job with the extracted information
- Workflow determines the correct deployment tag (preview vs latest) based on release type

**The magic**: It automatically parses release tags in the format `package-name@version` and passes the information to the deployment workflow.

### 🌈 **Deployment Automation** ([`deploy.yml`](../.github/workflows/deploy.yml))

**What it does**: This workflow handles the actual building and deploying of your application to different environments.

**Why you need it**: Deploying apps manually is time-consuming and error-prone. This workflow makes it one-click easy!

**What happens**:
- Receives package name and version from the on-release hook
- Workflow builds your app using Fusion Framework tools
- Workflow deploys to your chosen environments (like staging, production)
- Workflow makes sure everything is configured correctly for each environment

**The magic**: It knows how to talk to the Fusion Framework and can deploy to multiple environments automatically.

## What You Need Before Starting

Before we start setting up your workflows, let's make sure you have everything you need:

### ✅ **Must Have**
- **A GitHub repository** with your Fusion app template code (you should already have this)
- **Azure AD access** - You need permission to create service principals in your organization's Azure
- **Fusion Framework access** - Your app needs to be registered in the Fusion Application Service

### 📋 **Nice to Have**
- **Basic GitHub knowledge** - You don't need to be an expert, but knowing how to create PRs helps
- **Application manifest configured** - Your `app.manifest.ts` file should have your app details
- **Changesets set up** - If you want automatic versioning (we'll help with this if needed)

### 🤔 **Don't Worry If You Don't Have**
- Deep knowledge of GitHub Actions (we'll explain everything)
- Azure expertise (we'll walk you through it step by step)
- Previous experience with CI/CD (that's why we're here!)

**Ready to start?** Great! Let's begin with the most important part - setting up authentication so your workflows can do their job.

## Setting Up Azure Authentication

Your workflows need permission to access Azure services to deploy your app. We've created a detailed guide to help you set up secure authentication.

**📚 Complete Azure Setup Guide**: [Azure Authentication Setup](./azure-setup.md)

This guide covers:
- Creating an Azure App Registration
- Setting up federated credentials for GitHub
- Granting proper permissions for Fusion Framework
- Getting the credentials you need for GitHub

**Why this matters**: Instead of storing passwords (which can be stolen), we use a secure method called "OpenID Connect" that's much more secure.

**⏱️ Time needed**: About 10-15 minutes

**🔑 What you'll get**: Three important values you'll need for the next step:
- Application (client) ID
- Directory (tenant) ID  
- API Scope for Fusion Framework

Once you've completed the Azure setup, come back here to continue with GitHub configuration!

## Configuring GitHub

Now we need to tell GitHub about your Azure setup and create "environments" where your workflows can deploy your app.

### Step 1: Create Deployment Environments

Think of environments as different "rooms" where your app can live. You might have a testing room, a staging room, and a production room.

1. **Go to Repository Settings**:
   - In your GitHub repository, click the "Settings" tab
   - Look for "Environments" in the left sidebar and click it
2. **Create Your Environments**:
   - Click "New environment"
   - Create these environments (you can add more later):
     - **`CI`** - For continuous integration (testing)
     - **`FQA`** - For feature QA (optional, for testing features)
     - **`FPRD`** - For feature production (optional, for production)

**💡 Pro tip**: Start with just `CI` for now. You can always add more environments later!

### Step 2: Add Your Azure Information

Now we'll give each environment the Azure credentials your workflows need.

1. **For each environment you created**:
   - Click on the environment name
   - Click "Environment variables" in the left menu
   - Click "Add variable" and add these three:

| Variable Name | What to Put | Example |
|---------------|-------------|---------|
| `AZURE_CLIENT_ID` | The Application ID from Azure | `12345678-1234-1234-1234-123456789012` |
| `AZURE_TENANT_ID` | The Directory ID from Azure | `87654321-4321-4321-4321-210987654321` |
| `APP_PUBLISH_SCOPE` | Your Fusion Framework API scope | `87654321-4321-4321-4321-21098765432/.default` |

2. **Click "Save"** after adding each variable

### Step 3: Enable GitHub Actions

This is the final step to turn on your workflows!

1. **Go to the Actions Tab**:
   - In your repository, click the "Actions" tab
2. **Enable Workflows**:
   - You might see a message about enabling workflows
   - Click "I understand my workflows, go ahead and enable them"

**🎉 Congratulations!** Your workflows are now ready to help you. Let's test them out!

## Customizing Your Workflows

Your workflows are pretty smart out of the box, but you can customize them! Here are some common customizations:

### 🛠️ **Adding Custom Build Steps**

If your app needs special build steps, you can add them:

1. **Edit the build action**: Open `.github/workflows/actions/build-packages/action.yml`
2. **Add your custom steps**:
   ```yaml
   # Add this after the existing build steps
   - name: Custom build step
     run: |
       echo "Running my special build logic..."
       # Your custom commands here
   ```

### 🧪 **Adding Tests**

Want your workflow to run tests? Easy!

1. **Edit the PR workflow**: Open `.github/workflows/pr.yml`
2. **Uncomment the test lines**:
   ```yaml
   # Find these lines and remove the # to uncomment them
   - name: Run Tests
     run: pnpm test run
   
   - name: Generate Test Coverage Report
     if: steps.draft-check.outputs.is-draft == 'false'
     run: pnpm test:coverage
   ```

### 🌍 **Adding More Environments**

Want to deploy to more places? No problem!

1. **Edit the CI workflow**: Open `.github/workflows/ci.yml`
2. **Add your environments**:
   ```yaml
   # Find this line and add more environments
   environment: ['CI', 'FQA', 'FPRD', 'STAGING', 'PRODUCTION']
   ```

### 🤖 **Creating Custom Actions**

If you need a workflow to do something special, you can create a new action:

1. **Create a new folder**: `.github/workflows/actions/my-custom-action/`
2. **Add an action.yml file** with your custom logic
3. **Use it in your workflows** by referencing it

**💡 Pro tip**: Start with the defaults and only customize when you need something specific!

## Testing Everything Works

Time to see your workflows in action! Let's test each one to make sure they're working properly.

### 🔍 **Test 1: Pull Request Checks**

Let's see if your PR workflow is working:

1. **Create a test branch**:
   - Create a new branch: `git checkout -b test-my-workflow`
   - Make a small change (like adding a comment to a file)
   - Commit and push: `git commit -m "test: testing my workflow" && git push origin test-my-workflow`

2. **Create a Pull Request**:
   - Go to GitHub and create a PR from your test branch
   - Watch the "Actions" tab - you should see your PR workflow spring into action!

3. **Check the results**:
   - Look for a green checkmark ✅ (success) or red X ❌ (something needs fixing)
   - If there's an error, click on it to see what went wrong

**Expected result**: Your workflow should run linting and building, and tell you if everything looks good!

### 📦 **Test 2: Version Management (Changesets)**

Now let's test the version workflow with Changesets:

1. **Create a changeset** (if you haven't already):
   - Run `pnpm changeset` in your terminal
   - Describe what changed (e.g., "Added new feature")
   - Choose the version bump type (patch, minor, major)
   - Commit the changeset: `git add . && git commit -m "Add changeset"`
   
   **💡 Need help with changesets?** See our [Complete Changesets Guide](./working-with-changesets.md) for detailed instructions!

2. **Merge your test PR**:
   - If the PR looks good, merge it to main
   - Go to the "Actions" tab again

3. **Watch the Changesets magic**:
   - You should see the CI workflow running
   - The workflow will create a new "release" branch
   - It will open a PR with version bumps (look for "🤖 Bip Bop - My Apps Release")
   - The release PR will be in draft mode initially

4. **Test the smart draft conversion**:
   - Add another changeset to the release PR
   - The workflow should automatically convert it back to draft
   - This prevents accidental merges of incomplete releases!

**Expected result**: The workflow should create a release PR with version changes, and it should stay in draft if you add more changesets!

### 🚀 **Test 3: On-Release Hook and Deployment Automation**

Finally, let's test both the release hook and deployment workflows:

1. **Create a GitHub Release**:
   - Go to "Releases" in your repository
   - Click "Create a new release"
   - Use the tag format: `your-app@1.0.0` (replace `your-app` with your actual app name)
   - Click "Publish release"

2. **Watch the release hook**:
   - Check the "Actions" tab for the release workflow
   - The release workflow should extract package name and version from the tag
   - It should then trigger the deployment workflow

3. **Watch the deployment**:
   - The deployment workflow should receive the package information
   - Your workflow should build and deploy your app!

**Expected result**: The release hook should extract the package information and trigger the deployment workflow, which should deploy your app to your configured environments!

### 🎉 **Success!**

If all tests worked, congratulations! Your workflows are now your helpful development assistants. If something didn't work, don't worry - we'll help you fix it in the next section.

## When Things Go Wrong

Don't panic! Even workflows can have issues. Here are the most common problems and how to fix them:

### 🔐 **"Authentication failed" or "Invalid client"**

**What this means**: Your workflow can't log into Azure.

**How to fix it**:
1. **Double-check your numbers**: Make sure `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` are exactly right (no extra spaces!)
2. **Check the federated credentials**: Go back to Azure and make sure the GitHub repository name matches exactly
3. **Wait a few minutes**: Sometimes it takes a moment for changes to take effect

### 🚫 **"FUSION_TOKEN not found" or "Authentication required"**

**What this means**: Your workflow can't access the Fusion Framework.

**How to fix it**:
1. **Check your scope**: Make sure `APP_PUBLISH_SCOPE` is correct (ask your team if you're not sure)
2. **Verify permissions**: Go to Azure and make sure your app registration has the right permissions
3. **Check admin consent**: Make sure someone with admin rights clicked "Grant admin consent"

### 🏗️ **"Build failed" or "Package not found"**

**What this means**: Your workflow can't build your app.

**How to fix it**:
1. **Check your dependencies**: Make sure `pnpm install` works locally
2. **Check your build script**: Make sure `package.json` has a "build" script
3. **Check the working directory**: Make sure the workflow is looking in the right folder

### 📦 **"Changeset not found" or "Version PR not created"**

**What this means**: Your version workflow can't find any changesets to work with.

**How to fix it**:
1. **Initialize changesets**: Run `pnpm changeset init` in your repository
2. **Check for changeset files**: Look for a `.changeset` folder with files in it
3. **Create a changeset**: Run `pnpm changeset` to create your first changeset
4. **Make sure changesets are committed**: Changesets need to be committed and pushed to main

**📚 Need more help?** Check our [Complete Changesets Guide](./working-with-changesets.md) for detailed troubleshooting and best practices!

### 🔄 **"Release PR keeps going back to draft"**

**What this means**: This is actually normal! The workflow is protecting you from incomplete releases.

**Why this happens**:
- You added a new changeset to the release PR
- The workflow detected this and converted it back to draft
- This prevents accidental merges of incomplete releases

**How to fix it**:
1. **Wait until you're done adding changesets**
2. **Mark the release PR as ready for review** when you're satisfied
3. **Merge the release PR** to trigger publishing

**💡 Pro tip**: This is a feature, not a bug! It ensures you don't accidentally publish incomplete releases.

### 🆘 **Still Stuck?**

**Don't worry!** Here are some places to get help:

- **Check the logs**: Click on the failed workflow in GitHub Actions to see detailed error messages
- **Ask your team**: Someone else might have seen this before
- **GitHub Actions docs**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Azure setup guide**: [Azure OIDC setup](https://docs.github.com/en/actions/deployment/security/hardening-your-deployments/configuring-openid-connect-in-azure)
- **Fusion Framework docs**: [Fusion Framework CLI](https://equinor.github.io/fusion-framework/cli/docs/application.html)

### 🎯 **Pro Tips for Success**

- **Start simple**: Get the basic setup working before adding customizations
- **Test often**: Make small changes and test them frequently
- **Read the logs**: The error messages usually tell you exactly what's wrong
- **Ask for help**: There's no shame in asking questions!

**Remember**: Every developer runs into these issues. You're not alone, and you'll get through this! 🚀
