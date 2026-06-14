# Sam Ramseyer — Developer Portfolio

A full stack developer portfolio for **Sam Ramseyer**, built with React and Vite. Projects are loaded live from GitHub, including repositories from configured organizations.

**Live site:** [samramseyer.github.io/Sam-Portfolio](https://samramseyer.github.io/Sam-Portfolio)

## Features

- Modern responsive UI with dark theme
- Live GitHub project feed from your profile
- Organization repo support (configure org slugs in `src/config/site.ts`)
- Filter projects by personal vs organization
- GitHub Pages deployment via GitHub Actions

## Local development

**Recommended (hot reload while you edit):**

```bash
npm install
npm start
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

**Live Server extension:**

1. Build once: `npm run build`
2. Right-click `index.html` → **Open with Live Server**

The project is configured to serve the built `dist/` folder (port 5500). Re-run `npm run build` after you change code.

**Or use the built-in live script:**

```bash
npm run live
```

Opens [http://localhost:5500/](http://localhost:5500/) automatically.

## Configuration

Edit `src/config/site.ts` to customize:

- **Profile info** — name, tagline, email, social links
- **organizations** — add GitHub org slugs to pull their public repos, e.g. `["my-company"]`
- **hiddenRepos** — repos to exclude from the grid (e.g. this portfolio repo)
- **skills** — technology groups shown on the site

### Organization projects

Add your organization slug(s) to the `organizations` array:

```ts
organizations: ["your-org-name"],
```

Public org repos appear automatically. For private org repos, set a GitHub token:

1. Copy `.env.example` to `.env`
2. Add `VITE_GITHUB_TOKEN=your_token` with `repo` read scope

## Deploy to GitHub Pages

1. Push this repo to `samramseyer/Sam-Portfolio`
2. In repo **Settings → Pages**, set source to **GitHub Actions**
3. Push to `main` — the workflow builds and deploys automatically

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- GitHub REST API

## Author

**Sam Ramseyer**

- Email: sam.ramseyer.88@gmail.com
- GitHub: [@samramseyer](https://github.com/samramseyer)
