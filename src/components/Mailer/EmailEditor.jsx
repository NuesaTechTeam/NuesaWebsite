import React from "react";
import DOMPurify from "dompurify";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  ClipboardPaste,
  Code2,
  Columns3,
  Eraser,
  Highlighter,
  ImagePlus,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  MousePointerClick,
  Redo2,
  Rows3,
  Strikethrough,
  Table,
  Trash2,
  Underline,
  Undo2,
  Unlink,
} from "lucide-react";
import { uploadMailImage, absoluteUrl } from "../../lib/mailApi";

const SANITIZE_OPTS = {
  FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "meta", "base", "link", "style"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
  ADD_ATTR: ["target", "rel"],
};

const sanitize = (html) =>
  DOMPurify.sanitize(String(html || ""), SANITIZE_OPTS);

const escapeText = (value) =>
  String(value || "").replace(/[&<>]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])
  );

const escapeAttr = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

const looksLikeHtml = (value) => /^\s*<(!doctype|html|table|tr|td|div|p|span|ul|ol|li|h[1-6]|section|article|a\b|img|font|b\b|i\b|strong|em|br)/i.test(value);

const textToHtml = (value) =>
  escapeText(value)
    .split(/\r?\n/)
    .map((line) => `<div>${line || "<br>"}</div>`)
    .join("");

/** Turn what someone typed into a safe link target (adds https://, mailto:, tel:). */
const normalizeUrl = (raw) => {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^(javascript|data|vbscript):/i.test(value)) return "";
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;
  if (/^\+?[\d\s-]{7,}$/.test(value)) return `tel:${value.replace(/[\s-]/g, "")}`;
  return `https://${value.replace(/^\/+/, "")}`;
};

const FONT_FAMILIES = [
  { label: "Default (Arial)", value: "Arial, Helvetica, sans-serif" },
  { label: "Georgia", value: "Georgia, 'Times New Roman', serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
];

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40];

const BLOCKS = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Quote", value: "blockquote" },
];

const COLORS = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#ffffff",
  "#14532d", "#15803d", "#22c55e", "#0f355c", "#2563eb", "#60a5fa",
  "#b91c1c", "#ef4444", "#f97316", "#f59e0b", "#facc15", "#7c3aed",
];

const HIGHLIGHTS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#fed7aa", "#e5e7eb"];

const HEADING_STYLES = {
  H1: "font-size:28px;line-height:1.25;margin:0 0 12px;font-weight:700;",
  H2: "font-size:22px;line-height:1.3;margin:0 0 10px;font-weight:700;",
  H3: "font-size:18px;line-height:1.35;margin:0 0 8px;font-weight:700;",
};
const QUOTE_STYLE =
  "margin:12px 0;padding:8px 16px;border-left:4px solid #15803d;background-color:#f0fdf4;color:#374151;";
const CELL_STYLE = "border:1px solid #d1d5db;padding:8px;vertical-align:top;";
const HEAD_CELL_STYLE = `${CELL_STYLE}background-color:#f3f4f6;font-weight:bold;text-align:left;`;

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];
const MAX_IMAGE_WIDTH = 1600;
const MAX_IMAGE_B64 = 1_800_000; // stays inside the server's per-image limit

const imageTypeOk = (file) =>
  IMAGE_TYPES.includes((file.type || "").toLowerCase()) ||
  /\.(png|jpe?g|gif|webp)$/i.test(file.name || "");

const readAsDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.readAsDataURL(blob);
  });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("That file is not a readable image."));
    img.src = src;
  });

const b64Length = (dataUrl) => (dataUrl.split(",")[1] || "").length;

/** Read an image file as a data URL, shrinking big photos so they upload and load quickly. */
const prepareImageDataUrl = async (file) => {
  const type = (file.type || "").toLowerCase();
  const original = await readAsDataUrl(file);
  if (type === "image/gif") {
    if (b64Length(original) > MAX_IMAGE_B64) throw new Error("GIFs must be under about 1.3 MB.");
    return original;
  }
  const img = await loadImage(original);
  if (img.naturalWidth <= MAX_IMAGE_WIDTH && b64Length(original) <= MAX_IMAGE_B64) {
    return original;
  }
  const scale = Math.min(1, MAX_IMAGE_WIDTH / img.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let out = type === "image/png" ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.85);
  for (let quality = 0.82; b64Length(out) > MAX_IMAGE_B64 && quality > 0.4; quality -= 0.12) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    out = canvas.toDataURL("image/jpeg", quality);
  }
  if (b64Length(out) > MAX_IMAGE_B64) throw new Error("That image is too large, even after shrinking it.");
  return out;
};

const uploadImageDataUrl = async (dataUrl, name) => {
  const uploaded = await uploadMailImage({ name: name || "image", data: dataUrl });
  return absoluteUrl(uploaded.url);
};

