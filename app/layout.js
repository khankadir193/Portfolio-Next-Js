import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import EmotionRegistry from "./EmotionRegistry";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL('https://abdulkadirkhan.dev'),
  title: "Abdul Kadir Khan - Personal Portfolio",
  description: "Portfolio website of Abdul Kadir Khan - Full Stack Developer | React, Next.js, Modern Web Development",
  icons: {
    icon: '/globe.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulkadirkhan.dev',
    title: 'Abdul Kadir Khan - Full Stack Developer',
    description: 'Portfolio website showcasing modern web development skills with React, Next.js, and cutting-edge technologies.',
    siteName: 'Abdul Kadir Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Kadir Khan - Full Stack Developer',
    description: 'Portfolio website showcasing modern web development skills.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#00d4ff" />
        <meta name="msapplication-TileColor" content="#0a0a0f" />
      </head>
      <body>
        <EmotionRegistry>
          <ClientProviders>
            <main>{children}</main>
          </ClientProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}
