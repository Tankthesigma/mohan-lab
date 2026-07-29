# Extractable components

## Header
- Source: `app/components/Header.tsx`
- Category: layout
- Description: Two-level institutional navigation with active state and responsive menu.
- Extractable props: activeItem (string, default: "news")
- Hardcoded: Mohan Lab identity, University of Houston label, navigation labels, brand mark, route URLs.

## Footer
- Source: `app/components/Footer.tsx`
- Category: layout
- Description: Research statement, site links, department, and address.
- Extractable props: none
- Hardcoded: all copy, labels, links, address, and section structure.

## PageIntro
- Source: `app/components/PageIntro.tsx`
- Category: basic
- Description: Editorial intro block shared by inner pages.
- Extractable props: eyebrow, title, lead
- Hardcoded: semantic section and class structure.

## SectionNav
- Source: `app/components/SectionNav.tsx`
- Category: layout
- Description: Responsive contextual navigation bar beneath page intros.
- Extractable props: label, activeItem
- Hardcoded: responsive overflow behavior and visual structure.

## PublicationYears
- Source: `app/components/PublicationYears.tsx`
- Category: basic
- Description: Expandable publications-by-year interface.
- Extractable props: openYear
- Hardcoded: accordion structure and year labels from supplied data.

## ResearchGrid
- Source: `app/components/ResearchGrid.tsx`
- Category: basic
- Description: Filtered editorial research card grid.
- Extractable props: category
- Hardcoded: category taxonomy and card composition.
