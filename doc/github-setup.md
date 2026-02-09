# GitHub Workflows Setup Guide

Welcome! This guide will help you set up automated workflows for your Fusion application. These workflows automatically handle the boring stuff so you can focus on building great features.

## What You'll Get

By the end of this guide, you'll have a comprehensive set of automated workflows running:

1. **🔍 Pull Request Checks** - Automatically validates your code quality and builds affected apps when you create pull requests
2. **📦 Version Management** - Automatically updates version numbers and creates GitHub releases when you merge code
3. **🚀 On-Release Hook** - Automatically triggers when GitHub creates a release and schedules build and deployment
4. **🛠️ Build Automation** - Automatically builds and packages your applications for different environments
5. **🚀 Publish Automation** - Automatically deploys your packaged apps to configured environments

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

**What it does**: Every time you create a pull request, this workflow intelligently validates your code changes.

**Why you need it**: Instead of manually checking if your code builds and follows style guidelines, this workflow does it automatically with smart optimization based on PR status.

**What happens**:
- **Draft PRs**: Runs lightweight validation (lint and test checks only) - perfect for work-in-progress
- **Ready for Review PRs**: Runs full pipeline including app detection, building, and publishing to PR environment
- **Smart App Detection**: Only builds and deploys apps that have actually changed
- **Automatic Environment**: Creates temporary PR environments for testing your changes

> [!NOTE]
> **The magic**: Detects which specific apps changed using the **App Resolver** workflow, adjusts validation intensity based on whether PR is draft or ready, and provides detailed summaries showing which apps will be affected.

### 📦 **Version Management** ([`ci.yml`](../.github/workflows/ci.yml))

**What it does**: This workflow uses the Changesets action to automatically handle version numbers and GitHub releases.

**How it works**:
- **Checks for changesets**: The workflow runs `changesets/action` to detect if there are any changesets in your code
- **Creates release PR**: If changesets are found, it creates a new branch and opens a PR with version bumps and changelog updates
- **Creates GitHub release**: When the release PR is merged to main, the workflow creates a GitHub release
- **Smart draft protection**: Automatically converts release PRs back to draft if new changesets are added

**The Changesets action handles**:
- Detecting changesets in your repository
- Creating version bump PRs with proper changelog updates (titled "🤖 Bip Bop - Fusion Application Release")
- Creating GitHub releases when the release PR is merged
- Managing draft status to prevent incomplete releases

**Draft Protection Feature**: If you add new changesets to an existing release PR, the workflow automatically converts it back to draft. This prevents accidental merging of incomplete releases!

> [!NOTE]
> Want to learn more about Changesets? Check out our [Complete Changesets Guide](./working-with-changesets.md) for detailed instructions, best practices, and troubleshooting tips!

### 🚀 **On-Release Hook** ([`on-release.yml`](../.github/workflows/on-release.yml))

**What it does**: This workflow is triggered automatically when GitHub creates a release, and orchestrates the build and deployment process.

**Why you need it**: Instead of manually triggering deployments, this workflow automatically detects when you publish a release and starts the build and deployment process.

**What happens**:
- GitHub release is published → Workflow automatically triggers
- **Package extraction**: Uses a custom action to extract package name and path from the release tag
- **Build orchestration**: Calls the Build workflow with the extracted package information
- **Environment configuration**: Passes deployment environment settings to the build process
- **Release vs Preview**: Determines deployment strategy based on release type

> [!NOTE]
> **The magic**: It automatically parses release tags and uses a sophisticated extraction system to identify which app to build and deploy, then passes that information to the build pipeline.

### 🛠️ **Build Automation** ([`build.yml`](../.github/workflows/build.yml))

**What it does**: This workflow handles the building and packaging of your applications with sophisticated environment handling.

**Why you need it**: Building apps consistently across different environments is complex. This workflow handles all the details automatically!

**What happens**:
- **Snapshot builds**: For PR deployments, creates apps with snapshot versioning and unique timestamps
- **Release builds**: For production deployments, uses the exact version from package.json
- **Environment-aware**: Adapts build process based on target environment (CI, FQA, FPRD, etc.)
- **Artifact creation**: Packages your app into distributable bundles (app-bundle.zip)
- **Dependency management**: Handles all build dependencies and Node.js setup

