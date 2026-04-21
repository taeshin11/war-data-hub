# War Data Hub — PRD

> Short Title: Curated Conflict Research Data & Resource Hub
> Last Updated: 2026-04-14

---

## Overview

War Data Hub is a multilingual, statically generated reference site that aggregates and curates links to publicly available datasets, APIs, NGO reports, primary government sources, and academic resources related to armed conflict. The site serves as a one-stop directory for conflict researchers, data journalists, policy analysts, and students who need high-quality, reliable data about wars, casualties, displacement, economic impact, and humanitarian crises.

Resources are organized by three primary axes: conflict (e.g., Russia-Ukraine, Gaza, Yemen), category (e.g., casualties, displacement, economic impact, food security), and originating organization (e.g., UNHCR, ACLED, UNOCHA, ISW). Each resource has a structured entry including title, description, source organization, data format, update frequency, license, and direct URL.

Live URL: https://war-data-hub.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Data journalists | Finding conflict datasets requires knowing which organizations publish them and where | Curated directory organized by conflict and category, with format/license info |
| Academic researchers | Spending hours searching for primary sources before analysis begins | Pre-vetted, described resources with methodology notes reduce search time |
| Policy analysts & NGO staff | Hard to find datasets across multiple organizations in one interface | Organization-focused pages let users explore all resources from a trusted source |
| Students & educators | Intimidated by scattered data landscape; unsure what sources are credible | Quality indicators (primary/secondary/unverified) help calibrate trust |
| OSINT analysts | Need specific formats (CSV, JSON, API, shapefile) for tooling | Format field and download/API links for each resource |
| Humanitarian workers | Need displacement, food security, and health data quickly | Category pages for displacement and food security with direct links |
| SEO/organic traffic | Searching "war data sources" or "conflict datasets" | Category and organization pages optimized for these queries |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (resources.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Analytics: Vercel Analytics (free tier)

---

## Pages & Routes

### App Router Structure

```
app/
  [locale]/
    layout.tsx              — Root layout: header, footer, locale provider, AdSense
    page.tsx                — Homepage: featured resources, quick category links, stats
    loading.tsx             — Skeleton loader
    not-found.tsx           — 404 page
    about/
      page.tsx              — About the project, curation methodology, submission guide
    category/
      [slug]/
        page.tsx            — Category landing page (e.g., /category/casualties)
    conflict/
      [slug]/
        page.tsx            — Conflict landing page (e.g., /conflict/ukraine-russia)
    org/
      [slug]/
        page.tsx            — Organization page (e.g., /org/acled, /org/unhcr)
    page.tsx                — (Duplicate reference; canonical is [locale]/page.tsx)
  api/
    resources/
      route.ts              — GET: returns resources.json (supports ?category=, ?conflict=, ?org=)
    revalidate/
      route.ts              — POST: ISR revalidation trigger
```

### Key Page Descriptions

**Homepage (`/[locale]/`)**
- Hero: "The curated directory for conflict research data" with search bar
- Quick stats: total resources indexed, organizations covered, conflicts tracked, categories
- Featured Resources section: 6 highlighted resources (one per category, hand-curated)
- Category quick-links grid: icons for each category (Casualties, Displacement, Economics, Food Security, Satellite/GIS, Legal/Sanctions)
- Recent additions: last 5 resources added to the directory
- Top Organizations strip: logos/names of 8 major data providers (ACLED, UNHCR, UNOCHA, ISW, SIPRI, WFP, ICRC, World Bank)
- Ad: leaderboard above fold, rectangle after featured resources

**Category Pages (`/[locale]/category/[slug]/`)**
- Category header: name, description of what data this category covers
- Resource count for this category
- Resource cards: all resources in this category, sorted by quality rating then recency
- Each card: title, organization badge, conflict tags, format badge (CSV/API/PDF/JSON/Shapefile), update frequency, license, description excerpt, external link button
- Sub-category filter (e.g., within "casualties": civilian casualties, military casualties, event-level)
- Related categories links
- Ad: rectangle in sidebar

**Conflict Pages (`/[locale]/conflict/[slug]/`)**
- Conflict header: name, active dates, parties, brief context paragraph
- Resource count for this conflict
- Resources grouped by category (tabs or sections)
- Data gap indicator: categories with few resources flagged as "limited data"
- Related conflict pages
- External map/tracker links (links to sister sites: ukraine-frontline-tracker, strike-signal if applicable)
- Ad: rectangle below resource list

**Organization Pages (`/[locale]/org/[slug]/`)**
- Organization header: full name, acronym, country/HQ, type (IGO, NGO, Academic, Government), website
- Mission description
- All resources published by this organization (cards)
- Data specialization tags
- Notable datasets highlighted
- Link to official organization website
- Related organizations

**About Page (`/[locale]/about/`)**
- Project description and purpose
- Curation methodology: how resources are selected, quality criteria
- Quality rating system explanation (Primary Source / Authoritative Secondary / General Reference)
- How to submit a resource (email or GitHub issue link)
- Update cadence
- Data format glossary (CSV, API, GeoJSON, Shapefile, PDF, etc.)
- License information for the directory itself

---

## Data Model (JSON schema)

### /public/data/resources.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalResources": 320,
    "categoriesCount": 8,
    "conflictsCount": 12,
    "organizationsCount": 45,
    "version": "1.0.0"
  },
  "resources": [
    {
      "id": "res-acled-001",
      "title": "ACLED Conflict Data — Ukraine",
      "description": "Armed Conflict Location & Event Data Project provides georeferenced, real-time data on conflict events in Ukraine including battles, explosions, violence against civilians, and protests.",
      "organization": {
        "slug": "acled",
        "name": "Armed Conflict Location & Event Data Project",
        "acronym": "ACLED"
      },
      "conflictTags": ["ukraine-russia"],
      "categoryTags": ["casualties", "conflict-events", "gis"],
      "format": ["csv", "api", "xlsx"],
      "updateFrequency": "weekly",
      "license": "free-noncommercial | open | commercial | requires-registration",
      "requiresRegistration": true,
      "apiAvailable": true,
      "apiDocsUrl": "https://apidocs.acleddata.com/",
      "directUrl": "https://acleddata.com/ukraine-crisis/",
      "downloadUrl": "https://acleddata.com/data-export-tool/",
      "qualityRating": "primary | authoritative-secondary | general-reference",
      "dateAdded": "2026-01-15",
      "lastVerified": "2026-04-14",
      "languageOfData": "en",
      "geographicCoverage": "Ukraine",
      "temporalCoverage": {
        "start": "2022-01-01",
        "end": "ongoing"
      },
      "tags": ["events", "georeferenced", "real-time", "csv", "api"],
      "notes": "Free for non-commercial use with registration. Commercial use requires license."
    }
  ],
  "categories": [
    {
      "slug": "casualties",
      "name": "Casualties & Human Losses",
      "description": "Datasets tracking civilian and military deaths, injuries, and missing persons in conflict zones",
      "icon": "skull",
      "resourceCount": 42,
      "subCategories": ["civilian-casualties", "military-casualties", "event-level-data"]
    },
    {
      "slug": "displacement",
      "name": "Displacement & Refugees",
      "description": "Data on internally displaced persons (IDPs), refugees, and cross-border population movements",
      "icon": "home",
      "resourceCount": 38
    },
    {
      "slug": "economics",
      "name": "War Economy & Sanctions",
      "description": "Economic impact data, defense spending, sanctions, trade disruption, and reconstruction costs",
      "icon": "chart-bar",
      "resourceCount": 31
    },
    {
      "slug": "food-security",
      "name": "Food Security & Agriculture",
      "description": "Commodity price data, food crisis indices, agricultural disruption, and supply chain impacts",
      "icon": "wheat",
      "resourceCount": 28
    },
    {
      "slug": "gis",
      "name": "Maps, GIS & Satellite",
      "description": "Geospatial datasets, satellite imagery, shapefiles, and map layers for conflict zones",
      "icon": "map",
      "resourceCount": 35
    },
    {
      "slug": "legal",
      "name": "Legal & Sanctions",
      "description": "Sanctions lists, war crimes documentation, international humanitarian law resources",
      "icon": "scale",
      "resourceCount": 22
    },
    {
      "slug": "humanitarian",
      "name": "Humanitarian Response",
      "description": "Aid delivery data, OCHA situation reports, health data, access constraints",
      "icon": "heart",
      "resourceCount": 29
    },
    {
      "slug": "media-osint",
      "name": "Media & OSINT",
      "description": "Open-source intelligence aggregators, conflict media monitoring, verification resources",
      "icon": "eye",
      "resourceCount": 25
    }
  ],
  "conflicts": [
    {
      "slug": "ukraine-russia",
      "name": "Russia-Ukraine War",
      "startDate": "2022-02-24",
      "status": "active",
      "context": "Russia's full-scale invasion of Ukraine, the largest conflict in Europe since World War II.",
      "resourceCount": 145
    },
    {
      "slug": "gaza-israel",
      "name": "Gaza-Israel Conflict",
      "startDate": "2023-10-07",
      "status": "active",
      "context": "Armed conflict between Israel and Hamas following the October 7, 2023 Hamas attack on Israel.",
      "resourceCount": 72
    },
    {
      "slug": "yemen",
      "name": "Yemen Civil War",
      "startDate": "2014-09-16",
      "status": "active",
      "context": "Long-running multi-faction civil war involving Houthi forces, the internationally recognized government, and foreign interventions.",
      "resourceCount": 48
    }
  ],
  "organizations": [
    {
      "slug": "acled",
      "name": "Armed Conflict Location & Event Data Project",
      "acronym": "ACLED",
      "type": "ngo | igo | academic | government | media",
      "country": "US",
      "hq": "Washington, DC",
      "website": "https://acleddata.com",
      "description": "ACLED is a disaggregated data collection, analysis, and crisis mapping project that tracks political violence and protest events globally.",
      "specializations": ["conflict-events", "casualties", "gis"],
      "resourceCount": 12
    },
    {
      "slug": "unhcr",
      "name": "United Nations High Commissioner for Refugees",
      "acronym": "UNHCR",
      "type": "igo",
      "country": "CH",
      "hq": "Geneva, Switzerland",
      "website": "https://www.unhcr.org",
      "description": "The UN Refugee Agency provides data on refugees, asylum seekers, IDPs, and stateless persons worldwide.",
      "specializations": ["displacement", "humanitarian"],
      "resourceCount": 18
    }
  ]
}
```

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 with App Router initialized
- Tailwind CSS and next-intl configured
- 8 locale translation stubs created
- App directory: app/[locale]/, app/api/, public/data/
- resources.json placeholder committed
- Vercel project linked and first deploy successful
- Git push: `feat: scaffold war-data-hub with i18n and routing`

### M1 — Data Layer
- resources.json populated: ≥ 100 curated resources across all 8 categories
- Minimum 5 conflicts covered
- Minimum 20 organizations
- /api/resources/route.ts with ?category=, ?conflict=, ?org= filtering
- Data validation script passing
- Git push: `feat: resources data layer and API route`

### M2 — Layout & Homepage
- Root layout: header with nav (Home, Categories, Conflicts, Organizations, About), language switcher, footer
- AdSense script in layout
- Homepage hero with search bar (client-side filter on load)
- Quick stats, featured resources, category grid, top organizations strip
- Recent additions section
- Mobile responsive
- Git push: `feat: homepage, layout, and resource card components`

### M3 — Category & Conflict Pages
- Category pages for all 8 categories
- Resource card component with format badges, license badge, external link
- Conflict pages for all tracked conflicts
- generateStaticParams for both dynamic routes
- Sub-category filter on category pages
- Git push: `feat: category and conflict landing pages`

### M4 — Organization Pages & About
- Organization pages for all orgs in organizations array
- Organization card component with type badge
- About page with methodology and glossary
- Resource submission contact/link
- Git push: `feat: organization pages and about page`

### M5 — i18n, SEO, Sitemap
- All 8 locales complete
- Metadata per page and locale
- sitemap.xml for all category/conflict/org slugs × 8 locales
- robots.txt, hreflang, canonical
- JSON-LD: DataCatalog schema on homepage
- Git push: `feat: i18n, SEO metadata, DataCatalog structured data`

### M6 — QA & Launch
- Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- All external links verified (no 404s in resource URLs)
- Language switcher tested all 8 locales
- Search bar tested with edge cases
- Ad units verified
- GSC verified, sitemap submitted
- Git push: `chore: QA pass and production launch`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Resource card component with all badge types (format, license, quality, update frequency)
- Category page layout with filtering
- Organization page layout
- Homepage search bar (client-side filtering against resources array)
- Responsive grid layouts for resource cards
- Language switcher and locale navigation

**Key Files:**
- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- components/ResourceCard.tsx, FormatBadge.tsx, LicenseBadge.tsx, QualityBadge.tsx
- components/CategoryGrid.tsx, OrgCard.tsx
- components/SearchBar.tsx

### Backend / Data Agent
**Responsibilities:**
- Research and populate resources.json with ≥ 100 quality resources
- Ensure all URLs are valid and direct to the actual dataset
- Maintain organization and conflict arrays
- Implement /api/resources/route.ts
- Write link validation script (checks all directUrl fields for 200 responses)

**Key Files:**
- public/data/resources.json
- app/api/resources/route.ts
- scripts/validate-links.js

### SEO / Content Agent
**Responsibilities:**
- Page metadata for all routes and locales
- Translation files (messages/*.json)
- About page content (methodology, curation criteria, data format glossary)
- JSON-LD DataCatalog schema
- Internal linking strategy (resource pages linking to related sister sites)
- Sitemap covering all dynamic slugs

**Key Files:**
- messages/ (8 locale files)
- app/[locale]/about/page.tsx
- public/sitemap.xml

### QA Agent
**Responsibilities:**
- Verify all resource external links are live
- Test all category, conflict, and org pages
- Test search/filter functionality
- Verify format and license badge display correctness
- Lighthouse audits
- Mobile testing at 375/768/1280px

---

## SEO Strategy

### Primary Keywords
- "war data sources" — homepage and category index
- "conflict data hub" — homepage title
- "military conflict datasets" — homepage meta description
- "conflict research data" — about page and homepage
- "ukraine war data" — conflict: ukraine-russia page

### Secondary Keywords
- "ACLED data download"
- "UNHCR displacement data"
- "conflict casualties dataset"
- "refugee data sources"
- "OSINT conflict resources"
- "war economic data"
- "conflict GIS data"

### Long-tail Keywords
- "where to find ukraine war data"
- "free conflict data for research"
- "civilian casualties dataset ukraine"
- "food security data conflict zones"
- "war crime documentation resources"

### Technical SEO
- Organization pages target branded queries (e.g., "ACLED ukraine data")
- Category pages target informational queries (e.g., "conflict displacement data")
- Conflict pages target conflict-specific queries (e.g., "gaza conflict data sources")
- JSON-LD DataCatalog signals to Google that this is an authoritative data directory
- hreflang for 8 locales maximizes international traffic
- About page methodology builds E-E-A-T
- External link validation keeps the site's quality signal high

### Content Differentiation
- Quality rating system (Primary / Authoritative Secondary / General Reference) differentiates this from generic link directories
- Format and license information adds practical utility not found on most aggregate pages
- Organization pages create a second discovery pathway alongside conflict/category
- Regular additions create freshness signals

---

## Launch Checklist

- [ ] resources.json contains ≥ 100 real, verified resources
- [ ] All 8 categories have at least 5 resources
- [ ] At least 3 conflict slugs populated (ukraine-russia, gaza-israel, yemen minimum)
- [ ] At least 10 organizations in organizations array
- [ ] All 8 locale routes return 200
- [ ] Homepage search bar filters resources correctly
- [ ] All 8 category pages load and display resources
- [ ] At least 3 conflict pages tested
- [ ] At least 5 organization pages tested
- [ ] About page renders correctly
- [ ] External links on resource cards are valid (spot-check 20 links)
- [ ] Format badges display correctly for CSV/API/PDF/JSON
- [ ] License badges display correctly
- [ ] Language switcher works on all pages
- [ ] AdSense ca-pub-7098271335538021 in page source
- [ ] Adsterra units rendering without CLS
- [ ] sitemap.xml includes all category/conflict/org slugs × 8 locales
- [ ] robots.txt accessible and not blocking crawlers
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] No broken internal links
- [ ] OG tags correct
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to GSC
- [ ] Vercel URL confirmed: https://war-data-hub.vercel.app
- [ ] 404 page working for invalid category/conflict/org slugs
