# TODO

- [ ] Identify hydration mismatch root cause
- [ ] Remove global hydration suppression in `app/layout.js` to reveal real mismatch
- [ ] Guard `BackgroundComponents` so it only renders after mount in `app/ClientProviders.jsx`
- [ ] Stabilize `Hero` initial render so server/client HTML match in `app/Hero.js`
- [ ] Run `npm run dev` (or `npm run build` + `npm start`) and confirm hydration error is gone

