(() => {
  const data = window.SHINY_LIBRARY_DATA;
  const assetRoot = document.body.dataset.assetRoot || "./assets/";
  const integrated = Boolean(document.querySelector("[data-integrated-library]"));
  const status = document.querySelector("[data-library-status]");
  if (!data) {
    if (status) {
      status.textContent = "The library could not be loaded. Please refresh the page or contact the clinic.";
      status.dataset.state = "error";
    }
    return;
  }

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const normalize = (value) => value.toLocaleLowerCase("en-IN");
  const storyGrid = document.querySelector("[data-story-grid]");
  const storySearch = document.querySelector("[data-story-search]");
  const storyFilters = Array.from(document.querySelectorAll("[data-story-filter]"));
  const storyMore = document.querySelector("[data-story-more]");
  const storyResult = document.querySelector("[data-story-result]");
  let activeCategory = "all";
  let visibleStories = 12;

  const storyCard = (story) => {
    const details = make("details", "library-story");
    const summary = make("summary");
    const identity = make("span", "library-story-identity");
    if (story.image) {
      const image = document.createElement("img");
      image.src = `${assetRoot}${story.image}`;
      image.alt = "";
      image.width = 72;
      image.height = 72;
      image.loading = "lazy";
      image.decoding = "async";
      identity.append(image);
    } else {
      identity.append(make("span", "library-story-initial", story.name.slice(0, 1)));
    }
    const copy = make("span");
    copy.append(make("strong", "", story.name));
    if (story.role) copy.append(make("small", "", story.role));
    identity.append(copy);
    summary.append(identity, make("span", "library-open-label", "Read experience"));
    const body = make("div", "library-story-body");
    body.append(make("p", "", story.story));
    if (story.evidence_image) {
      const evidence = document.createElement("img");
      evidence.className = "library-story-evidence";
      evidence.src = `${assetRoot}${story.evidence_image}`;
      evidence.alt = `Previously published statement from ${story.name}`;
      evidence.loading = "lazy";
      evidence.decoding = "async";
      body.append(evidence);
    }
    body.append(make("small", "library-disclaimer", "Previously published client experience. Individual experiences vary; no result is guaranteed."));
    details.append(summary, body);
    return details;
  };

  const filteredStories = () => {
    const query = normalize(storySearch?.value.trim() || "");
    return data.stories.filter((story) => {
      const categoryMatch = activeCategory === "all" || story.categories.includes(activeCategory);
      const haystack = normalize(`${story.name} ${story.role} ${story.story}`);
      return categoryMatch && (!query || haystack.includes(query));
    });
  };

  const renderStories = () => {
    if (!storyGrid) return;
    const matches = filteredStories();
    storyGrid.replaceChildren(...matches.slice(0, visibleStories).map(storyCard));
    if (storyResult) {
      storyResult.textContent = matches.length
        ? `Showing ${Math.min(visibleStories, matches.length)} of ${matches.length} client experiences.`
        : "No client experiences match that search.";
    }
    if (storyMore) {
      storyMore.hidden = matches.length <= visibleStories;
      storyMore.disabled = matches.length <= visibleStories;
    }
  };

  storySearch?.addEventListener("input", () => {
    visibleStories = 12;
    renderStories();
  });
  storyFilters.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.storyFilter;
      visibleStories = 12;
      storyFilters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      renderStories();
    });
  });
  storyMore?.addEventListener("click", () => {
    visibleStories += 12;
    renderStories();
  });

  const articleGrid = document.querySelector("[data-article-grid]");
  if (articleGrid) {
    const cards = data.articles.map((article) => {
      const details = make("details", "library-article");
      const summary = make("summary");
      summary.append(make("span", "library-index", String(article.id).padStart(2, "0")), make("strong", "", article.title), make("span", "library-open-label", "Read article"));
      const body = make("div", "library-article-body");
      article.blocks.forEach((block) => {
        const safeTag = integrated && ["h2", "h3", "h4"].includes(block.tag)
          ? "h4"
          : (["h2", "h3", "h4", "p", "li"].includes(block.tag) ? block.tag : "p");
        if (safeTag === "li") {
          let list = body.lastElementChild;
          if (!list || list.tagName !== "UL") {
            list = make("ul");
            body.append(list);
          }
          list.append(make("li", "", block.text));
        } else {
          body.append(make(safeTag, "", block.text));
        }
      });
      details.append(summary, body);
      return details;
    });
    articleGrid.replaceChildren(...cards);
  }

  const pressGrid = document.querySelector("[data-press-grid]");
  if (pressGrid) {
    pressGrid.replaceChildren(...data.press.map((item) => {
      const card = make(item.url ? "a" : "article", "library-press-card");
      if (item.url) {
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noreferrer";
      }
      card.append(make("small", "", item.publisher), make("strong", "", item.title), make("span", "", item.url ? "Open source ↗" : item.note));
      return card;
    }));
  }

  if (status) {
    status.textContent = `${data.articles.length} nutrition articles, ${data.stories.length} client experiences and ${data.press.length} press features are available here.`;
    status.dataset.state = "ready";
  }
  renderStories();
})();
