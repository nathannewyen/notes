import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, formatDate } from "@/lib/posts";

/* Generate static params for all tags */
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

/* Generate metadata for each tag page */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  return {
    title: `Tag: ${tag} | Nhan Nguyen`,
    description: `Posts tagged with "${tag}"`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  /* Return 404 if tag doesn't exist */
  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Back link */}
      <Link
        href="/"
        className="text-sm sm:text-base text-muted hover:text-foreground transition-colors mb-6 sm:mb-8 inline-block"
      >
        &larr; Back to home
      </Link>

      {/* Tag header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Tag:{" "}
          <span className="text-link font-mono">
            {tag}
          </span>{" "}
          <span className="text-muted">({posts.length})</span>
        </h1>
      </header>

      {/* All tags */}
      <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-border">
        <Link
          href="/"
          className="px-2 py-1 rounded text-sm text-muted hover:text-foreground transition-colors"
        >
          all
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/tags/${t}`}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              t === tag
                ? "bg-link text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Posts list */}
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <h2 className="text-xl font-bold text-foreground group-hover:text-link transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-muted mb-2">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <time>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
                <span>·</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-link"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
