/** Shared destinations for imported links and original-site redirects. */
export const sourceDestinations = new Map<string, string>([
  ["digital-phenotyping", "/research/digital-phenotyping"],
  ["mohan-lab-draft", "/"],
  ["open-positions", "/opportunities"],
  ["open-positions-2", "/opportunities"],
  ["undergraduate-students", "/opportunities"],
  ["masters-students", "/opportunities"],
  ["phd-students", "/opportunities"],
  ["foreign-and-medical-graduates", "/opportunities"],
  ["mohan-lab-image-and-data-analytics-scholarship-midas", "/opportunities"],
  ["high-school-students", "/opportunities/high-school"],
  ["former-high-school-summer-interns", "/opportunities/high-school"],
]);

export function sourceDestination(slug: string, projectSlugs: ReadonlySet<string>) {
  return sourceDestinations.get(slug)
    ?? (projectSlugs.has(slug) ? `/research/${slug}` : undefined);
}
