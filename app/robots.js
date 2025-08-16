// app/robots.js
import { getBaseUrl } from '@/lib/site'; // we created this earlier

export default function robots() {
  const base = getBaseUrl();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base, // optional; Google ignores "Host", but if you keep it, ensure it's correct
  };
}
