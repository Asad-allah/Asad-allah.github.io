# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal portfolio website built with React 19, Vite, Tailwind CSS, and Framer Motion. Features heavy animation work and a single-page layout with distinct sections.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build to dist/
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

## Architecture

### Entry Points
- `src/main.jsx` - React root mount
- `src/App.jsx` - Main application component with loading state, renders all sections in order

### Directory Structure
- `src/components/` - Page sections (Hero, ExperienceTimeline, Education, SkillsMatrix, ProjectsPinned, BusinessAnalysis, Contact)
- `src/components/ui/` - Reusable UI primitives (cursors, backgrounds, buttons, text effects)
- `src/hooks/` - Custom React hooks for mouse/scroll interactions
- `src/lib/utils.js` - Contains `cn()` utility for Tailwind class merging (shadcn pattern)
- `src/assets/` - Static images (WebP/PNG)
- `public/` - Public static assets

### Key Patterns

**Animation System**: All animations use Framer Motion. Common patterns:
- `useScroll()` + `useTransform()` for scroll-driven animations
- `useSpring()` for physics-based motion values
- `AnimatePresence` for mount/unmount transitions
- `motion.*` components for declarative animations

**Component Pattern**: Section components are self-contained with their own scroll-triggered animations. UI components accept standard props plus motion-specific props (strength, springConfig, etc.).

**Path Aliasing**: `@/` maps to `src/` (configured in vite.config.js)

**Styling**: Tailwind with CSS variables for theming (defined in index.css). Uses HSL color system with semantic names (primary, secondary, muted, etc.).

## Deployment

Automatic via GitHub Actions on push to `main` branch. Builds and deploys to GitHub Pages. No manual deployment steps needed.
