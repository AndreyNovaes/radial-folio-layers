# Radial Folio Layers - Claude Documentation

Welcome! This is the central documentation hub for the **Radial Folio Layers** portfolio project. This guide will help Claude (and any developer) understand, maintain, and extend this project.

## Quick Navigation

### I Want To...

| Goal | Documentation | Time |
|------|---|---|
| 🚀 Get started quickly | [Quick Start](#quick-start) | 5 min |
| 🎨 Change colors/theme | [Styling System](./.claude/STYLING-SYSTEM.md) | 10 min |
| 📝 Update my bio/skills | [Customization Guide](./.claude/CUSTOMIZATION-GUIDE.md#quick-customization) | 5 min |
| 💼 Add timeline entries | [Customization Guide](./.claude/CUSTOMIZATION-GUIDE.md#career-timeline) | 10 min |
| 🏗️ Add a new section | [Component Reference](./.claude/COMPONENT-REFERENCE.md) + [Architecture](./.claude/ARCHITECTURE.md) | 30 min |
| 🛠️ Start developing | [Development Guide](./.claude/DEVELOPMENT-GUIDE.md) | 15 min |
| 📦 Deploy to production | [Deployment](./.claude/DEPLOYMENT.md) | 10 min |
| 🔍 Understand the code | [Architecture](./.claude/ARCHITECTURE.md) | 20 min |
| 📊 Work with data | [Data Schema](./.claude/DATA-SCHEMA.md) | 15 min |

## Quick Start

### Prerequisites
- Node.js 18+ with npm
- A code editor (VS Code recommended)
- Git (optional, for version control)

### 1. Setup Development Environment

```bash
# Clone the repository (if not already cloned)
git clone <repository-url>
cd radial-folio-layers

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will be available at `http://localhost:8080`

### 2. Make Your First Change

**Quickest way** - Update your name:
1. Open `src/data/portfolioData.ts`
2. Find `export const profileData` (line ~35)
3. Change the `name` property
4. Save - the page updates automatically!

### 3. Build for Production

```bash
npm run build
```

Output: `dist/` folder ready for deployment

## Project Overview

**What is this?** A modern, interactive portfolio website showcasing QA/Testing expertise with:
- Interactive skills visualization (radar chart)
- Career timeline
- Certifications & goals tracking
- Responsive design (mobile, tablet, desktop)
- Dark mode theme
- Fast performance (Vite, React 18)

**Tech Stack:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router (routing)
- Custom SVG visualizations

**Key Stats:**
- ~47 reusable UI components (shadcn/ui)
- 100% responsive design
- ~20KB gzipped bundle
- No backend required (static deployment)
- Type-safe with TypeScript

## File Structure Overview

```
radial-folio-layers/
├── src/
│   ├── components/
│   │   ├── ui/                    # 47+ shadcn/ui components
│   │   ├── HeroSection.tsx        # Landing hero
│   │   ├── SkillsEvolutionRadar.tsx # Main visualization
│   │   ├── Timeline.tsx           # Career timeline
│   │   ├── CertificationsGoals.tsx # Goals display
│   │   ├── MyStory.tsx            # About section
│   │   └── ... other components
│   ├── data/
│   │   └── portfolioData.ts       # ⭐ All content goes here
│   ├── pages/
│   │   ├── Index.tsx              # Main page layout
│   │   └── NotFound.tsx           # 404 page
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles & design system
├── public/
│   └── favicon.ico, robots.txt
├── .claude/                       # 📚 Documentation folder
│   ├── ARCHITECTURE.md
│   ├── CUSTOMIZATION-GUIDE.md
│   ├── COMPONENT-REFERENCE.md
│   ├── DATA-SCHEMA.md
│   ├── STYLING-SYSTEM.md
│   ├── DEVELOPMENT-GUIDE.md
│   └── DEPLOYMENT.md
├── CLAUDE.md                      # This file
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
├── vite.config.ts                 # Vite config
└── index.html                     # HTML entry point
```

## Common Tasks

### Update Your Profile Information

See: [Customization Guide - Quick Customization](./.claude/CUSTOMIZATION-GUIDE.md#quick-customization)

**File to edit:** `src/data/portfolioData.ts`

```typescript
export const profileData: ProfileData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  email: "your-email@example.com",
  linkedin: "linkedin.com/in/your-profile",
  github: "github.com/your-username",
  skills: ["Skill1", "Skill2", ...],
};
```

### Change Colors & Theme

See: [Styling System](./.claude/STYLING-SYSTEM.md)

**File to edit:** `src/index.css` (lines 76-130)

Change HSL color values for dark theme:
```css
.dark {
  --primary: 195 85% 45%;    /* Change this */
  --secondary: 210 60% 35%;
  /* ... */
}
```

### Add a New Timeline Entry

See: [Customization Guide - Career Timeline](./.claude/CUSTOMIZATION-GUIDE.md#career-timeline)

**File to edit:** `src/data/portfolioData.ts`

```typescript
export const timeline: TimelineItem[] = [
  {
    title: "Your Job Title",
    period: "Jan 2024 - Present",
    company: "Company Name",
    description: "What you did...",
    skills: ["Tech1", "Tech2"],
  },
  // ... more entries
];
```

### View Component Props & Usage

See: [Component Reference](./.claude/COMPONENT-REFERENCE.md)

Each component documents:
- Props interface
- Usage examples
- Customization points

## Documentation Structure

### 📘 Layer 1: Architecture (`ARCHITECTURE.md`)
**What?** How the project is structured
**For whom?** Developers needing to understand the big picture
**Contains:**
- Component hierarchy & data flow
- Design patterns
- State management approach
- Third-party integrations

### 📗 Layer 2: Customization (`CUSTOMIZATION-GUIDE.md`)
**What?** Step-by-step how-to guides
**For whom?** Anyone wanting to modify content or theme
**Contains:**
- Quick customization tasks (most common)
- Theme customization
- Layout changes
- Adding new sections

### 📙 Layer 3: Component API (`COMPONENT-REFERENCE.md`)
**What?** Detailed component documentation
**For whom?** Developers building new components
**Contains:**
- Each component's props
- Usage examples
- Styling options
- Customization points

### 📕 Layer 4: Data Schema (`DATA-SCHEMA.md`)
**What?** Data structure & types
**For whom?** Developers working with data
**Contains:**
- TypeScript interfaces
- Data validation rules
- Example data
- Migration guides

### 📓 Layer 5: Styling (`STYLING-SYSTEM.md`)
**What?** Design system & theme tokens
**For whom?** Designers & theme developers
**Contains:**
- Color palette reference
- CSS variables
- Tailwind configuration
- Animation system

### 📔 Layer 6: Development (`DEVELOPMENT-GUIDE.md`)
**What?** Development workflows & conventions
**For whom?** Team developers
**Contains:**
- Setup instructions
- Code conventions
- File naming patterns
- Git workflow

### 📒 Layer 7: Deployment (`DEPLOYMENT.md`)
**What?** Build & deployment process
**For whom?** DevOps & deployment engineers
**Contains:**
- Build process
- Environment setup
- Hosting guides
- Performance optimization

## Key Concepts

### Data-Driven Architecture
**The single source of truth for all content is:** `src/data/portfolioData.ts`

Change data there → automatically updates throughout the app. No need to edit components for content changes.

### Component Isolation
Each page section is a **self-contained component**:
- Takes data as props
- Renders UI independently
- Can be customized without affecting others

### Design System
All styling uses:
- **CSS Variables** (HSL color system)
- **Tailwind Utilities** (responsive, semantic)
- **Shadcn/ui Components** (accessible, themeable)

Change variables → all components automatically update.

### Type Safety
Full TypeScript support ensures:
- Intellisense in your editor
- Compile-time error checking
- Easier refactoring

## Common Issues & Solutions

### Issue: Changes not showing up?
**Solution:**
1. Save the file (Ctrl+S / Cmd+S)
2. Check browser auto-refresh (should happen automatically)
3. If not, refresh page manually (F5)
4. Check browser console for errors (F12)

### Issue: Styling looks broken?
**Solution:**
1. Check Tailwind class names for typos
2. Clear Tailwind cache: delete `.next` and `.turbo` folders
3. Restart dev server: Ctrl+C, then `npm run dev`
4. Check CSS variables in `index.css`

### Issue: TypeScript errors in editor?
**Solution:**
1. Restart VS Code
2. Check `tsconfig.json` is correct
3. Run `npm install` again
4. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Issue: Port 8080 already in use?
**Solution:** Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000,  // Change this
  },
  // ...
});
```

## Development Workflow

1. **Make changes** to `src/data/portfolioData.ts` or component files
2. **Dev server auto-refreshes** (should happen automatically)
3. **See changes** in browser
4. **Fix any errors** (check console if needed)
5. **Commit changes**: `git add . && git commit -m "Your message"`
6. **Build for production**: `npm run build`
7. **Deploy**: `npm run preview` (local test) or push to hosting

## Git Workflow (Optional)

```bash
# Create new branch for your changes
git checkout -b feature/my-changes

# Make your changes and commit
git add .
git commit -m "Describe your changes"

# Push to remote
git push origin feature/my-changes

# Create pull request on GitHub/GitLab
```

## Performance Tips

1. **Reduce bundle size**: Remove unused components/dependencies
2. **Optimize images**: Use WebP format, compress before adding
3. **Lazy load**: Use `React.lazy()` for heavy components
4. **Monitor**: Use Lighthouse (F12 in browser)

## Accessibility (a11y)

This project uses:
- **Semantic HTML**: Proper heading hierarchy, landmark elements
- **ARIA labels**: For screen reader users
- **Keyboard navigation**: All interactive elements keyboard accessible
- **Color contrast**: WCAG AA compliant

When adding new components:
- Use semantic HTML (`<section>`, `<article>`, `<main>`)
- Add ARIA labels where needed
- Test with keyboard navigation (Tab key)
- Check color contrast (use WebAIM contrast checker)

## Resources & References

### Documentation Files
- **Architecture Overview**: [./.claude/ARCHITECTURE.md](./.claude/ARCHITECTURE.md)
- **Customization Guide**: [./.claude/CUSTOMIZATION-GUIDE.md](./.claude/CUSTOMIZATION-GUIDE.md)
- **Component Reference**: [./.claude/COMPONENT-REFERENCE.md](./.claude/COMPONENT-REFERENCE.md)
- **Data Schema**: [./.claude/DATA-SCHEMA.md](./.claude/DATA-SCHEMA.md)
- **Styling System**: [./.claude/STYLING-SYSTEM.md](./.claude/STYLING-SYSTEM.md)
- **Development Guide**: [./.claude/DEVELOPMENT-GUIDE.md](./.claude/DEVELOPMENT-GUIDE.md)
- **Deployment**: [./.claude/DEPLOYMENT.md](./.claude/DEPLOYMENT.md)

### External Links
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)

## Support & Getting Help

### For Claude AI
If you're Claude and need context:
1. Read this file first (you are here!)
2. Jump to the relevant documentation layer above
3. Search for the specific task in that document
4. Check code examples and file paths
5. Implement the change

### For Human Developers
If you're stuck:
1. Check the relevant documentation layer
2. Search for similar examples in the codebase
3. Check browser console for errors (F12)
4. Read component source code comments
5. Ask for help (GitHub issues, discussions, etc.)

## Contributing

To improve this documentation:
1. Edit the relevant `.claude/` file
2. Add examples if needed
3. Update navigation links
4. Commit with clear message
5. Keep each file focused on one concern

## License

This project is part of a personal portfolio. Modify as needed for your own use.

---

**Last Updated:** November 2024
**Version:** 1.0.0
**Maintained By:** Andrey Novaes

**Quick Links:**
[Architecture](./.claude/ARCHITECTURE.md) • [Customization](./.claude/CUSTOMIZATION-GUIDE.md) • [Components](./.claude/COMPONENT-REFERENCE.md) • [Data](./.claude/DATA-SCHEMA.md) • [Styling](./.claude/STYLING-SYSTEM.md) • [Development](./.claude/DEVELOPMENT-GUIDE.md) • [Deployment](./.claude/DEPLOYMENT.md)
