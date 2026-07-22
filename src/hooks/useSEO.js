import { useEffect } from "react";

const SITE_URL = "https://nuesaabuad.ng";

export const useSEO = ({ title, description, keywords, ogImage, canonicalPath, structuredData }) => {
  const structuredDataString = structuredData ? JSON.stringify(structuredData) : "";

  useEffect(() => {
    // 1. Keep track of previous document title
    const prevTitle = document.title;

    // Set Document Title
    const formattedTitle = title ? `${title} | NUESA ABUAD` : "NUESA ABUAD | Nigerian Universities Engineering Students Association";
    document.title = formattedTitle;

    // Base URL for absolute meta tags
    const origin = SITE_URL;
    const path = canonicalPath || window.location.pathname;
    const fullUrl = `${origin}${path}`;

    // Default values if not provided
    const defaultDesc = "The official student platform for the Nigerian Universities Engineering Students Association (NUESA) Afe Babalola University chapter. Access digital library textbooks, past questions, academic resources, event details, and student portals.";
    const defaultKeywords = "NUESA, ABUAD, engineering students, Afe Babalola University, engineering resources, library textbooks, past questions, engineering portal, student association";
    const defaultImage = `${origin}/images/blog/logo.jpg`;

    const targetDesc = description || defaultDesc;
    const targetKeywords = keywords || defaultKeywords;
    const targetImage = ogImage ? (ogImage.startsWith("http") ? ogImage : `${origin}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`) : defaultImage;

    // Helper to update or create meta tags
    const tagsToManage = [];

    const manageMeta = (nameOrProperty, value) => {
      const isProperty = nameOrProperty.startsWith("og:");
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      let created = false;
      let prevValue = "";

      if (element) {
        prevValue = element.getAttribute("content") || "";
        element.setAttribute("content", value);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attribute, nameOrProperty);
        element.setAttribute("content", value);
        document.head.appendChild(element);
        created = true;
      }

      tagsToManage.push({ element, created, prevValue, type: "meta" });
    };

    // Helper to update or create link tags
    const manageLink = (rel, value) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      let created = false;
      let prevValue = "";

      if (element) {
        prevValue = element.getAttribute("href") || "";
        element.setAttribute("href", value);
      } else {
        element = document.createElement("link");
        element.rel = rel;
        element.href = value;
        document.head.appendChild(element);
        created = true;
      }

      tagsToManage.push({ element, created, prevValue, type: "link" });
    };

    // Apply Meta Tags
    manageMeta("title", formattedTitle);
    manageMeta("description", targetDesc);
    manageMeta("keywords", targetKeywords);

    // Open Graph
    manageMeta("og:title", formattedTitle);
    manageMeta("og:description", targetDesc);
    manageMeta("og:image", targetImage);
    manageMeta("og:url", fullUrl);

    // Twitter
    manageMeta("twitter:title", formattedTitle);
    manageMeta("twitter:description", targetDesc);
    manageMeta("twitter:image", targetImage);
    manageMeta("twitter:url", fullUrl);

    // Canonical Link
    manageLink("canonical", fullUrl);

    // Inject Structured Data (JSON-LD)
    let jsonLdScript = null;
    if (structuredData) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.text = structuredDataString;
      document.head.appendChild(jsonLdScript);
    }

    // Cleanup
    return () => {
      document.title = prevTitle;

      // Cleanup injected meta and link tags
      tagsToManage.forEach(({ element, created, prevValue, type }) => {
        if (element) {
          if (created) {
            document.head.removeChild(element);
          } else {
            if (type === "meta") {
              element.setAttribute("content", prevValue);
            } else if (type === "link") {
              element.setAttribute("href", prevValue);
            }
          }
        }
      });

      // Cleanup JSON-LD structured data
      if (jsonLdScript && document.head.contains(jsonLdScript)) {
        document.head.removeChild(jsonLdScript);
      }
    };
  }, [title, description, keywords, ogImage, canonicalPath, structuredData, structuredDataString]);
};

export default useSEO;
