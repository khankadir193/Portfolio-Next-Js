'use client';

import dynamic from 'next/dynamic';

const AmbientBackground = dynamic(() => import("./AmbientBackground"), {
  ssr: false,
  loading: () => null
});

const BackgroundName = dynamic(() => import("./BackgroundName"), {
  ssr: false,
  loading: () => null
});

export default function BackgroundComponents() {
  return (
    <>
      <AmbientBackground />
      <BackgroundName />
    </>
  );
}
