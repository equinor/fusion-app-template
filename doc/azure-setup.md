# Azure Authentication Setup Guide

This guide will help you set up secure authentication between your GitHub workflows and Azure services. This is required for your workflows to deploy applications to the Fusion Framework.

## What You'll Learn

By the end of this guide, you'll have:
- A secure Azure App Registration for your GitHub workflows
- Federated credentials that allow GitHub to authenticate with Azure
- Proper permissions for accessing Fusion Framework services
- All the credentials needed to configure your GitHub workflows

## Why This Matters

Your workflows need permission to access Azure services to deploy your app. We'll set up a secure way for them to authenticate without storing any passwords or secrets.

**Why this matters**: Instead of storing passwords (which can be stolen), we use a fancy method called "OpenID Connect" that's much more secure.

## Prerequisites

Before you start, make sure you have:
- **Azure AD access** - You need permission to create service principals in your organization's Azure
- **Admin rights** - You may need admin rights to grant permissions and consent

## Step 1: Create an Azure App Registration

Think of this as creating a "service identity" that proves your GitHub workflows are allowed to access Azure.

1. **Go to Azure Portal**: Visit [portal.azure.com](https://portal.azure.com) and sign in
2. **Find App Registrations**: 
   - Look for "Azure Active Directory" in the left menu
   - Click on it, then click "App registrations"
3. **Create New Registration**:
   - Click the big "New registration" button
   - **Name**: `GitHub Actions - [Your App Name]` (make it descriptive)
   - **Supported account types**: Choose "Accounts in this organizational directory only"
   - **Redirect URI**: Leave this blank (we don't need it)
   - Click "Register"

## Step 2: Set Up Federated Credentials

This tells Azure "trust GitHub when it says this is our service."

1. **Go to Certificates & Secrets**:
   - In your new app registration, click "Certificates & secrets" in the left menu
   - Click "Federated credentials" tab
2. **Add GitHub Credential**:
   - Click "Add credential"
   - Choose "GitHub Actions deploying Azure resources"
   - Fill in the details:
     - **Organization**: Your GitHub organization name (e.g., "mycompany")
     - **Repository**: Your repository name (e.g., "my-fusion-app") or use `*` for all repos
     - **Entity type**: Branch
     - **Branch name**: `main`
     - **Name**: `github-actions` (this is just a label)
   - Click "Add"

## Step 3: Grant Permissions

Your workflow needs permission to access the Fusion Framework API.

1. **Go to API Permissions**:
   - Click "API permissions" in the left menu
   - Click "Add a permission"
2. **Add Fusion Framework Permission**:
   - Add the permission your Fusion Framework needs
   - Click "Grant admin consent" (you might need admin rights for this)

## Step 4: Save These Important Numbers

You'll need these three values for the next step. Write them down or copy them somewhere safe:

- **Application (client) ID**: Found on the "Overview" page (looks like: `12345678-1234-1234-1234-123456789012`)
- **Directory (tenant) ID**: Also on the "Overview" page (looks like: `87654321-4321-4321-4321-210987654321`)
- **API Scope**: The scope for your Fusion Framework API (ask your team or check documentation, usually something like `https://fusion-api.equinor.com/.default`)

## What's Next?

**🎉 Great job!** You've created a secure way for your workflows to authenticate. 

Now you need to:
1. **Configure GitHub** - Add these credentials to your GitHub repository
2. **Set up environments** - Create deployment environments in GitHub
3. **Test your setup** - Make sure everything works together

Continue with the [GitHub Setup Guide](./github-setup.md) to complete the configuration.

## Troubleshooting

### Common Issues

**"I can't find Azure Active Directory"**
- Make sure you're in the right Azure tenant
- Look for "Microsoft Entra ID" (the new name for Azure AD)

**"I don't see the Federated credentials option"**
- Make sure you're in the "Certificates & secrets" section
- Look for the "Federated credentials" tab

**"I can't grant admin consent"**
- You need admin rights in your Azure AD tenant
- Ask your Azure administrator to help with this step

**"I don't know what API permissions to add"**
- Check with your team or Fusion Framework documentation
- The scope is usually something like `https://fusion-api.equinor.com/.default`

### Getting Help

If you run into issues:
- **Check with your team** - Someone else might have done this before
- **Azure documentation** - [Azure OIDC setup guide](https://docs.github.com/en/actions/deployment/security/hardening-your-deployments/configuring-openid-connect-in-azure)
- **Fusion Framework docs** - Check your organization's internal documentation

## Security Best Practices

- **Use specific repository names** instead of `*` when possible
- **Limit permissions** to only what your workflows need
- **Regularly review** who has access to your app registrations
- **Use descriptive names** for your app registrations
- **Keep credentials secure** - never commit them to your repository

**Remember**: This setup creates a secure connection between GitHub and Azure. Keep your credentials safe and only share them with trusted team members!
