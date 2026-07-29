# Key page dependency trees

## / (Home)
Entry: `app/page.tsx`
Dependencies:
- app/lib/content.ts
  - source archive JSON and local media paths
- app/layout.tsx
  - app/components/Header.tsx
  - app/components/SiteMotion.tsx
  - app/components/Footer.tsx
  - app/globals.css

## /research
Entry: `app/research/page.tsx`
Dependencies:
- app/components/PageIntro.tsx
- app/components/SectionNav.tsx
- app/components/ResearchGrid.tsx
  - app/lib/content.ts
- app/lib/content.ts
- app/layout.tsx and shared shell

## /people
Entry: `app/people/page.tsx`
Dependencies:
- app/components/PageIntro.tsx
- app/components/SectionNav.tsx
- app/lib/content.ts
- app/layout.tsx and shared shell

## /publications
Entry: `app/publications/page.tsx`
Dependencies:
- app/components/PageIntro.tsx
- app/components/SectionNav.tsx
- app/components/PublicationYears.tsx
  - app/lib/content.ts
- app/lib/content.ts
- app/layout.tsx and shared shell

## /news
Entry: `app/news/page.tsx`
Dependencies:
- app/components/PageIntro.tsx
- app/components/SectionNav.tsx
- app/lib/content.ts
- app/layout.tsx and shared shell

## /opportunities
Entry: `app/opportunities/page.tsx`
Dependencies:
- app/components/PageIntro.tsx
- app/components/SectionNav.tsx
- app/lib/content.ts
- app/layout.tsx and shared shell

## /opportunities/high-school
Entry: `app/opportunities/high-school/page.tsx`
Dependencies:
- app/components/SectionNav.tsx
- app/lib/content.ts
- app/layout.tsx and shared shell

## /opportunities/high-school/cohorts
Entry: `app/opportunities/high-school/cohorts/page.tsx`
Dependencies:
- app/lib/content.ts
- app/layout.tsx and shared shell

## /archive
Entry: `app/archive/page.tsx`
Dependencies:
- app/lib/content.ts
- app/layout.tsx and shared shell

## /archive/[slug]
Entry: `app/archive/[slug]/page.tsx`
Dependencies:
- app/lib/content.ts
- app/layout.tsx and shared shell
