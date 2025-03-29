import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { RootLayout } from "@/components/layout/RootLayout";

export const metadata: Metadata = {
  title: "ZenVault - Secure Your Digital Assets",
  description:
    "The most secure and peaceful way to store, manage, and protect your valuable digital assets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background text-foreground">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
