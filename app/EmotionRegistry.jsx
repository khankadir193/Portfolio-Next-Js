'use client';

import { useState } from 'react';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import createEmotionCache from './emotionCache';

function useEmotionCache() {
  const [cache] = useState(() => createEmotionCache());
  return cache;
}

export default function EmotionRegistry({ children }) {
  const cache = useEmotionCache();

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;
    return (
      <>
        {names.map((name) => (
          <style
            key={name}
            data-emotion={`${cache.key} ${name}`}
            dangerouslySetInnerHTML={{ __html: cache.inserted[name] }}
          />
        ))}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
