---
version: "ui2web-website-clone"
name: "Home - Phillips Exeter Academy"
description: "A restrained institutional palette built on cream and deep charcoal, with burgundy and yellow accents applied sparingly to navigation and CTAs. Large-scale serif headlines over serif body text establish formality; spacing is generous and asymmetric, allowing photography and white space to dominate. Motion is minimal; the visual system prioritizes legibility and hierarchical clarity over ornament."
colors:
  primary: "#A31F34"
  secondary: "#B7BF10"
  accent: "#FF585D"
  background: "#FCF9F8"
  surface: "#FCF9F8"
  text-primary: "#0F0D0D"
  text-secondary: "#9B1D31"
  border: "#B7BF10"
typography:
  headline-md:
    fontFamily: "Lyon Display"
    fontSize: "90px"
    fontWeight: 300
    lineHeight: "1.05"
  body-md:
    fontFamily: "Lyon Text"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "1.35"
  label-md:
    fontFamily: "Graphik"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "1.05"
spacing:
  base: "14px"
  gap: "20px"
  card-padding: "30px"
  section-padding: "30px"
rounded:
  control: "32px"
  card: "32px"
  pill: "50px"
components:
  card: { background: "#FCF9F8", radius: "32px" }
  button: { background: "#A31F34", radius: "50px" }
---
# Home - Phillips Exeter Academy

Source: https://exeter.edu/

## Overview

