import { publicationYears } from "../../../lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string }> },
) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) {
    return Response.json({ error: "Invalid publication year." }, { status: 400 });
  }

  const publications = publicationYears.find((entry) => entry.year === year);
  if (!publications) {
    return Response.json({ error: "Publication year not found." }, { status: 404 });
  }

  return Response.json(publications, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
