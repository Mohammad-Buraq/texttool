import { getAllTools } from '@/data/tools';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thetexttools.com';
  const now = new Date().toISOString();

  const tools = getAllTools().map(t => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...tools,
  ];
}
