//todo make dark and light
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dark.settings} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
