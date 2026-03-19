# Basic Fusion Framework Template

A comprehensive template for building React applications with the Fusion Framework. This template provides a production-ready starting point with essential features including context management, navigation, EDS components, and modern React patterns.

## 🎯 Template Purpose

This template is designed for developers who want to:

- **Build Context-Aware Apps**: Create applications that work with Fusion Framework's context system
- **Implement Navigation**: Use built-in routing and navigation features
- **Use EDS Components**: Leverage Equinor Design System for consistent UI
- **Follow Best Practices**: Start with a well-structured, production-ready foundation
- **Learn Advanced Patterns**: Understand context management, navigation, and data fetching

## ✨ Key Features

- **Context Management**: Full integration with Fusion Framework's context system
- **Navigation System**: Built-in routing with Fusion Framework's React Router integration
- **EDS Integration**: Equinor Design System components and theming
- **Data Fetching**: React Query integration for efficient data management
- **TypeScript Support**: Full TypeScript support with strict type checking
- **Modern React**: Hooks, functional components, and modern React patterns
- **Production Ready**: Follows best practices for micro-frontend architecture
- **Extensible**: Easy to customize and extend for specific application needs

## 🏗️ Architecture Overview

This template demonstrates a complete Fusion Framework application with:

- **Context Integration**: Uses Fusion Framework's context system for user and organization data
- **Navigation Module**: Implements routing with context-aware navigation
- **Component Library**: EDS components for consistent UI/UX
- **Data Layer**: React Query for server state management
- **Type Safety**: Comprehensive TypeScript integration

## Getting Started

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
apps/basic/
├── src/
│   ├── App.tsx                    # Main application component with React Query setup
│   ├── Router.tsx                 # Application routing configuration
│   ├── config.ts                  # Fusion Framework configuration
│   ├── index.tsx                  # Application bootstrap and entry point
│   ├── components/                # Reusable UI components
│   │   ├── AppContainer.tsx       # Main app container with navigation
│   │   ├── AppPageContainer.tsx   # Page wrapper component
│   │   ├── ContentContainer.tsx   # Content area wrapper
│   │   ├── ContextDetailSideSheet.tsx # Context detail side sheet
│   │   └── RelatedContextItem.tsx # Related context item component
│   ├── pages/                     # Page components
│   │   ├── HomePage.tsx           # Home page component
│   │   ├── AboutPage.tsx          # About/getting started page
│   │   └── context/               # Context-related pages
│   │       ├── ContextLandingPage.tsx    # Context landing page
│   │       └── RelatedContextPage.tsx    # Related context page
│   └── api/                       # API layer and data management
│       └── related-context/       # Related context API
│           ├── hooks.ts           # Custom hooks for data fetching
│           ├── index.ts           # API exports
│           ├── models.ts          # Data models and types
│           ├── query.ts           # React Query configurations
│           ├── selectors.ts       # Data selectors
│           └── types.ts           # TypeScript type definitions
├── dist/                          # Built application output (generated)
├── package.json                   # Package configuration and dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This documentation file
```

## 🛠️ Key Files Explained

### `src/App.tsx` - Main Application Component
The root component that sets up the application with React Query and routing:
- **React Query Setup**: Configures QueryClient with optimal defaults
- **Provider Wrapping**: Wraps the app with necessary providers
- **Development Tools**: Includes React Query DevTools for debugging
- **Template Structure**: Demonstrates proper app-level setup

**What to customize**: Add global providers, error boundaries, or theme providers as needed.

### `src/Router.tsx` - Application Routing
Defines the application's routing structure and navigation:
- **Route Configuration**: Defines all application routes and their components
- **Fusion Navigation**: Integrates with Fusion Framework's navigation system
- **Context-Aware Routes**: Routes that work with the context system
- **Nested Routing**: Demonstrates nested route patterns

**What to customize**: Add new routes, modify route structure, or add route guards.

### `src/config.ts` - Fusion Framework Configuration
Configures Fusion Framework modules and services:
- **Context Module**: Enables context management with orgchart context type
- **Navigation Module**: Sets up navigation with basename configuration
- **Service Clients**: Configures framework service clients for context and people
- **Module Integration**: Shows how to enable and configure modules

**What to customize**: Add additional modules, configure services, or modify context types.

### `src/components/` - Reusable Components
Contains reusable UI components that demonstrate best practices:
- **AppContainer**: Main app container with navigation and layout
- **AppPageContainer**: Page wrapper with consistent styling
- **ContextDetailSideSheet**: Side sheet for context details
- **RelatedContextItem**: Component for displaying related context items

**What to customize**: Modify existing components or add new reusable components.

### `src/pages/` - Page Components
Contains page-level components that represent different routes:
- **HomePage**: Landing page with welcome content
- **AboutPage**: Getting started and documentation page
- **ContextLandingPage**: Context-specific landing page
- **RelatedContextPage**: Page showing related context information

**What to customize**: Replace with your application's specific pages and content.

### `src/api/` - API Layer
Contains data fetching logic and API integration:
- **React Query Integration**: Uses React Query for efficient data fetching
- **Custom Hooks**: Provides reusable hooks for data operations
- **Type Safety**: Full TypeScript support for API operations
- **Data Models**: Defines data structures and types

**What to customize**: Add your API endpoints, modify data fetching logic, or add new data sources.

## 🚀 Development Workflow

### 1. Initial Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### 2. Understanding the Features

#### Context Management
The template includes full context management integration:
- **Context Types**: Configured for 'orgchart' context type
- **Service Clients**: Uses framework service clients for context and people
- **Context-Aware Navigation**: Routes that work with the current context
- **Context Components**: Components that display and interact with context data

#### Navigation System
Built-in navigation with React Router and Fusion Framework:
- **Route Configuration**: Nested routes with context-aware paths
- **Fusion Navigation**: Integration with Fusion Framework's navigation module
- **Navigation Components**: Reusable navigation components
- **Route Guards**: Context-aware route protection

#### EDS Integration
Equinor Design System components and theming:
- **Component Library**: Access to all EDS components
- **Theming**: Consistent theming and styling
- **Icons**: EDS icon library integration
- **Tokens**: Design tokens for consistent styling

#### Data Fetching
React Query integration for efficient data management:
- **Query Client**: Configured with optimal defaults
- **Custom Hooks**: Reusable hooks for data operations
- **Caching**: Intelligent caching and background updates
- **DevTools**: Development tools for debugging queries

### 3. Customization Guide

#### Step 1: Update Context Configuration
```typescript
// In src/config.ts
enableContext(configurator, async (builder) => {
    // Add your context types
    builder.setContextType(['orgchart', 'project', 'asset']);
});
```

#### Step 2: Add New Routes
```typescript
// In src/Router.tsx
export const routes = createRoutesFromElements(
    <Route id="root" path="/" element={<AppContainer />}>
        <Route id="home" element={<HomePage />} index />
        <Route id="my-new-page" path="my-new-page" element={<MyNewPage />} />
        // ... other routes
    </Route>,
);
```

#### Step 3: Create New Components
```typescript
// Create src/components/MyComponent.tsx
import { Button, Typography } from '@equinor/eds-core-react';

