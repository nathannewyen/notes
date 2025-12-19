import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs, formatDate } from "@/lib/posts";

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Nathan Newyen`,
      description: post.description,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

// MDX components for custom styling
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-6 mb-3 text-foreground" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-foreground/80" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-5 mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-5 mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/80" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-foreground/20 pl-4 italic text-foreground/70 my-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-foreground/10 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto my-4 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="border-foreground/10 my-8" />,
};

// rehype-pretty-code options for syntax highlighting
const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="text-foreground/60 hover:text-foreground transition-colors mb-8 inline-block"
      >
        &larr; Back to home
      </Link>

      {/* Post header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">{post.title}</h1>
        <div className="flex items-center gap-3 text-foreground/50 text-sm">
          <time>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Post content */}
      <article className="prose-custom">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
            },
          }}
        />
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-foreground/5 text-foreground/60 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
