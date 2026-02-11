# Working with Changesets

This template comes with [Changesets](https://github.com/changesets/changesets) pre-configured for automatic version management and changelog generation.

## What are Changesets?

Changesets are small files that describe what changed in your code. You create them manually as you make changes, and they get turned into version bumps and changelogs automatically.

**Why use Changesets?**
- **No more forgotten version bumps** - Changesets remember what changed
- **Automatic changelog generation** - No more manual changelog writing
- **Predictable releases** - You control exactly what goes into each release

## How It Works

1. **You make changes** → Create a changeset with `pnpm changeset`
2. **You merge to main** → GitHub Actions detects changesets and creates a release PR
3. **You review and merge** → The release PR contains version bumps and changelog updates
4. **Packages are published** → NPM packages are published automatically

## Creating Changesets

When you make changes to your code, create a changeset:

```bash
pnpm changeset
```

Choose the version bump type:
- **Patch** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **Minor** (1.0.0 → 1.1.0): New features, no breaking changes
- **Major** (1.0.0 → 2.0.0): Breaking changes

Describe your changes and commit:

```bash
git add .
git commit -m "feat: add user dashboard"
```

## Release Workflow

When you merge changesets to main:

1. **GitHub Actions detects changesets** and creates a release branch
2. **Opens a release PR** with version bumps and changelog updates
3. **If you add more changesets** to the release PR, it goes back to draft
4. **When ready**, merge the release PR to publish packages

The release PR contains version bumps and changelog updates based on your changesets.

## Best Practices

> [!TIP]
> **Create changesets when you:**
> - Add new features
> - Fix bugs
> - Make breaking changes
> 
> **Write clear descriptions:**
> - Be specific about what changed
> - Use consistent language (Added, Fixed, Updated, Removed)
> 
> **Don't create changesets for:**
> - Documentation updates
> - Test-only changes
> - Build configuration changes

## Troubleshooting

> [!NOTE]
> **"No changesets found"**
> - Make sure you created a changeset with `pnpm changeset`
> - Check that the changeset is committed and pushed to main
> 
> **"Release PR keeps going back to draft"**
> - This is normal! You added a new changeset to the release PR
> - Wait until you're done adding changesets, then mark as ready for review

## Getting Help

> [!NOTE]
> For detailed documentation, see the [official Changesets guide](https://github.com/changesets/changesets).

## Summary

1. **Create changesets** as you make changes with `pnpm changeset`
2. **Commit and merge** to main to trigger the release workflow
3. **Review and merge** the release PR to publish packages

That's it! Changesets handle versioning and changelog generation automatically.
