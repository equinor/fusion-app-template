# Fusion Framework CLI Guide

## Overview

The Fusion Framework CLI is a command-line tool for developing, building, and publishing applications and portal templates within the Fusion Framework ecosystem. It streamlines workflows, automates common tasks, and supports modern CI/CD pipelines.

## Key Features

- **🚀 Unified developer experience**: Single tool for the entire development lifecycle
- **⚡ Rapid local development**: Built-in dev server with hot reload and service discovery
- **🎯 Environment-specific configuration**: Seamlessly manage manifests and configs across environments
- **🔐 Integrated authentication**: Secure your apps with Azure AD integration
- **📦 Automated bundling & deployment**: One-command building, packaging, and publishing

## Quick Start

**Install the CLI**
```sh
pnpm add -D @equinor/fusion-framework-cli
```

**Start development server**
```sh
pnpm fusion-framework-cli dev
```

**Build and publish**
```sh
pnpm fusion-framework-cli publish --env <environment>
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm fusion-framework-cli dev` | Start development server |
| `pnpm fusion-framework-cli auth login` | Authenticate with Fusion |
| `pnpm fusion-framework-cli app build` | Build your application |
| `pnpm fusion-framework-cli app publish` | Publish to Fusion registry |
| `pnpm fusion-framework-cli app config` | Manage app configuration |

## Documentation

For comprehensive documentation, setup instructions, and troubleshooting:

> [!NOTE]
> [Official Fusion Framework CLI Documentation](https://equinor.github.io/fusion-framework/cli/)

The official documentation includes:
- Complete setup and configuration guides
- Authentication and security setup
- CI/CD pipeline integration
- Migration guides and troubleshooting
- Detailed command reference

## Template Integration

This template repository is pre-configured to work with the Fusion Framework CLI. The `package.json` files in each package include the necessary scripts and dependencies for seamless CLI integration.
