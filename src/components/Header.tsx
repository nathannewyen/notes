"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <Link
        href="/"
        className="font-mono font-bold text-sm sm:text-base text-[#1A2234] dark:text-white hover:opacity-80 transition-opacity tracking-wide"
      >
        NHAN.NGUYEN
      </Link>
      <ThemeToggle />
    </header>
  );
}
