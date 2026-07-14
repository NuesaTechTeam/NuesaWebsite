# NUESA SEO Domain and Sitelinks Design

## Goal

Make `https://nuesaabuad.ng` the single canonical domain and strengthen the Library and H.E.A.R.T. pages so Google can understand, index, and potentially expose them as sitelinks beneath the main result.

## Scope

- Replace `.org` references in SEO-controlled files with `.ng`.
- Keep sitemap and robots signals aligned with the `.ng` domain.
- Give `/library` and `/heart` concise, keyword-relevant titles and visible H1 headings.
- Add clear homepage links to both pages using descriptive anchor text.
- Prevent duplicated site-name suffixes in generated titles.
- Preserve the existing page visual design and user-authored SEO/structured-data work unless it conflicts with the canonical-domain requirement.

## Approach

Use the existing React SEO hook and routing structure. The hook will use a single `.ng` site constant for absolute URLs, canonicals, Open Graph metadata, and Twitter metadata. Page-level SEO data will remain colocated with each page. Homepage entry points will use regular React Router links so they are crawlable internal links.

## SEO Content

Library title:

`NUESA ABUAD Digital Library | Engineering Textbooks & Past Questions`

Library H1:

`NUESA ABUAD Digital Library`

H.E.A.R.T. title:

`NUESA H.E.A.R.T. | Student Welfare & Counseling at ABUAD`

H.E.A.R.T. H1:

`NUESA H.E.A.R.T. Initiative`

## Verification

- Run the project test suite and production build.
- Search the repository for unintended `.org` SEO references.
- Confirm sitemap and robots files point to `.ng`.
- Confirm Library and H.E.A.R.T. contain visible descriptive headings and crawlable internal links.

