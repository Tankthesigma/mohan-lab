import type { Metadata } from "next";
import { LoadingImage } from "../components/LoadingImage";
import { PageIntro } from "../components/PageIntro";
import { SectionNav } from "../components/SectionNav";
import { getPage, members, textOnly } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

function getAlumniGroups(html: string) {
  const alumniSource = html.split('<div class="alumni-section">')[1] || "";
  const headings = [...alumniSource.matchAll(/<p(?:\s+[^>]*)?>\s*<strong>([\s\S]*?)<\/strong>\s*<\/p>/gi)];

  return headings
    .map((heading, index) => {
      const section = alumniSource.slice(
        (heading.index ?? 0) + heading[0].length,
        headings[index + 1]?.index ?? alumniSource.length,
      );
      const namesHtml = [...section.matchAll(/<p(?:\s+[^>]*)?>([\s\S]*?)<\/p>/gi)]
        .map((match) => match[1])
        .find((value) => /<br\s*\/?>/i.test(value));

      return {
        title: textOnly(heading[1]),
        names: (namesHtml || "")
          .split(/<br\s*\/?>/i)
          .map((name) => textOnly(name))
          .filter(Boolean),
      };
    })
    .filter((group) => group.names.length > 0);
}

export const metadata: Metadata = pageMetadata(
  "People",
  "Meet the faculty, research staff, scientists, graduate students, undergraduate researchers, and trainees of the Mohan Lab.",
);

export default function PeoplePage() {
  const source = getPage("people")!;
  const alumniGroups = getAlumniGroups(source.content.rendered);
  return (
    <>
      <PageIntro eyebrow={`${members.length} current members`} title="People" lead="Faculty, research staff, scientists, graduate students, undergraduates, and trainees working across the Mohan Lab." />
      <SectionNav
        items={[
          { label: "Current members", href: "/people#current-members" },
          { label: "Former members", href: "/people#former-members" },
          { label: "Research opportunities", href: "/opportunities" },
        ]}
      />
      <section className="section-pad people-index" id="current-members">
        <div className="shell member-grid">
          {members.map((member, index) => (
            <article className={`member-card-modern ${index === 0 ? "principal" : ""}`} key={`${member.name}-${index}`}>
              <div className="member-image">
                <LoadingImage
                  src={member.image}
                  alt={member.name}
                  width={720}
                  height={900}
                  sizes={index === 0 ? "(max-width: 820px) 45vw, 40vw" : "(max-width: 560px) 100vw, 24vw"}
                  priority={index === 0}
                />
              </div>
              <div className="member-info-modern">
                <span>{member.role}</span>
                <h2>{member.name}</h2>
                {member.bio && <p>{member.bio}</p>}
                {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
      {alumniGroups.length > 0 && (
        <section className="alumni-band section-pad" id="former-members">
          <div className="shell alumni-layout">
            <aside><span>Lab community</span><h2>Former members & alumni</h2></aside>
            <div className="alumni-directory">
              {alumniGroups.map((group) => (
                <section className="alumni-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.names.map((name, index) => <li key={`${group.title}-${name}-${index}`}>{name}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
