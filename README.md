# [YOUR APPLICATION NAME] - [TEAM/AREA]

<!-- TODO: Replace with your actual application name and team/area -->

## Description

<!-- TODO: Describe what this repository contains -->
<!-- TODO: Explain what problem this application solves -->
<!-- TODO: Add any relevant context about the application's purpose -->

## Getting Started

For detailed setup and development instructions, see our [Getting Started Guide](./doc/getting-started.md).

## Quick Start

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Build

```sh
# Install dependencies
pnpm install

# Build the application
pnpm build
```

## Deployment

<!-- TODO: Add deployment instructions specific to your application -->
<!-- TODO: Include environment-specific deployment steps if applicable -->

## Contributing

<!-- TODO: Add contribution guidelines specific to your project -->
<!-- TODO: Include information about code style, testing requirements, etc. -->

## 🤖 AI-Assisted Development with Fusion Skills

This project supports [Fusion Skills](https://github.com/equinor/fusion-skills) — reusable GitHub Copilot Agent Skills that guide common Fusion workflows like feature development, issue authoring, and code reviews.

```sh
# Install skills into this project
npx skills add equinor/fusion-skills -y --agent github-copilot

# List available skills
npx skills add equinor/fusion-skills --list
```

Recommended skills for app development:
- **`fusion-app-react-dev`** — scaffolding components, hooks, services, and types following EDS conventions and Fusion Framework patterns
- **`fusion-issue-authoring`** — structured issue drafting with type-specific templates
- **`fusion-help-docs`** — authoring and publishing help documentation

You can also set up [automated skill updates](https://github.com/equinor/fusion-skills#-automated-skill-updates) via GitHub Actions to keep skills current.

---

**This application was created using the Fusion Framework CLI.** For complete setup instructions, see the [Getting Started Guide](./doc/getting-started.md).
