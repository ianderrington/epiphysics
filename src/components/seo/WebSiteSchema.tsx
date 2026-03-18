import React from 'react';

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  author?: string;
}

export default function WebSiteSchema({
  name = "Epiphysics",
  url = "https://epiphysics.xyz",
  description = "Personal blog, research insights, and musings on AI, physics, and genomics",
  author = "https://epiphysics.xyz/#org"
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@id": author
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
