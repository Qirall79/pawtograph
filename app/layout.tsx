import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Analytics } from "@vercel/analytics/react";

TimeAgo.addDefaultLocale(en);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawtograph",
  description: "A social media app dedicated to pet owners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/d4e617bed0.js"
        crossOrigin="anonymous"
      />
      <body
        className={
          inter.className +
          " bg-slate-200 w-screen min-h-screen text-black overflow-x-hidden"
        }
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
