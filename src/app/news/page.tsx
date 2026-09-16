import type { Metadata } from "next";
import { LoadingImage } from "../components/LoadingImage";
import { SectionNav } from "../components/SectionNav";
import { latestNews } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "News",
  "Mohan Lab news, awards, conferences, graduations, collaborations, and community milestones.",
);

export default function NewsPage() {
  const latestItems = latestNews;
  const leadItem = latestItems[0];

  return (
    <>
      <section className="news-ledger-masthead">
        <div className="shell">
          <span className="news-ledger-edition">Mohan Lab · Laboratory record</span>
          <div className="news-ledger-masthead-grid">
            <h1>News &<br />{" "}events</h1>
            <div className="news-ledger-deck">
              <span>Biomedical Engineering · University of Houston</span>
              <p>Collaborations, conference presentations, awards, graduations, visitors, and other updates from the lab.</p>
            </div>
          </div>
        </div>
      </section>
      <SectionNav
        items={[
          { label: "Latest record", href: "/news#lab-news" },
        ]}
      />
      <section className="news-ledger-latest" id="lab-news">
        <div className="shell">
          <header className="news-ledger-heading">
            <span>Current record · 2026</span>
            <h2>From the lab</h2>
            <p>Recent collaborations, milestones, defenses, and gatherings documented by the Mohan Lab.</p>
          </header>

          {leadItem && (
            <article className="news-lead-story">
              <div className="news-story-index">
                <span>Lead record</span>
                <strong>01</strong>
                <small>2026</small>
              </div>
              <div className="news-lead-copy">
                <span>Collaboration</span>
                <h3>{leadItem.title}</h3>
                <p>{leadItem.detail}</p>
              </div>
              <figure>
                <LoadingImage
                  src={leadItem.image}
                  alt={leadItem.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 700px) 100vw, 52vw"
                  priority
                />
                <figcaption>Mohan Lab · {leadItem.date}</figcaption>
              </figure>
            </article>
          )}

          <div className="news-ledger-rows">
            {latestItems.slice(1).map((item, index) => (
              <article className={`news-ledger-row${item.image ? "" : " news-ledger-row-text"}`} key={`${item.title}-${item.image}`}>
                <div className="news-story-index">
                  <span>Lab record</span>
                  <strong>{String(index + 2).padStart(2, "0")}</strong>
                  <small>{item.date}</small>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                {item.image && <LoadingImage
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={520}
                  sizes="(max-width: 700px) 100vw, 310px"
                />}
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
