
# Welcome to Fusion Framework! 🚀

Welcome to your new Fusion Framework application! This project was created using the Fusion Framework CLI and provides a solid foundation for building applications within the Equinor Fusion ecosystem. The Fusion Framework is designed to help you create modern, scalable applications with built-in support for authentication, routing, and deployment.

> **Note**: This application was generated from the Fusion Framework template. The CLI has already set up the project structure, dependencies, and configuration files for you.

## Learn More About Fusion Framework

- **Official Documentation**: [https://equinor.github.io/fusion-framework/](https://equinor.github.io/fusion-framework/)
- **Framework Guide**: Comprehensive documentation and API reference
- **React Support**: Built-in React components and hooks
- **TypeScript**: Full TypeScript support with IntelliSense

## Getting Started Checklist

Follow this step-by-step checklist to get your Fusion app up and running:

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development
- Start the development server
- Make your changes to the app
- Test locally before committing

```bash
pnpm dev
```

### 3. Create Changeset
```bash
pnpm changeset
```
Follow the [Changesets Guide](./working-with-changesets.md) for detailed instructions on version management.

### 4. Commit Changes
```bash
git add .
git commit -m "feat: your feature description"
```

### 5. Create a Pull Request
- Push your changes to a feature branch
- Create a pull request following your team's guidelines
- Ensure all CI checks pass

### 6. Merge PR
- Get required approvals
- Merge the pull request to main branch

### 7. Merge Release PR
- Changesets will automatically create a release PR
- Review and merge the release PR to trigger deployment

### 8. App Deployed
- Your app will be automatically deployed
- Check the deployment status in your GitHub Actions

## Additional Setup

### Required Configuration
- [ ] **Update the README.md** - Customize the project description, setup instructions, and documentation links
- [ ] **Create an application on Application Admin in Fusion Portal** - Register your app in the Fusion ecosystem
- [ ] Update application metadata in `package.json` and manifest files
- [ ] Configure Azure authentication for GitHub Actions
- [ ] Set up GitHub environments and variables
- [ ] Create a `SECURITY.md` file
- [ ] Create a `LICENSE` file

### Optional Configuration
- [ ] Configure IDE for Biome linting and formatting
- [ ] Review Fusion Framework CLI setup and commands
- [ ] Test pull request and CI workflows
- [ ] Configure deployment environments

## Documentation Links

- [GitHub Setup Guide](./github-setup.md) - Configure CI/CD pipelines
- [Changesets Guide](./working-with-changesets.md) - Version management and releases
- [Linting Guide](./linting.md) - Code quality and formatting
- [Fusion Framework CLI](./fusion-framework-cli.md) - Development and deployment tools
- [Azure Setup Guide](./azure-setup.md) - Azure authentication configuration

## Need Help?

- Check the [Fusion Framework documentation](https://equinor.github.io/fusion-framework/)
- Review the template's documentation in the `doc/` folder
- Contact your team lead or the Fusion Framework team