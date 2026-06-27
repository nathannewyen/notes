"use client";

import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGridProps {
  photos: Photo[];
  caption?: string;
  /* Tailwind aspect-ratio class. Defaults to portrait 3/4 for photos. */
  aspect?: string;
  /* Object-fit style. Defaults to "cover" for photos; use "contain" to avoid cropping screenshots. */
  fit?: "cover" | "contain";
}

/* Side-by-side photo/screenshot grid for blog posts */
export function PhotoGrid({
  photos,
  caption,
  aspect = "aspect-[3/4]",
  fit = "cover",
}: PhotoGridProps) {
  return (
    <figure className="my-6 sm:my-8">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`relative ${aspect} overflow-hidden rounded-lg bg-code-bg`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className={fit === "contain" ? "object-contain" : "object-cover"}
              sizes="(max-width: 768px) 50vw, 400px"
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 sm:mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
