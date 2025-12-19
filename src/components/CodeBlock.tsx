"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  /* Extract text content from the code block for copying */
  const handleCopy = async () => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      const textToCopy = codeElement?.textContent ?? preRef.current.textContent ?? "";

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      /* Reset copied state after 2 seconds */
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-3 sm:my-4">
      {/* Copy button - positioned at top right */}
      <button
        onClick={handleCopy}
        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-md text-[#75715e] hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer border-0"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a6e22e]" />
        ) : (
          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
      </button>

      {/* Code block */}
      <pre
        ref={preRef}
        className={`bg-[#272822] p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm border-0 ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}
