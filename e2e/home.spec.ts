import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the greeting", async ({ page }) => {
    await expect(page.getByText(/Hi, I'm Nhan Nguyen/i)).toBeVisible();
  });

  test("displays JPMorgan Chase link", async ({ page }) => {
    const link = page.getByRole("link", { name: /JPMorgan Chase/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "https://www.jpmorganchase.com/");
  });

  test("displays interests section", async ({ page }) => {
    await expect(page.getByText(/I like rockets, AI, and LLMs/i)).toBeVisible();
  });

  test("displays activity links", async ({ page }) => {
    const writeLink = page.getByRole("link", { name: /^Write$/i });
    await expect(writeLink).toBeVisible();

    const contributeLink = page.getByRole("link", { name: /^Contribute$/i });
    await expect(contributeLink).toBeVisible();
  });

  test("displays Latest section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Latest" })).toBeVisible();
  });

  test("displays post list", async ({ page }) => {
    /* Check that at least one post is visible */
    const posts = page.locator("main ul li");
    await expect(posts.first()).toBeVisible();
  });

  test("can navigate to a post", async ({ page }) => {
    /* Click on the first post link */
    const firstPostLink = page.locator("main ul li a").first();
    const postTitle = await firstPostLink.textContent();

    await firstPostLink.click();

    /* Should navigate to post page and show the title */
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      postTitle!
    );
  });

  test("links have correct light blue color", async ({ page }) => {
    const jpMorganLink = page.getByRole("link", { name: /JPMorgan Chase/i });
    await expect(jpMorganLink).toHaveCSS("color", "rgb(59, 130, 246)");
  });
});