> [!NOTE]
> **The magic**: It automatically determines whether to create snapshot or release versions based on the deployment context.

### 🚀 **Publish Automation** ([`publish.yml`](../.github/workflows/publish.yml))

**What it does**: This workflow takes built artifacts and deploys them to the configured Fusion environments.

**Why you need it**: Deploying to Fusion Framework requires specific authentication and configuration. This workflow handles all of that!

**What happens**:
- **Artifact retrieval**: Downloads the built app bundle from the build workflow
- **Environment authentication**: Uses Azure OpenID Connect for secure deployment
- **Fusion Framework deployment**: Publishes your app using the Fusion Framework CLI
- **Environment-specific configuration**: Adapts deployment parameters for each target environment
- **Deployment verification**: Ensures the deployment completed successfully

> [!NOTE]
> **The magic**: It uses modern security practices (OpenID Connect) and knows how to talk to the Fusion Framework deployment systems.

## Supporting Workflows

These workflows work behind the scenes to make the main workflows more efficient and intelligent:

### 🔦 **App Resolver** ([`app-resolver.yml`](../.github/workflows/app-resolver.yml))

**What it does**: Detects which applications in your monorepo have actually changed.

**Why it's important**: Instead of building and deploying all apps, this workflow identifies only the apps that need attention, saving time and resources.

**How it works**:
- Uses `equinor/fusion-action-app-change@v0` to analyze git changes
- Compares current changes against the base branch
- Outputs a list of changed apps with their names and paths
- Creates a summary table showing which apps will be affected

### 🧹 **Lint Validation** ([`lint-validation.yml`](../.github/workflows/lint-validation.yml))

**What it does**: Runs code linting and style checks using Biome and ReviewDog.

**When it runs**: Automatically triggered for draft pull requests to provide quick feedback.

**Features**:
- Uses ReviewDog for inline PR comments on linting issues
- Different reporting modes for draft vs. ready PRs
- Integrates with GitHub checks API for status reporting
- Provides actionable feedback directly in your PR

### 🧪 **Test Validation** ([`test-validation.yml`](../.github/workflows/test-validation.yml))

**What it does**: Runs your test suite to ensure code quality and functionality.

**When it runs**: Automatically triggered for draft pull requests alongside lint validation.

**Benefits**:
- Quick feedback on test failures during development
- Prevents broken code from reaching the full pipeline
- Optimized for rapid iteration during draft phase

## What You Need Before Starting

Before we start setting up your workflows, let's make sure you have everything you need:

### Must Have

> [!IMPORTANT]
> These are required before you can set up the workflows:
> - **A GitHub repository** with your Fusion app template code (you should already have this)
> - **Azure AD access** - You need permission to create service principals in your organization's Azure
> - **Fusion Framework access** - Your app needs to be registered in the Fusion Application Service

### Nice to Have

