"use client";

import Link from "next/link";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface AnimatedPostProps {
  title: string;
  tags: string[];
  readingTime: string;
  children: ReactNode;
}

export function AnimatedPost({
  title,
  tags,
  readingTime,
  children,
}: AnimatedPostProps) {
  /* Scroll animation for the article content */
  const [articleRef, isArticleVisible] = useScrollAnimation(0.05);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Back link - immediate fade in */}
      <Link
        href="/"
        className="text-sm sm:text-base text-[#888] dark:text-[#a0a0a0] hover:text-[#1A2234] dark:hover:text-white transition-colors mb-6 sm:mb-8 inline-block animate-fadeIn"
      >
        &larr; Back to home
      </Link>

      {/* Post header - fade in with slight delay */}
      <header className="mb-6 sm:mb-8 animate-fadeIn animation-delay-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1A2234] dark:text-white">
          {title}
        </h1>

        {/* Tags and reading time */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {tags && tags.length > 0 && (
            <>
              <span className="text-[#888] dark:text-[#a0a0a0]">[</span>
              <div className="flex items-center gap-2">
                {tags.map((tag, index) => (
                  <span key={tag}>
                    <span className="text-[#007bff]">{tag}</span>
                    {index < tags.length - 1 && (
                      <span className="text-[#888] dark:text-[#a0a0a0] ml-2">
                        |
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-[#888] dark:text-[#a0a0a0]">]</span>
              <span className="text-[#888] dark:text-[#a0a0a0]">·</span>
            </>
          )}
          <span className="italic text-[#888] dark:text-[#a0a0a0]">
            {readingTime}
          </span>
        </div>
      </header>

      {/* Post content - scroll triggered animation */}
      <article
        ref={articleRef}
        className={`transition-all duration-700 ${
          isArticleVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {children}
      </article>
    </main>
  );
}
