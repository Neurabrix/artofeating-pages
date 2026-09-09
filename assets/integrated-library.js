(() => {
  const root = document.querySelector("[data-integrated-library]");
  if (!root) return;

  const pressImages = [
    "media2.jpg", "media3.jpg", "media3new.jpg", "media4.jpg", "media5.jpg",
    "media6.jpg", "media7.jpg", "media8.jpg", "media9.jpg", "media10.jpg",
    "media11.jpg", "media12.jpg", "media13.jpg", "media14.jpg", "media15.jpg",
    "media16.jpg", "media17.jpg"
  ];
  const reviewImages = [
    ["google01.jpg", "Client review by Amrutha Kumar"],
    ["google02.jpg", "Client review reproduced from the existing website"],
    ["img-20240307-wa0006.jpg", "Google client review reproduced from the existing website"],
    ["img-20240307-wa0007.jpg", "Google client review reproduced from the existing website"],
    ["img-20240307-wa0008.jpg", "Google client review reproduced from the existing website"],
    ["img-20240307-wa0009.jpg", "Google client review reproduced from the existing website"],
    ["img-20240307-wa0010.jpg", "Google client review reproduced from the existing website"],
    ["img-20240307-wa0011.jpg", "Google client review reproduced from the existing website"]
  ];

  const figures = (folder, images) => images.map((item) => {
    const [file, alt] = Array.isArray(item) ? item : [item, "Historical press feature involving Shiny Surendran"];
    return `<figure><img src="../assets/${folder}/${file}" alt="${alt}" width="1200" height="1200" loading="lazy" decoding="async"></figure>`;
  }).join("");

  root.innerHTML = `
    <div class="provider-library-shell">
      <header class="provider-library-heading">
        <div><p class="provider-library-kicker">Nutrition library</p><h2 id="library-title">Read, watch and explore—right here.</h2></div>
        <div><p>Shiny’s practical nutrition writing, public media, previously published client experiences and press presence are now part of this website—not a separate destination.</p><p data-library-status data-state="loading" role="status">Preparing the complete library…</p></div>
      </header>
      <nav class="provider-library-nav" aria-label="Nutrition library sections">
        <a href="#library-articles">Articles</a><a href="#library-stories">Client experiences</a><a href="#library-press">Press</a><a href="#library-reviews">Reviews</a><a href="#gallery">Videos</a>
      </nav>

      <details class="library-collection" id="library-articles" open>
        <summary><span>01</span><strong>Articles</strong><small>11 complete nutrition articles</small><i aria-hidden="true">+</i></summary>
      <section class="library-section" aria-labelledby="library-articles-title">
        <div class="library-heading"><span>11 complete articles</span><div><h3 id="library-articles-title">Practical reading for everyday decisions.</h3><p>Open any topic and read the complete recovered article without leaving this concept.</p></div></div>
        <div class="library-article-grid" data-article-grid aria-live="polite"></div>
      </section>
      </details>

      <details class="library-collection" id="library-stories">
        <summary><span>02</span><strong>Client experiences</strong><small>98 previously published stories</small><i aria-hidden="true">+</i></summary>
      <section class="library-section" aria-labelledby="library-stories-title">
        <div class="library-heading"><span>98 client experiences</span><div><h3 id="library-stories-title">Previously published stories, easier to explore.</h3><p>Search by name or filter by support area. Individual experiences vary and do not promise or predict an outcome.</p></div></div>
        <div class="library-controls">
          <label class="library-search">Search client experiences<input type="search" data-story-search placeholder="Search by name, role or experience" autocomplete="off"></label>
          <div class="library-filters" aria-label="Filter client experiences">
            <button type="button" data-story-filter="all" aria-pressed="true">All</button><button type="button" data-story-filter="sport" aria-pressed="false">Sport</button><button type="button" data-story-filter="weight" aria-pressed="false">Weight</button><button type="button" data-story-filter="diabetes" aria-pressed="false">Diabetes</button><button type="button" data-story-filter="digestive" aria-pressed="false">Digestive</button><button type="button" data-story-filter="women-health" aria-pressed="false">Women’s health</button><button type="button" data-story-filter="skin-hair" aria-pressed="false">Skin &amp; hair</button>
          </div>
        </div>
        <p class="library-result" data-story-result aria-live="polite"></p>
        <div class="library-story-grid" data-story-grid></div>
        <button class="library-more" type="button" data-story-more>Show more client experiences</button>
      </section>
      </details>

      <details class="library-collection" id="library-press">
        <summary><span>03</span><strong>Press &amp; public features</strong><small>Published reading and historical coverage</small><i aria-hidden="true">+</i></summary>
      <section class="library-section" aria-labelledby="library-press-title">
        <div class="library-heading"><span>Press &amp; public features</span><div><h3 id="library-press-title">Interviews, expert contributions and published reading.</h3><p>Available publisher destinations are preserved, with historical print coverage kept in the expandable gallery.</p></div></div>
        <div class="library-press-grid" data-press-grid></div>
        <details class="library-gallery-disclosure"><summary><span>Historical press gallery</span><strong>View 17 recovered print and magazine features</strong><i aria-hidden="true">+</i></summary><div class="library-media-grid">${figures("press", pressImages)}</div></details>
      </section>
      </details>

      <details class="library-collection" id="library-reviews">
        <summary><span>04</span><strong>Reviews</strong><small>8 previously published review graphics</small><i aria-hidden="true">+</i></summary>
      <section class="library-section" aria-labelledby="library-reviews-title">
        <div class="library-heading"><span>Google review gallery</span><div><h3 id="library-reviews-title">Public feedback shared by clients.</h3><p>These review graphics were previously published by Art of Eating. Individual experiences vary; no result is guaranteed.</p></div></div>
        <details class="library-gallery-disclosure"><summary><span>Review gallery</span><strong>View 8 previously published review graphics</strong><i aria-hidden="true">+</i></summary><div class="library-media-grid library-reviews">${figures("reviews", reviewImages)}</div></details>
      </section>
      </details>

      <section class="library-section library-video-return" aria-labelledby="library-videos-title">
        <div><span>59 verified public videos</span><h3 id="library-videos-title">Keep watching in Shiny’s visual media gallery.</h3><p>The full YouTube collection is already part of this concept website, including Shiny’s official channel, interviews and credited media appearances.</p></div><a href="#gallery">Browse the video gallery <span aria-hidden="true">↑</span></a>
      </section>
    </div>`;

  const collections = Array.from(root.querySelectorAll("details.library-collection"));
  collections.forEach((collection) => collection.addEventListener("toggle", () => {
    if (!collection.open) return;
    collections.forEach((other) => { if (other !== collection) other.open = false; });
  }));

  const collectionLinks = root.querySelectorAll('.provider-library-nav a[href^="#library-"]');
  collectionLinks.forEach((link) => link.addEventListener("click", () => {
    const collection = root.querySelector(link.getAttribute("href"));
    if (collection?.matches("details")) collection.open = true;
  }));

  const realignLibraryHash = () => {
    if (!location.hash.startsWith("#library")) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    if (target.matches("details.library-collection")) target.open = true;
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    document.documentElement.style.scrollBehavior = previous;
  };
  const scheduleHashAlignment = () => [0, 250, 900, 1800].forEach((delay) => window.setTimeout(realignLibraryHash, delay));
  if (document.readyState === "complete") scheduleHashAlignment();
  else window.addEventListener("load", scheduleHashAlignment, { once: true });
  document.fonts?.ready.then(realignLibraryHash);
})();
