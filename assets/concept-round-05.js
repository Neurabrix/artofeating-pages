(() => {
  const appointment = "https://wa.me/916381501165?text=Hello%20I%27d%20like%20to%20schedule%20a%20nutrition%20consultation.";
  const map = "https://www.google.com/maps/search/?api=1&query=129%2C%20140%2C%20Prestige%20Palladium%20Bayam%2C%20Greams%20Road%2C%20Thousand%20Lights%2C%20Chennai%20600006";

  const utility = document.querySelector("[data-provider-utility]");
  if (utility) utility.innerHTML = `
    <div class="provider-utility-inner">
      <span class="provider-utility-label">Appointments · Online and Chennai</span>
      <div class="provider-utility-links">
        <a href="tel:+916381501165" aria-label="Call Shiny Surendran"><b>Call</b><span>+91 63815 01165</span></a>
        <a href="${appointment}" target="_blank" rel="noreferrer" aria-label="Schedule on WhatsApp"><b>WhatsApp</b><span>Schedule</span></a>
        <a href="mailto:info@shinysurendran.com" aria-label="Email Shiny Surendran"><b>Email</b><span>Write</span></a>
        <a href="${map}" target="_blank" rel="noreferrer" aria-label="Open Chennai clinic directions"><b>Map</b><span>Directions</span></a>
        <nav class="provider-utility-social" aria-label="Social media">
          <a href="https://www.youtube.com/@shinyartofeating" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">YT</a>
          <a href="https://instagram.com/shinysurendran" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">IG</a>
          <a href="https://www.facebook.com/shiny.surendran" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">FB</a>
        </nav>
      </div>
    </div>`;

  const common = document.querySelector("[data-round-five-common]");
  if (common) common.innerHTML = `
    <section class="client-alignment provider-section" id="approach">
      <div class="provider-section-heading"><span>The Art of Eating approach</span><h2>Real food. Relevant science. A plan that fits real life.</h2></div>
      <div class="client-pillar-grid">
        <article><span>01 · Metabolic health</span><h3>Build a steadier everyday foundation.</h3><p>Personalised nutrition for wellness and weight goals, women’s and hormonal health, insulin resistance, prediabetes and PCOS—without promising a one-size-fits-all result.</p></article>
        <article><span>02 · Sports &amp; fitness nutrition</span><h3>Support performance, recovery and resilience.</h3><p>Food, hydration and training-phase guidance for performance, recovery, injury-prevention support and muscle building, shaped to the athlete and the sport.</p></article>
      </div>
      <div class="client-principles-grid">
        <article><strong>26+ years</strong><span>of nutrition practice and public education</span></article>
        <article><strong>Food first</strong><span>practical home and local food, including South Indian choices where relevant</span></article>
        <article><strong>Integrated care</strong><span>collaboration with physiotherapists, psychologists, sports physicians, gastroenterologists, endocrinologists and relevant professionals</span></article>
        <article><strong>Judicious support</strong><span>supplements considered when appropriate—not used as the centre of the plan</span></article>
      </div>
    </section>

    <section class="experience-band" id="experience">
      <div><span>Experience in practice</span><h2>From everyday metabolic health to demanding sport.</h2><p>Experience discussed includes Paralympic athletes, track and field, wheelchair basketball, running and other sports work, alongside individual metabolic-health support.</p></div>
      <a class="round-button light" href="${appointment}" target="_blank" rel="noreferrer">Discuss your goals ↗</a>
    </section>

    <section class="provider-section social-proof" id="proof">
      <div class="provider-section-heading"><span>Client experiences</span><h2>Google reviews and client stories, brought forward.</h2></div>
      <p class="social-proof-intro">These experiences describe individual journeys and are not a promise of results. Every plan and outcome depends on the person, context and follow-through.</p>
      <div class="social-proof-grid">
        <figure><img src="../assets/reviews/google01.jpg" alt="Published Google review for Shiny Surendran's nutrition practice" width="900" height="900" loading="lazy"></figure>
        <figure><img src="../assets/reviews/google02.jpg" alt="Published Google review for Shiny Surendran's nutrition practice" width="900" height="900" loading="lazy"></figure>
        <a href="#library"><span>More experiences</span><strong>Browse the complete review and client-story library</strong><small>Individual experiences vary ↓</small></a>
      </div>
    </section>

    <section class="provider-complete provider-section" id="programmes">
      <div class="provider-section-heading"><span>Programmes &amp; support</span><h2>Choose with the full picture in view.</h2></div>
      <p class="provider-complete-intro">Explore metabolic-health and sports-nutrition support, consultation formats, professional evidence and the deeper nutrition library. The clinic will share the existing discovery form when you begin the consultation route.</p>
      <div class="provider-complete-list">
        <details open><summary><strong>Consultation programmes &amp; previously published fees</strong><span>Plans, delivery and follow-up</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body">
          <article><h3>One-month programme</h3><p>Initial phone or direct assessment; front and side photographs; online or clinic measurements; customised plan emailed within 24–48 hours; one clarification call; food diary every 15 days; reviews on days 15 and 30; revised plan on day 30; end-of-package photograph.</p><p><b>Previously published fee:</b> ₹15,000 + 18% GST = ₹17,700. Confirm the current fee and availability with the clinic.</p></article>
          <article><h3>100-day programme</h3><p>Initial assessment, photographs and measurements; customised plan within 24–48 hours; clarification call; client-and-nutritionist WhatsApp group; daily meal pictures; reviews on days 30, 60 and 100; end photograph.</p><p><b>Previously published fee:</b> ₹30,000 + 18% GST = ₹35,400. Confirm the current fee and availability with the clinic.</p></article>
          <article><h3>Sport programmes</h3><p><b>One-time:</b> initial assessment, customised plan and one follow-up call. <b>40-day:</b> assessment, measurements, plan, calls on days 20 and 40, revised plan, weekly emailed food journal and maintenance plan. <b>90-day:</b> assessment, measurements, plan, calls on days 30, 60 and 90, revised plan, daily WhatsApp monitoring and maintenance plan.</p></article>
        </div></details>
        <details><summary><strong>Nutrition support</strong><span>Sport, body composition and preventive care</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body columns">
          <article><h3>Performance &amp; body composition</h3><p>Off-season, in-season and travel nutrition; competitive, recreational and young athletes; weight loss, healthy weight gain, bodybuilding, muscle gain and fat loss.</p></article>
          <article><h3>Preventive nutrition</h3><p>Anemia; bariatric nutrition before and after surgery; cholesterol; diabetes mellitus; food intolerance; GERD; healthy skin and hair; hypertension; inflammatory plans; IBS; fatty liver; metabolic nutrition; PCOS; pregnancy nutrition before, during and after pregnancy; thyroid nutrition.</p></article>
          <article><h3>Plans, groups &amp; media</h3><p>Gene-based nutrition; general healthy meal plans; seminars; webinars; online and offline conferences; workshops; schools, colleges, sports academies, clubs, companies, government organisations, television, radio, YouTube, Instagram, Facebook, magazines, journals and newspapers.</p></article>
        </div></details>
        <details><summary><strong>How online consultation works</strong><span>From the first form to ongoing support</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body columns">
          <article><h3>1. Share your goals and health context</h3><p>Complete a pre-consultation document covering health history, current health information and realistic goals.</p></article>
          <article><h3>2. Describe daily life</h3><p>A second assessment explores eating patterns, preferences, physical activity and sleep so guidance can fit real routines.</p></article>
          <article><h3>3. Receive a personalised plan</h3><p>The previously published process states that a personalised meal plan is sent after the assessment, generally within two to three days.</p></article>
          <article><h3>4. Review and adapt</h3><p>Follow-ups use food and activity records to support progress, including planning for travel, holidays, weddings and festivals.</p></article>
          <article><h3>5. Build a sustainable routine</h3><p>The emphasis is steady progress, practical food choices and habits that can continue beyond a programme.</p></article>
        </div></details>
        <details><summary><strong>Sports nutrition in depth</strong><span>Training, competition, recovery and travel</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body columns">
          <article><h3>Assessment and planning</h3><p>Dietary practices, body composition and energy balance are considered in the context of performance and health. Meal, snack and hydration planning can be aligned with training phases, competition and recovery.</p></article>
          <article><h3>Performance challenges</h3><p>Support may address travel, immunity, gastrointestinal concerns, food allergies, iron depletion, bone-mineral concerns, disordered eating and appropriate supplementation.</p></article>
          <article><h3>Collaborative support</h3><p>When appropriate, the process can involve family, coaches, physiotherapists, psychologists, sports physicians, gastroenterologists, endocrinologists and other relevant health professionals, alongside education for athletes, parents and teams.</p></article>
        </div></details>
        <details><summary><strong>Weight management &amp; preventive nutrition</strong><span>Individual counselling and practical care areas</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body columns">
          <article><h3>Body composition and everyday goals</h3><p>Personalised counselling can support weight loss, healthy weight gain, muscle gain, body-fat reduction and sustainable food habits, with milestones reviewed against individual needs.</p></article>
          <article><h3>Health-related nutrition</h3><p>Published areas include diabetes, cholesterol, hypertension, PCOS, thyroid health, digestive concerns, food intolerance, bariatric nutrition, pregnancy nutrition, anemia, fatty liver, skin and hair health.</p></article>
          <article><h3>Life beyond routine days</h3><p>Guidance can account for business travel, holidays, celebrations and other situations where a practical plan matters more than a rigid diet.</p></article>
        </div></details>
        <details><summary><strong>Professional profile &amp; independent documentation</strong><span>Qualifications, roles and public records</span><i aria-hidden="true">+</i></summary><div class="provider-complete-body source-links">
          <a href="https://asnfs.org/about/" target="_blank" rel="noreferrer"><b>ASNFS profile</b><span>Sports and preventive nutrition; MSc and IOC diploma</span></a>
          <a href="https://asnfs.org/wp-content/uploads/Batch-6-Faculty-Brochure-2025.pdf" target="_blank" rel="noreferrer"><b>ASNFS 2025 faculty</b><span>Nutrition for racket sports</span></a>
          <a href="https://digicampus.sriramachandra.edu.in/uploads/iqac_workshopconducts/2025-07-11011235FINAL%20PROGRAM.pdf" target="_blank" rel="noreferrer"><b>Sri Ramachandra 2025</b><span>Resource person and panel chair</span></a>
          <a href="https://www.igcar.gov.in/publications/igc_annual_report_2024.pdf" target="_blank" rel="noreferrer"><b>IGCAR 2024</b><span>Founder &amp; Director, Art of Eating LLP</span></a>
          <a href="https://wcc.edu.in/wp-content/uploads/Activities/Shift1/HSC/HSC-2022-2023.pdf" target="_blank" rel="noreferrer"><b>Women’s Christian College</b><span>Sports-nutrition workshop record</span></a>
          <a href="https://www.youtube.com/watch?v=hqsNdQUY790" target="_blank" rel="noreferrer"><b>JFW: Type 2 diabetes</b><span>Credited Shiny Surendran video</span></a>
          <a href="https://www.youtube.com/watch?v=LfenbhomVV0" target="_blank" rel="noreferrer"><b>JFW: post-delivery nutrition</b><span>Credited Shiny Surendran video</span></a>
        </div></details>
      </div>
      <p class="provider-source-warning">Fees, availability, contact details and permission for client material require confirmation before a production release.</p>
    </section>

    <section class="provider-section proof-section" id="about">
      <div class="provider-section-heading"><span>Professional profile</span><h2>Deep expertise, kept easy to scan.</h2></div>
      <div class="provider-proof-grid">
        <article><span>Education</span><h3>Advanced sports nutrition training</h3><ul><li>MSc in Food Service Management and Dietetics</li><li>Graduate Diploma in Sports Nutrition, International Olympic Committee</li></ul></article>
        <article><span>Accreditation</span><h3>Assessment and performance practice</h3><ul><li>Sports Dietitians Australia accreditation</li><li>ISAK Level 2 kinanthropometrist</li></ul></article>
        <article><span>Professional contribution</span><h3>Practice, teaching and public education</h3><ul><li>Founder &amp; Director, Art of Eating LLP</li><li>Published author and nutrition educator</li><li>Assignments with sports organisations, institutions and teams</li></ul></article>
      </div>
      <div class="provider-disclosures provider-profile-depth">
        <details><summary><span>01</span><strong>Education &amp; certifications</strong><small>Academic and international training</small><i aria-hidden="true">+</i></summary><div class="provider-disclosure-body"><ul><li>Postgraduate degree in Food Service Management and Dietetics</li><li>First Indian certified with the International Olympic Committee Graduate Diploma in Sports Nutrition</li><li>Sports Nutrition course from Sports Dietitians Australia</li><li>ISAK, New Zealand Level 2 Kinanthropometrist</li></ul></div></details>
        <details><summary><span>02</span><strong>Career &amp; assignments</strong><small>Sport, teaching and public communication</small><i aria-hidden="true">+</i></summary><div class="provider-disclosure-body"><ul><li>Consultant: HAP Badminton Academy of Excellence and Rupa Tennis Academy</li><li>Sports Nutrition Lecturer, Department of Arthroscopy and Sports Medicine, Sri Ramachandra University (2009–2017)</li><li>Initial nutrition assessments and menu oversight for Indian Cricket League players (2007)</li><li>Consultant and senior trainer, Fitness One (2006)</li><li>Sports nutritionist, Chemplast Cricket Team (2006–2007)</li><li>Sports nutritionist, Fitness Foundation Academy at YMCA College of Physical Education</li><li>Part-time lecturer: JBAS College and YMCA College of Physical Education</li><li>Nutrition Manager, NICHE, Bengaluru</li><li>Sports nutrition workshops at Indian Dietetic Association annual conferences</li><li>Speaker engagements including Hyundai, Mindtree and DHL</li><li>Television appearances including Sun TV, Vijay TV and Vikatan Digital TV</li></ul></div></details>
        <details><summary><span>03</span><strong>Honorary positions</strong><small>Professional standards and education</small><i aria-hidden="true">+</i></summary><div class="provider-disclosure-body"><ul><li>Member, FSSAI Working Committee on Sports Supplements</li><li>Former Chairperson, Indian Dietetic Association website team</li><li>Member, Board of Studies, Madras University (Home Science)</li><li>Board of Studies member, Tamil Nadu Physical Education and Sport University</li></ul></div></details>
      </div>
    </section>

    <section class="provider-section conversations-section" id="conversations">
      <div class="provider-section-heading"><span>AOE Conversations &amp; speaking</span><h2>Bring practical nutrition into the room.</h2></div>
      <div class="conversations-grid">
        <article><span>AOE Conversations</span><h3>Around 100 professionals across seven specialist areas.</h3><p>A growing conversation series that connects nutrition with the perspectives of specialists and practitioners.</p></article>
        <article><span>Speaking &amp; education</span><h3>Keynotes, panels, schools, teams and workplaces.</h3><p>Sessions can be shaped for conferences, corporate audiences, schools, sports communities and professional panels.</p><a class="round-button" href="mailto:info@shinysurendran.com?subject=Speaking%20or%20workshop%20enquiry">Make a speaking enquiry ↗</a></article>
      </div>
    </section>

    <section class="provider-gallery provider-section" id="gallery">
      <div class="provider-section-heading"><span>Media by purpose</span><h2>Conversations, sport, events and everyday nutrition.</h2></div>
      <p class="provider-gallery-intro">Explore AOE Conversations, Instagram Lives, YouTube features, running and sports coverage, and conference or event appearances through the complete media library.</p>
      <div class="provider-gallery-grid">
        <figure class="provider-gallery-item provider-gallery-wide"><img src="../assets/gallery-consultation.jpg" alt="Shiny Surendran seated at a consultation desk" width="1800" height="1200" loading="lazy"><figcaption><span>In practice</span><strong>A practical, client-centred approach</strong></figcaption></figure>
        <figure class="provider-gallery-item provider-gallery-feature"><img src="../assets/gallery-portrait-classic.jpg" alt="Professional portrait of Shiny Surendran" width="1062" height="720" loading="lazy"><figcaption><span>Profile</span><strong>Sports &amp; preventive nutrition</strong></figcaption></figure>
        <figure class="provider-gallery-item"><img src="../assets/gallery-portrait-studio.jpg" alt="Shiny Surendran in a professional portrait" width="1700" height="1133" loading="lazy"><figcaption><span>Public work</span><strong>Nutritionist · Author · Entrepreneur</strong></figcaption></figure>
        <a class="provider-gallery-item provider-gallery-video" href="https://www.youtube.com/watch?v=hqsNdQUY790" target="_blank" rel="noreferrer"><img src="../assets/gallery-video-diabetes.jpg" alt="Video thumbnail: diet for Type 2 diabetes with Shiny Surendran" width="480" height="360" loading="lazy"><span class="provider-gallery-play" aria-hidden="true">▶</span><span class="provider-gallery-caption"><small>Watch</small><strong>Diet for Type 2 diabetes</strong></span></a>
        <a class="provider-gallery-item provider-gallery-video" href="https://www.youtube.com/watch?v=LfenbhomVV0" target="_blank" rel="noreferrer"><img src="../assets/gallery-video-new-mothers.jpg" alt="Video thumbnail: diet for new mothers with Shiny Surendran" width="480" height="360" loading="lazy"><span class="provider-gallery-play" aria-hidden="true">▶</span><span class="provider-gallery-caption"><small>Watch</small><strong>Post-delivery nutrition</strong></span></a>
        <a class="provider-gallery-item provider-gallery-video" href="https://www.youtube.com/watch?v=_9zUpjmlrzE" target="_blank" rel="noreferrer"><img src="../assets/gallery-video-eat-rich.jpg" alt="Video thumbnail: practical everyday nutrition with Shiny Surendran" width="480" height="360" loading="lazy"><span class="provider-gallery-play" aria-hidden="true">▶</span><span class="provider-gallery-caption"><small>Watch</small><strong>Practical everyday nutrition</strong></span></a>
      </div>
      <div class="provider-youtube-presence">
        <div class="provider-youtube-intro"><div><span>YouTube presence</span><h3>59 verified public videos.</h3><p>Shiny’s official channel, interviews and credited nutrition features remain available in the complete collection.</p></div><a href="https://www.youtube.com/@shinyartofeating" target="_blank" rel="noreferrer"><small>Official channel</small><strong>Shiny Art of Eating ↗</strong></a></div>
        <details class="provider-youtube-library">
          <summary><span><strong>Browse 56 more videos</strong><small>Official channel, sports nutrition, everyday health and media appearances</small></span><i aria-hidden="true">+</i></summary>
          <div class="provider-youtube-grid" data-youtube-library aria-busy="true"></div>
          <p class="provider-youtube-fallback" data-youtube-fallback>Browse the complete collection on the <a href="https://www.youtube.com/@shinyartofeating" target="_blank" rel="noreferrer">Shiny Art of Eating channel</a>.</p>
          <noscript><p class="provider-youtube-fallback">JavaScript is required for the visual video grid. All current videos remain available on the <a href="https://www.youtube.com/@shinyartofeating" target="_blank" rel="noreferrer">official YouTube channel</a>.</p></noscript>
        </details>
      </div>
    </section>

    <section class="provider-visit" id="visit">
      <div class="provider-visit-copy"><span>Appointments</span><h2>Meet online or at the Chennai clinic.</h2><p>Begin with the clinic team, share your goals and choose the consultation route that fits your situation.</p><div class="provider-visit-actions"><a class="provider-action" href="${appointment}" target="_blank" rel="noreferrer">Schedule on WhatsApp</a><a class="provider-action secondary" href="tel:+916381501165">Call the clinic</a></div></div>
      <div class="provider-visit-details"><p><span>Contact</span><strong>Mrs. Shiny Esther<br>Clinic Manager · Dietitian</strong></p><p><span>Phone</span><a href="tel:+916381501165">+91 63815 01165</a></p><p><span>Email</span><a href="mailto:info@shinysurendran.com">info@shinysurendran.com</a></p><p><span>Location</span><a href="${map}" target="_blank" rel="noreferrer">Prestige Palladium Bayam, Greams Road, Chennai 600006 ↗</a></p></div>
    </section>

    <section class="provider-library" id="library" data-integrated-library aria-labelledby="library-title"><noscript><p>The nutrition library needs JavaScript to provide article search and filtering. Please contact the clinic if you need any material directly.</p></noscript></section>
    <section class="round-contact" id="contact"><div><span>Ready when you are</span><h2>Make nutrition work for your life.</h2></div><div><a class="round-button light" href="${appointment}" target="_blank" rel="noreferrer">Message on WhatsApp ↗</a><a href="tel:+916381501165">+91 63815 01165</a><a href="mailto:info@shinysurendran.com">info@shinysurendran.com</a></div></section>`;

  const footer = document.querySelector("[data-provider-footer]");
  if (footer) footer.innerHTML = `
    <footer class="round-footer"><a class="round-brand round-brand-logo" href="#top"><img src="../assets/brand/art-of-eating-logo-4.png" alt="Art of Eating by Shiny Surendran" width="320" height="128"></a><address>Prestige Palladium Bayam, Greams Road<br>Chennai 600006</address><nav aria-label="Footer links"><a href="#conversations">Speaking</a><a href="https://instagram.com/shinysurendran" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/shiny.surendran" target="_blank" rel="noreferrer">Facebook</a></nav></footer>
    <div class="provider-mobile-action" aria-label="Mobile appointment actions"><a href="tel:+916381501165">Call</a><a href="${appointment}" target="_blank" rel="noreferrer">WhatsApp appointment</a></div>
    <p class="concept-proprietary-notice">This website concept is proprietary and confidential to Neurabrix. It is supplied solely for evaluation and may not be copied, reproduced, implemented or shared without Neurabrix’s written authorization. No intellectual-property rights are transferred by this preview.</p>`;
})();
