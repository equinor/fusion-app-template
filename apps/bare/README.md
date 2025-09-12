# Bare Fusion Framework Template

A minimal, production-ready template for building React applications with the Fusion Framework. This package provides a clean, well-documented starting point for developers to create custom micro-frontend applications from scratch.

## 🎯 Template Purpose

This template is specifically designed for developers who want to:

- **Start Fresh**: Build a new Fusion Framework application from the ground up
- **Learn the Framework**: Understand the core concepts and patterns used in Fusion Framework
- **Customize Everything**: Have full control over the application structure and configuration
- **Follow Best Practices**: Use a template that demonstrates proper TypeScript, React, and Fusion Framework patterns

## ✨ Key Features

- **Minimal Setup**: Clean, uncluttered codebase with only essential dependencies
- **TypeScript First**: Full TypeScript support with strict type checking
- **Fusion Framework Integration**: Properly configured with module system and context providers
- **Developer Friendly**: Comprehensive TSDoc comments and clear code structure
- **Production Ready**: Follows best practices for micro-frontend architecture
- **Extensible**: Easy to customize and extend for specific application needs

## 🚀 Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Project Structure

```
apps/bare/
├── src/
│   ├── App.tsx          # Main application component with welcome page
│   ├── config.ts        # Application configuration and module setup
│   └── index.tsx        # Application bootstrap and entry point
├── dist/                # Built application output (generated)
├── package.json         # Package configuration and dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # This documentation file
```

## 🛠️ Key Files Explained

### `src/App.tsx` - Main Application Component
The primary React component that serves as your application's entry point. This file contains:
- **Welcome Page**: A developer-friendly welcome page with resources and guidance
- **Template Structure**: Demonstrates proper React component patterns
- **Fusion Framework Integration**: Shows how components work within the framework
- **Customization Point**: The main place to start building your application UI

**What to customize**: Replace the welcome content with your application's main UI components.

### `src/config.ts` - Application Configuration
The central configuration file where you set up modules, services, and application-specific settings. This file contains:
- **Module Configuration**: Setup for HTTP client, events, service discovery, etc.
- **Service Registration**: Configuration for external services and APIs
- **Environment Setup**: Environment-specific settings and feature flags
- **Template Examples**: Commented examples for common configurations

**What to customize**: Add your required modules and services based on your application needs.

### `src/index.tsx` - Application Bootstrap
The entry point that handles React root creation and application initialization. This file contains:
- **Bootstrap Function**: Main entry point called by the Fusion Portal
- **Component Factory**: Creates the app component with Fusion Framework integration
- **React 18 Integration**: Uses modern React features for optimal performance
- **Cleanup Handling**: Proper unmounting for micro-frontend architecture

**What to customize**: Usually no changes needed, but can be extended for custom initialization logic.

## 🔧 TypeScript Configuration

The template includes a well-configured TypeScript setup:

- **Strict Type Checking**: Enables all strict options for better code quality
- **Path Mapping**: Use `@/*` for clean imports (e.g., `@/Compoents/MyComponent` instead of `../../Compoents/MyComponent`)
- **Modern ES Modules**: ESNext module support for modern bundlers
- **React JSX**: Automatic JSX runtime (no need to import React in every file)

### Using Path Mappings

```typescript
// Instead of relative imports
import { App } from './App';
import { configure } from './config';

// Use clean path mappings
import { App } from '@/App';
import { configure } from '@/config';
```

## 🚀 Development Workflow

### 1. Initial Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 2. Customize Your Application

#### Step 1: Update the Main Component
- Open `src/App.tsx`
- Replace the welcome content with your application's UI
- Add your custom components and business logic

#### Step 2: Configure Modules
- Open `src/config.ts`
- Add required modules (HTTP client, events, etc.)
- Configure external services and APIs
- Set up environment-specific settings

#### Step 3: Add Components
- Create a `src/components/` directory
- Add your custom React components
- Use TypeScript for better type safety

#### Step 4: Implement Routing (if needed)
- Add routing library (React Router, etc.)
- Set up navigation structure
- Configure route guards and authentication

### 3. Development Best Practices

- **Use TypeScript**: Leverage strict typing for better code quality
- **Follow React Patterns**: Use hooks, functional components, and modern React features
- **Organize Code**: Keep components, utilities, and types well-organized
- **Use Path Mappings**: Use `@/*` imports for cleaner code
- **Test Your Code**: Add unit tests for your components and logic

