"use client";

import BackgroundComponents from "./BackgroundComponents";

export default function ClientProviders({ children }) {
  return (
    <>
      {children}
      <BackgroundComponents />
    </>
  );
}

