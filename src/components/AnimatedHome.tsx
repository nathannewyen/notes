"use client";

import Link from "next/link";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { RotatingText } from "./RotatingText";

interface PostWithFormattedDate {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
}

interface AnimatedHomeProps {
  posts: PostWithFormattedDate[];
}

export function AnimatedHome({ posts }: AnimatedHomeProps) {
  /* Scroll animation ref for the latest posts section */
  const [latestPostsRef, isLatestPostsVisible] = useScrollAnimation(0.1);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Hero Section - uses CSS animation for initial load */}
      <section className="mb-8 sm:mb-16 animate-fadeIn">
        <h1 className="text-lg sm:text-3xl font-bold mb-4 text-[#1A2234] dark:text-white whitespace-nowrap">
          Hi, I&apos;m Nhan Nguyen,{" "}
          <RotatingText
            texts={[
              "an ML Engineer.",
              "an Applied Scientist.",
              "a Writer & Speaker.",
              "an Operator-Angel.",
              "a Problem Solver.",
            ]}
            interval={3000}
          />
        </h1>

        <p className="text-base sm:text-lg text-[#1A2234] dark:text-[#a0a0a0] mb-4 sm:mb-6 leading-relaxed">
          I build recommendation systems and AI-powered experiences that serve customers at scale.
        </p>
        <p className="text-base sm:text-lg text-[#1A2234] dark:text-[#a0a0a0] mb-4 sm:mb-6 leading-relaxed">
          Currently, I&apos;m a Senior Software Engineer @ Chase. Outside of work, I also...
        </p>

        {/* Activities displayed as flowing text with light blue links */}
        <p className="text-base sm:text-lg text-[#1A2234] dark:text-[#a0a0a0] leading-relaxed">
          <a
            href="https://newyen.dev"
            className="text-[#3B82F6] hover:text-[#2563EB] hover:underline dark:text-[#60A5FA] dark:hover:text-[#93C5FD] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write
          </a>{" "}
          about engineering, product development, and what I&apos;m learning.
          <br />
          <a
            href="https://github.com/nathannewyen"
            className="text-[#3B82F6] hover:text-[#2563EB] hover:underline dark:text-[#60A5FA] dark:hover:text-[#93C5FD] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute
          </a>{" "}
          to open source projects.
          <br />
          Build AI-powered tools and experiment with LLMs.
        </p>
      </section>

      {/* Divider - delayed fade in animation */}
      <hr className="border-[#e0e0e0] dark:border-[#3a3a4e] mb-8 sm:mb-12 animate-fadeIn animation-delay-200" />

      {/* Latest Posts Section - uses scroll animation hook */}
      <section
        ref={latestPostsRef}
        className={`transition-all duration-700 ${
          isLatestPostsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-center text-[#1A2234] dark:text-white">
          Latest
        </h2>

        {posts.length === 0 ? (
          <p className="text-[#888] dark:text-[#a0a0a0] text-center">
            No posts yet. Check back soon!
          </p>
        ) : (
          <ul className="space-y-4 sm:space-y-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
              >
                <time className="text-xs sm:text-sm text-[#888] dark:text-[#a0a0a0] font-mono whitespace-nowrap">
                  {post.formattedDate}
                </time>
                <span className="hidden sm:inline text-[#ccc] dark:text-[#555]">
                  ·
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-[#1A2234] dark:text-white hover:underline transition-colors text-sm sm:text-base"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
