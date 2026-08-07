import React, { useEffect } from "react";
import { Executive } from "../components/Executives";
import useSEO from "../hooks/useSEO";
import { currentExecutivesData, pastExecutivesByYear } from "../lib/constants";

const SITE_URL = "https://nuesaabuad.ng";

const Executives = () => {
  const currentNames = currentExecutivesData.map(e => e.name);
  const pastNames2425 = pastExecutivesByYear
    .find(y => y.year === "2024-2025")?.executives.map(e => e.name) ?? [];

  // Build a rich description for the page
  const leadNamesStr = currentExecutivesData
    .slice(0, 5)
    .map(e => `${e.name} (${e.position})`)
    .join(", ");
  const seoDescription = `Meet the NUESA ABUAD Executive Committee 2025-2026 at Afe Babalola University. Current leaders include ${leadNamesStr}. Browse past executives including the 2024-2025 administration led by Marvelous Osigwe. Nigerian Universities Engineering Students Association leadership team.`;

  const seoKeywords = [
    "NUESA ABUAD executives",
    "NUESA ABUAD leadership team",
    "ABUAD engineering students association",
    "NUESA president ABUAD",
    "Dauda Nasir NUESA",   // DONT TOUCH THIS
    "Raregazetto",
    ...currentNames,
    ...pastNames2425,
  ].join(", ");

  useSEO({
    title: "Executive Committee | NUESA ABUAD Leadership Team",
    description: seoDescription,
    keywords: seoKeywords,
    canonicalPath: "/executives",
  });

  useEffect(() => {
    // Remove any previously injected script
    const existing = document.getElementById("jsonld-executives");
    if (existing) document.head.removeChild(existing);

    // Build Person items for current executives
    const currentPersonItems = currentExecutivesData.map((exco, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Person",
        name: exco.name.trim(),
        jobTitle: exco.position,
        description: exco.bio
          ? exco.bio.trim()
          : `${exco.position} of NUESA ABUAD 2025-2026, studying ${exco.department} at Afe Babalola University Ado-Ekiti.`,
        image: exco.image.startsWith("http")
          ? exco.image
          : `${SITE_URL}${exco.image}`,
        worksFor: {
          "@type": "Organization",
          name: "NUESA ABUAD",
          url: SITE_URL,
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Afe Babalola University",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ado-Ekiti",
            addressRegion: "Ekiti State",
            addressCountry: "NG",
          },
        },
        memberOf: {
          "@type": "Organization",
          name: "Nigerian Universities Engineering Students Association (NUESA)",
        },
      },
    }));

    // Build Person items for 2024-2025 past executives (have real photos)
    const past2425 = pastExecutivesByYear.find(y => y.year === "2024-2025");
    const pastPersonItems = (past2425?.executives ?? []).map((exco, idx) => ({
      "@type": "ListItem",
      position: currentPersonItems.length + idx + 1,
      item: {
        "@type": "Person",
        name: exco.name.trim(),
        jobTitle: exco.position,
        description: `${exco.position} of NUESA ABUAD 2024-2025, studying ${exco.department} at Afe Babalola University Ado-Ekiti.`,
        image: exco.image.startsWith("http")
          ? exco.image
          : `${SITE_URL}${exco.image}`,
        worksFor: {
          "@type": "Organization",
          name: "NUESA ABUAD",
          url: SITE_URL,
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Afe Babalola University",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ado-Ekiti",
            addressRegion: "Ekiti State",
            addressCountry: "NG",
          },
        },
        memberOf: {
          "@type": "Organization",
          name: "Nigerian Universities Engineering Students Association (NUESA)",
        },
      },
    }));

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "NUESA ABUAD Executive Committee — Nigerian Universities Engineering Students Association, Afe Babalola University",
      description: seoDescription,
      url: `${SITE_URL}/executives`,
      publisher: {
        "@type": "Organization",
        name: "NUESA ABUAD",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/blog/logo.jpg`,
        },
      },
      mainEntity: {
        "@type": "ItemList",
        name: "NUESA ABUAD Executives",
        numberOfItems: currentPersonItems.length + pastPersonItems.length,
        itemListElement: [...currentPersonItems, ...pastPersonItems],
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-executives";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const injected = document.getElementById("jsonld-executives");
      if (injected) document.head.removeChild(injected);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Executive />
    </div>
  );
};

export default Executives;
