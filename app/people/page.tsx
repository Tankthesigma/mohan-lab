import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "../components/PageIntro";
import { SectionNav } from "../components/SectionNav";
import { cleanSourceHtml, getPage, members } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "People",
  "Meet the faculty, research staff, scientists, graduate students, undergraduate researchers, and trainees of the Mohan Lab.",
);

export default function PeoplePage() {
  const source = getPage("people")!;
  const alumniHtml = cleanSourceHtml(source.content.rendered.split('<div class="alumni-section">')[1] || "");
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
                <Image
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
      {alumniHtml && (
        <section className="alumni-band section-pad" id="former-members">
          <div className="shell article-grid">
            <aside><span>Lab community</span><h2>Former members & alumni</h2></aside>
            <article className="archive-content compact" dangerouslySetInnerHTML={{ __html: alumniHtml }} />
          </div>
        </section>
      )}
    </>
  );
}
