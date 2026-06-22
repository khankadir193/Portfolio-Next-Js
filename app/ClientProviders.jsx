"use client";

import MuiThemeProvider from "./MuiThemeProvider";
import BackgroundComponents from "./BackgroundComponents";
import { useEffect, useState } from "react";

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MuiThemeProvider>
      {children}
      {mounted ? <BackgroundComponents /> : null}
    </MuiThemeProvider>
  );
}

