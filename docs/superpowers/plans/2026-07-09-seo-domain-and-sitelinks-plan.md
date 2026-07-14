# NUESA SEO Domain and Sitelinks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize NUESA SEO on `https://nuesaabuad.ng` and strengthen Library and H.E.A.R.T. signals for indexing and Google-generated sitelinks.

**Architecture:** Keep the current React Router and `useSEO` pattern. Add one shared canonical site constant to the SEO hook, keep page metadata next to each page, and add crawlable homepage links through existing React Router components.

**Tech Stack:** React, React Router, Vite, static sitemap/robots files, npm scripts.

---

### Task 1: Standardize canonical domain handling

**Files:**
- Modify: `src/hooks/useSEO.js`
- Modify: `index.html`
- Modify: `public/sitemap.xml`
- Modify: `public/robots.txt`

- [ ] **Step 1: Define the `.ng` canonical domain in the SEO hook**

Use `https://nuesaabuad.ng` as the fallback origin and ensure generated absolute URLs use it when the app runs on the canonical host. Preserve the existing page metadata behavior.

- [ ] **Step 2: Update static homepage metadata**

Change static Open Graph, Twitter, and homepage URL references from `.org` to `.ng`.

- [ ] **Step 3: Update crawl files**

Change every sitemap URL and the robots sitemap declaration to `.ng`.

- [ ] **Step 4: Scan for stale SEO domain references**

Run:

```bash
rg -n "nuesaabuad\\.org|nuesaabuad\\.ng" index.html public src
```

Expected: `.org` has no remaining SEO/deployment references; `.ng` appears consistently.

### Task 2: Improve page titles and visible headings

**Files:**
- Modify: `src/pages/Library.jsx`
- Modify: `src/pages/Heart.jsx`

- [ ] **Step 1: Set final page titles**

Use `NUESA ABUAD Digital Library | Engineering Textbooks & Past Questions` for Library and `NUESA H.E.A.R.T. | Student Welfare & Counseling at ABUAD` for H.E.A.R.T. Remove any manually duplicated site suffix because `useSEO` appends the site name.

- [ ] **Step 2: Make the primary headings descriptive and visible**

Use `NUESA ABUAD Digital Library` as the Library H1 and `NUESA H.E.A.R.T. Initiative` as the H.E.A.R.T. H1. Keep the existing visual styling and supporting copy.

- [ ] **Step 3: Align structured-data URLs**

Change all page structured-data URLs and provider URLs from `.org` to `.ng`.

### Task 3: Strengthen internal sitelink signals

**Files:**
- Modify: `src/components/Academics/AcademicsHome.jsx`
- Modify: `src/lib/constants.jsx` only if link labels need explicit descriptive wording

- [ ] **Step 1: Add a crawlable Library link from the homepage academic section**

Use a React Router `Link` with anchor text `NUESA ABUAD Digital Library` and destination `/library`.

- [ ] **Step 2: Add a crawlable H.E.A.R.T. link from the homepage**

Add a small existing-style call-to-action or resource link with anchor text `H.E.A.R.T. Student Welfare & Counseling` and destination `/heart`, without redesigning the page.

- [ ] **Step 3: Verify navigation labels**

Confirm the header and footer expose both destinations with concise, unique labels.

### Task 4: Verify behavior and build output

**Files:**
- No additional files.

- [ ] **Step 1: Run existing tests**

Run:

```bash
npm test -- --runInBand
```

If no npm test script exists, report that and run the repository's available validation command instead.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: successful Vite production build.

- [ ] **Step 3: Review the final diff and status**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; only the intended SEO files and existing user changes are present.
