"use client";

import { Github, Twitter, Linkedin } from "lucide-react";

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
            <Twitter className="w-5 h-5" />
            <span>X @nathannewyenn</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nhannguyen3112/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/nathannewyen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub @nathannewyen</span>
          </a>
          <a
            href="https://bsky.app/profile/newyenn.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#888] hover:text-[#1A2234] dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
            </svg>
            <span>Bluesky @newyenn</span>
          </a>
        </div>

        {/* Bio text */}
        <div className="flex-1">
          <p className="text-[#888] dark:text-[#a0a0a0] leading-relaxed">
            Senior Software Engineer @ Chase. Writing about AI and engineering.
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
