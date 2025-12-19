import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nathan Newyen | Notes",
  description:
    "Personal notes on engineering, startups, and building products.",
  metadataBase: new URL("https://notes.newyen.dev"),
  openGraph: {
    title: "Nathan Newyen | Notes",
    description:
      "Personal notes on engineering, startups, and building products.",
    url: "https://notes.newyen.dev",
    siteName: "Nathan Newyen Notes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Newyen | Notes",
    description:
      "Personal notes on engineering, startups, and building products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
