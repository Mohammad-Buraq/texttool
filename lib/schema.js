// lib/schema.js
export function softwareAppSchema(tool, baseUrl) {
  const url = `${baseUrl}/tools/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url,
    isAccessibleForFree: true,
    description: tool.description,
    // Optional: add later when you have usage/reviews:
    // aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: 1280 },
    // offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "The Text Tool" },
  };
}

export function breadcrumbSchema(tool, baseUrl) {
  const url = `${baseUrl}/tools/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${baseUrl}/categories` },
      { "@type": "ListItem", position: 3, name: tool.name, item: url },
    ],
  };
}
