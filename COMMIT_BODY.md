feat: add Fusion skills sync workflow and AG Grid demo to basic app

- Add automated skills upgrade workflow (.github/workflows/skills-sync.yml)
  Runs weekdays at 8 AM UTC to keep agent skills up to date.

- Add fusion-app-react-dev skill to bare app
  Comprehensive skill for Fusion Framework app development with:
  • Helper agents for framework, styling, and code quality review
  • Reference documentation for patterns and conventions
  • Assets (checklists, follow-up questions, new app setup guide)

- Add AG Grid demo page to basic app (src/pages/ag-grid/)
  Enterprise-grade data grid showcase featuring:
  • Employee data grid with filters, sorting, pagination
  • Column definitions with value formatters and custom renderers
  • Status badges with semantic EDS colors
  • Sidebar panels for column visibility and filters
  • Responsive theming with Fusion AG Grid integration

- Add client-side routing to basic app (src/routes.ts)
  Fusion Router DSL with:
  • Shared AppContainer layout with sidebar navigation
  • Index and getting-started pages
  • New AG Grid demo route
  • Context-scoped routes for project/facility patterns

Updates dependencies and lock files for new features.
