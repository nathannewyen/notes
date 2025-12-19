"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="font-semibold text-[#1A2234] dark:text-white hover:opacity-80 transition-opacity"
      >
        Nhan Nguyen
      </Link>
      <ThemeToggle />
    </header>
  );
}