export const MyComponent = () => {
    return (
        <div>
            <Typography variant="h2">My Component</Typography>
            <Button>Click me</Button>
        </div>
    );
};
```

#### Step 4: Add Data Fetching
```typescript
// In src/api/my-feature/hooks.ts
import { useQuery } from 'react-query';

export const useMyData = () => {
    return useQuery({
        queryKey: ['my-data'],
        queryFn: () => fetch('/api/my-data').then(res => res.json()),
    });
};
```

## 🔧 Key Dependencies

### Fusion Framework
- `@equinor/fusion-framework-react-app` - Core Fusion Framework
- `@equinor/fusion-framework-react-module-context` - Context management
- `@equinor/fusion-framework-module-navigation` - Navigation module
- `@equinor/fusion-framework-module-http` - HTTP client module

### UI & Styling
- `@equinor/eds-core-react` - EDS components
- `@equinor/eds-icons` - EDS icon library
- `@equinor/eds-tokens` - Design tokens
- `styled-components` - CSS-in-JS styling

### Routing & Data
- `@equinor/fusion-framework-react-router` - Fusion React Router integration
- `react-query` - Data fetching and caching
- `rxjs` - Reactive programming utilities

### Development
- `typescript` - TypeScript support
- `@types/react` - React TypeScript definitions
- `@types/react-dom` - React DOM TypeScript definitions

## 💡 Common Examples

### Using Context in Components
```typescript
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const MyComponent = () => {
    const { currentContext } = useCurrentContext();
    
    if (!currentContext) {
        return <div>No context selected</div>;
    }
    
    return (
        <div>
            <h2>Current Context: {currentContext.title}</h2>
            <p>ID: {currentContext.id}</p>
        </div>
    );
};
```

### Using EDS Components
```typescript
import { Button, Typography, Card } from '@equinor/eds-core-react';
import { Icon } from '@equinor/eds-icons';

