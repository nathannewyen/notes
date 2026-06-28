"use client";

import { Github, Linkedin } from "lucide-react";

/* X (formerly Twitter) icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border">
      {/* Main content - social links left, bio right */}
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Social links with labels */}
        <div className="flex flex-col gap-3">
          <a
            href="https://x.com/nathannewyenn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
          >
            <XIcon className="w-4 h-4" />
            <span>@nathannewyenn</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nhannguyen3112/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/nathannewyen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>@nathannewyen</span>
          </a>
        </div>

        {/* Bio text */}
        <div className="flex-1">
          <p className="text-muted leading-relaxed">
            I&apos;m a product engineer who builds customer-facing web products with React, TypeScript, and Next.js. Most recently at JPMorgan Chase (2023 — 2026), and currently open to new roles. I write about frontend engineering and product craft at{" "}
            <a
              href="https://notes.newyen.dev"
              className="text-link hover:underline"
            >
              notes.newyen.dev
            </a>
            .
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-muted">
        <span className="leading-none">©</span>
        <span>Nhan Nguyen 2024 - {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
