"use client";

import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGridProps {
  photos: Photo[];
  caption?: string;
}

/* Side-by-side photo grid for blog posts */
export function PhotoGrid({ photos, caption }: PhotoGridProps) {
  return (
    <figure className="my-6 sm:my-8">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
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
