"use client";

import { useState, useEffect } from "react";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
}

export function RotatingText({ texts, interval = 3000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setInterval(() => {
      /* Fade out current text */
      setIsVisible(false);

      /* After fade out, change text and fade in */
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, interval);

    return () => clearInterval(fadeOutTimer);
  }, [texts.length, interval]);

  return (
    <span
      className={`inline-block transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {texts[currentIndex]}
    </span>
  );
}
