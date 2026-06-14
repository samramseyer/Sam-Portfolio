import { professionalTitle, siteConfig } from "./site";

export const siteUrl = "https://samramseyer.com";

export const seo = {
  siteUrl,
  title: `${siteConfig.name} | Builder & Full Stack Developer`,
  description: `${siteConfig.name} — ${professionalTitle} Army veteran, carpenter, UT Full Stack Software Engineering (2025).`,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageAlt: `${siteConfig.name} — ${professionalTitle}`,
  locale: "en_US",
  themeColor: "#0b0f14",
} as const;

export function buildSeoHeadTags(): string {
  const { title, description, siteUrl, ogImage, ogImageAlt, locale, themeColor } = seo;

  return `
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="author" content="${escapeAttr(siteConfig.name)}" />
    <meta name="theme-color" content="${themeColor}" />
    <link rel="canonical" href="${siteUrl}/" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeAttr(siteConfig.name)}" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${escapeAttr(ogImageAlt)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${locale}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${escapeAttr(ogImageAlt)}" />
  `.trim();
}

export function buildJsonLd(): string {
  const projects = Object.entries(siteConfig.projectOverrides).map(([repo, project], index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title ?? repo,
      description: project.description,
      url: `${siteUrl}/#projects`,
    },
  }));

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        url: siteUrl,
        email: siteConfig.email,
        jobTitle: "Full Stack Developer",
        description: professionalTitle,
        sameAs: [siteConfig.githubUrl],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Docker",
          "AWS",
          "AI-powered products",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        mainEntity: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        name: "Portfolio Projects",
        itemListElement: projects,
      },
    ],
  };

  return JSON.stringify(payload);
}

export function buildCrawlerFallbackHtml(): string {
  const projects = Object.values(siteConfig.projectOverrides)
    .map((project) => `<li><strong>${escapeHtml(project.title ?? "Project")}</strong> — ${escapeHtml(project.description)}</li>`)
    .join("\n        ");

  const highlights = siteConfig.highlights
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n        ");

  return `
    <div style="max-width:48rem;margin:0 auto;padding:2rem 1.5rem;font-family:system-ui,sans-serif;line-height:1.6;color:#f0f4f8;background:#0b0f14;">
      <h1>${escapeHtml(siteConfig.name)}</h1>
      <p><strong>${escapeHtml(professionalTitle)}</strong></p>
      <p>${escapeHtml(siteConfig.tagline)}</p>
      <h2>About</h2>
      ${siteConfig.about.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n      ")}
      <h2>Highlights</h2>
      <ul>${highlights}</ul>
      <h2>Projects</h2>
      <ul>${projects}</ul>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${escapeAttr(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a></p>
      <p>GitHub: <a href="${escapeAttr(siteConfig.githubUrl)}">${escapeHtml(siteConfig.githubUrl)}</a></p>
    </div>
  `.trim();
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
