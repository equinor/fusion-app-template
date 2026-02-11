# GitHub Workflows Setup Guide

Welcome! This guide walks you through setting up automated workflows for your Fusion application.

## What You Need Before Starting

Check that you have these essentials:

### ✅ Required
- **GitHub repository** with your Fusion app code
- **Azure AD access** - Permission to create service principals in your organization  
- **Fusion Framework access** - Your app registered in Fusion Application Service

### ℹ️ Nice to Have
- Basic GitHub knowledge (creating PRs)
- Configured `app.manifest.ts`

**Setup time**: 20-30 minutes

---

## Table of Contents

1. [What You Need Before Starting](#what-you-need-before-starting)
2. [Setting Up Azure Authentication](#setting-up-azure-authentication)
3. [Configuring GitHub](#configuring-github)
4. [Your Workflows at a Glance](#your-workflows-at-a-glance)
5. [Testing Everything Works](#testing-everything-works)
6. [Troubleshooting](#troubleshooting)

**See also:**
- [Azure Authentication Setup](./azure-setup.md) - Detailed Azure steps
- [Working with Changesets](./working-with-changesets.md) - Version management guide

---

## Setting Up Azure Authentication

Your workflows need Azure permissions to deploy. Follow the [detailed Azure Authentication Setup](./azure-setup.md) to:
- Create an Azure App Registration
- Set up federated credentials for GitHub  
- Grant permissions for Fusion Framework

**You'll get these values to use in GitHub**:
- Application (client) ID
- Directory (tenant) ID
- API Scope URL

---

## Configuring GitHub

### 1️⃣ Create Deployment Environments

Go to **Settings > Environments** and create:
- **`ci`** (required) - For PR testing and preview deployments
- **`fqa`** (optional) - Feature QA environment
- **`fprd`** (optional) - Feature production environment

### 2️⃣ Add Azure Credentials

Go to **Settings > Secrets and variables > Actions > Variables** and add:

| Name | Value |
|------|-------|
| `AZURE_SP_FUSION` | Application ID |
| `AZURE_TENANT_ID` | Directory ID |
| `AZURE_FUSION_SCOPE` | API Scope URL |

> [!NOTE]
> These are stored as Variables, not Secrets (they're not sensitive identifiers)

### 3️⃣ Add Personal Access Token (PAT)

Go to **Settings > Secrets and variables > Actions > Secrets** and add:

| Name | Value |
|------|-------|
| `PAT_TOKEN` | [Create a GitHub PAT](https://github.com/settings/tokens) with `repo` + `write:packages` scopes |

> [!NOTE]
> Needed for automatic GitHub release creation. [Alternative: Use manual releases](./working-with-changesets.md)

### 4️⃣ Enable GitHub Actions

Go to **Actions** tab and enable workflows if prompted.

---

## Your Workflows at a Glance

| Workflow | Purpose |
|----------|---------|
| **Pull Request** | Draft PRs: fast checks only. Ready PRs: full build + preview deploy |
| **Version Management** | Detects changesets → creates release PR → publishes release |
| **On-Release** | Triggered by GitHub release → builds and deploys to environments |
| **Build** | Compiles app with PR (snapshot) or release versioning |
| **Publish** | Deploys built app to Fusion environments via Azure auth |
| **App Resolver** | Detects which apps changed, triggers parallel builds |

For detailed info on each, see [Azure Authentication Setup](./azure-setup.md) and [Changesets Guide](./working-with-changesets.md).

---

## Testing Everything Works

### Test 1: Pull Request Flow
```bash
git checkout -b test-pr
# Make a small change in apps/*/...
git push origin test-pr
```
- Create **draft** PR → See lightweight checks (lint + test)
- Click "Ready for review" → Workflow runs full build + app detection
- Check **Actions** tab for ✅ or ❌

### Test 2: Version Management
```bash
pnpm changeset
# Follow prompts, commit the changeset
```
- Push to main via PR
- CI workflow creates release PR: "🤖 Bip Bop - My Apps Release"
- Merge release PR → Automatic GitHub release

### Test 3: Deployment
- Go to **Releases** > Create release
- Publish → Watch on-release, build, and publish workflows

---

## Troubleshooting

### Authentication Errors

**"Invalid client" / "Authentication failed"**

Check:
- Variables exactly match Azure (no spaces): `AZURE_SP_FUSION`, `AZURE_TENANT_ID`
- Federated credentials in Azure: GitHub repo name matches exactly
- Scope is correct for your org
- App registration has Fusion permissions
- Admin consent was granted

### Build / App Detection Issues

**"Package not found" / "Build failed"**

Check:
- `pnpm install` works locally
- `package.json` has a `build` script
- Changes are in an `apps/*/` directory

### Changeset / Version Issues

**"No changesets found" / Release PR not created**

Check with:
```bash
pnpm changeset status
```

This shows:
- ✅ Unreleased packages
- ✅ Detected version bumps
- ❌ Validation errors (typos, format issues)

**Common problems**:
- Package name typo in `.changeset/*.md` (must match `package.json` exactly)
- Invalid version type (use: `major`, `minor`, or `patch`)
- Missing YAML delimiters `---`
- Not committed to git before merging to main

**Fix**: Delete malformed changesets in `.changeset/` folder and create new ones: `pnpm changeset`

**If builds fail after changesets merge**:
1. Run `pnpm changeset status` to see validation errors
2. Check workflow logs for package mismatches
3. Verify `.changeset/` folder has valid files

### Release Issues

**"Error creating release" / "Bad credentials"**

Check:
- `PAT_TOKEN` exists in Secrets
- Token has correct scopes (`repo`, `write:packages`)
- Token not expired

**Release PR stays in draft?** → This is normal! Workflow auto-reverts to draft when new changesets added (prevents incomplete releases). Finish changesets, mark "Ready for review", then merge.

---

## Need More Help?

- **Detailed Azure setup**: [Azure Authentication Setup](./azure-setup.md)
- **Changesets guide**: [Working with Changesets](./working-with-changesets.md)
- **GitHub Actions docs**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Check workflow logs**: Click failed workflow in **Actions** tab for error details

> [!TIP]
> Run `pnpm changeset status` when debug builds or release issues - it shows exactly what went wrong!
