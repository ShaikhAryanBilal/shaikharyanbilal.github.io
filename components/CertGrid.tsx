import Image from "next/image";

function labelFromSrc(src: string): string {
  const base = (src.split("/").pop() ?? src).replace(/\.[a-z0-9]+$/i, "");
  const words = base.split(/[-_]+/).filter(Boolean);
  return words.length ? words.join(" ") : "Certification";
}

export default function CertGrid({ images }: { images: string[] }) {
  return (
    <>
      {images.map((src) => {
        const label = labelFromSrc(src);
        return (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card cert-clickable"
            aria-label={`View ${label} certificate`}
          >
            <Image
              src={src}
              alt={`${label} certificate`}
              fill
              sizes="(max-width: 900px) 50vw, 33vw"
            />
          </a>
        );
      })}
    </>
  );
}
