import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from 'nextjs-toploader';

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Lost and Found Platform",
  description: "Efficiently manage lost and found items with our platform.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Lost and Found Platform",
    description: "Efficiently manage lost and found items with our platform.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Lost and Found Platform",
    description: "Efficiently manage lost and found items with our platform."
  }
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextTopLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
