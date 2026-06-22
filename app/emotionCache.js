import createCache from '@emotion/cache';

export default function createEmotionCache() {
  // key must match MUI's default key ("css") used in SSR helpers
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
}

