# NUESA ABUAD Website — Technical Documentation

The official website of the **Nigerian Universities Engineering Students' Association (NUESA)**,
Afe Babalola University (ABUAD) chapter. A modern, SEO-focused single-page application (SPA)
that connects engineering students with academic resources, news, events, leadership
information, and student welfare services.

- **Live URL:** https://nuesaabuad.ng
- **Domain of record:** `nuesaabuad.ng` (canonical for SEO/Open Graph)
- **Local docs:** this file (`documentation.md`) and `spec.md`
- **Existing planning docs:** `docs/superpowers/plans/` and `docs/superpowers/specs/`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Application Architecture](#5-application-architecture)
6. [Routing](#6-routing)
7. [Pages](#7-pages)
8. [Components](#8-components)
9. [The Digital Library (flagship feature)](#9-the-digital-library-flagship-feature)
10. [Hooks](#10-hooks)
11. [Context & Reducer](#11-context--reducer)
12. [Static Data Sources](#12-static-data-sources)
13. [External Service Integrations](#13-external-service-integrations)
14. [Environment Variables](#14-environment-variables)
15. [Styling & Design System](#15-styling--design-system)
16. [SEO Machinery](#16-seo-machinery)
17. [Testing](#17-testing)
18. [Deployment](#18-deployment)
19. [Build & Scripts](#19-build--scripts)
20. [Code Conventions](#20-code-conventions)
21. [Known Notes, Quirks & Dead Code](#21-known-notes-quirks--dead-code)
22. [Roadmap / Planned Work](#22-roadmap--planned-work)

---

## 1. Project Overview

The NUESA ABUAD website is a content-and-utility portal for engineering students that:

- Acts as the official digital presence of the student association.
- Provides a **Digital Library** of engineering textbooks, past questions, lecture notes,
  and study materials, indexed by course code, level, and department.
- Publishes news, blog articles, event schedules, gallery photos, and videos.
- Showcases current and past executive committees, ongoing and legacy projects.
- Runs the **H.E.A.R.T.** initiative (welfare/counseling/mental-health support).
- Collects anonymous feedback (complaints and suggestions) from students.
- Markets the annual **Dinner & Awards Night** via a dedicated landing page.

The codebase is a **single-page React application** (no SSR). All pages are lazy-loaded
code-split bundles served as static assets, deployed on GitHub Pages.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (`react`, `react-dom`) |
| Build tool | Vite 6 |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/postcss`), custom `@theme` design tokens |
| Routing | React Router DOM v7 (`BrowserRouter`) |
| Animation | Framer Motion 12, AOS (scroll reveals) |
| Icons | `lucide-react`, `react-icons` (fa / gi / bs / etc.) |
| UI primitives | `radix-ui` (meta package) — DropdownMenu, Dialog, Accordion, Select |
| Rich text | `react-quill` (blog submission) |
| PDF preview | `@react-pdf-viewer/core`, `@react-pdf-viewer/default-layout`, `pdfjs-dist` |
| Email | `@emailjs/browser` |
| HTTP | Native `fetch` (library search); `axios` installed but unused |
| Charts | `react-apexcharts` (installed; not used in current pages) |
| Misc | `framer-motion`, `swiper` (installed; not used), `hamburger-react`, `classnames`, `tailwind-merge`, `aos`, `cloudinary` (data URLs only) |
| Linting | ESLint 9 flat config (`@eslint/js`, `react-hooks`, `react-refresh`) |
| Deployment | `gh-pages` (GitHub Pages) |

---

## 3. Getting Started

### Prerequisites

- Node.js (project targets Vite 6; modern LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/NuesaTechTeam/NuesaWebsite.git
cd NuesaWebsite
npm install
```

### Environment variables

Create `.env` in the project root (see [Environment Variables](#14-environment-variables)):

```env
VITE_API_URL="https://r2-to-firestore-worker.nasurf25.workers.dev"
VITE_API_KEY="your_api_key_here"
VITE_UPLOAD_SECRET="your_upload_secret_here"
```

> The API key and upload secret are used by the Cloudflare-backed Digital Library service.
> Contact the technical lead to obtain real values. Without them, the Library search
> feature will fail at runtime (the site itself still runs).

### Run locally

```bash
npm run dev
```

Opens the Vite dev server (default `http://localhost:5173`).

---

## 4. Project Structure

```
nuesa website/
├── index.html                    # Entry HTML, fonts, static SEO/OG meta tags
├── vite.config.js                # Vite + React + Tailwind v4 plugin config
├── tailwind.config.mjs           # Tailwind content globs (framework scaffolding)
├── postcss.config.cjs            # Tailwind postcss + autoprefixer
├── eslint.config.js              # ESLint 9 flat config
├── package.json                  # deps, scripts
├── courses.json                  # 426-course static curriculum index (search metadata + outlines)
├── .gitignore                    # node_modules, dist, .env, docs
├── .gitattributes                # *.mp4 tracked via Git LFS
├── documentation.md              # This file
├── spec.md                       # Project specification
├── public/                       # Static assets served at root
│   ├── favicon.png
│   ├── robots.txt                # Allow-all + .ng sitemap
│   ├── sitemap.xml               # Static sitemap (13 URLs on nuesaabuad.ng)
│   ├── images/                   # blog/ about/ college/ events/ executives/ news/ projects/ nuesa-heart.png
│   ├── documents/                # PDFs (newsletters, achievements, timetables/)
│   └── videos/                   # Local MP4s (elections, orientations, etc.)
├── tests/
│   └── test_search_logic.py      # Manual Python script hitting the search worker
├── docs/superpowers/
│   ├── plans/                    # Implementation plans (SEO/domain work)
│   └── specs/                    # Design specs (SEO/domain work)
└── src/
    ├── main.jsx                  # React root, BrowserRouter, GlobalProvider, AOS init
    ├── App.jsx                   # Lazy routes + Layout + ScrollToTop + Suspense
    ├── index.css                 # Tailwind entry, @theme tokens, keyframes, z-index utilities
    ├── assets/                   # local images (logo, college, heart)
    ├── components/               # Feature + presentational components
    ├── context/                  # GlobalProvider / GlobalContext / useGlobalContext
    ├── hooks/                    # useSEO, useResourceSearch
    ├── lib/                      # api.js, constants.jsx, blogPosts.js, projects.js
    ├── pages/                    # 16 route pages + barrel index.js
    └── reducer/                  # global-reducer.js (scaffolding)
```

### User-facing routes (see [Routing](#6-routing))

```
/  /about  /events  /executives  /projects  /academics  /blog  /library
/contactus  /dinner  /videos  /heart  /feedback  /feedback/complaints
/feedback/suggestions  *  → 404
```

---

## 5. Application Architecture

### High-level data flow

```
Browser
  └─ main.jsx
       ├─ <GlobalProvider>          (React Context shell — currently near-empty)
       └─ <BrowserRouter>
            └─ <App>                (Layout + ScrollToTop + Suspense)
                 └─ <Routes>        (16 lazy route components)
                      ├─ static pages  → useSEO + child components (static data)
                      └─ /library      → useResourceSearch → api.searchDocuments
                                                           → Cloudflare Worker (R2 + Firestore)
```

### Patterns

- **Composition-first pages.** Most pages (Home, About, Events, Projects, Videos,
  ContactUs, Feedback, Blog) are thin wrappers that call `useSEO` and render child
  components.
- **Self-contained feature pages.** Library, Heart, Dinner, Complaints, Suggestions,
  Error, Executives carry significant logic/data inline.
- **Data isolation.** Static site content lives in `src/lib/*` and `courses.json`;
  dynamic library content comes from the search API.
- **Code splitting.** Every page is `lazy()`-imported; `App.jsx` renders an
  `<Suspense fallback>` spinner while chunks load.

### The "Global" Context (skeleton state)

`src/context/` is a **scaffolding foundation, not yet wired up**:

- `GlobalContext.jsx` — plain `createContext()`.
- `GlobalProvider.jsx` — `useReducer(global_reducer, {})` with an **empty initial
  state**; provides `{ ...state, dispatch }`.
- `global-reducer.js` — throws `No Matching "<action>" - action type` for any action.
- `useGlobalContext.js` — `useContext` shortcut.

No component currently consumes `useGlobalContext`, and no action is ever dispatched.
It exists for future global state (e.g. auth, toasts).

---

## 6. Routing

All routes are declared in `src/App.jsx` under `<Suspense>`. The app uses
`BrowserRouter` (not HashRouter).

| Path | Component | Notes |
|---|---|---|
| `/` | `Home` | Landing page composition |
| `/about` | `About` | Overview, mission/vision, disciplines, president message |
| `/events` | `Events` | Event timeline, news, gallery |
| `/executives` | `Executives` | Current + past committees |
| `/projects` | `Projects` | Ongoing + legacy projects |
| `/academics` | `Academics` | Timetables, tutorials, library gate |
| `/blog` | `Blog` | Featured posts, categories, submit article (`?view=submit`) |
| `/library` | `Library` | Digital Library search + Legacy Archive mode |
| `/contactus` | `ContactUs` | WhatsApp-based form + FAQ |
| `/dinner` | `Dinner` | Dinner & Awards Night landing ("Casablanca") |
| `/videos` | `Videos` | Video library with modal player |
| `/heart` | `HeartPage` | H.E.A.R.T. welfare/counseling initiative |
| `/feedback` | `Feedback` | Complaints vs Suggestions gateway |
| `/feedback/complaints` | `Complaints` | Anonymous complaint form (EmailJS) |
| `/feedback/suggestions` | `Suggestions` | Anonymous suggestion form (EmailJS) |
| `*` | `ErrorPage` | 404 "Circuit Breaker Activated" |

`ScrollToTop` scrolls `window` to top on every pathname change.

### Layout special-casing

`src/components/Layout.jsx` hard-codes route-specific behavior:

```js
const fullWidthPages = ["/dinner", "/heart", "/academics"];
```

- `fullWidthPages` → no horizontal `px-5` padding; `mt-10`/`mt-15` top margin.
- All other routes → `px-5` + `mt-17` (navbar height compensation).

---

## 7. Pages

A quick reference for each page. Deep architecture notes live in `spec.md`.

| Page | File | Key content / behavior |
|---|---|---|
| **Home** | `pages/Home.jsx` | Aggregates `Hero`, `AboutHome`, `CollegeEnvironment`, `EventsHome`, `AcademicsHome`, `BlogHome`, `ProjectHome`, `ExecHome`, `ContactHome`. |
| **About** | `pages/About.jsx` | `Overview` (photo slider + stats), `MissionVision` pillars, `Disciplines` (9 depts), `PresidentMessage`. |
| **Academics** | `pages/Academics.jsx` | Framer-motion hero, "The Full Collection" library promo, `TimeTables` (PDF previews), `Tutorials` (YouTube). |
| **Library** | `pages/Library.jsx` | Digital Collection / Legacy Archive toggle; search + level/dept filters + PQ-lock; autocomplete suggestions; skeleton/error/empty states; Load More; JSON-LD `CollectionPage` schema. *See §9.* |
| **Blog** | `pages/Blog.jsx` | `FeaturedSection` carousel, `CategorySection` pills, `PostList`, `CTASection` (submit article modal + WhatsApp share). Reads `?view=submit`. |
| **Events** | `pages/Events.jsx` | `Event` (upcoming/past timeline), `News` (iframe PDF overlay), `Gallery` (slider + lightbox). |
| **Executives** | `pages/Executives.jsx` | Current (2026–2027) + past committees by year; auto-generates schema.org `ProfilePage`/`ItemList` JSON-LD; deep SEO keywords. |
| **Projects** | `pages/Projects.jsx` | `OngoingProjects` carousel, `PastProjects` (incl. video modal for renovated auditorium). |
| **ContactUs** | `pages/ContactUs.jsx` | `Form` (WhatsApp deep-link submission), FAQ `Accordion`. |
| **Dinner** | `pages/Dinner.jsx` | Cinematic dark landing for Dinner & Awards Night 2025 ("CASABLANCA"); mouse-parallax glow; CTAs to `dinner.nuesaabuad.ng`. |
| **Videos** | `pages/Videos.jsx` | Sortable/paginated local MP4 grid + fullscreen player overlay + "Submit Video" placeholder. |
| **Heart** | `pages/Heart.jsx` | 848-line self-contained initiative page: quote carousel, mission/vision, timeline, team (Cloudinary photos), events, searchable resources, counselor contact form (WhatsApp + Google Form), volunteer join. |
| **Feedback** | `pages/Feedback.jsx` | Two-card gateway to `/feedback/complaints` and `/feedback/suggestions`. |
| **Complaints** | `pages/Complaints.jsx` | Anonymous-by-default form → `sendFeedbackEmail("Complaint", …)`. |
| **Suggestions** | `pages/Suggestions.jsx` | Same UX as Complaints → `sendFeedbackEmail("Suggestion", …)`. |
| **Error (404)** | `pages/Error.jsx` | Engineering-themed 404: gears, "Circuit Breaker Activated", diagnostics, quick nav. |

### `pages/index.js` (barrel)

Re-exports all pages. `Heart.jsx` is the only renamed export (`HeartPage`).

---

## 8. Components

### Top-level (`src/components/`)

| Component | Purpose |
|---|---|
| `Layout.jsx` | Navbar + `<main>` + Footer shell; route-aware padding/top-margin. |
| `Navbar.jsx` | Fixed navbar: desktop links, "More" Radix dropdown, "Follow us" social dropdown, full-screen animated mobile menu (`framer-motion`, `hamburger-react`). |
| `Footer.jsx` | Brand, quick links, resources, social icons, dynamic copyright year. |
| `Hamburger.jsx` | Wraps `hamburger-react` `Sling` icon (mobile only, `md:hidden`). |
| `ScrollToTop.jsx` | Scrolls to top on route change; renders nothing. |

### Feature sections (`src/components/<Section>/`)

Subdirectories: `About/`, `Academics/`, `Blog/`, `ContactUs/`, `Events/`,
`Executives/`, `Heart/` (empty placeholder), `Home/`, `Projects/`, `Videos/`.

- **Home:** `Hero`, `CollegeEnvironment` + `GallerySlider` (autoplay cross-fade sliders).
- **About:** `Overview`, `MissionVision`, `Disciplines`, `PresidentMessage`, `AboutHome`.
- **Academics:** `AcademicsHome`, `TimeTables` (react-pdf-viewer), `Tutorials`,
  `Filters`, `DropdownFilter` (ARIA listbox), `ResourceCard`, `ResourceExplorer`,
  `Notes` (~45 static Google-Drive notes), `PastPapers` (~50 static papers).
- **Blog:** `BlogHome`, `FeaturedSection`, `FeaturedCarousel`, `CategorySection`,
  `PostList`, `PostCard`, `ArticleModal` (Radix Dialog, `dangerouslySetInnerHTML`),
  `CTASection` (ReactQuill + EmailJS submission form).
- **ContactUs:** `ContactHome`, `Form` (WhatsApp composer), `Faq`/`AccordionDemo` (Radix Accordion).
- **Events:** `EventsHome`, `Event` (timeline + IntersectionObserver reveals), `EventCard`,
  `News` (iframe PDF overlay), `Gallery` (hero slider + modal grid + lightbox).
- **Executives:** `ExecHome`, `Executive` (tabs + year dropdown), `ExecutiveCard`.
- **Projects:** `ProjectHome`, `OngoingProjects`, `ProjectCarousel`, `PastProjects`,
  `ProjectCard`, `ProjectModal`.
- **Videos:** `VideosSection`, `VideoCard` (hover-play preview), `VideoOverlay`, `SubmitVideoOverlay`, `videosData.js`.

### Iconography

- `lucide-react` — most UI icons.
- `react-icons/fa`, `react-icons/gi`, `react-icons/bs` — brand icons and special glyphs.
- `@heroicons/react` — installed; usage is minimal.

---

## 9. The Digital Library (flagship feature)

### 9.1 Where it lives

- Page: `src/pages/Library.jsx`
- Data hook: `src/hooks/useResourceSearch.js`
- API client: `src/lib/api.js` (`searchDocuments`, `getCourses`)

### 9.2 Backend contract

The search API is a **Cloudflare Worker** at
`https://r2-to-firestore-worker.nasurf25.workers.dev` backed by **Cloudflare R2**
(object storage for the files) and **Firestore** (document metadata index).

**Request** — `GET {VITE_API_URL}?` plus a subset of:

| Param | Meaning |
|---|---|
| `q` | Free-text query |
| `course_code` | Exact course code (e.g. `EEE 313`) or special sentinel `PQ` |
| `level` | `100`–`500`, or `GENERAL` |
| `department_code` | `AAE`, `BME`, `CHE`, `COE`, `CVE`, `EEE`, `MCT`, `MEE`, `PTE` |
| `semester` | Optional |
| `limit` | Page size |
| `cursor` | Opaque pagination cursor (may be a `level-fanout:` base64 cursor) |

**Headers:** `X-API-Key: {VITE_API_KEY}`

**Response:** `{ documents: [...], total, next_cursor }`

**Document shape (consumed by `ResourceCard`):**

```js
{
  id, course_code, file_name, level, department_code, semester, file_path
}
```

### 9.3 Client-side fan-out strategies (`api.js`)

The worker only supports single-department queries, so the client fans out:

- `searchLevelAcrossPrefixes` — **Level search without a department**: runs one
  request per department prefix (`getLevelPrefixes` derives prefixes from
  `courses.json` for that level), merges/deduplicates, and paginates with a
  base64-encoded `level-fanout:` cursor that tracks per-department cursors plus a
  spill buffer.
- `searchPqAcrossTargets` — **"PQ only" mode** (`course_code === "PQ"`): fans out
  across all 9 departments × 6 levels (`getPqTargets`) with the same cursor protocol.
- Plain `fetchDocuments` — direct single query for everything else.

Both fan-out paths compute `targetLimit = max(ceil(limit / activeTargets), min)` and
merge results sorted by `course_code/file_name`.

### 9.4 `useResourceSearch` hook behavior

- State: `documents, loading, error, searchQuery, selectedLevel, selectedDept,
  nextCursor, totalCount, isPQLocked, matchedCourse, levels, departments`.
- **Race protection:** `AbortController` cancels in-flight requests; a monotonic
  `fetchGenRef` generation counter ensures only the latest fetch commits state.
- **Caching:** in-memory cache keyed by `JSON.stringify(params)` (skipped for load-more).
- **Debounce:** 300 ms for typed queries; **synchronous** fetch when the query is
  empty (deliberate fix for a React 18 StrictMode blank-page bug).
- **Stale-closure safety:** live state snapshot via `stateRef.current`.
- `normalizeQueryData` — matches `^([A-Z]{3})\s*(\d{2,4})$` course codes (e.g.
  `EEE 509`) or a title substring against `courses.json`; drives the "Suggested
  Courses" autocomplete and "Searching for: CODE — Title" badge.

### 9.5 `getCourses`

Static, client-side paging + filtering over `courses.json`:
params `limit`, `cursor` (a course `code`), `department_code|department`, `level`, `q`.
Includes a `DEPARTMENT_MAP` mapping department codes (incl. aliases `CVL→CVE`,
`MCE→MCT`) to full program names, plus a `GENERAL → GENERAL STUDIES` entry.
Returns `{ courses, next_cursor }`, with `id` = course `code`.

### 9.6 Legacy Archive mode

The Library page supports a "Legacy Archive" toggle that reuses the older static
`Notes` and `PastPapers` components (Google Drive / Docs export links) rather than
the API-backed explorer.

---

## 10. Hooks

| Hook | File | Description |
|---|---|---|
| `useSEO` | `src/hooks/useSEO.js` | Imperative SEO manager: sets `document.title`, manages `description`/`keywords`, Open Graph + Twitter meta, canonical link, and optional JSON-LD structured data. All changes are cleaned up on unmount. Site origin hard-coded to `https://nuesaabuad.ng`. |
| `useResourceSearch` | `src/hooks/useResourceSearch.js` | Full library search state machine (see §9.4). |

### `useSEO` options

```js
useSEO({
  title,            // page title (site suffix appended automatically)
  description,
  keywords,
  ogImage,          // relative or absolute
  canonicalPath,    // defaults to window.location.pathname
  structuredData,   // object → injected as <script type="application/ld+json">
});
```

---

## 11. Context & Reducer

See "The Global Context (skeleton state)" in [§5](#5-application-architecture).
Effectively: a ready-to-use Reducer + Context scaffold with **no real state yet**.

---

## 12. Static Data Sources

| File | Contents |
|---|---|
| `src/lib/constants.jsx` | `navbarLinks`, `socialLinks`, `faqData`, `eventsData`, `timeTables`, `newsArticles`, `galleryPhotos`, `collegeGallery`, `currentExecutivesData`, `pastExecutivesByYear` |
| `src/lib/blogPosts.js` | 3 blog posts (2 featured), with full HTML `content`. |
| `src/lib/projects.js` | `ongoingProjects` (2), `pastProjects` (4). |
| `src/lib/api.js` | `coursesData` import + API helpers + `sendFeedbackEmail`. |
| `courses.json` | **426 course records** for 9 disciplines × levels 100–500; 54 records include rich `description`, `outline` (modules with `subtopics`), and `outline_sources`. |
| `src/components/Videos/videosData.js` | 5 local MP4 entries. |

### `courses.json` record shape

```js
{
  "code": "AAE 335",
  "offered_by_programs": ["AERONAUTICAL ENGINEERING", ...],
  "title": "ORBITAL MECHANICS I",
  "type": "CORE" | "ELECTIVE",
  "units": 3,
  "levels": ["300"],
  "semesters": ["FIRST" | "SECOND"],
  "is_elective": false,
  "description": "…",          // optional (54 courses)
  "outline": [                 // optional
    { "title": "…", "subtopics": ["…"], "sources": ["S1", "…"] }
  ],
  "outline_sources": ["S1", "…"]   // optional
}
```

---

## 13. External Service Integrations

| Service | Where | Details |
|---|---|---|
| **Cloudflare Worker + R2 + Firestore** | Library search | `searchDocuments`; `X-API-Key` header; fan-out pagination. |
| **EmailJS** | Complaints, Suggestions, Blog article submission | Public key `I_mhIENGLPNaiT96V`; service `service_mdn74w9`; template `template_13y81mw` (feedback), `template_pedcd6o` (blog). |
| **WhatsApp deep links** | Contact Us, Blog share, Heart counselors, Executive cards | `wa.me/2348102841732` (general), `wa.me/2349017615500` (H.E.A.R.T.), `wa.me/?text=` (share). |
| **Google Drive / Docs** | Legacy Notes/Past Papers, News PDFs | `drive.google.com/uc?export=download`, `docs.google.com/.../export`. |
| **YouTube** | Tutorials section | Playlist + `youtu.be` links. |
| **Google Forms** | Heart contact + volunteer signup | `forms.gle/tJXHvaVaYtq9d5pR6`. |
| **Cloudinary** | Heart team photos only | `res.cloudinary.com/dtamm3ss1/...`. |
| **react-pdf-viewer / pdfjs-dist** | Academics timetables | Embedded PDF previews of `public/documents/timetables/*.pdf`. |
| **Subdomain** | Dinner page | External ticket site `https://dinner.nuesaabuad.ng`. |
| **Local media** | Videos, gallery, documents | `public/videos/*.mp4`, `public/images/...`, `public/documents/...`. |

> **Security note:** EmailJS public key, service/template IDs, and the test search
> key appear **in plain text in client code** (`api.js`, `CTASection.jsx`). These are
> public-by-design keys for browser SDKs; still, review EmailJS template/link rules.

---

## 14. Environment Variables

| Variable | Status | Use |
|---|---|---|
| `VITE_API_URL` | Optional (has default) | Base URL for the library search worker. Default `https://r2-to-firestore-worker.nasurf25.workers.dev`. Trailing slashes stripped. |
| `VITE_API_KEY` | Required for Library | Sent as `X-API-Key` on every search request. |
| `VITE_UPLOAD_SECRET` | Documented only | Referenced in README/env template; **not referenced in source code**. Future upload feature. |

---

## 15. Styling & Design System

- **Entry point:** `src/index.css` (`@import "tailwindcss"`).
- **Tailwind v4 `@theme` design tokens:**

  - Fonts: `font-poppins`, `font-lora`, `font-montserrat`, `font-dm`, `font-playfair`,
    `font-neue` (Bebas Neue), `font-cinzel`.
  - Brand palette `green` (`#0f5132`) with scale `green-50…green-950` plus
    `green-light`/`green-dark`.
- **Base layer:** `p` uses Montserrat; headings/labels use DM Sans; buttons use Poppins
  with a press-scale (`transform: scale(0.97)`) disabled on coarse-pointer screens.
- **Utilities:** `.scrollbar-hidden`, `.animate-fadeIn`, `.animate-slideUp/Down`
  (Radix accordion), shimmer keyframes.
- **Z-index contract:** `.z-nav` (1000), `.z-nav-dropdown` (1010), `.z-mobile-menu`
  (990), `.z-modal` (2000), `.z-modal-backdrop` (1999), `.z-toast` (3000),
  `.z-tooltip` (4000).
- **Reduced motion:** global `prefers-reduced-motion` block neutralizes transforms,
  scales, and long animations; `useReducedMotion()` used in Library.
- Fonts loaded from Google Fonts in `index.html` (DM Sans, Lora, Montserrat, Poppins,
  Bebas Neue, Cinzel, Playfair).
- Note: `tailwind.config.mjs` is largely scaffolding (empty `extend`); the real theme
  lives in `index.css` via Tailwind v4 `@theme`. `graphics/` gradients and decorative
  patterns are inlined in JSX.

---

## 16. SEO Machinery

- **Canonical domain:** `nuesaabuad.ng` everywhere (`index.html`, `robots.txt`,
  `sitemap.xml`, `useSEO.js`, page structured data). Prior `.org` references removed
  (see `docs/superpowers/`).
- **Static base meta** in `index.html`: title, description, keywords, OG/Twitter,
  theme-color `#0f5132`, canonical.
- **Per-route SEO** via `useSEO` — every page sets title/description; Library, Heart,
  Executives additionally inject **JSON-LD structured data** (`CollectionPage` with
  `SearchAction`, `WebPage` with `Service`, `ProfilePage` with `ItemList`/`Person`).
- **Sitemap** (`public/sitemap.xml`): 13 static URLs with changefreq/priority.
- **robots.txt:** `Allow: /` + `.ng` sitemap URL.
- **404 handling:** `npm run build` copies `dist/index.html` → `dist/404.html` so the
  SPA router works under GitHub Pages.

---

## 17. Testing

There is **no automated JS test framework configured**. `package.json` has no `test`
script.

- `tests/test_search_logic.py` — a **manual ad-hoc Python script** that hits the
  search worker directly (uses the hardcoded test key `nuesa123`) to verify
  `course_code`/`department_code`/`level` searches. It is not wired into any CI.
- The prior SEO plan references `npm test` only to note its absence.

**Recommended validation before shipping:**
1. `npm run build` (must succeed).
2. `npm run lint` if needed (no lint script currently wired into `package.json`);
   run `npx eslint .` to lint.

---

## 18. Deployment

The project deploys to **GitHub Pages** via `gh-pages`.

```bash
npm run deploy        # runs predeploy (build) then publishes dist/
```

`predeploy` = `npm run build`, which also copies `index.html` → `404.html` for SPA
routing. `vite.config.js` has the `base` option commented out
(`// base: '/NuesaWebsite/'`), so the current build assumes a root-relative deployment
(e.g. a custom domain such as `nuesaabuad.ng`). Uncomment/adjust `base` if deploying
to a project sub-path.

---

## 19. Build & Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Dev server with HMR. |
| `build` | `vite build && cp dist/index.html dist/404.html` | Production build + SPA 404 file. |
| `preview` | `vite preview` | Preview the production build locally. |
| `predeploy` | `npm run build` | Build before deploy. |
| `deploy` | `gh-pages -d dist` | Publish `dist/` to GitHub Pages. |

---

## 20. Code Conventions

- **File style:** Functions are `function declarations` or arrow components exported as
  named/default exports; barrel `index.js` files re-export with named exports.
- **Components:** PascalCase filename; hooks `use*`; page wrappers call `useSEO`.
- **Styling:** Tailwind utility classes; brand colors via `bg-green-*`/`text-green-*`;
  custom z-index utilities; kB the arbitrary-value classes (`text-[5.5rem]`,
  `grid-cols-[1.05fr_0.95fr]`).
- **Comments:** sparse; ESLint flags unused vars but ignores `^[A-Z_]` prefixed names
  (e.g. icon component imports) via `varsIgnorePattern`.
- **Linting:** ESLint flat config incl. recommended React hooks + refresh rules.
  `react-refresh/only-export-components` is a **warn** (barrel files tolerate it).
- **Icon imports:** components import icons with PascalCase (e.g. `import { Wrench } from "lucide-react"`), which the ESLint unused-var ignore pattern relies on.
- **No TypeScript / no PropTypes** (only `Dinner.jsx` defines a (minimal) `propTypes`).

---

## 21. Known Notes, Quirks & Dead Code

- **Global context is unused** — scaffold only.
- **`axios`, `react-apexcharts`, `swiper`, `@heroicons/react`, `cloudinary`** are
  installed but effectively unused in current source (Cloudinary only supplies image
  URLs in `Heart.jsx`).
- **`VITE_UPLOAD_SECRET`** is documented but not referenced in code.
- **`tailwind.config.mjs`** is stale scaffolding; the real Tailwind v4 theme is in
  `index.css`.
- **`tests/test_search_logic.py`** contains a hardcoded API test key (`nuesa123`).
- **Hidden/dead JSX:** President message block in `AboutHome.jsx` (CSS `hidden`);
  scroll-down hint in `Home/Hero.jsx` (`hidden`); commented-out Dinner header/features;
  commented-out newsletter/news/blog items in `constants.jsx`; duplicate commented
  entries in `Notes.jsx`/`PastPapers.jsx`; commented college "classrooms" gallery
  category and several workshop images.
- **`Heart/index.js`** is an empty barrel placeholder (page is self-contained).
- **Tutorials data** only includes Mechatronics + Computer Engineering courses even
  though the filter lists all 9 departments.
- **Notes dept filter** only works for aeronautical entries (other notes lack a
  `department` field).
- **Events:** some upcoming items are marked `status: "past"` in `eventsData`
  (e.g. Nuesalympics, Code Red Party, HSE Training) — data likely reflects reality,
  not intent; verify before editing.
- **News section** currently has only 1 active article; the rest are commented out.
- **Executive data** inconsistency: some `year` strings mix `"500 Level"`, `"500"`,
  and `"400 Level"`; departments have spelling variations ("Mechtronics",
  "Aeronautic engineering").
- **Past exec images** for 2021–2024 fall back to a placeholder (`OIP.webp`).
- **EmailJS credentials** are hardcoded and public (see §13 security note).
- **`Image` OG default** points to `public/images/blog/logo.jpg`.
- **`useSEO` cleanup** restores prior head state; JSON-LD is only removed if it was
  created by the hook.

---

## 22. Roadmap / Planned Work

Work documented in `docs/superpowers/` (SEP 2026 session):

- **SEO domain standardization → completed pattern:** canonical `nuesaabuad.ng`,
  page titles, descriptive H1s for Library/H.E.A.R.T., internal sitelink cues,
  static sitemap/robots.
- **Future / implicit:** uploading new documents into the library (the
  `VITE_UPLOAD_SECRET` env expects an upload workflow); richer course outlines for
  the 372 courses currently missing `description`/`outline`; wiring the
  GlobalContext/reducer; adding a real test suite and lint script.

---

*Built by the NUESA ABUAD Technical Team. Maintained as open source on GitHub
(`github.com/NuesaTechTeam/NuesaWebsite`).*