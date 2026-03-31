import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "./MuiThemeProvider";
import AmbientBackground from "./AmbientBackground";
import BackgroundName from "./BackgroundName";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abdul Kadir Khan - Personal Portfolio",
  description: "Portfolio website of Abdul Kadir Khan - Full Stack Developer",
  icons: {
    icon: '/globe.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <MuiThemeProvider>
          <AmbientBackground />
          <BackgroundName />
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}
