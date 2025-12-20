"use client";

import Link from "next/link";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

/* Tag component - clickable with light blue styling */
function Tag({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="px-2 py-0.5 rounded bg-[#f0f0f0] dark:bg-[#1a1a2e] text-[#3B82F6] dark:text-[#60A5FA] text-xs hover:bg-[#e0e0e0] dark:hover:bg-[#2a2a3e] transition-colors"
    >
      {tag}
    </Link>
  );
}

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
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
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
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
              <span className="text-[#ccc] dark:text-[#555]">·</span>
            </>
          )}
          <span className="text-[#888] dark:text-[#a0a0a0]">
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
