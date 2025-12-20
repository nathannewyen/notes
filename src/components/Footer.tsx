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
    <footer className="mt-16 pt-8 border-t border-[#e0e0e0] dark:border-[#3a3a4e]">
      {/* Main content - social links left, bio right */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Social links with labels */}
        <div className="flex flex-col gap-3">
          <a
            href="https://x.com/nathannewyenn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <XIcon className="w-4 h-4" />
            <span className="text-sm">@nathannewyenn</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nhannguyen3112/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="https://github.com/nathannewyen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">@nathannewyen</span>
          </a>
        </div>

        {/* Bio text */}
        <div className="flex-1">
          <p className="text-sm text-[#888] dark:text-[#a0a0a0] leading-relaxed">
            I&apos;m a Senior Software Engineer at JPMorgan Chase building AI-powered products that serve customers at scale. I write about AI, LLMs, and engineering at{" "}
            <a
              href="https://notes.newyen.dev"
              className="text-[#3B82F6] hover:underline dark:text-[#60A5FA]"
            >
              notes.newyen.dev
            </a>
            .
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[#888] dark:text-[#a0a0a0]">
        © Nhan Nguyen 2024 - {new Date().getFullYear()}
      </div>
    </footer>
  );
}
