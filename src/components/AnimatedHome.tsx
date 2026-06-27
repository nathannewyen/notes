"use client";

import Link from "next/link";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { RotatingText } from "./RotatingText";
import { Footer } from "./Footer";

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
        <h1 className="text-lg sm:text-3xl font-bold mb-4 text-foreground whitespace-nowrap">
          Hi, I&apos;m Nhan Nguyen,{" "}
          <RotatingText
            texts={[
              "a Frontend Engineer.",
              "a React Engineer.",
              "a UI Engineer.",
              "a Product Engineer.",
              "a Problem Solver.",
            ]}
            interval={3000}
          />
        </h1>

        <p className="text-base sm:text-lg text-muted mb-4 sm:mb-6 leading-relaxed">
          I build customer-facing web products with React, TypeScript, and Next.js — focused on the UI, performance, and the details that make interfaces feel right.
        </p>
        <p className="text-base sm:text-lg text-muted mb-4 sm:mb-6 leading-relaxed">
          Most recently, I was a Software Engineer III at{" "}
          <a
            href="https://www.jpmorganchase.com/"
            className="text-link hover:text-link-hover hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            JPMorgan Chase
          </a>
          {" "}(March 2023 — June 2026), where I built React/TypeScript frontends for the consumer card catalog and rewards platform. I&apos;m currently{" "}
          <span className="text-foreground font-semibold">open to new frontend roles</span>
          {" "}— feel free to{" "}
          <a
            href="mailto:nhan13574@gmail.com"
            className="text-link hover:text-link-hover hover:underline transition-colors"
          >
            reach out
          </a>
          .
        </p>

        {/* Activities displayed as flowing text with light blue links */}
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          <a
            href="https://newyen.dev"
            className="text-link hover:text-link-hover hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write
          </a>{" "}
          about frontend engineering, React, and product craft.
          <br />
          Build personal projects like{" "}
          <a
            href="https://github.com/nathannewyen/the-beuter-design-ecommerce-platform"
            className="text-link hover:text-link-hover hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Beuter Design
          </a>
          , an ecommerce platform built with Next.js and TypeScript.
          <br />
          <a
            href="https://github.com/nathannewyen"
            className="text-link hover:text-link-hover hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute
          </a>{" "}
          to open source projects.
        </p>
      </section>

      {/* Divider - delayed fade in animation */}
      <hr className="border-border mb-8 sm:mb-12 animate-fadeIn animation-delay-200" />

      {/* Latest Posts Section - uses scroll animation hook */}
      <section
        ref={latestPostsRef}
        className={`transition-all duration-700 ${
          isLatestPostsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-lg sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-foreground">
          Latest
        </h2>

        {posts.length === 0 ? (
          <p className="text-muted text-center">
            No posts yet. Check back soon!
          </p>
        ) : (
          <ul className="space-y-4 sm:space-y-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
              >
                <time className="text-xs sm:text-sm text-muted font-mono whitespace-nowrap">
                  {post.formattedDate}
                </time>
                <span className="hidden sm:inline text-separator">
                  ·
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-foreground hover:underline transition-colors text-sm sm:text-base"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer />
    </main>
  );
}
