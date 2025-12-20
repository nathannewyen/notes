"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!containerRef.current) return;

    /* Clear any existing comments */
    const container = containerRef.current;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    /* Create utterances script */
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "nathannewyen/notes");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      resolvedTheme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#e0e0e0] dark:border-[#3a3a4e]">
      <div ref={containerRef} />
    </div>
  );
}
