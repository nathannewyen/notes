import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-4 text-[#1A2234] dark:text-white">
          Hi, I&apos;m Nathan Newyen.
        </h1>

        <p className="text-lg text-[#1A2234] dark:text-[#a0a0a0] mb-6 leading-relaxed">
          I build products at{" "}
          <a
            href="https://www.jpmorganchase.com/"
            className="text-[#007bff] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            JPMorgan Chase
          </a>{" "}
          and my own startup{" "}
          <a
            href="https://getgrably.com/"
            className="text-[#007bff] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Grably
          </a>
          . Outside of work, I also...
        </p>

        <ul className="list-disc list-outside pl-5 space-y-2 text-[#1A2234] dark:text-[#a0a0a0]">
          <li>
            <a
              href="https://newyen.dev"
              className="text-[#007bff] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Write
            </a>{" "}
            about engineering, startups, and building products
          </li>
          <li>
            <a
              href="https://newyen.dev/contributions"
              className="text-[#007bff] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute
            </a>{" "}
            to open source (Go, and more)
          </li>
          <li>Build side projects and prototype new ideas</li>
        </ul>
      </section>

      {/* Divider */}
      <hr className="border-[#e0e0e0] dark:border-[#3a3a4e] mb-12" />

      {/* Latest Posts Section */}
      <section>
        <h2 className="text-xl font-bold mb-8 text-center text-[#1A2234] dark:text-white">
          Latest
        </h2>

        {posts.length === 0 ? (
          <p className="text-[#888] dark:text-[#a0a0a0] text-center">
            No posts yet. Check back soon!
          </p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-baseline gap-3">
                <time className="text-sm text-[#888] dark:text-[#a0a0a0] font-mono whitespace-nowrap">
                  {formatDate(post.date)}
                </time>
                <span className="text-[#ccc] dark:text-[#555]">·</span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-[#1A2234] dark:text-white hover:text-[#007bff] transition-colors"
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
