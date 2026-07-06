import React, { useEffect } from "react";
import { Executive } from "../components/Executives";
import useSEO from "../hooks/useSEO";
import { currentExecutivesData, pastExecutivesByYear } from "../lib/constants";

const Executives = () => {
  const currentNames = currentExecutivesData.map(e => e.name);
  const pastNames = pastExecutivesByYear.flatMap(year => year.executives.map(e => e.name));
  
  // Take first 5 current leaders for description
  const leadNamesStr = currentExecutivesData.slice(0, 5).map(e => `${e.name} (${e.position})`).join(", ");
  const seoDescription = `Meet the NUESA ABUAD Executive Committee and leadership team, including ${leadNamesStr}, and past student leaders who have served the association.`;
  const seoKeywords = `NUESA ABUAD executives, student leaders, ABUAD engineering leaders, ${[...currentNames, ...pastNames].join(", ")}`;

  useSEO({
    title: "Executive Committee",
    description: seoDescription,
    keywords: seoKeywords
  });

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "NUESA ABUAD Executive Committee",
      "description": "Meet the leadership team of the Nigerian Universities Engineering Students Association (NUESA) Afe Babalola University chapter.",
      "publisher": {
        "@type": "Organization",
        "name": "NUESA ABUAD",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nuesaabuad.org/images/blog/logo.jpg"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": currentExecutivesData.length,
        "itemListElement": currentExecutivesData.map((exco, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "Person",
            "name": exco.name,
            "jobTitle": exco.position,
            "worksFor": {
              "@type": "Organization",
              "name": "NUESA ABUAD"
            },
            "image": exco.image.startsWith("http") ? exco.image : `https://nuesaabuad.org${exco.image}`
          }
        }))
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-executives";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("jsonld-executives");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div>
      <Executive />
    </div>
  );
};

export default Executives;