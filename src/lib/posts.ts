import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Directory where MDX posts are stored
const postsDirectory = path.join(process.cwd(), "content/posts");

// Post metadata type definition
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

// Full post type including content
export interface Post extends PostMeta {
  content: string;
}

// Get all post slugs for static generation
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get metadata for a single post by slug
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags,
    readingTime: readingTime(content).text,
    content,
  };
}

// Get all posts sorted by date (newest first)
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      /* Return only metadata, exclude content from the returned object */
      const { slug: postSlug, title, date, description, tags, readingTime: readTime } = post;
      return { slug: postSlug, title, date, description, tags, readingTime: readTime };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Format date for display (e.g., "14 Dec 2024")
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
