# Global Disabilities Green Initiative — website

A rebuild of [globaldisabilitiesgi.com](https://globaldisabilitiesgi.com), replacing the previous WordPress/Elementor install.

**This is a plain static site.** Every page is a real, standalone `.html` file — `about/index.html`, `contact/index.html`, and so on. No framework, no build step, no `npm install` required to view or edit it. Open any `.html` file and that is exactly what a visitor's browser receives. One shared stylesheet (`assets/styles.css`) and one small script (`assets/script.js`, for the mobile menu and the contact form) are the only other moving parts.

## Editing a page

Just edit the `.html` file directly — it's a normal HTML document. For a wording fix, a new paragraph, or a copy change on one page, this is the fastest path and needs nothing installed.

```
index.html                  → Home
about/index.html            → About
people/index.html           → Board & Advisory index
people/<slug>/index.html    → one page per Trustee
projects/index.html         → Projects index
projects/<slug>/index.html  → one page per project
events/index.html           → Events index
events/<slug>/index.html    → one page per event (the National Summit's
                               sponsorship table lives directly in its page)
insights/index.html         → News index
insights/<slug>/index.html  → one page per post
get-involved/index.html
donate/index.html
contact/index.html
404.html
assets/styles.css           → all shared styling (colors, type, layout)
assets/script.js            → mobile nav toggle, contact form, footer year
```

## Adding a new person / project / event / post

Adding one of these touches two places at once — an index page's card, and a new detail page — and those need to come out consistent. For that case, use the optional generator instead of hand-writing both:

```bash
node generator/build.mjs
```

It reads `generator/data.mjs` (the same content in plain data form: names, dates, body copy) and regenerates every `.html` page from it — deterministically, so the diff shows exactly what changed. It does **not** touch `assets/styles.css` or `assets/script.js`; those are hand-maintained. Needs only Node.js (no `npm install`, no dependencies).

To add, say, a new project: add an entry to the `projects` array in `generator/data.mjs`, run the command above, review the diff, and commit both the data change and the regenerated HTML.

You never have to use the generator — hand-editing the HTML directly works too, including for a brand-new one-off page with no generator support (just copy the structure of a similar existing page).

## Local preview

Any static file server works, e.g.:
```bash
python3 -m http.server 8000
# or: npx serve .
```
then open `http://localhost:8000/`. Opening `index.html` directly via `file://` also works.

## Deployment

`.github/workflows/deploy.yml` deploys the repository as-is to GitHub Pages on every push to `main` (enable **Settings → Pages → Source: GitHub Actions** once, first) — there is nothing to build. `.github/workflows/ci.yml` runs `scripts/check-links.py` (stdlib-only, no dependencies) on every pull request to catch a broken internal link before merge.

Every internal link and asset reference (`assets/styles.css`, `../about/`, etc.) is **relative to the page it's on**, not root-relative — deliberately, so the exact same files work unmodified whether Pages serves this repo at a domain root, a custom domain, *or* a project subpath like `https://gdgiorg.github.io/gdgiorg/`. There's no base-path setting to configure and no find-and-replace needed for any of those cases. (If you hand-edit or add a page, keep this pattern: link to other pages and assets by relative path, e.g. from `projects/foo/index.html` use `../../about/`, not `/about/` — or just run `node generator/build.mjs`, which always gets this right.)

## Logo

`assets/logo.png` (512×512, for og:image/social previews), `assets/logo-80.png` (the header mark), `favicon-32.png`, and `apple-touch-icon.png` are all derived from the real GDGI logo, masked to a transparent circle from the source file. To update the logo, replace `assets/logo.png` with the new master image and regenerate the other three sizes from it (any image tool works — they're plain resizes of the same circular crop), then re-run `node generator/build.mjs` so every page's header and favicon links pick it up.

## Photography

No photograph, portrait, or flyer from the original site was migrated. The independent rebuild brief prepared for this project is explicit that every image needs an owner-confirmed license before reuse, and this project had no access to the original media library to verify one. Every image slot is a brand-toned SVG pattern (inlined directly in each page, see the `<svg>` inside `.hero-art` / `.card-art`) instead of a photograph. Once GDGI supplies licensed photography, replace these `<div class="hero-art">…</div>` blocks with `<img>` tags — no other layout changes needed.

## What changed from the old site

- **Preserved:** every real page and its substance — mission, board bios, the Solar Lamp Distribution case study, event and project descriptions, Get Involved and Donate copy — carried over from the org's Organisational Profile, the National Summit proposal, and the live site's own content inventory.
- **Not migrated, intentionally:** the restaurant-template demo pages (`/menu/`, `/menu-dark/`), the default WordPress `/sample-page/`, the two generic personal-development blog posts and the default "Hello World" post, and the "Giving Back to the Streets" project card, which had no real content behind it (Lorem ipsum only) on the old site. None of these routes redirect anywhere — they 404, per the rebuild brief's own instruction not to redirect a removed placeholder to unrelated content.
- **Fixed:** the Contact page's leftover restaurant address/copy is replaced with GDGI's real Abuja details; Mission and Vision are now two genuinely distinct statements (the old site repeated the same wording for both); the Events/Solar-Installation-Training date conflict between the old index (13 Nov 2025) and detail (July 2025) pages is called out explicitly in `generator/data.mjs` and on the page itself rather than silently guessed at.
- **Added:** a full `/events/national-summit-disability-inclusive-climate-action/` landing page — this did not exist anywhere on the old site, despite the summit's 11 September 2026 sponsorship deadline.
- **Legacy URLs preserved via redirect:** `/about-us/`, `/our-projects/`, `/project-detail/`, `/event-detail/`, `/blog/`, `/testimonial/`, and the seven board members' old root-level URLs (e.g. `/dr-angelina-ugben/`) all redirect (via `<meta http-equiv="refresh">` plus a `rel="canonical"` tag — the only redirect mechanism available on a plain static host with no server config) to their new location.

## Open items for the GDGI team

Things this rebuild could not resolve without your input:

- **`Strictly Confidential`** (search the repo) — the Organisational Profile PDF supplied for this project carries that watermark, so its content was used for page copy but the file itself was not published. The About page's download button is a placeholder until you provide a public-facing version.
- **`Form link pending`** — the Volunteer and Partner pathways on Get Involved, and the one live job listing, all pointed to Google Forms on the old site, but no form URLs were supplied.
- **Donate page has no payment button** — by design. No verified payment provider, bank details, or gateway was supplied. It links to a `mailto:` instead. Do not wire up a payment button until GDGI confirms a real provider.
- **`date to be reconfirmed`** — the Solar Installation Training Cohort 2 event date conflict (see `events/disability-inclusive-solar-installation-training-cohort-2/index.html`).
- **Advisory Board** — eight names are on the site (`people/index.html`) with no biography or photo supplied for any of them; their cards are intentionally non-clickable rather than linking to a broken image file, as the old site did.
- **Social media handles** — none were supplied; the footer simply omits the row until they're added (search `Social links pending`).
- **Domain/DNS** — whether `globaldisabilitiesgi.com` will point at this GitHub Pages deployment, and who controls that DNS record, is still open. See [Deployment](#deployment) for what changes if it doesn't.
- **Truncated board bios** — Zainab Yusuf, Adama Ojochogwu Innocent Esq., and Echiche Kenneth Adinya's biographies were cut short in the source content; each page says so rather than inventing an ending.

## Sources reviewed

This rebuild was compiled from, and should stay consistent with: the live site's About Us link map, its 21-page WordPress content inventory, its sitemap/robots.txt/header capture, the GDGI Organisational Profile 2025 (PDF), the National Summit on Disability-Inclusive Climate Action proposal (DOCX), and an independent website audit and rebuild brief prepared for GDGI (DOCX, "Manus AI," 2 September 2026).
