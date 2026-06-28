import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("displays the greeting", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Nhan Nguyen");
  });

  test("displays JPMorgan Chase link", async ({ page }) => {
    const link = page.getByRole("link", { name: /JPMorgan Chase/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "https://www.jpmorganchase.com/");
  });

  test("displays current job-search status", async ({ page }) => {
    await expect(page.locator("main")).toContainText("open to new product engineering roles");
  });

  test("displays The Beuter Design project link", async ({ page }) => {
    const link = page.getByRole("link", { name: /The Beuter Design/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      "https://github.com/nathannewyen/the-beuter-design-ecommerce-platform",
    );
  });

  test("displays activity links", async ({ page }) => {
    const writeLink = page.getByRole("link", { name: "Write" });
    await expect(writeLink).toBeVisible();

    const contributeLink = page.getByRole("link", { name: "Contribute" });
    await expect(contributeLink).toBeVisible();
  });

  test("displays Latest section", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Latest");
  });

  test("displays post list", async ({ page }) => {
    /* Check that at least one post link is visible */
    const postLinks = page.locator("main section ul li a");
    await expect(postLinks.first()).toBeVisible();
  });

  test("can navigate to a post", async ({ page }) => {
    /* Click on the first post link */
    const firstPostLink = page.locator("main section ul li a").first();
    await expect(firstPostLink).toBeVisible();

    await firstPostLink.click();
    await page.waitForURL(/\/posts\//);

    /* Should navigate to post page */
    await expect(page.locator("h1")).toBeVisible();
  });

  test("links have light blue color", async ({ page }) => {
    const jpMorganLink = page.getByRole("link", { name: /JPMorgan Chase/i });
    await expect(jpMorganLink).toBeVisible();
    /* Check the link has blue-ish color */
    const color = await jpMorganLink.evaluate((el) => getComputedStyle(el).color);
    expect(color).toContain("59");
  });
});