> [!NOTE]
> These will make the setup easier but aren't strictly required:
> - **Basic GitHub knowledge** - You don't need to be an expert, but knowing how to create PRs helps
> - **Application manifest configured** - Your `app.manifest.ts` file should have your app details
> - **Changesets set up** - If you want automatic versioning (we'll help with this if needed)

### Don't Worry If You Don't Have

> [!TIP]
> We'll help you with all of these during the setup process:
> - Deep knowledge of GitHub Actions (we'll explain everything)
> - Azure expertise (we'll walk you through it step by step)
> - Previous experience with CI/CD (that's why we're here!)

**Ready to start?** Great! Let's begin with the most important part - setting up authentication so your workflows can do their job.

## Setting Up Azure Authentication

Your workflows need permission to access Azure services to deploy your app. We've created a detailed guide to help you set up secure authentication.

> [!NOTE]
> **Complete Azure Setup Guide**: [Azure Authentication Setup](./azure-setup.md)

This guide covers:
- Creating an Azure App Registration
- Setting up federated credentials for GitHub
- Granting proper permissions for Fusion Framework
- Getting the credentials you need for GitHub

> [!NOTE]
> **Why this matters**: Instead of storing passwords (which can be stolen), we use a secure method called "OpenID Connect" that's much more secure.

> [!NOTE]
> **Time needed**: About 10-15 minutes

> [!NOTE]
> **What you'll get**: Three important values you'll need for the next step:
> - Application (client) ID
> - Directory (tenant) ID  
> - API Scope for Fusion Framework

Once you've completed the Azure setup, come back here to continue with GitHub configuration!

## Configuring GitHub

Now we need to tell GitHub about your Azure setup and create "environments" where your workflows can deploy your app.

### Step 1: Create Deployment Environments

Think of environments as different "rooms" where your app can live. You might have a CI room for testing, and production rooms for live apps.

1. **Go to Repository Settings**:
   - In your GitHub repository, click the "Settings" tab
   - Look for "Environments" in the left sidebar and click it

2. **Create Your Environments**:
   - Click "New environment"
   - Create these environments based on your needs:
     - **`ci`** - For continuous integration and PR testing (required)
     - **`fqa`** - For feature QA environment (optional)
     - **`fprd`** - For feature production environment (optional)

> [!TIP]
> The `ci` environment is used for PR deployments and testing. Start with this one and add others as your team grows!

### Step 2: Add Your Azure Information

Now we'll give your repository the Azure credentials your workflows need.

> [!IMPORTANT]
> These should be added as **Repository Variables**, not Environment Variables.

1. **Go to Repository Variables**:
   - In your repository, go to Settings > Secrets and variables > Actions
   - Click on the "Variables" tab
   - Click "New repository variable"

2. **Add these three variables**:

| Variable Name | What to Put | Example |
|---------------|-------------|---------|  
| `AZURE_SP_FUSION` | The Application ID from Azure | `12345678-1234-1234-1234-123456789012` |
| `AZURE_TENANT_ID` | The Directory ID from Azure | `87654321-4321-4321-4321-210987654321` |
| `AZURE_FUSION_SCOPE` | Your Fusion Framework API scope | `87654321-4321-4321-4321-21098765432/.default` |

3. **Click "Add variable"** after adding each one

> [!NOTE]
> **Why Repository Variables?** These values aren't secrets (they're identifiers), so they can be stored as variables rather than secrets. This also makes them available across all environments automatically.

> [!WARNING]
> **CRITICAL FOR AUTOMATIC RELEASES**: The version management workflow requires a Personal Access Token (PAT) to create GitHub releases automatically.

**Why you need this**: The `GITHUB_TOKEN` provided by GitHub Actions has limited permissions and cannot create releases. For automatic release creation, you need a Personal Access Token.

**What happens without PAT**:
- ❌ Automatic release creation fails
- ❌ You'll need to manually create releases
- ❌ Additional pipeline modifications required

**Setting up your PAT**:

1. **Create a Personal Access Token**:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a descriptive name like "Fusion App Releases"
   - Set expiration (recommend 1 year maximum for security)
   - Select these scopes:
     - `repo` (Full control of private repositories)
     - `write:packages` (Upload packages to GitHub packages)

2. **Add PAT to Repository Secrets**:
   - In your repository, go to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `PAT_TOKEN`
   - Value: Paste your generated PAT token
   - Click "Add secret"

> [!NOTE]
> Need help creating PAT tokens? Check the [official GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) for detailed steps.

> [!NOTE]
> **Alternative: Manual Release Process**
> 
> If you prefer not to use a PAT token, you can modify the workflow for manual releases:

1. **Edit the CI workflow** (`.github/workflows/ci.yml`):
   ```yaml
   # Change this line:
   env:
     GITHUB_TOKEN: ${{ secrets.PAT_TOKEN }}
   
   # To:
   env:
     GITHUB_TOKEN: ${{ github.token }}
   
   # And change:
   createGithubReleases: true
   
   # To:
   createGithubReleases: false
   ```

2. **Manual release process**:
   - Merge the release PR created by changesets
   - Manually create GitHub releases from the releases page
   - On-release workflow will still trigger automatically

### Step 4: Enable GitHub Actions

This is the final step to turn on your workflows!

1. **Go to the Actions Tab**:
   - In your repository, click the "Actions" tab
2. **Enable Workflows**:
   - You might see a message about enabling workflows
   - Click "I understand my workflows, go ahead and enable them"

> [!NOTE]
> **🎉 Congratulations!** Your workflows are now ready to help you. Let's test them out!

## Customizing Your Workflows

Your workflows are pretty smart out of the box, but you can customize them! Here are some common customizations:

### 🛠️ **Adding Custom Build Steps**

If your app needs special build steps, you can add them:

1. **Edit the build workflow**: Open `.github/workflows/build.yml`
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

1. **Edit the test validation workflow**: Open `.github/workflows/test-validation.yml`
2. **Customize the test commands**:
   ```yaml
   # The workflow already includes test execution
   # You can modify the test commands in this workflow
   - name: Run Tests
     run: pnpm test run
   ```

### 🌍 **Adding More Environments**

Want to deploy to more places? No problem!

1. **Edit the on-release workflow**: Open `.github/workflows/on-release.yml`
2. **Add your environments**:
   ```yaml
   # Find this line and add more environments
   environment: '["ci", "fqa", "fprd", "tr"]'
   ```

> [!IMPORTANT]
> The environments you add here must also be configured in your GitHub repository settings with the proper Azure credentials.

### 🤖 **Creating Custom Actions**

If you need a workflow to do something special, you can create a new action:

1. **Create a new folder**: `.github/workflows/actions/my-custom-action/`
2. **Add an action.yml file** with your custom logic
3. **Use it in your workflows** by referencing it

> [!TIP]
> Start with the defaults and only customize when you need something specific!

## Testing Everything Works

Time to see your workflows in action! Let's test each one to make sure they're working properly.

### 🔍 **Test 1: Pull Request Checks**

Let's see if your PR workflow is working:

1. **Create a test branch**:
   - Create a new branch: `git checkout -b test-my-workflow`
   - Make a small change (like adding a comment to a file in an app directory)
   - Commit and push: `git commit -m "test: testing my workflow" && git push origin test-my-workflow`

2. **Create a Draft Pull Request**:
   - Go to GitHub and create a **draft** PR from your test branch
   - Watch the "Actions" tab - you should see lightweight validation (lint and test)
   - Look for "🕵️‍♂️ PR Draft Detection" showing it detected the draft status

3. **Convert to Ready for Review**:
   - Click "Ready for review" on your PR
   - Watch the workflow change to full pipeline mode
   - You should see "🔦 App Resolver" detecting which apps changed
   - If apps were affected, you'll see build and publish workflows run

4. **Check the results**:
   - Look for green checkmarks ✅ (success) or red X ❌ (something needs fixing)
   - Check the PR summary for a table showing which apps were affected
   - If there's an error, click on it to see what went wrong

**Expected result**: 
> [!NOTE]
> Draft PRs run lightweight checks, ready PRs run full pipeline with app detection and deployment to PR environment!

### 📦 **Test 2: Version Management (Changesets)**

Now let's test the version workflow with Changesets:

1. **Create a changeset** (if you haven't already):
   - Run `pnpm changeset` in your terminal
   - Describe what changed (e.g., "Added new feature")
   - Choose the version bump type (patch, minor, major)
   - Commit the changeset: `git add . && git commit -m "Add changeset"`
   
> [!NOTE]
> Need help with changesets? See our [Complete Changesets Guide](./working-with-changesets.md) for detailed instructions!

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

**Expected result**: 
> [!NOTE]
> The workflow should create a release PR with version changes, and it should stay in draft if you add more changesets!

### 🚀 **Test 3: On-Release Hook and Build/Publish Automation**

Finally, let's test the complete release-to-deployment pipeline:

1. **Create a GitHub Release**:
   - Go to "Releases" in your repository
   - Click "Create a new release"
   - Use a tag that matches your app structure (the release workflow will auto-detect the app)
   - Add a release title and description
   - Click "Publish release"

2. **Watch the release hook**:
   - Check the "Actions" tab for the "🚀 On release" workflow
   - The workflow should use the extract-package-info action to identify the app
   - It should extract the app name and path from your repository structure

3. **Watch the build pipeline**:
   - The on-release workflow should call the "🛠️ Build Application" workflow
   - Look for the build workflow creating app bundles with release versioning
   - The workflow should create artifacts for deployment

4. **Watch the publish pipeline**:
   - The build workflow should trigger the "🚀 Publish Application" workflow
   - Your workflow should authenticate with Azure using OpenID Connect
   - The publish workflow should deploy your app to the configured environments!

**Expected result**: 
> [!NOTE]
> The release hook should detect your app, trigger the build pipeline to create release packages, and then publish them to your configured Fusion environments!

### 🎉 Success!

> [!TIP]
> If all tests worked, congratulations! Your workflows are now your helpful development assistants. If something didn't work, don't worry - we'll help you fix it in the next section.

## When Things Go Wrong

Don't panic! Even workflows can have issues. Here are the most common problems and how to fix them:

### 🔐 **"Authentication failed" or "Invalid client"**

> [!NOTE]
> **What this means**: Your workflow can't authenticate with Azure or Fusion.

**How to fix it**:
1. **Double-check your variables**: Make sure `AZURE_SP_FUSION` and `AZURE_TENANT_ID` are exactly right (no extra spaces!)
2. **Check the federated credentials**: Go back to Azure and make sure the GitHub repository name matches exactly
3. **Verify scope**: Make sure `AZURE_FUSION_SCOPE` is correct (ask your team if you're not sure)
4. **Check permissions**: Go to Azure and make sure your app registration has the right permissions for Fusion Framework
5. **Verify admin consent**: Make sure someone with admin rights clicked "Grant admin consent"
6. **Wait a few minutes**: Sometimes it takes a moment for changes to take effect

### 🏗️ **"Build failed" or "Package not found"**

> [!NOTE]
> **What this means**: Your workflow can't build your app.

**How to fix it**:
1. **Check your dependencies**: Make sure `pnpm install` works locally
2. **Check your build script**: Make sure `package.json` has a "build" script
3. **Check the working directory**: Make sure the workflow is looking in the right folder
4. **Check app detection**: Ensure your changes are in an app directory that the app resolver can detect

### 📦 **"Changeset not found" or "Version PR not created"**

> [!NOTE]
> **What this means**: Your version workflow can't find any changesets to work with.

**How to fix it**:
1. **Initialize changesets**: Run `pnpm changeset init` in your repository
2. **Check for changeset files**: Look for a `.changeset` folder with files in it
3. **Create a changeset**: Run `pnpm changeset` to create your first changeset
4. **Make sure changesets are committed**: Changesets need to be committed and pushed to main

> [!NOTE]
> Need more help? Check our [Complete Changesets Guide](./working-with-changesets.md) for detailed troubleshooting and best practices!

### 🔑 **"Error creating release" or "Bad credentials"**

> [!NOTE]
> **What this means**: The automatic release creation is failing due to PAT token issues.

**How to fix it**:
1. **Check PAT token exists**: Go to Settings > Secrets and verify `PAT_TOKEN` is set
2. **Verify PAT permissions**: Make sure your PAT has `repo` and `write:packages` scopes
3. **Check PAT expiration**: Personal access tokens expire - create a new one if expired
4. **Test PAT locally**: Use `gh auth login --with-token < your-pat` to verify it works

> [!NOTE]
> **Alternative solution**: Switch to manual release process by modifying the CI workflow as described in the PAT token section above.

### 🔄 **"Release PR keeps going back to draft"**

> [!TIP]
> **What this means**: This is actually normal! The workflow is protecting you from incomplete releases.

> [!NOTE]
> **Why this happens**:
> - You added a new changeset to the release PR
> - The workflow detected this and converted it back to draft
> - This prevents accidental merges of incomplete releases

**How to fix it**:
1. **Wait until you're done adding changesets**
2. **Mark the release PR as ready for review** when you're satisfied
3. **Merge the release PR** to trigger publishing

> [!TIP]
> This is a feature, not a bug! It ensures you don't accidentally publish incomplete releases.

### 🆘 Still Stuck?

> [!NOTE]
> **Don't worry!** Here are some places to get help:
> 
> - **Check the logs**: Click on the failed workflow in GitHub Actions to see detailed error messages
> - **Ask your team**: Someone else might have seen this before
> - **GitHub Actions docs**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
> - **Azure setup guide**: [Azure OIDC setup](https://docs.github.com/en/actions/deployment/security/hardening-your-deployments/configuring-openid-connect-in-azure)
> - **Fusion Framework docs**: [Fusion Framework CLI](https://equinor.github.io/fusion-framework/cli/docs/application.html)

### 🎯 **Pro Tips for Success**

- **Start simple**: Get the basic setup working before adding customizations
- **Test often**: Make small changes and test them frequently
- **Read the logs**: The error messages usually tell you exactly what's wrong
- **Ask for help**: There's no shame in asking questions!

> [!TIP]
> **Remember**: Every developer runs into these issues. You're not alone, and you'll get through this! 🚀
