[README (1).md](https://github.com/user-attachments/files/31872667/README.1.md)
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

`assets/photos/` holds real GDGI photography — sourced directly from the organization (extracted from the live site's own media library, with a page-by-page usage manifest) rather than scraped or invented. It covers all 15 board and advisory portraits, the three project case studies, both site hero images, the Get Involved pathway and job cards, a Donate-page image, three Insights/Events photos, and the ten-photo "Moments of Impact" gallery on `/projects/`. Each is wired in via a `photo:` field in `generator/data.mjs` — see `hero()`, `projectCard()`, `eventCard()`, `postCard()`, and `personCard()` in `generator/build.mjs` for how a `photo` field is rendered as a real `<img>`, falling back to a brand-toned SVG pattern when one isn't set (still the case for the upcoming National Summit, which has no photo yet).

Two source images were deliberately excluded after review: one was a stock charity flyer for an unrelated Ghanaian organization's campaign, the other was literally the cover of a different NGO's (IRC) annual report — neither is GDGI's own content, so neither was used anywhere on the site, regardless of what page they appeared on in the original crawl.

To add or change a photo: drop the file in `assets/photos/`, point a `photo:` field at it in `generator/data.mjs` (path relative to the repo root, no leading slash), and run `node generator/build.mjs`.

## What changed from the old site

- **Preserved:** every real page and its substance — mission, board bios, the Solar Lamp Distribution case study, event and project descriptions, Get Involved and Donate copy — carried over from the org's Organisational Profile, the National Summit proposal, and the live site's own content inventory.
- **Not migrated, intentionally:** the restaurant-template demo pages (`/menu/`, `/menu-dark/`), the default WordPress `/sample-page/`, the two generic personal-development blog posts and the default "Hello World" post, and the "Giving Back to the Streets" project card, which had no real content behind it (Lorem ipsum only) on the old site. None of these routes redirect anywhere — they 404, per the rebuild brief's own instruction not to redirect a removed placeholder to unrelated content.
- **Fixed:** the Contact page's leftover restaurant address/copy is replaced with GDGI's real Abuja details; Mission and Vision are now two genuinely distinct statements (the old site repeated the same wording for both); the Events/Solar-Installation-Training date conflict between the old index (13 Nov 2025) and detail (July 2025) pages is called out explicitly in `generator/data.mjs` and on the page itself rather than silently guessed at.
- **Added:** a full `/events/national-summit-disability-inclusive-climate-action/` landing page — this did not exist anywhere on the old site, despite the summit's 11 September 2026 sponsorship deadline. Also added two real, dateable engagements found only in supplied photo evidence (a flyer, a banner) and not in any of the text sources: a Pre-Launch Lecture on 18 June 2025 (`/events/pre-launch-lecture-disability-climate-change/`) and the 6–7 October 2025 JT-GAP national validation workshop (`/insights/national-validation-workshop-just-transition-guidelines/`).
- **Legacy URLs preserved via redirect:** `/about-us/`, `/our-projects/`, `/project-detail/`, `/event-detail/`, `/blog/`, `/testimonial/`, and the seven board members' old root-level URLs (e.g. `/dr-angelina-ugben/`) all redirect (via `<meta http-equiv="refresh">` plus a `rel="canonical"` tag — the only redirect mechanism available on a plain static host with no server config) to their new location.

## Forms & payments

The National Summit registration form is live: it submits to a Make.com webhook (`site.formEndpoints.summitRegistration`) with a hidden `tag=cot-summit` field so that scenario can route/filter submissions from this form specifically. Two more things are wired in the code and waiting on one URL each — no template changes needed, just fill in `generator/data.mjs` and re-run `node generator/build.mjs`:

| What | Field in `generator/data.mjs` | Until it's set |
|---|---|---|
| Donate button | `site.paystackUrl` | Donate page shows a `mailto:`-based "Contact us to give" instead |
| Contact form | `site.formEndpoints.contact` | Submitting composes a `mailto:` to `site.email` instead of posting anywhere |

Each form (`class="js-backend-form"` in the generated HTML) submits to its `action` URL via `fetch()` once one is set, showing an inline "Thanks…" message in place of the form on success — see `assets/script.js`. Pick any form/webhook provider that accepts a browser POST (Formspree, Getform, a Zapier/Make catch-hook, etc.), create the endpoint there, and paste its URL into the matching field. The fetch uses `mode: 'no-cors'`, because most webhook receivers don't return CORS headers for a plain browser POST — the request still goes out, but the page can't read the response, so success shows optimistically once the request is sent rather than after a confirmed 200. **A static site cannot send email itself** — if you want a form to auto-reply to whoever submitted it (e.g. summit registrants), that autoresponder has to be configured on whichever form/webhook service you pick (most have one), not in this repo.

**Volunteer and Partnership sign-up** go straight to GDGI's own Google Forms rather than a custom in-page form — `site.getInvolved.volunteerFormUrl` and `.partnershipFormUrl` in `generator/data.mjs`. The Get Involved page's "Apply to volunteer" and "Partner with us" buttons just link out to whichever URL is set there (opened in a new tab); swap either URL and re-run the generator to point them elsewhere. The bullet lists under each ("What partners gain", etc.) live alongside them as `volunteerFeatures` / `partnershipBenefits`.

The summit registration form's fields live in `generator/data.mjs` as `events[…].registrationFields` — an ordered array of `{name, label, type, required, options}`. Adding a field your client asks for later is one array entry, not a template edit; two fields (organisation name, "please specify your disability") are already wired to show only when relevant (see the `conditionalFields` list in `assets/script.js` — add a new pair there if a future field should be conditional too).

**Summit speakers:** `events[…].speakers` is an empty array — the page shows a "coming soon" notice until it isn't. Once GDGI's client sends the two international and two national speakers with bios, add each as `{ name, role, type: 'international' | 'national', bio, photo }` (`photo` optional) and re-run the generator.

**Summit co-hosts &amp; sponsors:** `events[…].partners.cohosts` and `.sponsors` list the summit's three co-hosts (Federal Ministry of Environment, National Council on Climate Change, Office of the SSA on Climate Technology and Operations) and four sponsors (ILO, UNDP, UNFPA, CMB International), each with a real logo in `assets/partners/`. Each entry shows as a plain text badge if its `logo` field is ever unset — to add or swap a logo, drop the file in `assets/partners/` and point `logo:` at it, then re-run `node generator/build.mjs`.

The Summit event's `photo` field is intentionally unset — its artwork is still being designed. Add `photo: 'assets/photos/<file>.jpg'` to that event in `generator/data.mjs` once it's ready; the page currently shows the brand SVG pattern in its place.

## Open items for the GDGI team

Things this rebuild could not resolve without your input:

- **Paystack / contact form endpoint / summit artwork** — see [Forms & payments](#forms--payments) above; each just needs a URL or file dropped in.
- **Organizational Profile PDF** — GDGI has confirmed the "Strictly Confidential" watermark is fine to publish as-is. Drop the file in `assets/` (e.g. `assets/gdgi-organizational-profile-2025.pdf`), set `site.orgProfileUrl` to that path in `generator/data.mjs`, and re-run the generator — the About page's download button goes live automatically.
- **The one live job listing** — still points at "Apply link pending"; no replacement URL was supplied for it. (Volunteer, Partnership, Contact, and the Summit registration are all already live — see above.)
- **`date to be reconfirmed`** — the Solar Installation Training Cohort 2 event date conflict (see `events/disability-inclusive-solar-installation-training-cohort-2/index.html`).
- **Advisory Board** — all eight now have real photos, but no biography text was supplied for any of them; their cards are intentionally non-clickable (no bio page to link to) rather than linking to a broken image file, as the old site did.
- **Domain/DNS** — whether `globaldisabilitiesgi.com` will point at this GitHub Pages deployment, and who controls that DNS record, is still open. See [Deployment](#deployment) for what changes if it doesn't.

## Sources reviewed

This rebuild was compiled from, and should stay consistent with: the live site's About Us link map, its 21-page WordPress content inventory, its sitemap/robots.txt/header capture, the GDGI Organisational Profile 2025 (PDF), the National Summit on Disability-Inclusive Climate Action proposal (DOCX), and an independent website audit and rebuild brief prepared for GDGI (DOCX, "Manus AI," 2 September 2026).
