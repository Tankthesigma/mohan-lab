/** Missing or malformed source content must not take down the study page. */
export function studyRegistrationUrl(html: string | undefined): string | null {
  if (!html) return null;
  for (const match of html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    try {
      const value = match[2].replace(/&amp;|&#038;|&#38;/g, "&");
      const url = new URL(value);
      if (url.protocol === "https:" && url.hostname === "forms.cloud.microsoft" && !url.username && !url.password) return url.href;
    } catch {
      // Other links in the source may be relative or malformed.
    }
  }
  return null;
}
