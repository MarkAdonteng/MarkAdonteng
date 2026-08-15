# Mark O. Adonteng — Portfolio

Premium personal portfolio for **Mark O. Adonteng**, Software Developer.

Built with HTML5, CSS3, and vanilla JavaScript. Ready for GitHub Pages.

## Quick start

Open `index.html` in a browser, or serve the folder locally:

```bash
# Python
python -m http.server 5500

# Node
npx serve .
```

Then visit `http://localhost:5500`.

## Customize

### Contact details

Edit `js/main.js`:

```js
const CONTACT_CONFIG = {
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-profile",
  phone: "",
  portfolioUrl: "https://MarkAdonteng.github.io/",
};
```

### Projects

Edit the `projects` array in `js/projects.js`:

```js
{
  title: "Project Name",
  description: "Short explanation.",
  image: "assets/projects/your-image.png",
  technologies: ["React", "TypeScript"],
  github: "https://github.com/MarkAdonteng/...",
  demo: "https://your-demo-url.com" // or "" to hide
}
```

Replace SVG placeholders in `assets/projects/` with real screenshots when ready.

## Deploy to GitHub Pages

### Option A — User site (`https://MarkAdonteng.github.io/`)

1. Copy the contents of `mark-portfolio/` into the root of the
   [`markadonteng.github.io`](https://github.com/MarkAdonteng/markadonteng.github.io) repository
   (or create that repo if needed).
2. Push to `main`.
3. In repo **Settings → Pages**, set source to Deploy from branch `main` / root.

### Option B — Project site

1. Push this `mark-portfolio` folder to any repo.
2. Enable Pages from the folder/branch that contains `index.html`.
3. If the site is served from a subpath, keep using relative asset paths (already configured).

## Structure

```text
mark-portfolio/
├── index.html
├── favicon.svg
├── favicon.ico
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   └── projects.js
├── assets/
│   ├── images/
│   ├── projects/
│   ├── icons/
│   └── logo/
└── README.md
```

## Features

- Sticky translucent navigation with mobile menu
- Hero with animated terminal visual and ambient background
- Expertise, projects, stack, process, GitHub, and contact sections
- Dynamic project cards from a JS array
- Optional GitHub API profile stats (graceful fallback)
- Scroll reveals, reduced-motion support, keyboard focus states
- SEO / Open Graph metadata

## Notes

- Project copy is intentionally high-level so nothing is invented beyond public GitHub data.
- Primary favicon is `favicon.svg`. `favicon.ico` is a lightweight fallback copy for older browsers.
