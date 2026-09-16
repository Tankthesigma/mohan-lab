import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";
import { SectionNav } from "../../components/SectionNav";
import { decodeHtml, getPage } from "../../lib/content";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("Digital Phenotyping Research Study", "Eligibility, participation details, and registration for the Mohan Lab digital phenotyping study.");

export default function StudyPage() {
  const source = getPage("digital-phenotyping")!;
  const registrationUrl = decodeHtml(source.content.rendered.match(/href="(https:\/\/forms\.cloud\.microsoft\/[^" ]+)"/)![1]);
  return (
    <>
      <PageIntro eyebrow="Research participation" title="Digital phenotyping research study" lead="Help us understand how smartphones and wearable devices can track stress, cognition, and well-being during everyday life." />
      <SectionNav items={[{ label: "Participation", href: "#participation" }, { label: "Eligibility", href: "#eligibility" }, { label: "Register", href: "#register" }, { label: "All research", href: "/research" }]} />
      <section className="section-pad" id="participation">
        <div className="shell study-details-grid">
          <div>
            <span className="eyebrow">Three-month study · Fitbit provided</span>
            <h2>What participation involves</h2>
            <p>The study explores how everyday behavior and physiological measurements relate to stress, cognitive function, sleep, heart health, activity, and well-being.</p>
            <ul>
              <li>Wear a study-provided Fitbit throughout the three-month period.</li>
              <li>Use your own smartphone with the study application running.</li>
              <li>Complete brief weekly stress questionnaires.</li>
              <li>Record weekly audio journals about your experiences and feelings.</li>
              <li>Optional continuous glucose monitoring is available.</li>
            </ul>
          </div>
          <div id="eligibility">
            <span className="eyebrow">Who can participate</span>
            <h2>Eligibility</h2>
            <ul>
              <li>Female students at the University of Houston.</li>
              <li>Age 18 or older.</li>
              <li>Not taking daily prescribed medications.</li>
              <li>Not pregnant.</li>
              <li>Not recently hospitalized.</li>
            </ul>
            <p>Questions about eligibility? Contact <a href="mailto:smarri@cougarnet.uh.edu">smarri@cougarnet.uh.edu</a>.</p>
          </div>
          <div><h2>Privacy</h2><p>Study data is kept confidential and secure, with access limited to authorized research personnel. Contact the study team with questions before registering.</p></div>
          <div><h2>Thank-you gift</h2><p>Participants who complete the study may receive a complimentary gift, such as a tote bag, hoodie, or custom 3D-printed item.</p></div>
        </div>
      </section>
      <section className="application-band" id="register">
        <div className="shell application-grid">
          <div><span className="eyebrow light">Express your interest</span><h2>Interested in participating?</h2></div>
          <div><p>Complete the study team’s registration form. Questions can be directed to smarri@cougarnet.uh.edu.</p><a className="button button-white" href={registrationUrl} target="_blank" rel="noopener noreferrer">Register for the study ↗</a><p><Link href="/research/pietroai">Read about the related research →</Link></p></div>
        </div>
      </section>
    </>
  );
}
