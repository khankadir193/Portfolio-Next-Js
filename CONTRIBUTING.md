# Contributing to Abdul Kadir Khan's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/portfolio.git`
3. **Create** a feature branch: `git checkout -b feature/your-feature-name`
4. **Install** dependencies: `npm install`
5. **Start** development: `npm run dev`
6. **Make** your changes
7. **Test** your changes
8. **Commit** your changes: `git commit -m 'Add: your feature description'`
9. **Push** to your branch: `git push origin feature/your-feature-name`
10. **Create** a Pull Request

## 📝 Development Guidelines

### Code Style
- Follow the existing ESLint configuration
- Use functional React components with hooks
- Implement CSS Modules for component styling
- Write descriptive commit messages

### Component Structure
```jsx
// Preferred component structure
'use client';

import React, { useState, useEffect } from 'react';
import styles from './ComponentName.module.css';

const ComponentName = () => {
  // State and effects
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  return (
    <div className={styles.container}>
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### CSS Guidelines
- Use CSS Modules for scoped styling
- Follow BEM naming convention when appropriate
- Use CSS custom properties for theming
- Optimize animations for 60fps performance

### Animation Best Practices
- Use `transform` and `opacity` for smooth animations
- Avoid animating layout properties (width, height, top, left)
- Use `will-change` sparingly and remove when not needed
- Test animations on lower-end devices

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, device information
- **Screenshots**: If applicable

### Feature Requests
For feature requests, please include:
- **Description**: What feature you'd like to see
- **Use Case**: Why this feature would be useful
- **Implementation Ideas**: Any thoughts on how to implement it

## 🔧 Development Setup

### Prerequisites
- Node.js 18.17+
- npm, yarn, pnpm, or bun

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Environment Variables
Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

## 📋 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat: add dark mode toggle
fix: resolve hydration error in navbar
docs: update installation instructions
style: format CSS with prettier
refactor: optimize animation performance
```

## 🎨 Design Guidelines

### Color Palette
- **Primary**: `#38bdf8` (Cyan)
- **Secondary**: `#06b6d4` (Teal)
- **Accent**: `#8b5cf6` (Purple)
- **Background**: `#0f172a` (Dark Navy)
- **Surface**: `#111827` (Dark Gray)
- **Text**: `#f8fafc` (Off White)

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Scale**: Responsive with clamp() function

### Spacing
- Use consistent spacing scale (4px base)
- Prefer margin/padding utilities
- Maintain visual hierarchy

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design across breakpoints
- [ ] Animation performance (60fps)
- [ ] Accessibility (WCAG guidelines)
- [ ] Cross-browser compatibility
- [ ] Touch interactions on mobile

### Performance Testing
- Use Lighthouse for performance audits
- Test on various devices and network conditions
- Monitor Core Web Vitals

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 📞 Contact

For questions or discussions:
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: abdulkadirkhan@example.com

Thank you for contributing! 🎉