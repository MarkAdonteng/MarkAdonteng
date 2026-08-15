/**
 * Mark O. Adonteng — Portfolio interactions
 * Edit CONTACT_CONFIG below before publishing.
 */

/* =============================================================================
   Contact placeholders — update these values
   ============================================================================= */
const CONTACT_CONFIG = {
  email: "hello@example.com",
  linkedin: "https://www.linkedin.com/",
  phone: "", // optional, unused in UI by default
  portfolioUrl: "https://MarkAdonteng.github.io/",
};

const GITHUB_USERNAME = "MarkAdonteng";

const TERMINAL_SNIPPET = `const developer = {
  name: "Mark O. Adonteng",
  role: "Software Developer",

  builds: [
    "Mobile Applications",
    "Web Applications",
    "AI Systems",
    "RPA Solutions"
  ],

  mindset: "Build. Automate. Improve."
};`;

document.addEventListener("DOMContentLoaded", () => {
  applyContactConfig();
  setFooterYear();
  initMobileNav();
  initSmoothAnchors();
  initActiveNav();
  initScrollHeader();
  initRevealOnScroll();
  renderProjects();
  initTerminalAnimation();
  initHeroParticles();
  initCursorGlow();
  fetchGitHubProfile();
});

function applyContactConfig() {
  const emailLink = document.getElementById("contact-email");
  const linkedinLink = document.getElementById("contact-linkedin");

  if (emailLink && CONTACT_CONFIG.email) {
    emailLink.href = `mailto:${CONTACT_CONFIG.email}`;
  }

  if (linkedinLink && CONTACT_CONFIG.linkedin) {
    linkedinLink.href = CONTACT_CONFIG.linkedin;
  }
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* Mobile navigation */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

/* Smooth in-page anchors (respects reduced motion via CSS) */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* Active section highlighting */
function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav__link[data-section]"));
  const sections = links
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.section === id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* Intersection Observer reveals */
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* Dynamic projects */
function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list || typeof projects === "undefined") return;

  list.innerHTML = projects
    .map((project, index) => {
      const number = String(index + 1).padStart(2, "0");
      const tech = (project.technologies || [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");

      const demoBtn = project.demo
        ? `<a class="btn btn--primary btn--sm" href="${escapeAttr(
            project.demo
          )}" target="_blank" rel="noopener noreferrer">View Project</a>`
        : "";

      const githubBtn = project.github
        ? `<a class="btn btn--ghost btn--sm" href="${escapeAttr(
            project.github
          )}" target="_blank" rel="noopener noreferrer">GitHub</a>`
        : "";

      return `
        <article class="project-card reveal">
          <div class="project-card__body">
            <span class="project-card__number">${number}</span>
            <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
            <p class="project-card__desc">${escapeHtml(project.description)}</p>
            <ul class="project-card__tech">${tech}</ul>
            <div class="project-card__actions">${demoBtn}${githubBtn}</div>
          </div>
          <div class="project-card__media">
            <img
              src="${escapeAttr(project.image)}"
              alt="${escapeAttr(project.title)} project preview"
              loading="lazy"
              decoding="async"
              width="960"
              height="640"
            />
          </div>
        </article>
      `;
    })
    .join("");

  // Observe newly injected project cards only
  const newCards = list.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    newCards.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  newCards.forEach((el) => observer.observe(el));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

/* Hero terminal typewriter */
function initTerminalAnimation() {
  const codeEl = document.querySelector("#terminal-code code");
  if (!codeEl) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    codeEl.innerHTML = highlightTerminal(TERMINAL_SNIPPET);
    return;
  }

  let index = 0;
  const speed = 12;

  const tick = () => {
    index += 1;
    const slice = TERMINAL_SNIPPET.slice(0, index);
    codeEl.innerHTML = highlightTerminal(slice) + '<span class="cursor-blink"></span>';

    if (index < TERMINAL_SNIPPET.length) {
      window.setTimeout(tick, speed);
    } else {
      codeEl.innerHTML = highlightTerminal(TERMINAL_SNIPPET);
    }
  };

  window.setTimeout(tick, 500);
}

function highlightTerminal(source) {
  return escapeHtml(source)
    .replace(
      /(\bname\b|\brole\b|\bbuilds\b|\bmindset\b)/g,
      '<span class="tok-key">$1</span>'
    )
    .replace(/(&quot;.*?&quot;)/g, '<span class="tok-str">$1</span>')
    .replace(/([{}\[\]:,])/g, '<span class="tok-punct">$1</span>');
}

/* Subtle particle field */
function initHeroParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let raf = 0;
  let running = true;

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(28, Math.floor(width / 40));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.35 + 0.15,
    }));
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.fillStyle = `rgba(148, 163, 184, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();

  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      running = true;
      draw();
    }
  });
}

/* Desktop cursor glow */
function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hoverCapable = window.matchMedia("(hover: hover)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!finePointer || !hoverCapable || reduced) return;

  document.body.classList.add("has-pointer");

  let x = 0;
  let y = 0;
  let currentX = 0;
  let currentY = 0;
  let visible = false;

  const interactiveSelector =
    "a, button, .expertise-card, .project-card, .stat-card, .stack-group, .btn";

  window.addEventListener(
    "pointermove",
    (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        glow.classList.add("is-visible");
        currentX = x;
        currentY = y;
      }
    },
    { passive: true }
  );

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest(interactiveSelector)) {
      glow.classList.add("is-active");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest(interactiveSelector)) {
      glow.classList.remove("is-active");
    }
  });

  const loop = () => {
    currentX += (x - currentX) * 0.12;
    currentY += (y - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(loop);
  };

  loop();
}

/* GitHub public API */
async function fetchGitHubProfile() {
  const container = document.getElementById("github-meta");
  if (!container) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: { Accept: "application/vnd.github+json" },
      }
    );

    if (!response.ok) throw new Error(`GitHub API ${response.status}`);

    const data = await response.json();

    container.innerHTML = `
      <div class="github-card">
        <img
          class="github-card__avatar"
          src="${escapeAttr(data.avatar_url)}"
          alt="${escapeAttr(data.name || data.login)} avatar"
          width="88"
          height="88"
          loading="lazy"
          decoding="async"
        />
        <div class="github-card__stats">
          <div class="github-card__stat">
            <strong>${Number(data.public_repos) || 0}</strong>
            <span>Repos</span>
          </div>
          <div class="github-card__stat">
            <strong>${Number(data.followers) || 0}</strong>
            <span>Followers</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="github-card">
        <p class="github-card__error">
          Live GitHub stats are unavailable right now.
          Visit
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">
            github.com/${GITHUB_USERNAME}
          </a>
          directly.
        </p>
      </div>
    `;
  }
}
