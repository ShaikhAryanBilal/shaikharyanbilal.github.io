import { site, home, services, workHistory, siteUrl } from "@/lib/content";

function buildLlmsTxt(): string {
  const skills = workHistory.skills
    .map((s) => `- **${s.category}:** ${s.skills.join(", ")}`)
    .join("\n");

  const serviceList = services.services
    .map((s) => `- [${s.title}](${siteUrl}/services/${s.slug}): ${s.metaDescription}`)
    .join("\n");

  return `# ${site.name}

> ${home.hero.lede}

Personal portfolio site of ${site.name}, a ${site.tagline} based in ${site.location}. He focuses on building scalable backend systems, clean REST APIs, and secure, long-lived applications. His core stack is PHP and Laravel, with WordPress for custom plugins and themes, and he works with Next.js and Tailwind CSS for front-end projects.

## Skills

${skills}

## Services

${serviceList}

## Portfolio and background

- [Resume](${siteUrl}/resume): Full work history, projects, education, and certifications
- [Services](${siteUrl}/services): All offered services, with in-depth detail pages
- [Certifications](${siteUrl}/certifications): ${home.stats.find((s) => s.label === "Certifications")?.value ?? "22"} certifications across backend development and security

## Contact

- [Contact](${siteUrl}/#contact): WhatsApp, email, and social links
`;
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
