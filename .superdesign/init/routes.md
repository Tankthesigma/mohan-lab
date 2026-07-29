# Route map

All routes use `app/layout.tsx` with Header, SiteMotion, and Footer.

| URL | File | Summary |
| --- | --- | --- |
| / | app/page.tsx | Editorial home with hero, expertise, research, people, news, and opportunities |
| /research | app/research/page.tsx | Research overview, filters, project grid, and resources |
| /research/[slug] | app/research/[slug]/page.tsx | Dynamic project detail pages |
| /people | app/people/page.tsx | Current lab members and source people content |
| /publications | app/publications/page.tsx | Topic links and publications-by-year accordion |
| /news | app/news/page.tsx | Lab-news archive plus individual post directory |
| /opportunities | app/opportunities/page.tsx | High school, undergraduate, graduate, and alumni pathways |
| /opportunities/high-school | app/opportunities/high-school/page.tsx | MLSI tracks, 2026 cohort, eligibility, and application information |
| /opportunities/high-school/cohorts | app/opportunities/high-school/cohorts/page.tsx | 2026, 2025, and earlier intern cohorts |
| /contact | app/contact/page.tsx | Lab contact and location |
| /archive | app/archive/page.tsx | Complete legacy content directory |
| /archive/[slug] | app/archive/[slug]/page.tsx | Dynamic preserved source page or news post |

Routing is Next.js App Router-style file routing implemented by Vinext. Static dynamic routes are generated from `app/lib/content.ts`.