The visual system centers on a high-contrast, typography-led identity. A warm cream background (#FCF9F8, 84.9% of screen area) is punctuated by deep charcoal text and burgundy structural elements. Yellow (#B7BF10) acts as a boundary and accent for interactive moments; red (#FF585D) reserves itself for the primary call-to-action button. Serif headlines in Lyon Display command attention; serif body text in Lyon Text maintains formal readability. Spacing is intentionally open—white space and photography are treated as equal design partners, not filler. Motion is restrained to subtle ease-in-out transitions, preserving the institution's gravity.

## Composition

The hero is a full-bleed photograph overlaid with a centered, left-aligned headline block and a single descriptive line in body serif. The navigation bar sits top-center on the image, anchoring the institution name on the left and primary CTA (red pill) on the right. Below the hero, content flows in asymmetric bands: a text-and-image section pairs a broad photograph on the left with pulled quotation and metadata on the right; a masonry grid of four images (two narrower left column, two wider right column) follows. This arrangement rejects a uniform grid or symmetric left-text/right-image split—it privileges the photographs as primary content while allowing text to nestle alongside. Small category labels above certain sections exist but are not reproduced here. The footer includes a crest icon rendered in burgundy.

## Colors

**Primary (#A31F34, 14.9% area):** Deployed in the navigation text, section headings, and body copy to establish institutional authority and ensure WCAG AA contrast against cream. Its saturation allows it to recede without disappearing.

**Secondary (#B7BF10, area 3%):** Appears as a thin vertical separator line on the far right of the viewport and as a subtle border accent framing content blocks. Its yellow-green sits outside the warm/cool spectrum intentionally, breaking visual monotony without competing with the photograph.

**Accent (#FF585D, <1%):** Reserved exclusively for the primary call-to-action button (top-right, pill-shaped). This restraint ensures the CTA reads as the single most actionable moment on the page—every other interactive element (nav links, secondary buttons) uses burgundy or yellow, so red's isolation is meaningful.

**Background & Surface (#FCF9F8):** Both roles use the same cream to create a seamless, undifferentiated canvas. The abundance of white space prevents visual fatigue and allows photography to breathe.

**Text Primary (#0F0D0D):** Near-black body and label text ensures legibility at all sizes and sits in high contrast against cream (WCAG AAA). Used for all body copy and section labels.

**Text Secondary (#9B1D31):** A burgundy variant used sparingly for metadata, bylines, and secondary headings—a softer anchor that maintains hierarchy without competing with primary text.

**Border (#B7BF10):** The yellow separator line on the right edge of the page creates a visual "gateway" without closing the composition. It suggests continuity off-screen, preventing the layout from feeling trapped.

The ratio protects the accent moment (red CTA) by leaving it isolated. Burgundy and yellow together create a muted institutional palette; their combined area is less than 20%, so photography and white space remain the dominant visual forces.

## Typography

**Headline (Lyon Display, 90px, weight 300, 1.05 line-height):** Used for the hero headline and section titles. The light weight and large size exploit the serif's letterforms; generous leading (tighter than body) prevents awkward gaps. Display is reserved for structural hierarchy, not body emphasis.

**Body (Lyon Text, 22px, weight 400, 1.35 line-height):** The workhorse. Handles hero subheading, pull quotes, and all body copy. Wider line-height (1.35) accommodates longer reading passages and aids visual rhythm. Serif supports formal tone.

**Label (Graphik, 32px, weight 600, 1.05 line-height):** A sans-serif used for category labels, metadata, and small UI text. Its weight and grotesque geometry contrast with the serif families, signaling "supporting information" rather than primary content. Appears above content bands and inline with images.

The serif/sans pairing (Lyon families + Graphik) creates tonal contrast: serif = institutional weight; sans = functional clarity. No decorative or display sans; all type is either functional or hierarchical.

## Layout

**Spacing Rhythm:** Base spacing is 14px; gaps between content blocks are 20px. Card padding is 30px (interior breathing room); section padding is 30px (vertical distance between major content bands). This creates a 2:1 ratio between internal and external spacing, making cards feel contained without isolation.

**Grid Structure:** The lower image section uses a 2-column masonry approach—left column contains two tall vertical images, right column contains two wider landscape images—rather than a uniform 4-cell grid. This asymmetry mirrors the hero's off-center text placement and acknowledges the varied aspect ratios of photography. It reads as intentional curation, not responsive collapse.

**Max-Width & Density:** Hero text block sits in a narrow left column; body copy and pull quotes are contained in a narrower right column. This prevents 80+ character lines and maintains intimate reading. The full-bleed photo beneath the text creates visual release—low density in text, high density in image.

**Responsive:** Photography stacks vertically on smaller viewports; text blocks remain readable via adjusted sizing, not hidden. The yellow separator line persists as a right-edge accent even on mobile, grounding the layout's edge.

## Components

**Card:** Background inherits surface (#FCF9F8); radius is 32px (smooth but not rounded to a pill). Cards are rarely used as discrete containers here; instead, they anchor content blocks (quotation + metadata) or image galleries. Subtle subtle shadow (if any) is minimal—the cream background and generous spacing create sufficient visual separation.

**Button:** The primary CTA uses a red (#FF585D) background with 50px radius (full pill). Secondary buttons (if present in lower sections) use burgundy (#A31F34) with 32px radius, creating clear hierarchy through both color and shape. All buttons use Graphik 600 weight for legibility at smaller sizes; text color is white or cream depending on contrast.

## Motion

Transitions follow a single, restrained rule: **all 0.5s ease-in-out** for interactive state changes (button hover, navigation underline, overlay). No parallax, no infinite animations. Hover states on buttons and links shift background color or add a subtle scale (1.02) to confirm interaction without distraction. The ease-in-out curve creates a deliberate, institutional feel—neither snappy nor sluggish.

## Effects

**Photography is the primary visual effect.** Overlaid text on the hero hero uses a semi-transparent dark scrim (approximately 30–40% opacity) behind headline and subheading text to ensure legibility over bright floral imagery. No gradients, no blur filters. The yellow separator line on the right edge is a flat 1px or 2px stroke—no shadow, no gradient.

A burgundy crest icon (#A31F34) appears in the footer, rendered as a simple SVG or icon font (Font Awesome 6 Pro suggested). It introduces a moment of visual personality without ornament.

## Guardrails

- **Preserve the 84.9% cream background coverage.** Never introduce secondary surface colors or tinted sections that erode this calm, high-contrast canvas. White and cream are interchangeable; never introduce gray (#CCCCCC–range).
- **Keep the red CTA isolated.** No other elements should use #FF585D. All secondary interactive moments (links, secondary buttons, form states) use burgundy or yellow; this restraint is the system's signature.
- **Maintain serif headline–serif body pairing.** Never swap Lyon Text for a sans serif body, or use a condensed/display serif for running text. The serif/sans contrast (Lyon + Graphik) must be preserved.
- **Respect asymmetric composition.** Do not default to centered, symmetric layouts. Offset text, nest elements into white space, and use photography as a primary compositional anchor—never treat it as decoration.
- **Avoid ornament and gradient.** The identity is typographic and photographic, not illustrative. No full-screen overlays, no decorative borders, no blur or glow effects beyond the hero scrim.