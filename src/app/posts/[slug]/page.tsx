import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { CodeBlock } from "@/components/CodeBlock";

/* Generate static params for all posts */
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* Generate metadata for each post */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Nhan Nguyen`,
      description: post.description,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

/* MDX components for custom styling - matches v4 colors */
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-[#1A2234] dark:text-white"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-[#1A2234] dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3 text-[#1A2234] dark:text-white"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 leading-relaxed text-[#1A2234] dark:text-[#a0a0a0]"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-5 mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-5 mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-[#1A2234] dark:text-[#a0a0a0]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[#1A2234] dark:text-white font-bold underline underline-offset-4 decoration-2"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-[#e0e0e0] dark:border-[#3a3a4e] pl-4 italic text-[#888] dark:text-[#a0a0a0] my-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-[#e0e0e0] dark:bg-[#2a2a3e] px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props} />
  ),
  hr: () => <hr className="border-[#e0e0e0] dark:border-[#3a3a4e] my-8" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-bold text-[#1A2234] dark:text-white"
      {...props}
    />
  ),
};

/* rehype-pretty-code options for syntax highlighting */
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
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Back link */}
      <Link
        href="/"
        className="text-sm sm:text-base text-[#888] dark:text-[#a0a0a0] hover:text-[#1A2234] dark:hover:text-white transition-colors mb-6 sm:mb-8 inline-block"
      >
        &larr; Back to home
      </Link>

      {/* Post header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1A2234] dark:text-white">
          {post.title}
        </h1>

        {/* Tags and reading time - Eugene Yan style */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-[#888] dark:text-[#a0a0a0]">[</span>
              <div className="flex items-center gap-2">
                {post.tags.map((tag, index) => (
                  <span key={tag}>
                    <span className="text-[#007bff]">{tag}</span>
                    {index < post.tags.length - 1 && (
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
            {post.readingTime}
          </span>
        </div>
      </header>

      {/* Post content */}
      <article>
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
    </main>
  );
}
