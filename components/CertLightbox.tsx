"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function CertLightbox({ images, start = 0 }: { images: string[]; start?: number }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(start);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <>
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          className="cert-card cert-clickable"
          onClick={() => { setIndex(i); setOpen(true); }}
          aria-label={`View certification ${i + 1}`}
        >
          <Image src={src} alt="Certification" fill sizes="(max-width: 900px) 50vw, 33vw" />
        </button>
      ))}

      <div className={`lightbox-backdrop${open ? " open" : ""}`} onClick={close} aria-hidden="true" />

      <div
        className={`lightbox${open ? " open" : ""}`}
        role="dialog"
        aria-label="Certification viewer"
        aria-modal="true"
        onClick={close}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={(e) => { e.stopPropagation(); close(); }}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="lightbox-arrow lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {open && (
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[index]}
              alt={`Certification ${index + 1}`}
              fill
              sizes="90vw"
              key={images[index]}
            />
          </div>
        )}

        {images.length > 1 && (
          <p className="lightbox-counter">{index + 1} / {images.length}</p>
        )}
      </div>
    </>
  );
}
