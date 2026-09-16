# NUESA ABUAD Website — Specification

**Version:** 1.0
**Status:** Living document (derived from the current codebase)
**Repository:** https://github.com/NuesaTechTeam/NuesaWebsite
**Canonical domain:** https://nuesaabuad.ng

---

## 1. Introduction

### 1.1 Purpose

This specification defines the functional and non-functional requirements, system
architecture, data models, and user-facing behavior of the NUESA ABUAD website — the
official online platform of the Nigerian Universities Engineering Students' Association
(NUESA), Afe Babalola University chapter.

### 1.2 Scope

In scope: the React/Vite single-page application in this repository, its static assets,
its routing model, the client-side Digital Library search client, and the third-party
integrations it consumes (Cloudflare Worker search API, EmailJS, WhatsApp, Google Drive,
YouTube, Cloudinary, Google Forms).

Out of scope: the Cloudflare Worker backend source, the R2/Firestore infrastructure,
the Google Forms/email inboxes, and the external dinner subdomain application.

### 1.3 Audience

Current and future maintainers of the NUESA ABUAD web project, the NUESA Technical Team,
and contributors who need an unambiguous description of behavior and architecture.

### 1.4 Definitions / Abbreviations

| Term | Meaning |
|---|---|
| NUESA | Nigerian Universities Engineering Students' Association |
| ABUAD | Afe Babalola University, Ado-Ekiti |
| H.E.A.R.T. | Helping Everyone Achieve Resilience Together (welfare initiative) |
| PQ | Past Questions |
| SSL | SPA | Single-Page Application |
| R2 | Cloudflare R2 object storage |
| OG | Open Graph |
| JSON-LD | JSON Linked Data (schema.org structured data) |

---

## 2. Product Overview

### 2.1 Product Vision

Provide engineering students at ABUAD with a single, authoritative web destination for
association information, academic resources, events, leadership, projects, news, and
welfare services — while promoting the association's brand and public search presence.

### 2.2 Goals

1. Deliver a fast, mobile-first, responsive SPA.
2. Give students searchable access to textbooks, past questions, and lecture notes
   (the Digital Library).
3. Support anonymous student feedback (complaints & suggestions).
4. Promote the annual Dinner & Awards Night.
5. Optimize search-engine discoverability for the site's pages.
6. Provide a content home for news, blog, events, gallery, and videos.

### 2.3 Non-Goals (current version)

- No authentication/authorization (all content is public).
- No server-side rendering or dynamic routing (static SPA on GitHub Pages).
- No content-management backend (content is edited in source data files).
- No admin upload workflow in the frontend (upload secret exists but is unused).

---

## 3. Users & Personas

| Persona | Needs |
|---|---|
| Fresh engineering student | Orientation info, timetables, notes, past questions, welfare. |
| Returning student | Library search, events, feedback, executives, projects. |
| Prospective applicant | About NUESA/ABUAD, college environment, FAQ. |
| NUESA executives/team | Publish content, list leadership, collect feedback. |
| External visitors (industry/media) | News, blog, projects showcase, contact/social links. |

---

## 4. Functional Requirements

### FR-1 Navigation & Shell

