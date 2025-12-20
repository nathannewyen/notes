import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { CodeBlock } from "@/components/CodeBlock";
import { AnimatedPost } from "@/components/AnimatedPost";
import { Comments } from "@/components/Comments";
import { Footer } from "@/components/Footer";

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
      className="text-[#3B82F6] hover:text-[#2563EB] hover:underline dark:text-[#60A5FA] dark:hover:text-[#93C5FD] transition-colors"
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
  theme: "monokai",
  keepBackground: false,
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
    <AnimatedPost
      title={post.title}
      tags={post.tags}
      readingTime={post.readingTime}
    >
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
          },
        }}
      />
      <Comments />
      <Footer />
    </AnimatedPost>
  );
}