## 📚 Resources

### Fusion Framework
- [Fusion Framework Documentation](https://equinor.github.io/fusion-framework/)
- [Fusion Framework Modules](https://equinor.github.io/fusion-framework/modules/)
- [Fusion Framework API Reference](https://equinor.github.io/fusion-framework/api/)

### Development Guides
- [Getting Started Guide](../doc/getting-started.md)
- [Fusion Framework CLI](../doc/fusion-framework-cli.md)
- [Azure Setup Guide](../doc/azure-setup.md)
- [GitHub Setup Guide](../doc/github-setup.md)

### TypeScript & React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Documentation](https://react.dev/)

## 🚀 Next Steps

### Phase 1: Basic Setup
1. **Customize the App**: Update `src/App.tsx` with your application content
2. **Configure Modules**: Set up required modules in `src/config.ts`
3. **Add Components**: Create your custom React components
4. **Test Locally**: Ensure everything works in development

### Phase 2: Integration
5. **Register App**: Create an application in the Fusion Portal (handles authentication)
6. **Configure Services**: Set up external API integrations
7. **Add Routing**: Implement navigation and page routing
8. **Environment Setup**: Configure different environments (dev, staging, prod)

### Phase 3: Production
9. **Add Testing**: Implement unit and integration tests
10. **Performance Optimization**: Optimize bundle size and runtime performance
11. **Deploy**: Use the CI/CD pipeline to deploy your application
12. **Monitor**: Set up logging and monitoring for production use

## 🛠️ Common Customizations

### Adding HTTP Client
```typescript
// In src/config.ts
configurator.configureHttpClient({
  baseUri: process.env.API_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
});
```

### Adding Event System
```typescript
// In src/config.ts
configurator.configureEventModule({
  eventSource: 'my-app',
  eventTypes: ['user-action', 'data-update']
});
```

### Using Fusion Framework Services
```typescript
// In your components
import { useHttpClient } from '@equinor/fusion-framework-react-app';

const MyComponent = () => {
  const httpClient = useHttpClient();
  // Use httpClient for API calls
};
```

## 🔧 Troubleshooting

### Common Issues

#### TypeScript Errors
- **Path mapping not working**: Ensure your IDE is configured to use the workspace TypeScript version
- **Module resolution errors**: Check that `moduleResolution` is set to `"Bundler"` in tsconfig.json
- **JSX errors**: Ensure `jsx` is set to `"react-jsx"` for React 17+ automatic runtime

#### Development Server Issues
- **Port conflicts**: The dev server will automatically find an available port
- **Hot reload not working**: Check that your file changes are being saved properly
- **Build errors**: Run `pnpm build` to see detailed error messages

#### Fusion Framework Issues
- **Module not found**: Ensure you've installed the required Fusion Framework packages
- **Context errors**: Make sure your app is properly wrapped with Fusion Framework providers
- **Authentication issues**: Authentication is handled by the Fusion Portal, not in your app

### Getting Help

1. **Check the Documentation**: Review the [Fusion Framework documentation](https://equinor.github.io/fusion-framework/)
2. **Search Issues**: Look for similar issues in the [Fusion Framework repository](https://github.com/equinor/fusion-framework/issues)
3. **Ask Questions**: Create an issue in the [Fusion Framework repository](https://github.com/equinor/fusion-framework/issues)
4. **Review Examples**: Check the [basic template](../basic/) for more complex examples

## 🤝 Contributing

This is a template package designed to help developers get started quickly. To contribute to the Fusion Framework itself, visit the [main repository](https://github.com/equinor/fusion-framework).

### Template Improvements

If you have suggestions for improving this template:
1. Create an issue describing your suggestion
2. Fork the repository and make your changes
3. Submit a pull request with your improvements

## 📄 License

ISC - See the main project for license details.

---

## 📋 Template Checklist

When using this template, make sure to:

- [ ] Update the package name in `package.json`
- [ ] Customize the welcome page in `src/App.tsx`
- [ ] Configure required modules in `src/config.ts`
- [ ] Add your custom components
- [ ] Set up routing if needed
- [ ] Configure environment variables
- [ ] Add tests for your components
- [ ] Update this README with your specific information
- [ ] Register your app in the Fusion Portal
- [ ] Deploy to your target environment

**Happy coding! 🚀**