- **FR-1.1** A fixed top navbar with primary links: Home, About, Events, Executives,
  Projects, Academics, Blog, Library; secondary links under a "More" menu (H.E.A.R.T.,
  Videos, Feedback, Dinner/**Contact Us**); social links under "Follow us".
- **FR-1.2** Full-screen animated mobile menu toggled by a hamburger icon.
- **FR-1.3** Scroll-to-top on every route change.
- **FR-1.4** Footer with brand, quick links, resources, and social platform icons.

### FR-2 Home (`/`)

- **FR-2.1** Hero banner (association name, tagline, college photo, rotating stickers).
- **FR-2.2** Profile-readiness sections, in order: About teaser, College Environment
  gallery sliders, Events teaser, Academics teaser, Blog teaser, Projects teaser,
  Executives teaser, Contact/CTA section.
- **FR-2.3** Each teaser section deep-links to its full page.

### FR-3 About (`/about`)

- **FR-3.1** Intro with auto-rotating executive photos and association stats.
- **FR-3.2** Mission/Vision "pillars" (Mission, Innovation, Community, Learning).
- **FR-3.3** Grid of the 9 engineering disciplines with key courses.
- **FR-3.4** President's message.

### FR-4 Events (`/events`)

- **FR-4.1** Event timeline filtered by Upcoming / Past, with intersection-observer
  reveal animations and category badges.
- **FR-4.2** News & Updates grid; clicking opens an overlay rendering an article PDF
  in an `<iframe>`.
- **FR-4.3** Photo gallery: autoplaying hero slider (thumbnails, dots, play/pause),
  full-gallery modal grid, full-screen lightbox with keyboard navigation and autoplay.

### FR-5 Executives (`/executives`)

- **FR-5.1** Tabs: "Current Executives" and "Past Excos".
- **FR-5.2** Past committees selectable by session year.
- **FR-5.3** Executive cards: photo, position badge, department, year, expandable bio,
  expandable achievements, and social/contact icons.
- **FR-5.4** SEO: schema.org `ProfilePage`/`ItemList` JSON-LD auto-generated from
  membership data; hidden-but-indexable past-executive text.

### FR-6 Projects (`/projects`)

- **FR-6.1** Ongoing projects via autoplaying carousel with app/online/action links.
- **FR-6.2** Legacy (past) projects grid with detail modal; featured "Renovated
  Engineering Auditorium" card opens a video modal (local MP4).

### FR-7 Academics (`/academics`)

- **FR-7.1** PDF previews of timetables (react-pdf-viewer) with view/download actions.
- **FR-7.2** Curated YouTube tutorial playlist cards, filterable by department.
- **FR-7.3** Promo card linking to the Digital Library `/library`.
- **FR-7.4** (Legacy) Notes & Textbooks and Past Questions browsers — static lists
  with client-side filtering/`search`/pagination, exposing Google Drive/Docs links.

### FR-8 Digital Library (`/library`) — flagship

- **FR-8.1** Mode toggle: **Digital Collection** (API-backed) vs **Legacy Archive**.
- **FR-8.2** Search input with live course-code/title autocomplete suggestions.
- **FR-8.3** Filters: Level (`All/100…500/GENERAL`) and Department
  (`All` + 9 codes).
- **FR-8.4** "PQ Only" toggle locking search to past questions.
- **FR-8.5** Active-filter chips + "Clear all".
- **FR-8.6** Result states: skeleton loading cards, error card with retry, empty
  "Nothing Found" state, and a "Showing X of Y resources" counter.
- **FR-8.7** Cursor-based "Load More" pagination.
- **FR-8.8** Matched-course badge when a valid course code/title is entered.
- **FR-8.9** Respect `prefers-reduced-motion`.
- **FR-8.10** JSON-LD `CollectionPage` schema with `SearchAction`.

### FR-9 Blog (`/blog`)

- **FR-9.1** Featured-posts carousel.
- **FR-9.2** Category filter pills (All, Announcements, Events, Student Contributions).
- **FR-9.3** Post list with large-first layout; posts open in a modal via `ArticleModal`.
- **FR-9.4** CTA section: WhatsApp share + "Submit Your Blog" dialog with rich-text
  editor (ReactQuill) submitted via EmailJS.
- **FR-9.5** `?view=submit` deep-link auto-scrolls to the submit form.

### FR-10 Contact (`/contactus`)

- **FR-10.1** Contact form that composes a WhatsApp message (name, phone, message).
- **FR-10.2** Contact details panel (phone, email, location, socials).
- **FR-10.3** FAQ accordion of 6 questions.

### FR-11 Dinner Night (`/dinner`)

- **FR-11.1** Cinematic landing page for Dinner & Awards Night, "CASABLANCA" theme.
- **FR-11.2** Mouse-parallax effects, mount-reveal animations, date/venue meta.
- **FR-11.3** CTAs to external ticketing subdomain (`https://dinner.nuesaabuad.ng`).

### FR-12 Videos (`/videos`)

- **FR-12.1** Video library grid of local MP4s, sortable by date/name, 6 per page.
- **FR-12.2** Fullscreen modal player with controls and Escape-to-close.
- **FR-12.3** "Submit Video" CTA (placeholder "under development" modal).

### FR-13 H.E.A.R.T. (`/heart`)

- **FR-13.1** Initiative hero with logo and "Talk to someone" CTA.
- **FR-13.2** Auto-rotating quote carousel.
- **FR-13.3** Mission/Vision cards + interactive timeline of the initiative's journey.
- **FR-13.4** Counselor team grid (photos from Cloudinary) with per-counselor
  "Talk to Me" pre-selection.
- **FR-13.5** Featured event ("Inside Out", Nov 28 2025) + past events.
- **FR-13.6** Searchable categorized mental-health resource catalog.
- **FR-13.7** Counselor contact form (optional personal data, anonymous supported)
  submitting via WhatsApp deep link; Google Form alternative.
- **FR-13.8** Volunteer "Join HEART" signup via Google Form.
- **FR-13.9** Social links (Instagram, Snapchat, WhatsApp channel, TikTok).

### FR-14 Feedback Portal (`/feedback`)

- **FR-14.1** Two-card gateway: "Make a Complaint" → `/feedback/complaints`;
  "Suggest an Idea" → `/feedback/suggestions`.

### FR-15 Complaints (`/feedback/complaints`) & Suggestions (`/feedback/suggestions`)

- **FR-15.1** Anonymous-by-default toggle (contact fields hidden when anonymous).
- **FR-15.2** Contact method selector (Email/Phone) shown when not anonymous.
- **FR-15.3** Details textarea (required).
- **FR-15.4** Submit via `sendFeedbackEmail` (EmailJS); loading spinner; success and
  error banners.
- **FR-15.5** `reply_to` falls back to `nuesa.abuad.tech@gmail.com` for anonymous
  submissions.

### FR-16 404 (`*`)

- **FR-16.1** Themed error page with animated gears, "Circuit Breaker Activated",
  possible-cause diagnostics, Go Back / Refresh actions, and quick nav links.

### FR-17 SEO

- **FR-17.1** Every page sets a unique `title` (site-suffixed), description, keywords,
  and canonical URL.
- **FR-17.2** Open Graph and Twitter card tags per page (with image defaults).
- **FR-17.3** Optionally inject JSON-LD structured data (Library, Heart, Executives).
- **FR-17.4** Managed head tags restored on unmount.
- **FR-17.5** Static `sitemap.xml` and `robots.txt` targeting `nuesaabuad.ng`.

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Performance | Lazy-load every route; initial bundle only shows the landing shell. Fast search with request cancellation + in-memory caching. |
| NFR-2 | Responsiveness | Mobile-first Tailwind layouts; breakpoints `sm/md/lg`; fixed navbar with `md:hidden` mobile menu. |
| NFR-3 | Accessibility | ARIA listbox patterns, `aria-pressed` filters, reduced-motion support, keyboard navigation for carousels/dropdowns, dialog semantics (`role="dialog"`, `aria-modal`). |
| NFR-4 | SEO/indexability | Semantic headings (single H1 per page), crawlable internal links, static sitemap/robots, structured data. |
| NFR-5 | Reliability | Race-condition-safe fetches (AbortController + generation counter); error/retry states; image fallbacks (`onError`). |
| NFR-6 | Privacy | Feedback forms support anonymous submission by default. No user data is persisted by the frontend. |
| NFR-7 | Maintainability | Data isolated in `src/lib/*` and `courses.json`; pages are thin compositions; shared `useSEO`; barrel exports. |
| NFR-8 | Security | Client-only integration keys (EmailJS public key, worker API key) are browser-visible by design; no server secrets should be stored in the repo or committed `.env`. |
| NFR-9 | Build/deploy | Zero-config `npm run build`; GitHub Pages deploy with SPA 404 fallback file. |
| NFR-10 | Code quality | ESLint (flat config, recommended React hooks rules); no TypeScript. |

---

## 6. System Architecture

### 6.1 Runtime model

Single-page React app rendered client-side. Static assets served from GitHub Pages.
All routes share one `index.html`; `404.html` duplicates it for SPA 404 handling.

### 6.2 Component architecture

```
main.jsx
 └─ GlobalProvider ─ BrowserRouter ─ App
                                      ├─ Layout (Navbar / main / Footer)
                                      ├─ ScrollToTop
                                      └─ Suspense ─ Routes (16 lazy pages)
```

Each page composes section components from `src/components/<Section>/`. Pages and
sections can use the two shared hooks (`useSEO`, `useResourceSearch`) and static data
modules (`lib/*`, `courses.json`).

### 6.3 Data flow for the Library

```
Library.jsx
 └─ useResourceSearch
      └─ api.searchDocuments(params, signal)
           ├─ fetchDocuments → GET {VITE_API_URL}?…   (X-API-Key)
           ├─ searchLevelAcrossPrefixes  (level fan-out)
           └─ searchPqAcrossTargets      (PQ fan-out across dept×level)
```
All fan-out paths merge & de-duplicate results and maintain base64 `level-fanout:`
cursors with a spill `buffer` for stable pagination.

---

## 7. Data Models

### 7.1 Course (`courses.json`) — 426 records

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | ✓ | e.g. `"AAE 335"` — unique key `id` |
| `title` | string | ✓ | |
| `offered_by_programs` | string[] | ✓ | Full department names (9 possible) |
| `type` | `"CORE"` / `"ELECTIVE"` | ✓ | |
| `units` | number | ✓ | 1–6 |
| `levels` | string[] | ✓ | `100…500` |
| `semesters` | string[] | ✓ | `FIRST` / `SECOND` |
| `is_elective` | boolean | ✓ | mirrors `type` |
| `description` | string | | 54 courses |
| `outline` | `{title, subtopics[], sources[]}[]` | | 54 courses |
| `outline_sources` | string[] | | 54 courses |

### 7.2 Library document (API response)

```js
{ id, course_code, file_name, level, department_code, semester, file_path }
```

### 7.3 Static content objects

| Object | Shape (key fields) | Source |
|---|---|---|
| Event | `{id, title, date, time, venue, description, image, category, status, featured, detailsUrl?, registrationUrl?}` | `constants.jsx` |
| Gallery photo | `{id, src, title, eventDate}` | `constants.jsx` |
| News article | `{id, title, excerpt, date, image, link}` | `constants.jsx` (1 active) |
| Executive (current) | `{name, position, department, year, image, bio, achievements[], social:{email, whatsapp, snapchat}}` | `constants.jsx` |
| Executive (past) | `{year, executives:[{name, position, department, image}]}` | `constants.jsx` |
| Timetable | `{id, title, link}` | `constants.jsx` |
| Blog post | `{id, title, category, excerpt, content, image, author, date, isFeatured}` | `blogPosts.js` |
| Project (ongoing) | `{title, summary, year, students, image, link?, appLink?}` | `projects.js` |
| Project (past) | `{title, summary, status, year, image}` | `projects.js` |
| Video | `{title, description, videoUrl, date}` | `Videos/videosData.js` |
| Nav link / social | `{title, url}` / `{title, icon, link, color}` | `constants.jsx` |

---

## 8. API Contract — Digital Library Search

### 8.1 Endpoint

```
GET {VITE_API_URL}[?q&course_code&level&department_code&semester&limit&cursor]
```
Header: `X-API-Key: {VITE_API_KEY}`

Default URL: `https://r2-to-firestore-worker.nasurf25.workers.dev`
(trailing slashes stripped by `api.js`).

### 8.2 Query semantics

| Param | Behavior |
|---|---|
| `course_code` | Exact code filter; special value `PQ` selects past questions |
| `level` | `100`–`500` |
| `department_code` | One of `AAE BME CHE COE CVE EEE MCT MEE PTE` (aliases: `MCE→MCT`; passthrough otherwise) |
| `limit` | Page size (client enforces per-bucket min in fan-out) |
| `cursor` | Opaque cursor or `level-fanout:<base64 json>` cursor |

### 8.3 Response

```json
{ "documents": [ {Document} ], "total": 0, "next_cursor": null }
```

### 8.4 Client fan-out rules

| Condition (in `searchDocuments`) | Strategy |
|---|---|
| `course_code === "PQ"` | `searchPqAcrossTargets` — all 9 depts × 6 levels |
| `level` set, no dept/course/q | `searchLevelAcrossPrefixes` — per-prefix fan-out |
| otherwise | Direct single query |

Both fan-outs: bucket limit = `max(ceil(limit / activeCount), min)`; merge→dedupe→
sort by `course_code/file_name`; slice to `limit`; stash surplus in cursor `buffer`.

### 8.5 `getCourses` (client-side)

Params: `limit` (default 10), `cursor` (course code), `department_code`/`department`,
`level`, `q`. Filters `courses.json` by department-name map, level, and course
code/title substring (with whitespace-stripped matching). Returns
`{ courses, next_cursor }`.

### 8.6 EmailJS (feedback)

`sendFeedbackEmail(type, data)` initializes EmailJS public key
`I_mhIENGLPNaiT96V` and sends via service `service_mdn74w9`, template
`template_13y81mw`. Params: `feedback_type`, `is_anonymous`, `contact_method`,
`contact_info`, `reply_to`, `details`, `message`.

### 8.7 EmailJS (blog submission)

`CTASection.jsx` uses service `service_mdn74w9`, template `template_pedcd6o`;
sends `title`, `author`, `email`, `category`, `content` from the ReactQuill form.

---

## 9. Page-Level Specifications

Individual behavior per page is captured in §4 FR-2 … FR-17 and in
`documentation.md` §7. The tables below summarize inputs/outputs per page for
convenience.

### Shared SEO input contract (`useSEO`)

| Option | Type | Default |
|---|---|---|
| `title` | string | SITE default |
| `description` | string | SITE default |
| `keywords` | string | SITE default |
| `ogImage` | string | `/images/blog/logo.jpg` (absolute) |
| `canonicalPath` | string | `window.location.pathname` |
| `structuredData` | object | none |

Site origin constant: `https://nuesaabuad.ng`.

### Library state machine (inputs → behavior)

| Input | Behavior |
|---|---|
| empty query | immediate synchronous fetch (all/level/dept as filtered) |
| typed query | debounced 300 ms fetch; autocomplete suggestions from `courses.json` |
| `setIsPQLocked(true)` | input locked to "PQ" → `course_code=PQ` fan-out |
| level/dept change | re-fetch (cache hit if same params) |
| Load More click | appends next page using `nextCursor` |

---

## 10. Configuration & Environment

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `VITE_API_URL` | no | `https://r2-to-firestore-worker.nasurf25.workers.dev` | Search worker base URL |
| `VITE_API_KEY` | yes (library) | — | `X-API-Key` header |
| `VITE_UPLOAD_SECRET` | no (unused) | — | reserved for upload workflow |

ESLint ignores: `dist`. Tailwind content: `index.html`, `src/**/*.{js,jsx,ts,tsx}`.
Fonts, meta, favicon, theme-color defined in `index.html`.

---

## 11. External Dependencies & Integrations

| Integration | Purpose | Failure mode |
|---|---|---|
| Cloudflare Worker (R2+Firestore) | Library search | Error card with Retry on `/library` |
| EmailJS | feedback + blog submissions | Inline error banner / `alert()` |
| WhatsApp (`wa.me`) | contact, share, counselor messaging | Opens messaging app |
| Google Drive/Docs | legacy notes, past papers, news PDFs | External link opens/stale |
| YouTube | tutorials | External links |
| Google Forms | HEART contact/volunteer | External redirect |
| Cloudinary | HEART team photos | Image fallback |
| `react-pdf-viewer` + `pdfjs-dist` | timetable previews | Embedded viewer error |
| Google Fonts | font families | Fallback system fonts |

---

## 12. Constraints & Dependencies

- GitHub Pages hosting → no server-side rendering; SEO relies on prerendered meta +
  JSON-LD injection and static sitemap.
- Single-page routing requires `404.html` fallback at build time (implemented).
- `vite.config.js` `base` is commented out → deployment expects root-relative paths;
  sub-path deploys require setting `base`.
- Video assets tracked with Git LFS (`.gitattributes`).
- Worker API key required for library searches in production builds.

---

## 13. Testing & Acceptance Criteria

### Acceptance checklist (manual)

- [ ] `npm run dev` boots; all 16 routes render without console errors.
- [ ] `/library` search returns documents for a course code; Load More pages correctly.
- [ ] PQ-only, level-only, and department-only searches work.
- [ ] Library error card appears when API is unreachable and Retry recovers.
- [ ] SEO: each page sets unique title + description; Library/Heart/Executives inject
      valid JSON-LD; head restores on navigation.
- [ ] Build: `npm run build` succeeds and produces `dist/404.html`.
- [ ] Deploy: `npm run deploy` publishes to GitHub Pages at `nuesaabuad.ng`.
- [ ] Responsive: key pages pass on ~360 px and ≥1280 px viewports.
- [ ] `prefers-reduced-motion` disables distracting animations.

### Known gaps (acceptance items not yet automated)

- No automated unit/component/e2e test suite exists.
- `tests/test_search_logic.py` is manual-only and not wired to CI.
- No lint script in `package.json` (run `npx eslint .` directly).
- Global Context/Reducer is not exercised.

---

## 14. Future Work

1. **Upload workflow** for library documents (uses `VITE_UPLOAD_SECRET`).
2. **Course content expansion** — authored descriptions/outlines for the remaining
   372 courses.
3. **Global state** — wire `GlobalContext` for toasts, user preferences (e.g. theme).
4. **Test discipline** — add Vitest/Playwright and a lint script.
5. **Content parity** — restore/activate newsletter & news items; complete department
   data for Notes; broader tutorial playlist coverage.
6. **Accessibility hardening** — full keyboard + screen-reader audit across carousels
   and modals.

---

## 15. Terminology / Consistency Guide

- Use **NUESA ABUAD** for the association brand; keep `nuesaabuad.ng` as the only
  canonical domain string in SEO-controlled files.
- Course codes: `AAA ###` format (3 letters, space, 3–4 digits).
- Department codes: `AAE BME CHE COE CVE EEE MCT MEE PTE` (+ alias `MCE→MCT`).
- Levels: `100 … 500` (plus `GENERAL` in the Library level filter).
- Archive concepts: "Digital Collection" (API) vs "Legacy Archive" (static links).