import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { Suspense } from "react";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/data/tools";

/** Pre-render all tool routes (SSG) */
export async function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

/** Per-page SEO */
export async function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool not found • Text Tools" };

  const canonical = `/tools/${tool.slug}`;
  return {
    title: tool.seoTitle || `${tool.name} — Free, Fast, Private`,
    description: tool.seoDescription || tool.description,
    alternates: { canonical },
    openGraph: {
      title: tool.seoTitle || tool.name,
      description: tool.seoDescription || tool.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle || tool.name,
      description: tool.seoDescription || tool.description,
    },
  };
}

// ...imports & metadata unchanged...

export default function ToolPage({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  const ToolComponent = tool.component;
  const Related = getRelatedTools(tool.slug);

  const faqSchema = tool.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

  return (
    <>
      <ToolLayout
        title={tool.name}
        description={tool.description}
        related={Related}
        longContent={tool.Long ? <tool.Long /> : null}
        accent={tool.accent || "blue"}
      >
        <Suspense fallback={null}>
          <ToolComponent />
        </Suspense>
      </ToolLayout>

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
