// lib/site.js
export function getBaseUrl() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetexttool.com';
  return base.replace(/\/+$/, ''); // strip trailing slash
}
