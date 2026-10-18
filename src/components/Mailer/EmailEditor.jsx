import React from "react";
import DOMPurify from "dompurify";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ClipboardPaste,
  Eraser,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";
import { uploadMailImage, absoluteUrl } from "../../lib/mailApi";

const SANITIZE_OPTS = {
  FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "meta", "base", "link", "style"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
};

const sanitize = (html) =>
  DOMPurify.sanitize(String(html || ""), SANITIZE_OPTS);

const escapeText = (value) =>
  String(value || "").replace(/[&<>]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])
  );

const looksLikeHtml = (value) => /^\s*<(!doctype|html|table|tr|td|div|p|span|ul|ol|li|h[1-6]|section|article|a\b|img|font|b\b|i\b|strong|em|br)/i.test(value);

const textToHtml = (value) =>
  escapeText(value)
    .split(/\r?\n/)
    .map((line) => `<div>${line || "<br>"}</div>`)
    .join("");

const ToolbarButton = ({ title, onClick, disabled, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
  >
    {children}
  </button>
);

const EmailEditor = ({ initialHtml = "", onChange, disabled = false, onError = () => {}, contentStyle, contentTop = null, contentBottom = null }) => {
    const editorRef = React.useRef(null);
    const fileRef = React.useRef(null);
    const [pasting, setPasting] = React.useState(false);
    const [busyImage, setBusyImage] = React.useState(false);
    const savedRange = React.useRef(null);
    const initialHtmlRef = React.useRef(initialHtml);

    React.useEffect(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = sanitize(initialHtmlRef.current);
      }
    }, []);

    const emit = React.useCallback(() => {
      if (editorRef.current && onChange) {
        onChange({
          html: editorRef.current.innerHTML,
          text: editorRef.current.innerText || "",
        });
      }
    }, [onChange]);

    const tidyImages = React.useCallback(() => {
      editorRef.current?.querySelectorAll("img").forEach((img) => {
        if (!img.getAttribute("style")) {
          img.setAttribute("style", "max-width:100%;height:auto;");
        } else {
          if (!img.style.maxWidth) img.style.maxWidth = "100%";
          if (!img.style.height && !img.hasAttribute("height")) img.style.height = "auto";
        }
      });
    }, []);

    const restoreSelection = () => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus();
      const selection = window.getSelection();
      if (savedRange.current && selection && selection.rangeCount === 0) {
        selection.removeAllRanges();
        selection.addRange(savedRange.current);
      }
    };

    const exec = (command, value) => {
      restoreSelection();
      try {
        document.execCommand("styleWithCSS", false, true);
        document.execCommand(command, false, value);
      } catch {
        // execCommand is not available in this browser
      }
      tidyImages();
      emit();
      return false;
    };

    const handleFocus = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        savedRange.current = selection.getRangeAt(0).cloneRange();
      }
      try {
        document.execCommand("styleWithCSS", false, true);
      } catch {
        // ignore
      }
    };

    const handleKeyDown = (e) => {
      const select = window.getSelection();
      if (editableSelectionIsImage(select) && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        document.execCommand("delete", false, null);
        emit();
      }
    };

    const editableSelectionIsImage = (select) => {
      try {
        return (
          select &&
          select.isCollapsed &&
          select.anchorNode &&
          select.anchorNode.nodeType === 1 &&
          select.anchorNode.tagName === "IMG" &&
          editorRef.current?.contains(select.anchorNode)
        );
      } catch {
        return false;
      }
    };

    const insertSanitized = (html) => {
      const clean = sanitize(html);
      if (!clean) return;
      restoreSelection();
      document.execCommand("insertHTML", false, clean);
      tidyImages();
      emit();
    };

    const handlePasteEvent = (e) => {
      const clipboard = e.clipboardData;
      const htmlData = clipboard && clipboard.getData ? clipboard.getData("text/html") : "";
      if (htmlData && htmlData.trim()) {
        e.preventDefault();
        insertSanitized(htmlData);
      }
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
          insertSanitized(clipboardHtml);
        } else if (text) {
          insertSanitized(textToHtml(text));
        } else {
          onError("The clipboard is empty.");
        }
      } catch {
        onError("Could not read the clipboard. Press Ctrl+V inside the editor instead.");
      } finally {
        setPasting(false);
      }
    };

    const handleLink = () => {
      restoreSelection();
      const url = window.prompt("Link URL", "https://");
      if (!url || /^javascript:/i.test(url.trim())) return;
      document.execCommand("createLink", false, url.trim());
      const anchor = window.getSelection()?.anchorNode;
      anchor?.parentElement?.setAttribute("target", "_blank");
      emit();
    };

    const handleImagePick = async (event) => {
      const file = Array.from(event.target.files || [])[0];
      event.target.value = "";
      if (!file) return;
      setBusyImage(true);
      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error(`Could not read "${file.name}".`));
          reader.readAsDataURL(file);
        });
        const data = dataUrl.split(",")[1] || "";
        if (!imageTypeOk(file)) throw new Error("Only PNG, JPG, GIF or WebP images up to 1.9 MB can be inserted.");
        const uploaded = await uploadMailImage({ name: file.name || "image", data });
        const src = absoluteUrl(uploaded.url);
        const img = `<img src="${escapeAttr(src)}" style="max-width:100%;height:auto;" />`;
        insertSanitized(img);
      } catch (err) {
        onError(err.message || "Could not insert the image.");
      } finally {
        setBusyImage(false);
      }
    };

    return (
      <div>
        <div className="flex flex-wrap items-center gap-1.5 rounded-t-lg border border-gray-300 border-b-0 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900">
          <ToolbarButton title="Bold" onClick={() => exec("bold")} disabled={disabled}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Italic" onClick={() => exec("italic")} disabled={disabled}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Underline" onClick={() => exec("underline")} disabled={disabled}>
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <ToolbarButton title="Bullet list" onClick={() => exec("insertUnorderedList")} disabled={disabled}>
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Numbered list" onClick={() => exec("insertOrderedList")} disabled={disabled}>
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <ToolbarButton title="Align left" onClick={() => exec("justifyLeft")} disabled={disabled}>
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Align center" onClick={() => exec("justifyCenter")} disabled={disabled}>
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Align right" onClick={() => exec("justifyRight")} disabled={disabled}>
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <ToolbarButton title="Insert link" onClick={handleLink} disabled={disabled}>
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Insert image (loads inside the email, resizable)"
            onClick={() => fileRef.current?.click()}
            disabled={disabled || busyImage}
          >
            {busyImage ? <Loader className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          </ToolbarButton>
          <ToolbarButton
            title="Paste from clipboard (auto-detects HTML)"
            onClick={handlePasteButton}
            disabled={disabled || pasting}
          >
            {pasting ? <Loader className="h-4 w-4 animate-spin" /> : <ClipboardPaste className="h-4 w-4" />}
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <ToolbarButton title="Undo" onClick={() => exec("undo")} disabled={disabled}>
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Redo" onClick={() => exec("redo")} disabled={disabled}>
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Clear formatting" onClick={() => exec("removeFormat")} disabled={disabled}>
            <Eraser className="h-4 w-4" />
          </ToolbarButton>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={handleImagePick}
            className="hidden"
          />
        </div>
        {contentTop}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Email body (rich text)"
          onFocus={handleFocus}
          onInput={emit}
          onPaste={handlePasteEvent}
          onKeyDown={handleKeyDown}
          data-placeholder="Write your email here..."
          style={contentStyle}
          className="email-editor min-h-[240px] w-full rounded-b-lg border border-gray-300 bg-white p-4 text-sm leading-relaxed text-gray-900 outline-none focus:border-green focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
        {contentBottom}
      </div>
    );
};

const imageTypeOk = (file) =>
  ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(
    (file.type || "").toLowerCase()
  ) ||
  /\.(png|jpe?g|gif|webp)$/i.test(file.name || "");

const escapeAttr = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");

const Loader = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" className="opacity-75" />
  </svg>
);

export default EmailEditor;
