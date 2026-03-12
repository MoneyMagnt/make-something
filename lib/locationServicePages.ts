export type LocationServiceFaq = {
  question: string;
  answer: string;
};

export type LocationServicePage = {
  slug: string;
  pageTitle: string;
  metaDescription: string;
  headline: string;
  subheading: string;
  serviceType: "SEO" | "Content Marketing" | "Influencer Marketing";
  areaServed: string;
  benefits: string[];
  deliverables: string[];
  faqs: LocationServiceFaq[];
};

export const LOCATION_SERVICE_PAGES: LocationServicePage[] = [
  {
    slug: "seo-agency-ghana",
    pageTitle: "seo agency in ghana",
    metaDescription:
      "zyra helps brands in ghana grow qualified leads through technical seo, search intent mapping, and conversion-ready pages.",
    headline: "seo agency in ghana",
    subheading:
      "we build a full seo growth system that improves rankings for high-intent searches and turns that traffic into leads.",
    serviceType: "SEO",
    areaServed: "Ghana",
    benefits: [
      "better rankings for local and national high-intent keywords",
      "higher quality organic traffic from people ready to buy",
      "conversion-focused page structure that turns visits into action",
    ],
    deliverables: [
      "technical seo audit and fixes",
      "keyword intent map for priority pages",
      "on-page optimization with content briefs",
      "monthly reporting with wins and next actions",
    ],
    faqs: [
      {
        question: "how fast can we see seo movement in ghana?",
        answer:
          "most brands start seeing traction in 6 to 12 weeks, with stronger compounding outcomes over 3 to 6 months.",
      },
      {
        question: "do you only support accra-based teams?",
        answer:
          "no. we support teams across ghana and can run delivery remotely with weekly reporting.",
      },
    ],
  },
  {
    slug: "seo-agency-accra",
    pageTitle: "seo agency in accra",
    metaDescription:
      "seo support for accra brands that want more qualified search traffic, stronger visibility, and measurable pipeline growth.",
    headline: "seo agency in accra",
    subheading:
      "zyra helps accra-based teams win more demand from search with technical cleanup, content planning, and conversion-first pages.",
    serviceType: "SEO",
    areaServed: "Accra, Ghana",
    benefits: [
      "stronger visibility for service and location queries",
      "clean technical foundation that supports stable rankings",
      "clear seo reporting tied to leads and opportunities",
    ],
    deliverables: [
      "site health and crawlability fixes",
      "local intent keyword clusters",
      "optimized service page copy and metadata",
      "monthly roadmap and iteration plan",
    ],
    faqs: [
      {
        question: "can you optimize for both local and national keywords?",
        answer:
          "yes. we plan keyword clusters by intent and location so you can rank in accra and broader ghana searches.",
      },
      {
        question: "do we need a big team to run this?",
        answer:
          "no. we handle strategy and execution, then align with your team in short weekly check-ins.",
      },
    ],
  },
  {
    slug: "content-marketing-ghana",
    pageTitle: "content marketing in ghana",
    metaDescription:
      "content marketing systems for brands in ghana: strategy, production workflow, and performance loops that grow demand.",
    headline: "content marketing in ghana",
    subheading:
      "we build a content engine that keeps your brand visible, trusted, and top-of-mind with the right audience.",
    serviceType: "Content Marketing",
    areaServed: "Ghana",
    benefits: [
      "consistent weekly content that compounds brand trust",
      "clear campaign themes tied to commercial goals",
      "faster buyer confidence before sales conversations",
    ],
    deliverables: [
      "campaign hooks and monthly content pillars",
      "short-form and long-form content planning",
      "creative direction and publishing calendar",
      "performance analysis and optimization loop",
    ],
    faqs: [
      {
        question: "what content formats do you support?",
        answer:
          "we support short-form videos, carousels, long-form pages, and campaign assets based on your audience behavior.",
      },
      {
        question: "how do you measure content success?",
        answer:
          "we track engagement quality, branded search lift, lead actions, and assisted conversions.",
      },
    ],
  },
  {
    slug: "content-marketing-accra",
    pageTitle: "content marketing in accra",
    metaDescription:
      "accra content marketing support for brands that want stronger brand recall, higher engagement, and more inbound interest.",
    headline: "content marketing in accra",
    subheading:
      "zyra helps teams in accra run consistent, strategic content that turns attention into demand.",
    serviceType: "Content Marketing",
    areaServed: "Accra, Ghana",
    benefits: [
      "content calendars built around audience intent",
      "clear messaging that reflects your brand voice",
      "weekly optimization based on what performs",
    ],
    deliverables: [
      "content strategy and channel plan",
      "campaign creative direction",
      "editing and publishing workflow design",
      "performance review and scale recommendations",
    ],
    faqs: [
      {
        question: "can you work with our internal creative team?",
        answer:
          "yes. we can lead strategy while collaborating with your in-house designers and editors.",
      },
      {
        question: "do you also support website content?",
        answer:
          "yes. we support website and landing page content that aligns with your social campaigns and sales goals.",
      },
    ],
  },
  {
    slug: "influencer-marketing-ghana",
    pageTitle: "influencer marketing in ghana",
    metaDescription:
      "influencer marketing strategy in ghana focused on creator fit, campaign execution, and measurable growth outcomes.",
    headline: "influencer marketing in ghana",
    subheading:
      "we launch creator campaigns with the right partnerships, clear narrative, and real performance tracking.",
    serviceType: "Influencer Marketing",
    areaServed: "Ghana",
    benefits: [
      "creator partnerships aligned to audience fit, not vanity metrics",
      "campaign offers designed to move real action",
      "clear post-campaign analysis to improve each launch",
    ],
    deliverables: [
      "creator sourcing and shortlist validation",
      "campaign messaging and offer framework",
      "timeline planning and rollout support",
      "performance reporting and optimization insights",
    ],
    faqs: [
      {
        question: "how do you pick creators for campaigns?",
        answer:
          "we prioritize audience relevance, content quality, brand fit, and historical performance before final selection.",
      },
      {
        question: "can influencer campaigns drive direct sales?",
        answer:
          "yes, when campaigns are structured around clear offers, landing pages, and conversion tracking.",
      },
    ],
  },
  {
    slug: "influencer-marketing-accra",
    pageTitle: "influencer marketing in accra",
    metaDescription:
      "creator campaign support for accra brands that want stronger reach, better brand fit, and trackable business results.",
    headline: "influencer marketing in accra",
    subheading:
      "zyra helps accra teams plan and execute creator campaigns that convert attention into pipeline and sales.",
    serviceType: "Influencer Marketing",
    areaServed: "Accra, Ghana",
    benefits: [
      "local creator mapping for stronger cultural relevance",
      "campaign messaging tailored for audience action",
      "execution workflow that reduces delays and missed opportunities",
    ],
    deliverables: [
      "creator partner selection and outreach",
      "briefing and campaign narrative development",
      "launch operations and progress tracking",
      "reporting with scale and retention recommendations",
    ],
    faqs: [
      {
        question: "do you manage one-off launches or ongoing campaigns?",
        answer:
          "we support both one-off campaign bursts and ongoing monthly creator programs.",
      },
      {
        question: "can we combine influencer and content strategy?",
        answer:
          "yes. combining both usually improves consistency, repurposing, and overall campaign return.",
      },
    ],
  },
];

export function getLocationServicePageBySlug(slug: string) {
  return LOCATION_SERVICE_PAGES.find((item) => item.slug === slug) ?? null;
}
