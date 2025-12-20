import { describe, it, expect } from "vitest";
import { formatDate } from "./posts";

describe("formatDate", () => {
  it("formats date string correctly", () => {
    const result = formatDate("2024-12-18");
    /* Result format: "Mon DD, YYYY" - check structure */
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{2}, \d{4}$/);
    expect(result).toContain("2024");
    expect(result).toContain("Dec");
  });

  it("handles different months", () => {
    const result = formatDate("2024-06-15");
    expect(result).toContain("Jun");
    expect(result).toContain("2024");
  });

  it("returns a string in expected format", () => {
    const result = formatDate("2024-03-05");
    /* Should match pattern like "Mar 05, 2024" */
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{2}, \d{4}$/);
  });
});
