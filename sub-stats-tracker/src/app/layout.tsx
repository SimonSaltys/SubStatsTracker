//todo make dark and light
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dark = {
  settings: " bg-ObsidianMoss text-ParchmentGlow"
}

const light = {
  settings: "bg-white text-AshGray"
}

export const metadata: Metadata = {
  title: "Subtitle Text Tracker",
  description: "Created by Simon Saltikov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" 
        />
        {/* Add more meta tags for dark/light mode if needed */}
      </Head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} ${light.settings} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
