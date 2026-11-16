document.addEventListener("DOMContentLoaded", () => {
  // 1. Magic UI: Word Rotate for Roles
  const roles = ["Content Creator", "Photographer", "Student"];
  const wordRotateEl = document.getElementById("word-rotate");
  let roleIndex = 0;

  if (wordRotateEl) {
    setInterval(() => {
      wordRotateEl.classList.add("fade-out");
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        wordRotateEl.textContent = roles[roleIndex];
        wordRotateEl.classList.remove("fade-out");
      }, 350);
    }, 2600);
  }

  // 2. Magic UI: Spotlight Cursor Tracking on Cards
  const magicCards = document.querySelectorAll(".magic-card");
  magicCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 3. Magic UI: Dock Magnification Effect
  const dock = document.querySelector(".magic-dock");
  const dockItems = document.querySelectorAll(".dock-item");

  if (dock && window.matchMedia("(hover: hover)").matches) {
    dock.addEventListener("mousemove", (e) => {
      dockItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - itemCenter);
        const maxDistance = 120;
        const scale = distance < maxDistance
          ? 1 + (1 - distance / maxDistance) * 0.22
          : 1;
        item.style.transform = `scale(${scale})`;
      });
    });

    dock.addEventListener("mouseleave", () => {
      dockItems.forEach((item) => {
        item.style.transform = "scale(1)";
      });
    });
  }

  // 4. Magic UI: Blur Fade Scroll Reveal & Active Nav Highlight
  const revealElements = document.querySelectorAll(".blur-fade");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const sections = document.querySelectorAll("main section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    dockItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
    });
  });

  // 5. Interactive Project Preview Modal
  const projectDetails = {
    travel: {
      tag: "01 / Video Storytelling",
      title: "Travel Vlogs",
      desc: "Travel videos that capture the places I go and the stories behind them—blending natural ambient audio, handheld transitions, and color-graded visual diaries.",
      highlights: ["Storyboarding", "Color Grading", "Location Shooting", "Sound Design"]
    },
    food: {
      tag: "02 / Short-Form Vertical",
      title: "Food Reels",
      desc: "Short videos of cooking, plating and tasting—paced for short-form retention with crisp macro shots, ASMR kitchen audio, and warm lighting.",
      highlights: ["Macro Photography", "Fast-Cut Editing", "Lighting Setup", "Reels & TikTok"]
    }
  };

  const modal = document.getElementById("project-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const projectArticles = document.querySelectorAll("article[data-project]");

  projectArticles.forEach((article) => {
    article.addEventListener("click", () => {
      const key = article.getAttribute("data-project");
      const data = projectDetails[key];
      if (!data) return;

      document.getElementById("modal-tag").textContent = data.tag;
      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-desc").textContent = data.desc;

      const highlightsContainer = document.getElementById("modal-highlights");
      highlightsContainer.innerHTML = data.highlights
        .map((item) => `<span>${item}</span>`)
        .join("");

      modal.hidden = false;
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.hidden = true;
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });
  }

  // 6. Copy Email with Toast Feedback
  const copyBtn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast");

  if (copyBtn && toast) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("ratovoarinoromendrika@gmail.com");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
      } catch {
        toast.textContent = "Email: ratovoarinoromendrika@gmail.com";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      }
    });
  }
});

// 7. Dark Mode Toggle with Moon/Sun Icon
const themeToggleBtn = document.getElementById("theme-toggle");
const bodyEl = document.body;

const moonSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

if (localStorage.getItem("theme") === "dark") {
  bodyEl.classList.add("dark-mode");
  if (themeToggleBtn) themeToggleBtn.innerHTML = sunSvg;
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    bodyEl.classList.toggle("dark-mode");
    const isDark = bodyEl.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggleBtn.innerHTML = isDark ? sunSvg : moonSvg;
  });
}