import type { Metadata } from "next";
import { LoadingImage } from "../components/LoadingImage";
import { resolveMedia } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Contact and visit the Mohan Lab at the University of Houston Science & Engineering Research Center.",
);

export default function ContactPage() {
  const building = resolveMedia("https://mohanlab.bme.uh.edu/wp-content/uploads/2015/09/serc_01.jpg");
  return (
    <section className="contact-page">
      <div className="contact-image">
        <LoadingImage
          src={building}
          alt="Science and Engineering Research Center at the University of Houston"
          width={1600}
          height={1200}
          sizes="(max-width: 820px) 100vw, 54vw"
          priority
        />
      </div>
      <div className="contact-panel">
        <span className="eyebrow">Visit the lab</span>
        <h1>Let’s move the question forward.</h1>
        <p>Our lab is on the second floor of the University of Houston Science & Engineering Research Center.</p>
        <div className="contact-details">
          <div><span>Address</span><address>Science & Engineering Research Center<br />Department of Biomedical Engineering<br />3517 Cullen Blvd, Room 2027<br />Houston, TX 77204</address></div>
          <div><span>Principal investigator</span><a href="mailto:cmohan@central.uh.edu">cmohan@central.uh.edu</a></div>
        </div>
        <div className="contact-actions"><a className="button button-primary" href="mailto:cmohan@central.uh.edu">Send an email <span>↗</span></a><a className="text-link" href="https://maps.google.com/?q=3517+Cullen+Blvd+Houston+TX+77204">Open in Maps <span>↗</span></a></div>
      </div>
    </section>
  );
}
