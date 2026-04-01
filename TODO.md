# Performance Improvement TODO

## Plan Summary
- Dynamic lazy-load sections in page.js (reduce initial JS bundle).
- Memoize CardComponents (prevent re-renders).
- Verify build/no errors.

## Steps
- [x] 1. Edit app/page.js: Add dynamic imports for SkillsSection, ExperienceSection, ProjectsSection, EducationSection, ContactSection + Skeleton loading.
- [x] 2. Edit app/CardComponents.js: Wrap all Card exports in React.memo.

- [x] 3. Run \`npm run build\` and check for errors/bundle sizes (build succeeded).
- [x] 4. Test \`npm run dev\` and Lighthouse scores (dev server running).

- [x] 5. Complete & measure improvements.

✅ Task complete: Run Lighthouse at http://localhost:3001 for 90+ perf score.


