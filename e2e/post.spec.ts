import { test, expect } from "@playwright/test";

test.describe("Post Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/posts/hello-world");
  });

  test("displays the post title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Hello World/i })
    ).toBeVisible();
  });

  test("displays back link", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /Back to home/i });
    await expect(backLink).toBeVisible();
  });

  test("can navigate back to home", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /Back to home/i });
    await backLink.click();

    await expect(page.getByText(/Hi, I'm Nhan Nguyen/i)).toBeVisible();
  });

  test("displays tags", async ({ page }) => {
    /* Check for tag pills */
    const tags = page.locator("header span.rounded-full");
    await expect(tags.first()).toBeVisible();
  });

  test("displays reading time", async ({ page }) => {
    await expect(page.getByText(/min read/i)).toBeVisible();
  });

  test("displays post content", async ({ page }) => {
    /* Check article content is visible */
    const article = page.locator("article");
    await expect(article).toBeVisible();
  });

  test("code blocks have copy button", async ({ page }) => {
    /* Find a code block */
    const codeBlock = page.locator("pre").first();
    await codeBlock.hover();

    /* Copy button should appear on hover */
    const copyButton = page.getByRole("button", { name: /copy/i });
    await expect(copyButton).toBeVisible();
  });

  test("code blocks have Monokai background", async ({ page }) => {
    const codeBlock = page.locator("pre").first();
    await expect(codeBlock).toHaveCSS("background-color", "rgb(39, 40, 34)");
  });
});
