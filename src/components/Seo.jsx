import { Helmet } from "react-helmet-async";
import { SITE } from "../data/site.js";

const origin = "https://1xlblaze.github.io";
const url = `${origin}/mayank-saxena.github.io/`;
const og = `${url}og-image.jpg`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressCountry: "IN" },
  url,
  sameAs: [SITE.github, SITE.linkedin],
  description: SITE.summary,
};

export function Seo() {
  return (
    <Helmet>
      <title>{SITE.name} — {SITE.title}</title>
      <meta name="description" content={SITE.summary} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${SITE.name} — ${SITE.headline}`} />
      <meta property="og:description" content={SITE.summary} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${SITE.name} — ${SITE.title}`} />
      <meta name="twitter:description" content={SITE.summary} />
      <meta name="twitter:image" content={og} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
