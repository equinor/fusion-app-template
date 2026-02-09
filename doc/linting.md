# Biome Linting and Best Practices Guide

This template includes [Biome](https://biomejs.dev/) as the default linting and formatting solution, pre-configured and integrated into the CI/CD workflows.

## Why This Template Uses Biome

We've chosen Biome as the default toolchain because it provides the best developer experience:

- **🚀 Performance**: 10-100x faster than ESLint + Prettier - no more waiting for linting
- **🔧 Unified Tool**: One tool instead of multiple (ESLint + Prettier + more)
- **⚡ Zero Config**: Works immediately out of the box with sensible defaults
- **🦀 Rust-based**: Maximum performance and reliability
- **📦 Minimal Dependencies**: One package instead of dozens
- **🔄 CI Integration**: Already configured in GitHub Actions workflows

## Why Continue with Biome?

**This template is pre-configured for Biome** - switching to other tools would require:

- Reconfiguring all CI/CD workflows
- Updating IDE settings across the team
- Migrating configuration rules
- Losing the performance benefits
- Adding complexity to the project setup

**Stick with Biome** to maintain consistency and leverage the template's optimizations.

## Key Concepts

### Linting vs Formatting
- **Linting**: Analyzes code for bugs, style issues, and best practices
- **Formatting**: Automatically adjusts code style (indentation, quotes, spacing)
- **Biome does both** in a single, fast tool

### Code Quality Rules
Biome's `recommended` ruleset includes:
- **Correctness**: Catches potential bugs and logic errors
- **Style**: Enforces consistent code formatting
- **Security**: Identifies security vulnerabilities
- **Performance**: Suggests optimizations

## Template Configuration

This template comes with Biome pre-configured in `biome.json`:
- **Indentation**: Tabs
- **Quotes**: Single quotes for JavaScript/TypeScript
- **Auto-organize**: Imports are automatically sorted
- **Rules**: Uses recommended rule set
- **CI Integration**: Already included in GitHub Actions workflows

**No setup required** - just start coding! See [Biome Configuration](https://biomejs.dev/reference/configuration/) if you need to customize.

## Available Scripts

| Script | Purpose |
|--------|---------|
| `pnpm check` | Run linting + formatting checks |
| `pnpm check:errors` | Check only errors (CI-friendly) |
| `pnpm lint` | Lint only |
| `pnpm format` | Format code only |

## Quick Start

Since this template includes Biome pre-configured:

1. **Install IDE Extension**: [VS Code Biome Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. **Start Coding**: Biome will automatically format and lint as you work
3. **Before Committing**: Run `pnpm check` to ensure everything is clean
4. **Auto-fix Issues**: Use `pnpm check --fix` to fix issues automatically

**That's it!** The template handles the rest.

## IDE Setup

### VS Code
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### Other IDEs
- **WebStorm**: Install Biome plugin
- **Vim/Neovim**: Use biome-lsp
- **Emacs**: Use biome-mode

## Best Practices

> [!TIP]
> **Follow these practices for the best experience:**
> 1. **Always run `pnpm check` before committing**
> 2. **Let Biome handle formatting** - don't manually adjust style
> 3. **Fix all errors** before pushing code
> 4. **Use auto-fix** when possible: `biome check --fix`
> 5. **Configure your IDE** to use Biome

## Common Commands

```bash
# Check and fix all issues
pnpm check --fix

# Format specific files
biome format src/components/MyComponent.tsx

# Check only staged files
biome check --staged

# Dry run (see what would change)
biome check --dry-run
```

## If You're Coming from ESLint/Prettier

This template already handles the migration for you! If you're used to ESLint + Prettier:

- **No configuration needed** - Biome is already set up
- **Same workflow** - use `pnpm check` instead of separate lint/format commands
- **Better performance** - everything runs much faster
- **Same IDE integration** - just install the Biome extension

See [Migration Guide](https://biomejs.dev/guides/migrate-from-eslint-prettier/) if you need to understand the differences.

## Resources

- [Biome Documentation](https://biomejs.dev/)
- [Rules Reference](https://biomejs.dev/linter/rules/)
- [Configuration Options](https://biomejs.dev/reference/configuration/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

---

**Need help?** Check the [official Biome docs](https://biomejs.dev/) or create an issue in this repository.
