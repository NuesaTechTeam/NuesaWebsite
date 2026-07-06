import { useEffect } from "react";

export const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} | NUESA ABUAD`;
    } else {
      document.title = "NUESA ABUAD | Engineering Student Association";
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    let createdDesc = false;
    let prevDescription = "";
    if (metaDescription) {
      prevDescription = metaDescription.getAttribute("content") || "";
      if (description) {
        metaDescription.setAttribute("content", description);
      }
    } else if (description) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
      createdDesc = true;
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    let createdKeys = false;
    let prevKeywords = "";
    if (metaKeywords) {
      prevKeywords = metaKeywords.getAttribute("content") || "";
      if (keywords) {
        metaKeywords.setAttribute("content", keywords);
      }
    } else if (keywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
      createdKeys = true;
    }

    return () => {
      document.title = prevTitle;
      if (metaDescription) {
        if (createdDesc) {
          document.head.removeChild(metaDescription);
        } else {
          metaDescription.setAttribute("content", prevDescription);
        }
      }
      if (metaKeywords) {
        if (createdKeys) {
          document.head.removeChild(metaKeywords);
        } else {
          metaKeywords.setAttribute("content", prevKeywords);
        }
      }
    };
  }, [title, description, keywords]);
};

export default useSEO;
