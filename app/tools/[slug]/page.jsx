import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { Suspense } from "react";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/data/tools";
import { getBaseUrl } from "@/lib/site";

/** Pre-render all tool routes (SSG) */
export async function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

/** Per-page SEO with absolute canonical + OG/Twitter images */
export async function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool not found • The Text Tool" };

  const base = getBaseUrl();
  const url = `${base}/tools/${tool.slug}`;
  const imgUrl = `${base}/api/og?title=${encodeURIComponent(tool.name)}`;

  return {
    title: `${tool.name} — Free Online Tool`,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url,
      type: "website",
      images: [{ url: imgUrl, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
      images: [imgUrl],
    },
  };
}

export default async function Page({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  // ✅ FIX 1: use the lowercase property from your registry
  const ToolComponent = tool.component;

  // ✅ FIX 2: pass slug to related-tools helper (your helper expects a slug)
  const related = getRelatedTools(tool.slug);

  // (tool.Long usage is fine: member expression is allowed in JSX)
  return (
    <>
      <ToolLayout
        title={tool.name}
        description={tool.description}
        related={related}
        longContent={tool.Long ? <tool.Long /> : null}
        accent={tool.accent || "blue"}
      >
        <Suspense fallback={null}>
          <ToolComponent />
        </Suspense>
      </ToolLayout>
    </>
  );
}
