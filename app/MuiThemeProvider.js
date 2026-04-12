'use client';

import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function MuiThemeProvider({ children }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#38bdf8',
          },
          background: {
            default: '#0f172a',
            paper: '#111827',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
          },
        },
        typography: {
          fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
          h3: {
            fontWeight: 700,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