const ToolbarButton = ({ title, onClick, disabled, active = false, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-1.5 text-gray-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 ${
      active
        ? "border-green-600 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-900/40 dark:text-green-300"
        : "border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white"
    }`}
  >
    {children}
  </button>
);

const Divider = () => <span className="mx-0.5 h-5 w-px bg-gray-200 dark:bg-gray-700" />;

/** A toolbar button that opens a small panel underneath it. */
const ToolbarMenu = ({ id, openMenu, setOpenMenu, title, icon, disabled, onOpen, width = "w-64", children }) => {
  const wrapRef = React.useRef(null);
  const open = openMenu === id;

  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu("");
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenu("");
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenMenu]);

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <ToolbarButton
        title={title}
        disabled={disabled}
        active={open}
        onClick={() => {
          if (open) {
            setOpenMenu("");
          } else {
            onOpen?.();
            setOpenMenu(id);
          }
        }}
      >
        {icon}
      </ToolbarButton>
      {open && (
        <div
          className={`absolute left-0 top-full z-40 mt-1 ${width} max-w-[85vw] rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200`}
        >
          {children}
        </div>
      )}
    </span>
  );
};

const ColorGrid = ({ colors, onPick }) => (
  <div className="grid grid-cols-6 gap-1.5">
    {colors.map((color) => (
      <button
        key={color}
        type="button"
        title={color}
        aria-label={`Colour ${color}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onPick(color)}
        className="h-7 w-7 rounded-md border border-gray-300 transition-transform hover:scale-110 dark:border-gray-600"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

const fieldClass =
  "w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white";
const primaryBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-md bg-green px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark disabled:opacity-50";
const secondaryBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800";
const selectClass =
  "h-8 rounded-md border border-gray-200 bg-white px-1.5 text-xs text-gray-700 focus:border-green focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200";

const EMPTY_STATE = {
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  insertUnorderedList: false,
  insertOrderedList: false,
  justifyLeft: false,
  justifyCenter: false,
  justifyRight: false,
  justifyFull: false,
  block: "p",
  inLink: false,
  inTable: false,
};

const HISTORY_LIMIT = 100;
const TAG_COMMANDS = new Set(["bold", "italic", "underline", "strikeThrough"]);

const EmailEditor = ({ initialHtml = "", onChange, disabled = false, onError = () => {}, contentStyle, contentTop = null, contentBottom = null }) => {
    const editorRef = React.useRef(null);
    const fileRef = React.useRef(null);
    const savedRange = React.useRef(null);
    const initialHtmlRef = React.useRef(initialHtml);
    const history = React.useRef({ stack: [], index: -1 });
    const typingTimer = React.useRef(null);

    const [pasting, setPasting] = React.useState(false);
    const [busyImage, setBusyImage] = React.useState(false);
    const [state, setState] = React.useState(EMPTY_STATE);
    const [openMenu, setOpenMenu] = React.useState("");
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [, forceImgRefresh] = React.useState(0);
    const [sourceMode, setSourceMode] = React.useState(false);
    const [sourceText, setSourceText] = React.useState("");
    const [stats, setStats] = React.useState({ words: 0, chars: 0 });

    const [linkForm, setLinkForm] = React.useState({ url: "", text: "", newTab: true, editing: false });
    const [buttonForm, setButtonForm] = React.useState({ text: "Learn more", url: "", color: "#15803d", align: "left" });
    const [tableForm, setTableForm] = React.useState({ rows: 3, cols: 3, header: true });
    const [customColor, setCustomColor] = React.useState("#15803d");
    const [customHighlight, setCustomHighlight] = React.useState("#fef08a");

    /* ---------- output ---------- */

    /** The editor HTML as it should be sent (without editor-only markers). */
    const currentHtml = React.useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return "";
      const clone = editor.cloneNode(true);
      clone.querySelectorAll(".is-selected").forEach((el) => {
        el.classList.remove("is-selected");
        if (!el.getAttribute("class")) el.removeAttribute("class");
      });
      return clone.innerHTML;
    }, []);

    const emit = React.useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const text = editor.innerText || "";
      setStats({
        words: (text.trim().match(/\S+/g) || []).length,
        chars: text.replace(/\n/g, "").length,
      });
      onChange?.({ html: currentHtml(), text });
    }, [onChange, currentHtml]);

    /* ---------- undo / redo (snapshots, so every tool can be undone) ---------- */

    const snapshot = React.useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return;
      const html = currentHtml();
      const h = history.current;
      if (h.stack[h.index] === html) return;
      h.stack = h.stack.slice(0, h.index + 1);
      h.stack.push(html);
      if (h.stack.length > HISTORY_LIMIT) h.stack.shift();
      h.index = h.stack.length - 1;
    }, [currentHtml]);

    const placeCaretAtEnd = () => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      savedRange.current = range.cloneRange();
    };

    const restoreHistory = (delta) => {
      window.clearTimeout(typingTimer.current);
      snapshot();
      const h = history.current;
      const next = h.index + delta;
      if (next < 0 || next >= h.stack.length) return;
      h.index = next;
      editorRef.current.innerHTML = h.stack[next];
      setSelectedImg(null);
      placeCaretAtEnd();
      emit();
    };

    React.useEffect(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = sanitize(initialHtmlRef.current);
        snapshot();
        emit();
      }
      // run once on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ---------- selection tracking ---------- */

    const selectionInEditor = () => {
      const editor = editorRef.current;
      const sel = window.getSelection();
      if (!editor || !sel || sel.rangeCount === 0) return null;
      const range = sel.getRangeAt(0);
      return editor.contains(range.commonAncestorContainer) ? range : null;
    };

    const closestInEditor = (node, selector) => {
      const editor = editorRef.current;
      let el = node && node.nodeType === 3 ? node.parentElement : node;
      while (el && el !== editor) {
        if (el.matches?.(selector)) return el;
        el = el.parentElement;
      }
      return null;
    };

    const refreshState = React.useCallback(() => {
      const q = (cmd) => {
        try {
          return document.queryCommandState(cmd);
        } catch {
          return false;
        }
      };
      let block = "p";
      try {
        block = String(document.queryCommandValue("formatBlock") || "p").toLowerCase() || "p";
      } catch {
        // ignore
      }
      const range = savedRange.current;
      const node = range ? range.startContainer : null;
      const next = {
        bold: q("bold"),
        italic: q("italic"),
        underline: q("underline"),
        strikeThrough: q("strikeThrough"),
        insertUnorderedList: q("insertUnorderedList"),
        insertOrderedList: q("insertOrderedList"),
        justifyLeft: q("justifyLeft"),
        justifyCenter: q("justifyCenter"),
        justifyRight: q("justifyRight"),
        justifyFull: q("justifyFull"),
        block: BLOCKS.some((b) => b.value === block) ? block : "p",
        inLink: Boolean(closestInEditor(node, "a")),
        inTable: Boolean(closestInEditor(node, "td,th")),
      };
      setState((prev) =>
        Object.keys(next).every((k) => prev[k] === next[k]) ? prev : next
      );
    }, []);

    React.useEffect(() => {
      const onSelectionChange = () => {
        const range = selectionInEditor();
        if (range) {
          savedRange.current = range.cloneRange();
          refreshState();
        }
      };
      document.addEventListener("selectionchange", onSelectionChange);
      return () => document.removeEventListener("selectionchange", onSelectionChange);
    }, [refreshState]);

    /** Put the caret back where it was before a toolbar control took focus. */
    const restoreSelection = () => {
      const editor = editorRef.current;
      if (!editor) return;
      if (selectionInEditor()) return;
      editor.focus();
      const saved = savedRange.current;
      if (saved && editor.contains(saved.commonAncestorContainer)) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(saved);
      } else {
        placeCaretAtEnd();
      }
    };

    /* ---------- tidy-up so the email looks the same in inbox clients ---------- */

    const normalize = React.useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.querySelectorAll("h1,h2,h3").forEach((el) => {
        el.setAttribute("style", HEADING_STYLES[el.tagName]);
      });
      editor.querySelectorAll("blockquote").forEach((el) => {
        if (!el.getAttribute("style")) el.setAttribute("style", QUOTE_STYLE);
      });
      editor.querySelectorAll("img").forEach((img) => {
        if (!img.style.maxWidth) img.style.maxWidth = "100%";
        if (!img.style.height && !img.hasAttribute("height")) img.style.height = "auto";
      });
      // Chrome drops parts of inline styles on insert; put the email-critical bits back.
      editor.querySelectorAll("table:not([role=presentation])").forEach((table) => {
        table.style.borderCollapse = "collapse";
        table.style.border = "1px solid #d1d5db";
        table.querySelectorAll("td,th").forEach((cell) => {
          cell.style.border = "1px solid #d1d5db";
          if (!cell.style.padding) cell.style.padding = "8px";
          if (!cell.style.verticalAlign) cell.style.verticalAlign = "top";
          if (cell.tagName === "TH") {
            if (!cell.style.backgroundColor) cell.style.backgroundColor = "#f3f4f6";
            cell.style.fontWeight = "bold";
          }
        });
      });
      editor.querySelectorAll("td[bgcolor] > a").forEach((a) => {
        a.style.fontFamily = "Arial, Helvetica, sans-serif";
      });
      editor.querySelectorAll("a[href]").forEach((a) => {
        if (!/^(mailto|tel):/i.test(a.getAttribute("href") || "")) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        } else {
          a.removeAttribute("target");
          a.removeAttribute("rel");
        }
        if (!a.closest("td[bgcolor]") && !a.style.color) a.style.color = "#15803d";
      });
      editor.querySelectorAll("font").forEach((font) => {
        // Legacy <font> tags from paste: convert to styled spans.
        const span = document.createElement("span");
        if (font.color) span.style.color = font.color;
        if (font.face) span.style.fontFamily = font.face;
        span.innerHTML = font.innerHTML;
        font.replaceWith(span);
      });
    }, []);

    /** Run a browser editing command, then tidy up and report the change. */
    const exec = (command, value = null) => {
      if (disabled) return;
      snapshot();
      restoreSelection();
      try {
        // Plain <b>/<i>/<u>/<strike> tags render in every inbox; colours and fonts need CSS.
        document.execCommand("styleWithCSS", false, !TAG_COMMANDS.has(command));
        document.execCommand(command, false, value);
      } catch {
        // execCommand is not available in this browser
      } finally {
        document.execCommand("styleWithCSS", false, true);
      }
      normalize();
      snapshot();
      refreshState();
      emit();
    };

    /** Insert HTML at the caret (sanitised), uploading any embedded data: images. */
    const insertHtml = (html) => {
      const clean = sanitize(html);
      if (!clean) return;
      snapshot();
      restoreSelection();
      document.execCommand("insertHTML", false, clean);
      normalize();
      snapshot();
      emit();
      uploadEmbeddedImages();
    };

    /** Pasted HTML can carry images as data: URLs, which inboxes block; upload them. */
    const uploadEmbeddedImages = async () => {
      const editor = editorRef.current;
      if (!editor) return;
      const images = Array.from(editor.querySelectorAll('img[src^="data:"]'));
      if (images.length === 0) return;
      setBusyImage(true);
      try {
        for (const img of images) {
          const blob = await fetch(img.src).then((r) => r.blob());
          const dataUrl = await prepareImageDataUrl(new File([blob], "pasted", { type: blob.type }));
          img.src = await uploadImageDataUrl(dataUrl, "pasted-image");
        }
        snapshot();
        emit();
      } catch (err) {
        onError(err.message || "A pasted image could not be uploaded; remove it before sending.");
      } finally {
        setBusyImage(false);
      }
    };

    /* ---------- text tools ---------- */

    const applyFontSize = (px) => {
      if (!px || disabled) return;
      snapshot();
      restoreSelection();
      const range = selectionInEditor();
      if (!range || range.collapsed) {
        onError("Select some text first, then pick a size.");
        return;
      }
      try {
        document.execCommand("styleWithCSS", false, false);
        document.execCommand("fontSize", false, "7");
      } finally {
        document.execCommand("styleWithCSS", false, true);
      }
      const editor = editorRef.current;
      const spans = [];
      editor.querySelectorAll('font[size="7"]').forEach((font) => {
        const span = document.createElement("span");
        span.style.fontSize = `${px}px`;
        if (font.color) span.style.color = font.color;
        if (font.face) span.style.fontFamily = font.face;
        span.innerHTML = font.innerHTML;
        span.querySelectorAll("[style]").forEach((el) => {
          el.style.fontSize = "";
          if (!el.getAttribute("style")) el.removeAttribute("style");
        });
        font.replaceWith(span);
        spans.push(span);
      });
      editor.querySelectorAll('span[style*="xxx-large"]').forEach((span) => {
        span.style.fontSize = `${px}px`;
        spans.push(span);
      });
      if (spans.length) {
        const sel = window.getSelection();
        const next = document.createRange();
        next.setStartBefore(spans[0]);
        next.setEndAfter(spans[spans.length - 1]);
        sel.removeAllRanges();
        sel.addRange(next);
        savedRange.current = next.cloneRange();
      }
      normalize();
      snapshot();
      emit();
    };

    const applyBlock = (tag) => {
      exec("formatBlock", `<${tag}>`);
    };

    /* ---------- links ---------- */

    const openLinkMenu = () => {
      const range = savedRange.current;
      const anchor = range ? closestInEditor(range.startContainer, "a") : null;
      if (anchor) {
        setLinkForm({
          url: anchor.getAttribute("href") || "",
          text: anchor.textContent || "",
          newTab: anchor.getAttribute("target") === "_blank",
          editing: true,
        });
      } else {
        setLinkForm({ url: "", text: range ? range.toString() : "", newTab: true, editing: false });
      }
    };

    const applyLink = (event) => {
      event?.preventDefault();
      const url = normalizeUrl(linkForm.url);
      if (!url) {
        onError("Enter a valid link (a web address, email or phone number).");
        return;
      }
      snapshot();
      restoreSelection();
      const range = selectionInEditor();
      const anchor = range ? closestInEditor(range.startContainer, "a") : null;
      if (anchor) {
        anchor.setAttribute("href", url);
        if (linkForm.text.trim() && linkForm.text !== anchor.textContent) anchor.textContent = linkForm.text.trim();
      } else if (!range || range.collapsed || (linkForm.text.trim() && linkForm.text !== range.toString())) {
        const label = linkForm.text.trim() || linkForm.url.trim();
        document.execCommand("insertHTML", false, `<a href="${escapeAttr(url)}">${escapeText(label)}</a>&nbsp;`);
      } else {
        document.execCommand("createLink", false, url);
      }
      normalize();
      if (!linkForm.newTab) {
        editorRef.current.querySelectorAll(`a[href="${CSS.escape(url)}"]`).forEach((a) => {
          a.removeAttribute("target");
          a.removeAttribute("rel");
        });
      }
      setOpenMenu("");
      snapshot();
      refreshState();
      emit();
    };

    const removeLink = () => {
      snapshot();
      restoreSelection();
      const range = selectionInEditor();
      const anchor = range ? closestInEditor(range.startContainer, "a") : null;
      if (anchor) {
        anchor.replaceWith(...anchor.childNodes);
      } else {
        document.execCommand("unlink");
      }
      setOpenMenu("");
      snapshot();
      refreshState();
      emit();
    };

    /* ---------- blocks: rule, button, table ---------- */

    const insertRule = () =>
      insertHtml('<hr style="border:none;border-top:1px solid #d1d5db;margin:16px 0;"><p><br></p>');

    const insertButton = (event) => {
      event?.preventDefault();
      const url = normalizeUrl(buttonForm.url);
      if (!url) {
        onError("Enter the web address the button should open.");
        return;
      }
      const text = escapeText(buttonForm.text.trim() || "Learn more");
      const color = escapeAttr(buttonForm.color);
      const align = buttonForm.align === "center" ? ' align="center"' : "";
      insertHtml(
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0"${align} style="margin:16px ${buttonForm.align === "center" ? "auto" : "0"};border-collapse:separate;">` +
          `<tr><td bgcolor="${color}" style="border-radius:6px;background-color:${color};">` +
          `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;line-height:1.2;color:#ffffff;text-decoration:none;border-radius:6px;">${text}</a>` +
          `</td></tr></table><p><br></p>`
      );
      setOpenMenu("");
    };

    const insertTable = (event) => {
      event?.preventDefault();
      const rows = Math.min(Math.max(Number(tableForm.rows) || 1, 1), 20);
      const cols = Math.min(Math.max(Number(tableForm.cols) || 1, 1), 8);
      let html = '<table cellpadding="8" cellspacing="0" border="1" width="100%" style="width:100%;border-collapse:collapse;border:1px solid #d1d5db;margin:12px 0;">';
      for (let r = 0; r < rows; r += 1) {
        const head = tableForm.header && r === 0;
        html += "<tr>";
        for (let c = 0; c < cols; c += 1) {
          html += head
            ? `<th style="${HEAD_CELL_STYLE}">Heading</th>`
            : `<td style="${CELL_STYLE}"><br></td>`;
        }
        html += "</tr>";
      }
      html += "</table><p><br></p>";
      insertHtml(html);
      setOpenMenu("");
    };

    const currentCell = () => {
      const range = savedRange.current;
      return range ? closestInEditor(range.startContainer, "td,th") : null;
    };

    const tableAction = (action) => {
      const cell = currentCell();
      if (!cell) return;
      const row = cell.parentElement;
      const table = cell.closest("table");
      const colIndex = Array.from(row.children).indexOf(cell);
      snapshot();
      if (action === "addRow") {
        const next = document.createElement("tr");
        Array.from(row.children).forEach(() => {
          const td = document.createElement("td");
          td.setAttribute("style", CELL_STYLE);
          td.innerHTML = "<br>";
          next.appendChild(td);
        });
        row.after(next);
      } else if (action === "addCol") {
        table.querySelectorAll("tr").forEach((tr) => {
          const ref = tr.children[colIndex];
          const isHead = ref && ref.tagName === "TH";
          const el = document.createElement(isHead ? "th" : "td");
          el.setAttribute("style", isHead ? HEAD_CELL_STYLE : CELL_STYLE);
          el.innerHTML = isHead ? "Heading" : "<br>";
          if (ref) ref.after(el);
          else tr.appendChild(el);
        });
      } else if (action === "delRow") {
        if (table.querySelectorAll("tr").length <= 1) table.remove();
        else row.remove();
      } else if (action === "delCol") {
        if (row.children.length <= 1) table.remove();
        else table.querySelectorAll("tr").forEach((tr) => tr.children[colIndex]?.remove());
      } else if (action === "delTable") {
        table.remove();
      }
      if (!editorRef.current.contains(savedRange.current?.startContainer)) placeCaretAtEnd();
      snapshot();
      refreshState();
      emit();
    };

    /* ---------- images ---------- */

    const insertImageFiles = async (files) => {
      const list = files.filter(imageTypeOk);
      if (list.length === 0) {
        onError("Only PNG, JPG, GIF or WebP images can be inserted.");
        return;
      }
      setBusyImage(true);
      try {
        for (const file of list) {
          const dataUrl = await prepareImageDataUrl(file);
          const src = await uploadImageDataUrl(dataUrl, file.name);
          insertHtml(`<img src="${escapeAttr(src)}" alt="" style="max-width:100%;height:auto;" />`);
        }
      } catch (err) {
        onError(err.message || "Could not insert the image.");
      } finally {
        setBusyImage(false);
      }
    };

    const handleImagePick = (event) => {
      const files = Array.from(event.target.files || []);
      event.target.value = "";
      if (files.length) insertImageFiles(files);
    };

    const selectImage = (img) => {
      editorRef.current?.querySelectorAll("img.is-selected").forEach((el) => {
        if (el !== img) {
          el.classList.remove("is-selected");
          if (!el.getAttribute("class")) el.removeAttribute("class");
        }
      });
      if (img) img.classList.add("is-selected");
      setSelectedImg(img);
    };

    const imageAction = (action, value) => {
      const img = selectedImg;
      if (!img || !img.isConnected) {
        selectImage(null);
        return;
      }
      snapshot();
      const linkParent = img.parentElement?.tagName === "A" ? img.parentElement : null;
      if (action === "width") {
        img.style.width = value;
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.removeAttribute("width");
        img.removeAttribute("height");
      } else if (action === "align") {
        img.style.display = "block";
        img.style.marginLeft = value === "left" ? "0" : "auto";
        img.style.marginRight = value === "right" ? "0" : "auto";
        if (value === "left") img.style.marginRight = "auto";
      } else if (action === "alt") {
        img.setAttribute("alt", value);
      } else if (action === "link") {
        const url = normalizeUrl(value);
        if (!url) {
          if (linkParent) linkParent.replaceWith(img);
        } else if (linkParent) {
          linkParent.setAttribute("href", url);
        } else {
          const a = document.createElement("a");
          a.setAttribute("href", url);
          img.replaceWith(a);
          a.appendChild(img);
        }
      } else if (action === "remove") {
        (linkParent || img).remove();
        selectImage(null);
      }
      normalize();
      snapshot();
      emit();
      forceImgRefresh((x) => x + 1);
    };

    /* ---------- events ---------- */

    const handleInput = () => {
      emit();
      window.clearTimeout(typingTimer.current);
      typingTimer.current = window.setTimeout(snapshot, 500);
    };

    const handleClick = (e) => {
      if (e.target.tagName === "IMG" && editorRef.current.contains(e.target)) {
        selectImage(e.target);
      } else if (selectedImg) {
        selectImage(null);
      }
    };

    const handleKeyDown = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (mod && key === "z" && !e.shiftKey) {
        e.preventDefault();
        restoreHistory(-1);
        return;
      }
      if (mod && (key === "y" || (key === "z" && e.shiftKey))) {
        e.preventDefault();
        restoreHistory(1);
        return;
      }
      if (mod && key === "k") {
        e.preventDefault();
        openLinkMenu();
        setOpenMenu("link");
        return;
      }
      if (mod && ["b", "i", "u"].includes(key)) {
        e.preventDefault();
        exec({ b: "bold", i: "italic", u: "underline" }[key]);
        return;
      }
      if (selectedImg && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        imageAction("remove");
        return;
      }
      if (e.key === "Tab") {
        const range = selectionInEditor();
        const node = range?.startContainer;
        const cell = closestInEditor(node, "td,th");
        if (cell) {
          e.preventDefault();
          const cells = Array.from(cell.closest("table").querySelectorAll("td,th"));
          const target = cells[cells.indexOf(cell) + (e.shiftKey ? -1 : 1)];
          if (target) {
            const next = document.createRange();
            next.selectNodeContents(target);
            next.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(next);
          } else if (!e.shiftKey) {
            savedRange.current = range.cloneRange();
            tableAction("addRow");
          }
          return;
        }
        if (closestInEditor(node, "li")) {
          e.preventDefault();
          exec(e.shiftKey ? "outdent" : "indent");
        }
      }
    };

    const handlePasteEvent = (e) => {
      const clipboard = e.clipboardData;
      if (!clipboard) return;
      const htmlData = clipboard.getData("text/html");
      if (htmlData && htmlData.trim()) {
        e.preventDefault();
        insertHtml(htmlData);
        return;
      }
      const files = Array.from(clipboard.files || []).filter(imageTypeOk);
      if (files.length) {
        e.preventDefault();
        insertImageFiles(files);
        return;
      }
      const text = clipboard.getData("text/plain");
      if (text) {
        e.preventDefault();
        insertHtml(textToHtml(text));
      }
    };

    const handleDrop = (e) => {
      const files = Array.from(e.dataTransfer?.files || []).filter(imageTypeOk);
      if (!files.length) {
        window.setTimeout(() => {
          normalize();
          snapshot();
          emit();
        }, 0);
        return;
      }
      e.preventDefault();
      const pos = document.caretRangeFromPoint?.(e.clientX, e.clientY);
      if (pos) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(pos);
        savedRange.current = pos.cloneRange();
      }
      insertImageFiles(files);
    };

    const handlePasteButton = async () => {
      setPasting(true);
      try {
        let clipboardHtml = "";
        let text = "";
        try {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            if (item.types.includes("text/html")) {
              const blob = await item.getType("text/html");
              clipboardHtml = await blob.text();
              break;
            }
          }
        } catch {
          // Some browsers deny clipboard.read(); fall back to readText below.
        }
        if (!clipboardHtml) {
          text = await navigator.clipboard.readText();
          if (looksLikeHtml(text)) clipboardHtml = text;
        }
        if (clipboardHtml) {
          insertHtml(clipboardHtml);
        } else if (text) {
          insertHtml(textToHtml(text));
        } else {
          onError("The clipboard is empty.");
        }
      } catch {
        onError("Could not read the clipboard. Press Ctrl+V inside the editor instead.");
      } finally {
        setPasting(false);
      }
    };

    const toggleSource = () => {
      const editor = editorRef.current;
      if (!editor) return;
      if (!sourceMode) {
        selectImage(null);
        setSourceText(currentHtml());
        setSourceMode(true);
        setOpenMenu("");
      } else {
        snapshot();
        editor.innerHTML = sanitize(sourceText);
        normalize();
        snapshot();
        setSourceMode(false);
        emit();
      }
    };

    const handleSourceChange = (e) => {
      setSourceText(e.target.value);
      const clean = sanitize(e.target.value);
      const div = document.createElement("div");
      div.innerHTML = clean;
      onChange?.({ html: clean, text: div.textContent || "" });
    };

    const off = disabled || sourceMode;
    const img = selectedImg && selectedImg.isConnected ? selectedImg : null;
    const imgLink = img && img.parentElement?.tagName === "A" ? img.parentElement.getAttribute("href") : "";

    return (
      <div>
        <div className="sticky top-16 z-20 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-wrap items-center gap-1 p-2">
            <select
              aria-label="Text style"
              title="Text style"
              value={state.block}
              disabled={off}
              onChange={(e) => applyBlock(e.target.value)}
              className={selectClass}
            >
              {BLOCKS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Font"
              title="Font"
              value=""
              disabled={off}
              onChange={(e) => e.target.value && exec("fontName", e.target.value)}
              className={`${selectClass} w-24`}
            >
              <option value="">Font</option>
              {FONT_FAMILIES.map((f) => (
                <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>
                  {f.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Font size"
              title="Font size (select text first)"
              value=""
              disabled={off}
              onChange={(e) => applyFontSize(Number(e.target.value))}
              className={`${selectClass} w-[4.5rem]`}
            >
              <option value="">Size</option>
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
            <Divider />
            <ToolbarButton title="Bold (Ctrl+B)" onClick={() => exec("bold")} disabled={off} active={state.bold}>
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Italic (Ctrl+I)" onClick={() => exec("italic")} disabled={off} active={state.italic}>
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Underline (Ctrl+U)" onClick={() => exec("underline")} disabled={off} active={state.underline}>
              <Underline className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Strikethrough" onClick={() => exec("strikeThrough")} disabled={off} active={state.strikeThrough}>
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarMenu
              id="color"
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              title="Text colour"
              icon={<Baseline className="h-4 w-4" />}
              disabled={off}
              width="w-56"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Text colour</p>
              <ColorGrid colors={COLORS} onPick={(c) => { exec("foreColor", c); setOpenMenu(""); }} />
              <div className="mt-3 flex items-center gap-2">
                <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-gray-300 bg-white" aria-label="Custom text colour" />
                <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { exec("foreColor", customColor); setOpenMenu(""); }} className={secondaryBtn}>
                  Apply custom
                </button>
              </div>
            </ToolbarMenu>
            <ToolbarMenu
              id="highlight"
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              title="Highlight"
              icon={<Highlighter className="h-4 w-4" />}
              disabled={off}
              width="w-56"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Highlight</p>
              <ColorGrid colors={HIGHLIGHTS} onPick={(c) => { exec("hiliteColor", c); setOpenMenu(""); }} />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input type="color" value={customHighlight} onChange={(e) => setCustomHighlight(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-gray-300 bg-white" aria-label="Custom highlight colour" />
                <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { exec("hiliteColor", customHighlight); setOpenMenu(""); }} className={secondaryBtn}>
                  Apply
                </button>
                <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { exec("hiliteColor", "transparent"); setOpenMenu(""); }} className={secondaryBtn}>
                  None
                </button>
              </div>
            </ToolbarMenu>
            <Divider />
            <ToolbarButton title="Bullet list" onClick={() => exec("insertUnorderedList")} disabled={off} active={state.insertUnorderedList}>
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Numbered list" onClick={() => exec("insertOrderedList")} disabled={off} active={state.insertOrderedList}>
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Decrease indent (Shift+Tab in lists)" onClick={() => exec("outdent")} disabled={off}>
              <IndentDecrease className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Increase indent (Tab in lists)" onClick={() => exec("indent")} disabled={off}>
              <IndentIncrease className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton title="Align left" onClick={() => exec("justifyLeft")} disabled={off} active={state.justifyLeft}>
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Align center" onClick={() => exec("justifyCenter")} disabled={off} active={state.justifyCenter}>
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Align right" onClick={() => exec("justifyRight")} disabled={off} active={state.justifyRight}>
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Justify" onClick={() => exec("justifyFull")} disabled={off} active={state.justifyFull}>
              <AlignJustify className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarMenu
              id="link"
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              title="Insert or edit link (Ctrl+K)"
              icon={<Link2 className="h-4 w-4" />}
              disabled={off}
              onOpen={openLinkMenu}
              width="w-72"
            >
              <form onSubmit={applyLink} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {linkForm.editing ? "Edit link" : "Insert link"}
                </p>
                <input autoFocus value={linkForm.url} onChange={(e) => setLinkForm((f) => ({ ...f, url: e.target.value }))} placeholder="Web address, email or phone" className={fieldClass} aria-label="Link address" />
                <input value={linkForm.text} onChange={(e) => setLinkForm((f) => ({ ...f, text: e.target.value }))} placeholder="Text to show (optional)" className={fieldClass} aria-label="Link text" />
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={linkForm.newTab} onChange={(e) => setLinkForm((f) => ({ ...f, newTab: e.target.checked }))} className="accent-green" />
                  Open in a new tab
                </label>
                <div className="flex gap-2">
                  <button type="submit" className={primaryBtn}>{linkForm.editing ? "Update" : "Insert"}</button>
                  {linkForm.editing && (
                    <button type="button" onClick={removeLink} className={secondaryBtn}>
                      <Unlink className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
              </form>
            </ToolbarMenu>
            <ToolbarButton title="Remove link" onClick={removeLink} disabled={off || !state.inLink}>
              <Unlink className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Insert image (or paste / drop one into the editor)"
              onClick={() => fileRef.current?.click()}
              disabled={off || busyImage}
            >
              {busyImage ? <Loader /> : <ImagePlus className="h-4 w-4" />}
            </ToolbarButton>
            <ToolbarMenu
              id="button"
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              title="Insert button"
              icon={<MousePointerClick className="h-4 w-4" />}
              disabled={off}
              width="w-72"
            >
              <form onSubmit={insertButton} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Call-to-action button</p>
                <input value={buttonForm.text} onChange={(e) => setButtonForm((f) => ({ ...f, text: e.target.value }))} placeholder="Button text" className={fieldClass} aria-label="Button text" />
                <input value={buttonForm.url} onChange={(e) => setButtonForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://..." className={fieldClass} aria-label="Button link" />
                <div className="flex flex-wrap gap-1.5">
                  {["#15803d", "#14532d", "#0f355c", "#2563eb", "#b91c1c", "#f59e0b", "#111827"].map((c) => (
                    <button key={c} type="button" aria-label={`Button colour ${c}`} onClick={() => setButtonForm((f) => ({ ...f, color: c }))} className={`h-6 w-6 rounded-md border-2 ${buttonForm.color === c ? "border-gray-900 dark:border-white" : "border-transparent"}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex gap-3 text-xs">
                  {["left", "center"].map((a) => (
                    <label key={a} className="flex items-center gap-1.5 capitalize">
                      <input type="radio" name="btn-align" checked={buttonForm.align === a} onChange={() => setButtonForm((f) => ({ ...f, align: a }))} className="accent-green" />
                      {a}
                    </label>
                  ))}
                </div>
                <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-950" style={{ textAlign: buttonForm.align }}>
                  <span className="inline-block rounded-md px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: buttonForm.color }}>
                    {buttonForm.text || "Learn more"}
                  </span>
                </div>
                <button type="submit" className={primaryBtn}>Insert button</button>
              </form>
            </ToolbarMenu>
            <ToolbarMenu
              id="table"
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              title="Insert table"
              icon={<Table className="h-4 w-4" />}
              disabled={off}
              width="w-60"
            >
              <form onSubmit={insertTable} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Insert table</p>
                <div className="flex items-center gap-2">
                  <label className="flex-1 text-xs">
                    Rows
                    <input type="number" min={1} max={20} value={tableForm.rows} onChange={(e) => setTableForm((f) => ({ ...f, rows: e.target.value }))} className={fieldClass} />
                  </label>
                  <label className="flex-1 text-xs">
                    Columns
                    <input type="number" min={1} max={8} value={tableForm.cols} onChange={(e) => setTableForm((f) => ({ ...f, cols: e.target.value }))} className={fieldClass} />
                  </label>
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={tableForm.header} onChange={(e) => setTableForm((f) => ({ ...f, header: e.target.checked }))} className="accent-green" />
                  Header row
                </label>
                <button type="submit" className={primaryBtn}>Insert table</button>
              </form>
            </ToolbarMenu>
            <ToolbarButton title="Horizontal line" onClick={insertRule} disabled={off}>
              <Minus className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton
              title="Paste from clipboard (auto-detects HTML)"
              onClick={handlePasteButton}
              disabled={off || pasting}
            >
              {pasting ? <Loader /> : <ClipboardPaste className="h-4 w-4" />}
            </ToolbarButton>
            <ToolbarButton title="Clear formatting" onClick={() => { exec("removeFormat"); exec("unlink"); }} disabled={off}>
              <Eraser className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Undo (Ctrl+Z)" onClick={() => restoreHistory(-1)} disabled={off}>
              <Undo2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Redo (Ctrl+Y)" onClick={() => restoreHistory(1)} disabled={off}>
              <Redo2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title={sourceMode ? "Back to the visual editor" : "Edit HTML source"} onClick={toggleSource} disabled={disabled} active={sourceMode}>
              <Code2 className="h-4 w-4" />
            </ToolbarButton>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              multiple
              onChange={handleImagePick}
              className="hidden"
            />
          </div>

          {state.inTable && !off && (
            <div className="flex flex-wrap items-center gap-1 border-t border-gray-200 px-2 py-1.5 text-xs dark:border-gray-700">
              <span className="mr-1 font-semibold text-gray-500">Table:</span>
              <ToolbarButton title="Add row below" onClick={() => tableAction("addRow")}>
                <Rows3 className="h-3.5 w-3.5" /><span className="ml-1">+ Row</span>
              </ToolbarButton>
              <ToolbarButton title="Add column to the right" onClick={() => tableAction("addCol")}>
                <Columns3 className="h-3.5 w-3.5" /><span className="ml-1">+ Column</span>
              </ToolbarButton>
              <ToolbarButton title="Delete this row" onClick={() => tableAction("delRow")}>
                <span>− Row</span>
              </ToolbarButton>
              <ToolbarButton title="Delete this column" onClick={() => tableAction("delCol")}>
                <span>− Column</span>
              </ToolbarButton>
              <ToolbarButton title="Delete table" onClick={() => tableAction("delTable")}>
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </ToolbarButton>
            </div>
          )}

          {img && !off && (
            <div className="flex flex-wrap items-center gap-1 border-t border-gray-200 px-2 py-1.5 text-xs dark:border-gray-700">
              <span className="mr-1 font-semibold text-gray-500">Image:</span>
              {["25%", "50%", "75%", "100%"].map((w) => (
                <ToolbarButton key={w} title={`Width ${w}`} onClick={() => imageAction("width", w)} active={img.style.width === w}>
                  <span>{w}</span>
                </ToolbarButton>
              ))}
              <Divider />
              <ToolbarButton title="Image left" onClick={() => imageAction("align", "left")} active={img.style.display === "block" && img.style.marginLeft === "0px"}>
                <AlignLeft className="h-3.5 w-3.5" />
              </ToolbarButton>
              <ToolbarButton title="Image centre" onClick={() => imageAction("align", "center")} active={img.style.marginLeft === "auto" && img.style.marginRight === "auto"}>
                <AlignCenter className="h-3.5 w-3.5" />
              </ToolbarButton>
              <ToolbarButton title="Image right" onClick={() => imageAction("align", "right")} active={img.style.marginRight === "0px"}>
                <AlignRight className="h-3.5 w-3.5" />
              </ToolbarButton>
              <Divider />
              <input
                key={`alt-${img.src}`}
                defaultValue={img.getAttribute("alt") || ""}
                onBlur={(e) => imageAction("alt", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                placeholder="Alt text"
                aria-label="Image alt text"
                className="h-8 w-28 rounded-md border border-gray-200 bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-950"
              />
              <input
                key={`link-${img.src}-${imgLink}`}
                defaultValue={imgLink}
                onBlur={(e) => imageAction("link", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                placeholder="Link (optional)"
                aria-label="Image link"
                className="h-8 w-36 rounded-md border border-gray-200 bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-950"
              />
              <ToolbarButton title="Remove image" onClick={() => imageAction("remove")}>
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </ToolbarButton>
            </div>
          )}
        </div>
        {contentTop}
        <div
          ref={editorRef}
          contentEditable={!disabled && !sourceMode}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Email body (rich text)"
          onInput={handleInput}
          onPaste={handlePasteEvent}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          data-placeholder="Write your email here..."
          style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.6, color: "#1f2937", ...contentStyle, ...(sourceMode ? { display: "none" } : null) }}
          className="email-editor min-h-[240px] w-full rounded-b-lg border border-gray-300 bg-white p-4 outline-none focus:border-green focus:ring-2 focus:ring-green/30 dark:border-gray-700"
        />
        {sourceMode && (
          <textarea
            value={sourceText}
            onChange={handleSourceChange}
            spellCheck={false}
            aria-label="Email HTML source"
            className="block min-h-[320px] w-full border border-gray-300 bg-gray-950 p-3 font-mono text-xs leading-relaxed text-green-200 focus:outline-none dark:border-gray-700"
          />
        )}
        {contentBottom}
        <p className="mt-1 text-right text-xs text-gray-400">
          {stats.words.toLocaleString()} word{stats.words === 1 ? "" : "s"} · {stats.chars.toLocaleString()} characters
        </p>
      </div>
    );
};

const Loader = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" className="opacity-75" />
  </svg>
);

export default EmailEditor;
