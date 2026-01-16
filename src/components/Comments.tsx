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

    /* Create Giscus script */
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "nathannewyen/notes");
    script.setAttribute("data-repo-id", "R_kgDOQra4AA");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQra4AM4C1DJt");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "0");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark" : "light"
    );
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
      <div ref={containerRef} />
    </div>
  );
}
