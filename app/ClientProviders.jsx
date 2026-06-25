"use client";

import MuiThemeProvider from "./MuiThemeProvider";
import BackgroundComponents from "./BackgroundComponents";

export default function ClientProviders({ children }) {
  return (
    <MuiThemeProvider>
      {children}
      <BackgroundComponents />
    </MuiThemeProvider>
  );
}

