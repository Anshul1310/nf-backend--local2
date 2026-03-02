import type { Metadata, Viewport } from "next";
import { Bangers, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: 'swap',
});

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#D00000',
};

export const metadata: Metadata = {
  title: "NITTFEST '26",
  description: "The Annual Interdepartmental Cultural Extravaganza of NIT Trichy",
  icons: {
    icon: "/logo.png",
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${roboto.variable} antialiased bg-comic-red`}
        style={{
          '--font-bangers': bangers.style.fontFamily,
          '--font-roboto': roboto.style.fontFamily,
        } as React.CSSProperties}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
