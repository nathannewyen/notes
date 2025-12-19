import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
