import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "seo growth system in ghana | zyra gh";
const description =
  "technical seo, intent mapping, and conversion-focused pages in ghana to turn search traffic into qualified pipeline.";
const url = `${SITE_URL}/services/seo`;

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="zyra gh" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/opengraph-image`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/opengraph-image`} />
    </>
  );
}
