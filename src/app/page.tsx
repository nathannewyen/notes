import { getAllPosts, formatDate } from "@/lib/posts";
import { AnimatedHome } from "@/components/AnimatedHome";

export default function Home() {
  const posts = getAllPosts();

  /* Pre-format dates on server side since functions can't be passed to client components */
  const postsWithFormattedDates = posts.map((post) => ({
    ...post,
    formattedDate: formatDate(post.date),
  }));

  return <AnimatedHome posts={postsWithFormattedDates} />;
}
