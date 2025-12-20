import { test, expect } from "@playwright/test";

test.describe("Post Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/posts/hello-world", { waitUntil: "networkidle" });
  });

  test("displays the post title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Hello World");
  });

  test("displays back link", async ({ page }) => {
    const backLink = page.locator("a", { hasText: "Back to home" });
    await expect(backLink).toBeVisible();
  });

  test("can navigate back to home", async ({ page }) => {
    const backLink = page.locator("a", { hasText: "Back to home" });
    await backLink.click();
    await page.waitForURL("/");

    await expect(page.locator("h1")).toContainText("Nhan Nguyen");
  });

  test("displays tags", async ({ page }) => {
    /* Check for tag pills */
    const tags = page.locator("main header .rounded-full");
    await expect(tags.first()).toBeVisible();
  });

  test("displays reading time", async ({ page }) => {
    await expect(page.locator("main header")).toContainText("min read");
  });

  test("displays post content", async ({ page }) => {
    /* Check article content is visible */
    const article = page.locator("article");
    await expect(article).toBeVisible();
  });

  test("code blocks are rendered", async ({ page }) => {
    /* Find a code block */
    const codeBlock = page.locator("pre").first();
    await expect(codeBlock).toBeVisible();
  });

  test("code blocks have dark background", async ({ page }) => {
    const codeBlock = page.locator("pre").first();
    await expect(codeBlock).toBeVisible();
    /* Check background is dark (Monokai #272822 = rgb(39, 40, 34)) */
    const bgColor = await codeBlock.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe("rgb(39, 40, 34)");
  });
});
