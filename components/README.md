# Component Architecture & Guidelines

This project organizes UI components strictly by feature and scope.

## Folder Structure

```
components/
  ui/        # App-agnostic primitive design components (Button, Card, Badge, Tabs, Alert, etc.)
  brush/     # Hand-painted SVG brush stroke filters, backdrops, edge dividers, and headline marks
  layout/    # App layout and wrapper elements (Section, PageHeader, BackLink, SiteFooter, Disclaimer)
  home/      # Components specific to the landing page (Navbar, Hero, SplitFeature, etc.)
  analyze/   # Feature components for the document simplification flow
```

## Rules for Adding New Components

1. **Location**: Place new UI components in `components/<feature>/` (e.g. `components/analyze/` or `components/ui/` for generic primitives).
2. **Naming**: Use one component per file with PascalCase naming matching the component (`MyComponent.tsx`).
3. **Exports**: Export each component from that folder's `index.ts` barrel file.
4. **Server by Default**: All components should be React Server Components by default. Add `"use client"` only when managing state, effects, or browser APIs.
5. **Types**: Define an explicit typed props interface (`type XProps = {...}`) with named export and no `any`.
6. **Modularity**: Keep components focused and under ~120 lines; extract sub-components if they grow larger.
