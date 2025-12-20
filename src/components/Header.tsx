"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <Link
        href="/"
        className="font-mono font-bold text-base sm:text-lg text-[#1A2234] dark:text-white hover:opacity-80 transition-opacity tracking-wider"
      >
        NHAN.NGUYEN
      </Link>
      <div className="flex items-center gap-4">
        <a
          href="https://newyen.dev"
          className="font-mono text-sm sm:text-base text-[#1A2234] dark:text-white hover:opacity-80 transition-opacity tracking-wider"
          target="_blank"
          rel="noopener noreferrer"
        >
          PORTFOLIO
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
