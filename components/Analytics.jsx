// components/Analytics.jsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Optional helper for custom events (use in your buttons etc.)
export function gaEvent(name, params = {}) {
  if (!GA_ID) return;
  window.gtag?.('event', name, params);
}

export default function Analytics() {
  if (!GA_ID) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef(''); // dedupe first render

  // Fire a page_view on every client-side route change
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    if (lastPathRef.current === url) return; // avoid duplicate on first mount
    lastPathRef.current = url;

    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_path: url,
      page_location: window.location.href,
    });
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Sends the initial page_view. We'll send subsequent ones on route change.
          gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
