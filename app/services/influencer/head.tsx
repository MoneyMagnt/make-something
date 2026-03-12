import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `influencer strategy | ${SITE_NAME}`;
const description =
  "creator strategy, campaign narrative, and launch operations focused on measurable business outcomes.";
const url = `${SITE_URL}/services/influencer`;

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
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
