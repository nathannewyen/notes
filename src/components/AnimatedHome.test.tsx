import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedHome } from "./AnimatedHome";

const mockPosts = [
  {
    slug: "test-post",
    title: "Test Post Title",
    date: "2024-12-18",
    formattedDate: "Dec 18, 2024",
  },
  {
    slug: "another-post",
    title: "Another Post",
    date: "2024-12-17",
    formattedDate: "Dec 17, 2024",
  },
];

describe("AnimatedHome", () => {
  it("renders the greeting", () => {
    render(<AnimatedHome posts={[]} />);
    expect(screen.getByText(/Hi, I'm Nhan Nguyen/i)).toBeInTheDocument();
  });

  it("renders JPMorgan Chase link", () => {
    render(<AnimatedHome posts={[]} />);
    const link = screen.getByRole("link", { name: /JPMorgan Chase/i });
    expect(link).toHaveAttribute("href", "https://www.jpmorganchase.com/");
  });

  it("renders interests section", () => {
    render(<AnimatedHome posts={[]} />);
    expect(screen.getByText(/I like rockets, AI, and LLMs/i)).toBeInTheDocument();
  });

  it("renders activity links", () => {
    render(<AnimatedHome posts={[]} />);

    const writeLink = screen.getByRole("link", { name: /Write/i });
    expect(writeLink).toHaveAttribute("href", "https://newyen.dev");

    const contributeLink = screen.getByRole("link", { name: /Contribute/i });
    expect(contributeLink).toHaveAttribute("href", "https://github.com/nathannewyen");
  });

  it("renders Latest section title", () => {
    render(<AnimatedHome posts={[]} />);
    expect(screen.getByText("Latest")).toBeInTheDocument();
  });

  it("shows empty state when no posts", () => {
    render(<AnimatedHome posts={[]} />);
    expect(screen.getByText(/No posts yet/i)).toBeInTheDocument();
  });

  it("renders posts when provided", () => {
    render(<AnimatedHome posts={mockPosts} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Another Post")).toBeInTheDocument();
  });

  it("renders post dates", () => {
    render(<AnimatedHome posts={mockPosts} />);

    expect(screen.getByText("Dec 18, 2024")).toBeInTheDocument();
    expect(screen.getByText("Dec 17, 2024")).toBeInTheDocument();
  });

  it("renders post links correctly", () => {
    render(<AnimatedHome posts={mockPosts} />);

    const postLink = screen.getByRole("link", { name: "Test Post Title" });
    expect(postLink).toHaveAttribute("href", "/posts/test-post");
  });
});
