import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/Header";

/* Inter font for body text - matches v4 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Space Mono font for monospace elements - matches v4 */
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Nhan Nguyen",
  description:
    "Personal notes on frontend engineering, React, and product craft.",
  metadataBase: new URL("https://notes.newyen.dev"),
  openGraph: {
    title: "Nhan Nguyen",
    description:
      "Personal notes on frontend engineering, React, and product craft.",
    url: "https://notes.newyen.dev",
    siteName: "Nhan Nguyen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhan Nguyen",
    description:
      "Personal notes on frontend engineering, React, and product craft.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
