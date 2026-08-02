import Image from "next/image";

export default function CertGrid({ images }: { images: string[] }) {
  return (
    <>
      {images.map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-card cert-clickable"
          aria-label={`View certification ${i + 1}`}
        >
          <Image src={src} alt="Certification" fill sizes="(max-width: 900px) 50vw, 33vw" />
        </a>
      ))}
    </>
  );
}