const MyComponent = () => {
    return (
        <Card>
            <Card.Header>
                <Typography variant="h2">My Card</Typography>
            </Card.Header>
            <Card.Content>
                <Typography>This is a card with EDS components</Typography>
                <Button>
                    <Icon name="add" />
                    Add Item
                </Button>
            </Card.Content>
        </Card>
    );
};
```

### Data Fetching with React Query
```typescript
import { useQuery } from 'react-query';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const useContextData = () => {
    const { currentContext } = useCurrentContext();
    
    return useQuery({
        queryKey: ['context-data', currentContext?.id],
        queryFn: () => fetch(`/api/context/${currentContext?.id}`).then(res => res.json()),
        enabled: !!currentContext?.id,
    });
};
```

### Navigation with Context
```typescript
import { useNavigate } from '@equinor/fusion-framework-react-router';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const MyComponent = () => {
    const navigate = useNavigate();
    const { currentContext } = useCurrentContext();
    
    const handleNavigate = () => {
        if (currentContext) {
            navigate(`/${currentContext.id}/related`);
        }
    };
    
    return <Button onClick={handleNavigate}>Go to Related</Button>;
};
```

## 📚 Resources

### Fusion Framework
- [Fusion Framework Documentation](https://equinor.github.io/fusion-framework/)
- [Fusion Framework Modules](https://equinor.github.io/fusion-framework/modules/)
- [Context Management Guide](https://equinor.github.io/fusion-framework/modules/context/)
- [Navigation Module Guide](https://equinor.github.io/fusion-framework/modules/navigation/)

### EDS (Equinor Design System)
- [EDS Documentation](https://eds.equinor.com/)
- [EDS Components](https://eds.equinor.com/components/)
- [EDS Icons](https://eds.equinor.com/icons/)
- [EDS Tokens](https://eds.equinor.com/tokens/)

### React & TypeScript
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Development Guides
- [Getting Started Guide](../doc/getting-started.md)
- [Fusion Framework CLI](../doc/fusion-framework-cli.md)
- [Azure Setup Guide](../doc/azure-setup.md)
- [GitHub Setup Guide](../doc/github-setup.md)

## 🔧 Troubleshooting

### Common Issues

#### Context Issues
- **Context not loading**: Check that context module is properly configured in `config.ts`
- **Context type errors**: Ensure context types match what's configured
- **Service client errors**: Verify that service clients are properly configured

#### Navigation Issues
- **Routes not working**: Check that routes are properly defined in `Router.tsx`
- **Navigation module errors**: Ensure navigation module is enabled in `config.ts`
- **Context-aware routing**: Verify that context is available when navigating

#### EDS Issues
- **Components not rendering**: Check that EDS components are properly imported
- **Styling issues**: Verify that EDS tokens and themes are properly configured
- **Icon not showing**: Ensure EDS icons are properly imported and used

#### React Query Issues
- **Data not fetching**: Check that query keys and functions are correct
- **Caching issues**: Verify that query client is properly configured
- **DevTools not showing**: Ensure React Query DevTools are included in development

### Getting Help

> [!NOTE]
> **Need assistance?**
> 1. **Check the Documentation**: Review the [Fusion Framework documentation](https://equinor.github.io/fusion-framework/)
> 2. **Search Issues**: Look for similar issues in the [Fusion Framework repository](https://github.com/equinor/fusion-framework/issues)
> 3. **Ask Questions**: Create an issue in the [Fusion Framework repository](https://github.com/equinor/fusion-framework/issues)
> 4. **Review Examples**: Check the [bare template](../bare/) for simpler examples

## 🤝 Contributing

This is a template package designed to help developers get started quickly. To contribute to the Fusion Framework itself, visit the [main repository](https://github.com/equinor/fusion-framework).

## 🤖 AI-Assisted Development

This template works with [Fusion Skills](https://github.com/equinor/fusion-skills) — reusable GitHub Copilot Agent Skills for common Fusion workflows.

```bash
# Install skills into your project
npx skills add equinor/fusion-skills -y --agent github-copilot

# List available skills
npx skills add equinor/fusion-skills --list
```

The **`fusion-app-react-dev`** skill is particularly useful — it guides feature development, scaffolding components, hooks, and services that follow EDS conventions and Fusion Framework patterns.

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
- [ ] Configure context types in `src/config.ts`
- [ ] Customize the welcome page in `src/pages/HomePage.tsx`
- [ ] Add your custom components in `src/components/`
- [ ] Create your pages in `src/pages/`
- [ ] Set up your API layer in `src/api/`
- [ ] Configure routing in `src/Router.tsx`
- [ ] Add environment variables
- [ ] Add tests for your components
- [ ] Update this README with your specific information
- [ ] Register your app in the Fusion Portal
- [ ] Deploy to your target environment

**Happy coding! 🚀**
