(() => {
  const videos = [
    { id: "sDDLH5dAmhw", title: "Fat burners can be dangerous!", channel: "Shiny Art of Eating" },
    { id: "dBo6QQHXaLk", title: "Doctor × Body Builder with Dr Rajiv Santhosam — teaser", channel: "Shiny Art of Eating" },
    { id: "oWprGNcK_VA", title: "Doctor × Body Builder with Dr Rajiv Santhosam", channel: "Shiny Art of Eating" },
    { id: "k0-hQQ_kAJk", title: "Can weight-loss injections make you weak?", channel: "Shiny Art of Eating" },
    { id: "cTNoy9JFjUE", title: "Why some people never get results", channel: "Shiny Art of Eating" },
    { id: "vu-r59XOmpQ", title: "Can sperm count increase in 90 days?", channel: "Shiny Art of Eating" },
    { id: "B_V3Wuv2kEs", title: "Does bed rest help IVF?", channel: "Shiny Art of Eating" },
    { id: "G9tQlwh9tJw", title: "PCOS does not mean infertility", channel: "Shiny Art of Eating" },
    { id: "4cSssZ7cvac", title: "Belly fat: mistakes to avoid", channel: "Shiny Art of Eating" },
    { id: "Dbl2GUsm9pk", title: "From Kochi Airport to TEDx Mumbai", channel: "Shiny Art of Eating" },
    { id: "dpSDfWW2qM4", title: "Handling the waiting phase", channel: "Shiny Art of Eating" },
    { id: "gW0wLBP6QAU", title: "Stopping statins can be dangerous", channel: "Shiny Art of Eating" },
    { id: "XRvLsYIl53c", title: "Nutrition Meets Psychology with Dr Sangeetha Makesh", channel: "Shiny Art of Eating" },
    { id: "SU_AhxFSYNo", title: "Nutrition Meets Psychology — podcast feature", channel: "Shiny Art of Eating" },
    { id: "NsMxOHy-MQU", title: "The truth about fertility with Dr Keerthana — teaser", channel: "Shiny Art of Eating" },
    { id: "mqBjKklUZAI", title: "Common mistakes in sports nutrition", channel: "Shiny Art of Eating" },
    { id: "ymqXJX2tK5s", title: "Food combinations to support anemia", channel: "Vikatan TV" },
    { id: "b0dC3N8Wu1Q", title: "Nutrition for glowing skin", channel: "Vikatan TV" },
    { id: "mp27hMYox6A", title: "Food for hair growth", channel: "Vikatan TV" },
    { id: "q2Au1sxlPiE", title: "Reasons for feeling hungry", channel: "Vikatan TV" },
    { id: "Peoi9oGMm3o", title: "Stress, weight and waist size", channel: "Vikatan TV" },
    { id: "Lp8B-5C8aCo", title: "Food intolerance and weight", channel: "Vikatan TV" },
    { id: "YGKvc2-HCQM", title: "How to maintain weight", channel: "Vikatan TV" },
    { id: "qAAlNmf2JiU", title: "Healthy eating: how much carbohydrate?", channel: "JFW — Just for Women" },
    { id: "lunmEoWUaEU", title: "Are egg yolks bad for health?", channel: "JFW — Just for Women" },
    { id: "WMZkcYk1MLQ", title: "A healthy approach to weight loss", channel: "JFW — Just for Women" },
    { id: "zMDYVqaTjcI", title: "A 21-day weight-loss plan", channel: "Say Swag" },
    { id: "HwcEUf8niCE", title: "Budget-friendly healthy foods", channel: "JFW — Just for Women" },
    { id: "-Zo1t_i4zZM", title: "How to control cholesterol naturally", channel: "JFW — Just for Women" },
    { id: "ubHDmDtCoZM", title: "Three fruits for glowing skin", channel: "Say Swag" },
    { id: "eUPbjJD2t2w", title: "Nutrition guide for glowing skin", channel: "Stay Tuned with Ramya" },
    { id: "w5M6Y0OnNvc", title: "What to eat before, during and after exercise", channel: "Stay Tuned with Ramya" },
    { id: "BHHOETW7DKY", title: "Can you lose weight without exercise?", channel: "Stay Tuned with Ramya" },
    { id: "_nBaDii2z3k", title: "Daily habits for a healthy body", channel: "Galatta Pink" },
    { id: "D5hko0xNois", title: "Body shaming and nutrition", channel: "Stay Tuned with Ramya" },
    { id: "wYV0CSVTxJc", title: "The dangers of very-low-calorie diets", channel: "JFW — Just for Women" },
    { id: "OIVTDkhYkMA", title: "Period nutrition and meal preparation", channel: "Say Swag" },
    { id: "bRTWHtIMsHk", title: "Why all calories are not equal", channel: "JFW — Just for Women" },
    { id: "PINBTcILWgU", title: "Food and home remedies for acidity", channel: "JFW — Just for Women" },
    { id: "s-45sVxJM5c", title: "Hair loss and premature greying", channel: "NewsGlitz Tamil" },
    { id: "Ei9nAr3RZg8", title: "Should we follow celebrity diets?", channel: "JFW — Just for Women" },
    { id: "pN14Vle5IXQ", title: "Diet planning during periods", channel: "JFW — Just for Women" },
    { id: "_RAMCO7Iclw", title: "The science behind intermittent fasting", channel: "Stay Tuned with Ramya" },
    { id: "tSDB9oqAXtg", title: "Food and home remedies for cough and cold", channel: "JFW — Just for Women" },
    { id: "tvCS4QzrlCo", title: "Nutrition for young athletes", channel: "JFW — Just for Women" },
    { id: "R7ptvfk-Ai8", title: "Understanding a vegan diet", channel: "Stay Tuned with Ramya" },
    { id: "ui1KK2gp8Us", title: "Do’s and don’ts of food habits", channel: "Jaya TV" },
    { id: "THTsTxg0aUA", title: "Does skipping meals help weight loss?", channel: "JFW — Just for Women" },
    { id: "6pQBF4_n85Q", title: "Nutrition and immune health", channel: "Jaya TV" },
    { id: "XJX29XtYn8o", title: "Nutrition for skin concerns", channel: "Jaya TV" },
    { id: "rIpi-16b6Kk", title: "Nightshade vegetables and alternatives", channel: "Jaya TV" },
    { id: "6-8q2pZ6NkA", title: "Post-pregnancy weight loss", channel: "JFW — Just for Women" },
    { id: "GymP4FTinRc", title: "An everyday healthy-eating plan", channel: "Stay Tuned with Ramya" },
    { id: "SJxubtVBMHI", title: "Healthy snacks while socialising", channel: "JFW — Just for Women" },
    { id: "y9_41ZPgUhk", title: "Tennis nutrition for Indian athletes", channel: "Indian Tennis Daily" },
    { id: "HU6m_X9x-q8", title: "Detox water: facts and misconceptions", channel: "Say Swag" }
  ];

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  document.querySelectorAll("[data-youtube-library]").forEach((gallery) => {
    const fragment = document.createDocumentFragment();

    videos.forEach((video) => {
      const link = make("a", "provider-youtube-card");
      link.href = `https://www.youtube.com/watch?v=${video.id}`;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.setAttribute("aria-label", `Watch ${video.title} on YouTube`);

      const visual = make("span", "provider-youtube-visual");
      const image = document.createElement("img");
      image.src = `../assets/youtube/${video.id}.jpg`;
      image.alt = "";
      image.width = 480;
      image.height = 360;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => image.remove(), { once: true });
      visual.append(image, make("span", "provider-youtube-play", "▶"));

      const copy = make("span", "provider-youtube-copy");
      copy.append(make("small", "", video.channel), make("strong", "", video.title));
      link.append(visual, copy);
      fragment.append(link);
    });

    gallery.replaceChildren(fragment);
    gallery.removeAttribute("aria-busy");
    const fallback = gallery.parentElement.querySelector("[data-youtube-fallback]");
    if (fallback) fallback.remove();
  });
})();
