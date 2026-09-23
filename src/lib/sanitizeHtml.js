import DOMPurify from "dompurify";

/**
 * Sanitize rich-text HTML before rendering with dangerouslySetInnerHTML.
 * Article content can come from public submissions, so never trust it raw.
 */
export const sanitizeHtml = (html) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "a",
      "ul", "ol", "li", "blockquote",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "code", "pre", "img", "span", "hr",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title"],
  });
