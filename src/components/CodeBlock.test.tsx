import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  beforeEach(() => {
    /* Mock clipboard API */
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders children correctly", () => {
    render(
      <CodeBlock>
        <code>const x = 1;</code>
      </CodeBlock>
    );

    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  it("renders copy button", () => {
    render(
      <CodeBlock>
        <code>const x = 1;</code>
      </CodeBlock>
    );

    const copyButton = screen.getByRole("button", { name: /copy code/i });
    expect(copyButton).toBeInTheDocument();
  });

  it("copies code to clipboard when button is clicked", async () => {
    render(
      <CodeBlock>
        <code>const x = 1;</code>
      </CodeBlock>
    );

    const copyButton = screen.getByRole("button", { name: /copy code/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("const x = 1;");
    });
  });

  it("shows check icon after copying", async () => {
    render(
      <CodeBlock>
        <code>const x = 1;</code>
      </CodeBlock>
    );

    const copyButton = screen.getByRole("button", { name: /copy code/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    const { container } = render(
      <CodeBlock className="custom-class">
        <code>test</code>
      </CodeBlock>
    );

    const preElement = container.querySelector("pre");
    expect(preElement).toHaveClass("custom-class");
  });
});
