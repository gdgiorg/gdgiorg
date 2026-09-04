// Regenerates every page in the repo from data.mjs. Run with: node generator/build.mjs
// See README "Content model" — this is optional tooling, not a build step.
// The shipped .html files are the real site; this just re-stamps them
// consistently when a content change (a new person/project/event/post)
// touches more than one page.
//
// All internal links (nav, cards, assets) are generated RELATIVE to each
// page's own location — never root-relative ("/about/") — so the site
// works unmodified whether it's served at a domain root, a custom domain,
// or a GitHub Pages project subpath like https://org.github.io/repo/.
// See README "Deployment."
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site, people, projects, events, posts, jobs, gallery } from './data.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..')

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ---------- Relative-link resolution ----------
// `path` is always the absolute site-root path of the CURRENT page, e.g.
// "/", "/about/", "/people/dr-angelina-ugben/", or the special "/404.html".
// R(path, target) turns an absolute target ("/about/", "/") into the
// correct relative link from that page's location.
function depthOf(path) {
  if (path === '/404.html') return 0 // a file living at the repo root
  return path.split('/').filter(Boolean).length
}
function R(path, target) {
  if (!target.startsWith('/')) return target // mailto:, tel:, http(s):, #anchor
  const prefix = '../'.repeat(depthOf(path))
  const clean = target.slice(1)
  return prefix + clean || './'
}

// ---------- Placeholder art (inline SVG; see README "Photography") ----------
function placeholderArt(variant) {
  const patterns = {
    rays: `<g stroke="#b5730e" stroke-width="1.5" opacity="0.35">${Array.from({ length: 14 })
      .map((_, i) => `<line x1="60" y1="260" x2="${20 + i * 28}" y2="-40" />`)
      .join('')}</g>`,
    contour: `<g fill="none" stroke="#dcede5" stroke-width="1.4" opacity="0.3">${Array.from({ length: 6 })
      .map((_, i) => `<path d="M -20 ${40 + i * 42} C 100 ${10 + i * 42}, 300 ${80 + i * 38}, 420 ${30 + i * 40}" />`)
      .join('')}</g>`,
    canopy: `<g fill="#dcede5" opacity="0.22">${Array.from({ length: 24 })
      .map((_, i) => {
        const x = (i * 53) % 400
        const y = ((i * 37) % 300) + (i % 3) * 20
        const r = 14 + (i % 4) * 6
        return `<circle cx="${x}" cy="${y}" r="${r}" />`
      })
      .join('')}</g>`,
    grid: `<g stroke="#dcede5" stroke-width="1" opacity="0.18">${Array.from({ length: 11 })
      .map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="300" />`)
      .join('')}${Array.from({ length: 8 })
      .map((_, i) => `<line x1="0" y1="${i * 40}" x2="400" y2="${i * 40}" />`)
      .join('')}</g>`,
  }
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="#0e4a3f" />${patterns[variant] || patterns.contour}</svg>`
}

// ---------- Nav / layout ----------
const navLinks = [
  { href: '/about/', label: 'About Us' },
  { href: '/projects/', label: 'Our Projects' },
  { href: '/events/', label: 'Events' },
  { href: '/insights/', label: 'Insights' },
  { href: '/get-involved/', label: 'Get Involved' },
  { href: '/contact/', label: 'Contact' },
]

function header(path) {
  const links = navLinks
    .map((l) => `<a href="${R(path, l.href)}"${l.href === path ? ' aria-current="page"' : ''}>${l.label}</a>`)
    .join('\n')
  return `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${R(path, '/')}">
      <img class="mark" src="${R(path, '/assets/logo-80.png')}" width="38" height="38" alt="" />
      <span class="name">Global Disabilities<br>Green Initiative</span>
    </a>
    <nav class="primary-nav" aria-label="Primary">
      ${links}
    </nav>
    <a class="btn btn-primary" href="${R(path, '/donate/')}" style="display:none" id="donate-desktop">Donate</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Primary">
    <ul>
      ${navLinks.map((l) => `<li><a href="${R(path, l.href)}"${l.href === path ? ' aria-current="page"' : ''}>${l.label}</a></li>`).join('\n')}
      <li><a href="${R(path, '/donate/')}" class="btn btn-primary" style="margin-top:6px">Donate</a></li>
    </ul>
  </nav>
</header>
<style>#donate-desktop{display:none}@media(min-width:960px){#donate-desktop{display:inline-flex;margin-left:12px}}</style>`
}

function footer(path) {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`
  return `
<footer class="site-footer">
  <div class="wrap footer-main">
    <div>
      <div class="name">${site.name}</div>
      <p class="tagline">${site.tagline}</p>
      <address>
        <a href="${mapHref}" target="_blank" rel="noreferrer">${site.address.line1}, ${site.address.line2}</a>
        ${site.phones.map((p) => `<a href="tel:${p.replace(/\s+/g, '')}">${p}</a>`).join('\n')}
        <a href="mailto:${site.email}">${site.email}</a>
      </address>
    </div>
    <div class="footer-col">
      <h4>Organization</h4>
      <ul>
        <li><a href="${R(path, '/about/')}">About Us</a></li>
        <li><a href="${R(path, '/people/')}">Board &amp; Advisory</a></li>
        <li><a href="${R(path, '/insights/')}">Insights</a></li>
        <li><a href="${R(path, '/get-involved/')}">Careers</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Programs</h4>
      <ul>
        <li><a href="${R(path, '/projects/')}">Our Projects</a></li>
        <li><a href="${R(path, '/events/')}">Events</a></li>
        <li><a href="${R(path, '/events/national-summit-disability-inclusive-climate-action/')}">National Summit 2026</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Take action</h4>
      <ul>
        <li><a href="${R(path, '/get-involved/')}">Get Involved</a></li>
        <li><a href="${R(path, '/donate/')}">Donate</a></li>
        <li><a href="${R(path, '/contact/')}">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="wrap">
      <span>&copy; <span id="year">2026</span> ${site.name}. Founded ${site.founded}.</span>
      ${site.socials.length
        ? `<span class="socials">${site.socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noreferrer">${esc(s.label)}</a>`).join('')}</span>`
        : `<span style="font-style:italic">Social links pending &mdash; see README</span>`}
    </div>
  </div>
</footer>`
}

function page({ title, description, path, bodyHtml }) {
  const fullTitle = title === 'Home' ? site.name : `${title} — ${site.shortName}`
  const url = `${site.domain}${path === '/404.html' ? '/404.html' : path}`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#146152" />
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${esc(fullTitle)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="${site.domain}/assets/logo.png" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:image" content="${site.domain}/assets/logo.png" />
<link rel="icon" type="image/png" sizes="32x32" href="${R(path, '/favicon-32.png')}" />
<link rel="apple-touch-icon" href="${R(path, '/apple-touch-icon.png')}" />
<link rel="stylesheet" href="${R(path, '/assets/styles.css')}" />
</head>
<body>
<a href="#main" class="skip-link">Skip to main content</a>
${header(path)}
<main id="main">
${bodyHtml}
</main>
${footer(path)}
<script src="${R(path, '/assets/script.js')}" defer></script>
</body>
</html>
`
}

function hero({ path, kicker, title, subtitle, variant = 'contour', photo, ctas = '' }) {
  const art = photo
    ? `<img src="${R(path, `/${photo}`)}" alt="" />`
    : placeholderArt(variant)
  return `
<section class="hero">
  <div class="hero-art">${art}</div>
  <div class="hero-overlay"></div>
  <div class="wrap hero-content">
    ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
    <h1>${title}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
    ${ctas ? `<div class="btn-row">${ctas}</div>` : ''}
  </div>
</section>`
}

function section({ tone = '', size = '', inner, id = '' }) {
  const cls = ['section', tone && `tone-${tone}`, size].filter(Boolean).join(' ')
  return `<section${id ? ` id="${id}"` : ''} class="${cls}"><div class="wrap">${inner}</div></section>`
}

function sectionHead({ kicker, title, subtitle }) {
  return `<div class="section-head">
    ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
    <h2>${esc(title)}</h2>
    ${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ''}
  </div>`
}

function initials(name) {
  return name
    .replace(/[.,()]/g, '')
    .split(' ')
    .filter((w) => w && !/^(dr|chief|esq|prof|avm|rtd|mrs|mr)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function projectCard(fromPath, p, variant) {
  const art = p.photo ? `<img src="${R(fromPath, `/${p.photo}`)}" alt="" />` : placeholderArt(variant)
  return `<a class="card" href="${R(fromPath, `/projects/${p.slug}/`)}">
    <div class="card-art">${art}</div>
    <span class="eyebrow">${p.status === 'ongoing' ? 'Ongoing' : 'Completed'}${p.date ? ` · ${p.date}` : ''}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.summary)}</p>
    <span class="more">Read the case study →</span>
  </a>`
}

function eventCard(fromPath, e) {
  const art = e.photo ? `<div class="card-art">${`<img src="${R(fromPath, `/${e.photo}`)}" alt="" />`}</div>` : ''
  return `<a class="card" href="${R(fromPath, `/events/${e.slug}/`)}">
    ${art}
    <div>
      <span class="badge ${e.state === 'upcoming' ? 'badge-upcoming' : 'badge-past'}">${e.state === 'upcoming' ? 'Upcoming' : 'Past'}</span>
      <span class="eyebrow" style="margin-left:8px">${esc(e.dateDisplay)}</span>
    </div>
    <h3>${esc(e.title)}</h3>
    <p>${esc(e.location)}</p>
    <p>${esc(e.summary)}</p>
    <span class="more">Event details →</span>
  </a>`
}

function postCard(fromPath, p) {
  const art = p.photo ? `<div class="card-art">${`<img src="${R(fromPath, `/${p.photo}`)}" alt="" />`}</div>` : ''
  return `<a class="card" href="${R(fromPath, `/insights/${p.slug}/`)}">
    ${art}
    <time class="eyebrow" datetime="${p.isoDate}">${esc(p.dateDisplay)}</time>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.summary)}</p>
    <span class="more">Read more →</span>
  </a>`
}

function personCard(fromPath, p) {
  const avatar = p.photo
    ? `<img class="avatar" src="${R(fromPath, `/${p.photo}`)}" alt="" />`
    : `<div class="avatar" aria-hidden="true">${initials(p.name)}</div>`
  const inner = `${avatar}
    <div><div class="name">${esc(p.name)}</div><div class="role">${esc(p.role)}</div></div>`
  if (p.group === 'advisory') return `<div class="person-card">${inner}</div>`
  return `<a class="person-card" href="${R(fromPath, `/people/${p.slug}/`)}">${inner}</a>`
}

function registrationForm(fromPath, e) {
  const conditional = { organisation_name: 'representing_org', disability_specify: 'has_disability' }
  const fields = e.registrationFields
    .map((f) => {
      const id = `reg-${f.name}`
      const wrapId = conditional[f.name] ? ` id="field-${f.name}" hidden` : ''
      const req = f.required ? ' required' : ''
      let control
      if (f.type === 'select') {
        control = `<select id="${id}" name="${f.name}"${req} style="width:100%;padding:11px 13px;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);font-family:var(--font-body);font-size:15px;color:var(--ink)"><option value="">Choose one…</option>${f.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`
      } else if (f.type === 'textarea') {
        control = `<textarea id="${id}" name="${f.name}"${req} rows="3"></textarea>`
      } else {
        control = `<input id="${id}" name="${f.name}" type="${f.type}"${req} />`
      }
      return `<div class="field"${wrapId}><label for="${id}">${esc(f.label)}${f.required ? '' : ' (optional)'}</label>${control}</div>`
    })
    .join('')
  const endpoint = site.formEndpoints.summitRegistration
  const tag = site.formTags.summitRegistration
  return `<div id="register">
  <form class="js-backend-form" action="${endpoint}" method="POST" data-to="${site.email}" data-subject="Summit registration — ${esc(e.title)}" data-success="Thanks — you're registered for the summit. GDGI will be in touch with joining details closer to 14–15 October 2026.">
    ${tag ? `<input type="hidden" name="tag" value="${esc(tag)}" />` : ''}
    ${fields}
    <p class="form-note">${endpoint ? 'Your details go straight to GDGI\'s registration system.' : `Sending opens your email app addressed to ${site.email}.`} GDGI will use this information solely to plan and run the summit, including any accessibility arrangements you request.</p>
    <button type="submit" class="btn btn-primary">Register to attend</button>
  </form>
  </div>`
}

// ---------- File writer ----------
function write(relPath, html) {
  const full = resolve(OUT, relPath)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, html)
}

function redirectPage(fromPath, toPath) {
  const url = `${site.domain}${toPath}`
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="refresh" content="0; url=${R(fromPath, toPath)}" />
<link rel="canonical" href="${url}" />
<title>Redirecting… — ${site.shortName}</title>
<link rel="stylesheet" href="${R(fromPath, '/assets/styles.css')}" />
</head>
<body>
<main class="redirect-note">
  <div class="prose text-center">
    <p>This page has moved. Redirecting to <a href="${R(fromPath, toPath)}">${toPath}</a>&hellip;</p>
  </div>
</main>
</body>
</html>
`
  write(`${fromPath}index.html`.replace(/^\//, ''), html)
}

// ======================================================================
// HOME
// ======================================================================
const artCycle = ['contour', 'rays', 'canopy', 'grid']
const summit = events.find((e) => e.slug === 'national-summit-disability-inclusive-climate-action')

const homeStats = [
  { n: '150+', l: 'Solar reading lamps delivered to Abuja schools' },
  { n: '500+', l: 'Drought-resistant trees planted' },
  { n: '7', l: 'Board of Trustees members' },
  { n: '2024', l: 'Founded, Abuja, Nigeria' },
]

{
  const path = '/'
  const L = (t) => R(path, t)
  write('index.html', page({
    title: 'Home',
    description: 'Bridging Disability Rights & Climate Justice — creating a world where sustainability is inclusive, accessible, and driven by the voices of Persons with Disabilities.',
    path,
    bodyHtml: `
${hero({
  path,
  kicker: `${site.shortName} · Est. ${site.founded}`,
  title: site.tagline,
  subtitle: 'Creating a world where sustainability is inclusive, accessible, and driven by the voices of Persons with Disabilities.',
  variant: 'contour',
  photo: 'assets/photos/hero-home.jpg',
  ctas: `<a class="btn btn-primary" href="${L('/get-involved/')}">Get Involved</a><a class="btn btn-outline-light" href="${L(`/events/${summit.slug}/`)}">National Summit 2026</a>`,
})}
${section({ tone: 'brand', inner: `<div class="deadline-strip"><div class="wrap" style="padding:0"><p><strong>National Summit on Disability-Inclusive Climate Action</strong> — 14–15 October 2026, Abuja. Sponsorship and registration close 11 September 2026.</p><a class="btn btn-outline-light" href="${L(`/events/${summit.slug}/`)}">View the ask</a></div></div>` })}
${section({ inner: `
  <div class="grid grid-2">
    <div class="card"><h2 style="font-size:20px">Inclusive Energy. Empowered Communities.</h2><p>Designing renewable energy solutions that work for everyone — ensuring Persons with Disabilities lead the clean energy revolution.</p></div>
    <div class="card"><h2 style="font-size:20px">Driving Policy. Inspiring Change. Transforming Lives.</h2><p>Championing disability inclusion across climate policy, national planning, and the institutions that shape Nigeria's green transition.</p></div>
  </div>
  <div class="stats mt-lg">
    ${homeStats.map((s) => `<div class="stat"><div class="n">${s.n}</div><div class="l">${s.l}</div></div>`).join('')}
  </div>
` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'What we do', title: 'Real projects, led with — not just for — Persons with Disabilities', subtitle: 'Three completed initiatives across energy access, skills, and environmental restoration.' })}
  <div class="grid grid-3 mt-lg">${projects.map((p, i) => projectCard(path, p, artCycle[i % artCycle.length])).join('')}</div>
  <div class="mt-lg"><a class="btn btn-outline" href="${L('/projects/')}">All projects</a></div>
` })}
${section({ inner: `
  ${sectionHead({ kicker: 'Calendar', title: 'Events', subtitle: 'From flagship national policy summits to hands-on skills training.' })}
  <div class="grid grid-2 mt-lg">${events.map((e) => eventCard(path, e)).join('')}</div>
` })}
${section({ tone: 'brand', size: 'loose', inner: `
  <div class="grid grid-2">
    <div>
      <h2 style="font-size:28px">Join the movement</h2>
      <p style="margin-top:12px;color:rgba(255,255,255,.8);max-width:34ch">Volunteer, partner with GDGI, or support our work directly. Every pathway strengthens a future where sustainability is inclusive by design.</p>
      <div class="btn-row mt-lg"><a class="btn btn-primary" href="${L('/get-involved/')}">Get Involved</a><a class="btn btn-outline-light" href="${L('/donate/')}">Donate</a></div>
    </div>
    <p style="font-size:15px;line-height:1.7;color:rgba(255,255,255,.75)">${site.mission} <a href="${L('/about/')}" style="color:#fff;font-weight:700;text-decoration:underline">Read our full story →</a></p>
  </div>
` })}
`,
  }))
}

// ======================================================================
// ABOUT
// ======================================================================
{
  const path = '/about/'
  const L = (t) => R(path, t)
  write('about/index.html', page({
    title: 'About Us',
    description: 'Founded 24 October 2024, GDGI works at the intersection of disability rights, climate justice, renewable energy, and sustainable agriculture.',
    path,
    bodyHtml: `
${hero({ path, kicker: 'About GDGI', title: 'A movement for a greener, fairer, and more inclusive world', variant: 'canopy', photo: 'assets/photos/hero-about.jpg' })}
${section({ tone: 'surface', inner: `
  <div class="grid" style="grid-template-columns:280px 1fr;gap:40px;align-items:center">
    <img src="${L('/assets/photos/about-secondary.jpg')}" alt="GDGI President Angelina Ugben at a Sustainable Development Goals engagement" style="width:100%;border-radius:8px;object-fit:cover" />
    <div class="prose" style="font-size:19px;color:var(--ink-soft)">${site.story.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
` })}
${section({ inner: `
  <div class="grid grid-2">
    <div class="card"><h2 style="font-size:20px;color:var(--brand)">Our Vision</h2><p>${esc(site.vision)}</p></div>
    <div class="card"><h2 style="font-size:20px;color:var(--brand)">Our Mission</h2><p>${esc(site.mission)}</p></div>
  </div>
` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'How we work', title: 'Core values' })}
  <div class="grid grid-3 mt-lg">${site.values.map((v) => `<div class="card"><h3>${esc(v.name)}</h3><p>${esc(v.body)}</p></div>`).join('')}</div>
` })}
${section({ inner: `
  ${sectionHead({ kicker: "2025–2030 objectives", title: "What we're building toward" })}
  <ol class="numbered mt-lg" style="grid-template-columns:1fr 1fr">${site.objectives.map((o, i) => `<li><span class="idx">${String(i + 1).padStart(2, '0')}</span><span>${esc(o)}</span></li>`).join('')}</ol>
` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'Governance & transparency', title: 'How GDGI is funded and held accountable' })}
  <div class="grid grid-2 mt-lg">
    <div>
      <p style="color:var(--ink-soft)">${esc(site.funding.intro)}</p>
      <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;margin-top:24px">Funding sources</h3>
      <ul class="tag-list" style="margin-top:12px">${site.funding.sources.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
    <div>
      <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em">Financial management &amp; accountability</h3>
      <ul class="tag-list" style="margin-top:12px">${site.funding.practices.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
  </div>
` })}
${section({ inner: `
  <div class="card" style="flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
    <div><h2 style="font-size:20px">Meet the Board &amp; Advisory Board</h2><p style="margin-top:6px">Seven Trustees and eight Advisory Board members guide GDGI's strategy and programs.</p></div>
    <a class="btn btn-primary" href="${L('/people/')}">View profiles</a>
  </div>
` })}
${section({ tone: 'surface', inner: `
  <div class="callout-dashed">
    <h2 style="font-size:18px">Organizational Profile (PDF)</h2>
    <p style="margin-top:8px;max-width:60ch;color:var(--ink-soft)">A downloadable profile is planned for this page. The source document supplied for this rebuild is marked "Strictly Confidential," so it has not been published here — GDGI should provide a public-facing version before this download goes live.</p>
    <span class="pending mt-lg">Download pending</span>
  </div>
` })}
`,
  }))
}

// ======================================================================
// PEOPLE
// ======================================================================
const trustees = people.filter((p) => p.group === 'trustee')
const advisory = people.filter((p) => p.group === 'advisory')

{
  const path = '/people/'
  write('people/index.html', page({
    title: 'Board & Advisory',
    description: "Meet GDGI's Board of Trustees and Advisory Board.",
    path,
    bodyHtml: `
${hero({ path, kicker: 'Leadership', title: 'Board &amp; Advisory Board', variant: 'grid' })}
${section({ tone: 'surface', inner: `${sectionHead({ kicker: 'Governance', title: 'Board of Trustees' })}<div class="grid grid-2 mt-lg">${trustees.map((p) => personCard(path, p)).join('')}</div>` })}
${section({ inner: `${sectionHead({ kicker: 'Strategic guidance', title: 'Advisory Board', subtitle: 'No public biography or photograph has been supplied yet for advisory members — cards are shown for reference only.' })}<div class="grid grid-3 mt-lg">${advisory.map((p) => personCard(path, p)).join('')}</div>` })}
`,
  }))
}

for (const p of trustees) {
  const path = `/people/${p.slug}/`
  write(`people/${p.slug}/index.html`, page({
    title: p.name,
    description: `${p.name} — ${p.role} at GDGI.`,
    path,
    bodyHtml: `
${section({ tone: 'surface', inner: `
  <div style="display:flex;align-items:center;gap:22px">
    ${p.photo
      ? `<img class="avatar" src="${R(path, `/${p.photo}`)}" alt="" style="width:96px;height:96px" />`
      : `<div class="avatar" style="width:96px;height:96px;font-size:30px" aria-hidden="true">${initials(p.name)}</div>`}
    <div><h1 style="font-size:30px">${esc(p.name)}</h1><p style="margin-top:6px;color:var(--brand)">${esc(p.role)}</p></div>
  </div>
` })}
${section({ inner: `<div class="prose" style="margin:0 auto">${p.bio.map((b) => `<p style="color:var(--ink-soft)">${esc(b)}</p>`).join('')}${p.bioIncomplete ? `<p class="callout-dashed" style="font-style:italic;color:var(--ink-faint);font-size:14.5px">This biography is excerpted from GDGI's published materials, which were truncated at the source. A fuller profile can be added once confirmed with GDGI.</p>` : ''}</div>` })}
`,
  }))
}

// ======================================================================
// PROJECTS
// ======================================================================
{
  const path = '/projects/'
  write('projects/index.html', page({
    title: 'Our Projects',
    description: "Energy access, skills training, and environmental restoration — GDGI's completed and ongoing projects.",
    path,
    bodyHtml: `
${hero({ path, kicker: 'Our work', title: 'Projects', subtitle: 'Programs designed with, and led by, Persons with Disabilities.', variant: 'rays' })}
${section({ inner: `<div class="grid grid-3">${projects.map((p, i) => projectCard(path, p, artCycle[i % artCycle.length])).join('')}</div>` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'Gallery', title: 'Moments of Impact' })}
  <div class="gallery-grid mt-lg">${gallery.map((g) => `<img src="${R(path, `/${g.src}`)}" alt="${esc(g.alt)}" loading="lazy" />`).join('')}</div>
` })}
`,
  }))
}

for (const p of projects) {
  const path = `/projects/${p.slug}/`
  const L = (t) => R(path, t)
  const linkedPeople = people.filter((pp) => p.people?.includes(pp.slug))
  write(`projects/${p.slug}/index.html`, page({
    title: p.title,
    description: p.summary,
    path,
    bodyHtml: `
${hero({ path, kicker: p.status === 'ongoing' ? 'Ongoing project' : 'Completed project', title: p.title, variant: 'canopy', photo: p.photo })}
${section({ tone: 'surface', inner: `
  <div class="grid" style="grid-template-columns:1fr 260px;gap:40px">
    <div class="prose">${p.body.map((b) => `<p style="color:var(--ink-soft)">${esc(b)}</p>`).join('')}</div>
    <aside style="display:flex;flex-direction:column;gap:20px">
      ${p.date ? `<div><div class="eyebrow">Date</div><div style="margin-top:4px">${esc(p.date)}</div></div>` : ''}
      ${p.location ? `<div><div class="eyebrow">Location</div><div style="margin-top:4px">${esc(p.location)}</div></div>` : ''}
      ${p.partners?.length ? `<div><div class="eyebrow">Partners</div><ul class="plain-list" style="margin-top:4px">${p.partners.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      ${linkedPeople.length ? `<div><div class="eyebrow">Led by</div><ul class="plain-list" style="margin-top:4px">${linkedPeople.map((x) => `<li><a href="${L(`/people/${x.slug}/`)}" style="color:var(--brand);font-weight:600">${esc(x.name)}</a></li>`).join('')}</ul></div>` : ''}
    </aside>
  </div>
` })}
`,
  }))
}

// ======================================================================
// EVENTS
// ======================================================================
const sponsorshipBands = [
  { band: 'Anchor Sponsor', value: '$20,000+ / ₦32,000,000+', note: 'Confirmed: UNDP, ILO, Oxfam Nigeria' },
  { band: 'Section Sponsor', value: '$6,000–19,999 / ₦9.6M–31.9M', note: 'Section naming rights + speaking slot' },
  { band: 'Line-Item Sponsor', value: '$800–5,999 / ₦1.28M–9.59M', note: 'Named recognition on the sponsored line' },
  { band: 'In-Kind Partner', value: 'Any verifiable in-kind value', note: 'Credit proportional to contribution' },
]
const tracks = [
  'Disability-Inclusive Climate Finance & Green Investment — chaired by UNDP',
  'PWD-Led Climate Adaptation & Community Resilience — chaired by NCCC',
  'Loss & Damage: Disability-Specific Vulnerability & Response — chaired by Oxfam Nigeria',
  'Inclusive Climate Education, Technology & the ACE Pillar — IDA advisory',
  'Green Jobs, Clean Energy & Entrepreneurship for PWDs — chaired by ILO',
]

{
  const path = '/events/'
  write('events/index.html', page({
    title: 'Events',
    description: 'Bringing together communities, policymakers, development partners, and Persons with Disabilities to advance sustainable, inclusive climate action.',
    path,
    bodyHtml: `
${hero({ path, kicker: 'Our calendar', title: 'Events', subtitle: 'At GDGI, every event represents progress toward a greener, more inclusive world.', variant: 'rays' })}
${section({ tone: 'surface', inner: `${sectionHead({ kicker: 'Upcoming', title: "What's next" })}<div class="grid grid-2 mt-lg">${events.filter((e) => e.state === 'upcoming').map((e) => eventCard(path, e)).join('')}</div>` })}
${section({ inner: `${sectionHead({ kicker: 'Archive', title: 'Past events' })}<div class="grid grid-2 mt-lg">${events.filter((e) => e.state === 'past').map((e) => eventCard(path, e)).join('')}</div>` })}
`,
  }))
}

for (const e of events) {
  const path = `/events/${e.slug}/`
  const L = (t) => R(path, t)
  const isSummit = e.slug === summit.slug
  write(`events/${e.slug}/index.html`, page({
    title: e.title,
    description: e.summary,
    path,
    bodyHtml: `
${hero({
  path,
  kicker: e.dateDisplay,
  title: e.title,
  subtitle: e.location,
  variant: isSummit ? 'grid' : 'canopy',
  photo: e.photo,
  ctas: `${isSummit ? `<a class="btn btn-primary" href="${L('/events/national-summit-disability-inclusive-climate-action/')}#register">Register to attend</a>` : ''}${e.cta ? `<a class="btn ${isSummit ? 'btn-outline-light' : 'btn-primary'}" href="${L(e.cta.href)}">${esc(e.cta.label)}</a>` : ''}`,
})}
${section({ tone: 'surface', inner: `<div class="prose" style="margin:0 auto">${e.body.map((b) => `<p style="color:var(--ink-soft)">${esc(b)}</p>`).join('')}</div>` })}
${isSummit ? `
${section({ inner: `
  ${sectionHead({ kicker: 'Attend', title: 'Register to attend', subtitle: 'In person in Abuja or joining virtually — tell us a little about yourself so we can plan the summit around every attendee.' })}
  <div class="card mt-lg" style="max-width:640px">${registrationForm(path, e)}</div>
` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'Ahead of the summit', title: 'Pre-summit webinars' })}
  <div class="grid grid-2 mt-lg">${e.webinars.map((w) => `<div class="card"><span class="eyebrow">${esc(w.label)} · ${esc(w.dateDisplay)}</span><h3 style="font-size:17px">${esc(w.title)}</h3><p>${esc(w.partner)}</p></div>`).join('')}</div>
` })}
${section({ inner: `
  ${sectionHead({ kicker: 'Who\'s speaking', title: 'Featured speakers' })}
  ${e.speakers.length ? `
    <div class="grid grid-2 mt-lg">${e.speakers.map((s) => `<div class="card" style="flex-direction:row;gap:16px;align-items:flex-start">
      ${s.photo ? `<img src="${L(`/${s.photo}`)}" alt="" style="width:72px;height:72px;border-radius:50%;object-fit:cover;flex:none" />` : `<div class="avatar" style="width:72px;height:72px;flex:none" aria-hidden="true">${initials(s.name)}</div>`}
      <div><span class="eyebrow">${s.type === 'international' ? 'International Speaker' : 'National Speaker'}</span><h3 style="font-size:17px">${esc(s.name)}</h3><p style="font-size:13px;color:var(--ink-faint);margin-top:2px">${esc(s.role)}</p><p style="margin-top:8px">${esc(s.bio)}</p></div>
    </div>`).join('')}</div>
  ` : `<p class="callout-dashed mt-lg" style="display:block">Speaker announcements — two international, two national — are coming soon.</p>`}
` })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'Partner with GDGI', title: 'Sponsorship bands', subtitle: 'Every line of the $125,000 budget is individually sponsorable.' })}
  <div class="table-scroll mt-lg"><table><thead><tr><th>Band</th><th>Contribution</th><th>Recognition</th></tr></thead><tbody>
    ${sponsorshipBands.map((b) => `<tr><td style="font-weight:700">${b.band}</td><td class="mono">${b.value}</td><td style="color:var(--ink-soft)">${b.note}</td></tr>`).join('')}
  </tbody></table></div>
` })}
${section({ inner: `
  ${sectionHead({ kicker: 'Programme', title: 'Five thematic policy dialogue tracks' })}
  <ul class="grid grid-2 mt-lg" style="list-style:none;padding:0;margin:0;gap:12px">${tracks.map((t) => `<li class="card" style="padding:16px">${esc(t)}</li>`).join('')}</ul>
` })}
${section({ tone: 'brand', size: 'loose', inner: `
  <div class="text-center">
    <h2 style="font-size:26px">Sponsorship &amp; registration close 11 September 2026</h2>
    <p style="margin:12px auto 0;max-width:46ch;color:rgba(255,255,255,.8)">Contact GDGI to discuss adopting a budget line, a full section, or an anchor sponsorship for the National Summit on Disability-Inclusive Climate Action.</p>
    <div class="btn-row" style="justify-content:center;margin-top:22px"><a class="btn btn-primary" href="${L('/contact/')}">Partner with us</a></div>
  </div>
` })}
` : ''}
`,
  }))
}

// ======================================================================
// INSIGHTS
// ======================================================================
const sortedPosts = [...posts].sort((a, b) => b.isoDate.localeCompare(a.isoDate))

{
  const path = '/insights/'
  write('insights/index.html', page({
    title: 'Insights',
    description: "News and updates from GDGI's advocacy, partnerships, and programs across disability rights and climate justice.",
    path,
    bodyHtml: `
${hero({ path, kicker: 'News & updates', title: 'Insights', variant: 'grid' })}
${section({ inner: `<div class="grid grid-3">${sortedPosts.map((p) => postCard(path, p)).join('')}</div>` })}
`,
  }))
}

for (const p of posts) {
  const path = `/insights/${p.slug}/`
  write(`insights/${p.slug}/index.html`, page({
    title: p.title,
    description: p.summary,
    path,
    bodyHtml: `
${hero({ path, kicker: p.dateDisplay, title: p.title, variant: 'canopy', photo: p.photo })}
${section({ tone: 'surface', inner: `<div class="prose" style="margin:0 auto">${p.body.map((b) => `<p style="color:var(--ink-soft)">${esc(b)}</p>`).join('')}</div>` })}
`,
  }))
}

// ======================================================================
// GET INVOLVED
// ======================================================================
const pathways = [
  { name: 'Volunteer', body: 'Support community engagement, environmental projects, research, advocacy, and event coordination.', photo: 'assets/photos/volunteer.jpg' },
  { name: 'Partner', body: 'Co-branded projects, technical expertise, ESG/CSR/SDG alignment, visibility, and policy engagement.', photo: 'assets/photos/partnerships.jpg' },
]

{
  const path = '/get-involved/'
  const L = (t) => R(path, t)
  write('get-involved/index.html', page({
    title: 'Get Involved',
    description: 'Volunteer, partner with GDGI, or join the team building an inclusive, sustainable future.',
    path,
    bodyHtml: `
${hero({ path, kicker: 'Take action', title: 'Join Us in Building a Greener, More Inclusive Future', subtitle: "Whether you want to volunteer, partner with us, or build a career in inclusive climate action, there's a place for you here.", variant: 'rays' })}
${section({ tone: 'surface', inner: `
  ${sectionHead({ kicker: 'Pathways', title: 'Volunteer or partner' })}
  <div class="grid grid-2 mt-lg">
    <div class="card"><div class="card-art"><img src="${L('/assets/photos/volunteer.jpg')}" alt="" /></div><h3>Volunteer</h3><p>${pathways[0].body}</p><a class="more" href="#volunteer-form">Sign up below ↓</a></div>
    <div class="card"><div class="card-art"><img src="${L('/assets/photos/partnerships.jpg')}" alt="" /></div><h3>Partner</h3><p>${pathways[1].body}</p><span class="pending mt-lg">Application form link pending — see README</span></div>
  </div>
` })}
${section({ id: 'volunteer-form', inner: `
  <div class="card" style="max-width:560px;margin:0 auto">
    <h2 style="font-size:18px">Become a volunteer</h2>
    <form class="js-backend-form" action="${site.formEndpoints.volunteer}" method="POST" data-to="${site.email}" data-subject="Volunteer sign-up" data-success="Thanks for signing up to volunteer — GDGI will be in touch." style="margin-top:16px">
      <div class="field"><label for="vf-name">Full name</label><input id="vf-name" name="name" type="text" required autocomplete="name" /></div>
      <div class="field"><label for="vf-email">Email address</label><input id="vf-email" name="email" type="email" required autocomplete="email" /></div>
      <div class="field"><label for="vf-interest">Area of interest</label>
        <select id="vf-interest" name="area_of_interest" required style="width:100%;padding:11px 13px;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);font-family:var(--font-body);font-size:15px;color:var(--ink)">
          <option value="">Choose one…</option>
          <option>Community engagement</option>
          <option>Environmental projects</option>
          <option>Research</option>
          <option>Advocacy</option>
          <option>Event coordination</option>
        </select>
      </div>
      <div class="field"><label for="vf-message">Tell us about yourself (optional)</label><textarea id="vf-message" name="message" rows="4"></textarea></div>
      <p class="form-note">${site.formEndpoints.volunteer ? 'GDGI does not store this submission anywhere except through the form service handling it.' : `Sending opens your email app addressed to ${site.email}. GDGI does not store this submission on our servers.`}</p>
      <button type="submit" class="btn btn-primary">Sign up to volunteer</button>
    </form>
  </div>
` })}
${section({ inner: `
  ${sectionHead({ kicker: 'Careers', title: 'Open roles' })}
  <div class="grid" style="grid-template-columns:1fr;gap:18px" class="mt-lg">
    ${jobs.map((j) => `<div class="card" style="flex-direction:row;align-items:flex-start;gap:20px">
      ${j.photo ? `<div class="card-art" style="width:140px;height:140px;flex:none">${`<img src="${L(`/${j.photo}`)}" alt="" />`}</div>` : ''}
      <div>
      <div class="eyebrow">${j.location} · ${j.type} · ${j.department}</div>
      <h3 style="font-size:20px">${esc(j.title)}</h3>
      <p>${esc(j.summary)}</p>
      <ul class="tag-list">${j.responsibilities.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      ${j.responsibilitiesIncomplete ? `<p style="font-size:13px;font-style:italic;color:var(--ink-faint)">Full job description available from GDGI on request.</p>` : ''}
      <span class="pending">Apply link pending — see README</span>
      </div>
    </div>`).join('')}
  </div>
` })}
${section({ tone: 'brand', inner: `<div class="text-center"><h2 style="font-size:24px">Not sure where you fit?</h2><p style="margin-top:8px;color:rgba(255,255,255,.8)">Tell us about your skills and interests — we'll point you to a pathway.</p><div class="btn-row" style="justify-content:center;margin-top:18px"><a class="btn btn-primary" href="${L('/contact/')}">Contact GDGI</a></div></div>` })}
`,
  }))
}

// ======================================================================
// DONATE
// ======================================================================
const impactAreas = [
  'Empowering Persons with Disabilities with tools, skills, and leadership opportunities',
  'Expanding accessible clean energy access',
  'Restoring the environment through inclusive, community-led projects',
  'Creating economic opportunities in the green sector',
  'Strengthening disability-inclusive climate advocacy and policy',
]

{
  const path = '/donate/'
  const L = (t) => R(path, t)
  write('donate/index.html', page({
    title: 'Donate',
    description: 'Support inclusive climate action. Your contribution equips Persons with Disabilities with the tools, skills, and opportunities to participate — and lead — in the global green transition.',
    path,
    bodyHtml: `
${hero({ path, kicker: 'Support our vision', title: 'Support Inclusive Climate Action. Empower Lives. Transform Communities.', subtitle: 'At GDGI, every contribution fuels a future where sustainability is accessible to all.', variant: 'rays' })}
${section({ tone: 'surface', inner: `${sectionHead({ kicker: 'Where it goes', title: 'Your donation supports' })}<ul class="grid grid-2 mt-lg" style="list-style:none;padding:0;margin:0">${impactAreas.map((a) => `<li class="card" style="padding:18px">${esc(a)}</li>`).join('')}</ul>` })}
${section({ inner: `
  <div class="grid grid-2">
    <img src="${L('/assets/photos/donate-impact.jpg')}" alt="Persons with disabilities participating in a GDGI climate resilience programme" style="width:100%;border-radius:8px;object-fit:cover;max-height:420px" />
    <div>
      <h2 style="font-size:20px">Our commitment</h2>
      <p style="margin-top:10px;color:var(--ink-soft)">${esc(site.funding.intro)}</p>
      <p style="margin-top:10px;color:var(--ink-soft)">GDGI operates on project-based budgeting with regular Board oversight and an annual financial review — every naira is directed toward a specific, accountable initiative.</p>
    </div>
  </div>
` })}
${section({ tone: 'surface', inner: site.paystackUrl ? `
  <div class="callout-dashed text-center">
    <h2 style="font-size:18px">How to give</h2>
    <p style="margin:8px auto 0;max-width:52ch;font-size:15px;color:var(--ink-soft)">Give securely online via Paystack — cards, bank transfer, and USSD accepted.</p>
    <a class="btn btn-primary mt-lg" href="${esc(site.paystackUrl)}" target="_blank" rel="noreferrer">Donate via Paystack</a>
  </div>
` : `
  <div class="callout-dashed">
    <h2 style="font-size:18px">How to give</h2>
    <p style="margin-top:8px;font-size:15px;color:var(--ink-soft)">Online giving via Paystack is being set up — this button will go live as soon as GDGI confirms the payment page. In the meantime, please reach us directly to arrange your gift.</p>
    <a class="btn btn-primary mt-lg" href="mailto:${site.email}?subject=Donation%20enquiry">Contact us to give</a>
  </div>
` })}
`,
  }))
}

// ======================================================================
// CONTACT
// ======================================================================
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`

{
  const path = '/contact/'
  write('contact/index.html', page({
    title: 'Contact',
    description: `Reach GDGI at ${site.address.line1}, ${site.address.line2}, or by phone and email.`,
    path,
    bodyHtml: `
${hero({ path, kicker: 'Get in touch', title: 'Contact Us', variant: 'grid' })}
${section({ tone: 'surface', inner: `
  <div class="grid" style="grid-template-columns:300px 1fr;gap:44px">
    <div style="display:flex;flex-direction:column;gap:22px">
      <div><div class="eyebrow">Address</div><a href="${mapHref}" target="_blank" rel="noreferrer" style="display:block;margin-top:4px">${site.address.line1}<br>${site.address.line2}</a></div>
      <div><div class="eyebrow">Phone</div><ul class="plain-list" style="margin-top:4px">${site.phones.map((p) => `<li><a href="tel:${p.replace(/\s+/g, '')}">${p}</a></li>`).join('')}</ul></div>
      <div><div class="eyebrow">Email</div><a href="mailto:${site.email}" style="display:block;margin-top:4px">${site.email}</a></div>
    </div>
    <div class="card">
      <h2 style="font-size:18px">Send a message</h2>
      <form class="js-backend-form" action="${site.formEndpoints.contact}" method="POST" data-to="${site.email}" data-subject="Website contact form" data-success="Thanks — your message has been sent." style="margin-top:16px">
        <div class="field"><label for="cf-name">Full name</label><input id="cf-name" name="name" type="text" required autocomplete="name" /></div>
        <div class="field"><label for="cf-email">Email address</label><input id="cf-email" name="email" type="email" required autocomplete="email" /></div>
        <div class="field"><label for="cf-message">Message</label><textarea id="cf-message" name="message" required rows="5"></textarea></div>
        <p class="form-note">${site.formEndpoints.contact ? 'GDGI does not store this message anywhere except through the form service handling this submission.' : `Sending opens your email app addressed to ${site.email}. GDGI does not store this message on our servers.`}</p>
        <button type="submit" class="btn btn-primary">Send message</button>
      </form>
    </div>
  </div>
` })}
`,
  }))
}

// ======================================================================
// 404
// ======================================================================
{
  const path = '/404.html'
  const L = (t) => R(path, t)
  write('404.html', page({
    title: 'Page Not Found',
    description: 'This page could not be found.',
    path,
    bodyHtml: `
${section({ size: 'loose', inner: `<div class="text-center">
  <p class="eyebrow">404</p>
  <h1 style="font-size:30px;margin-top:10px">We couldn't find that page</h1>
  <p style="margin:10px auto 0;max-width:44ch;color:var(--ink-soft)">The page you're looking for may have been moved or removed during the site rebuild.</p>
  <div class="btn-row" style="justify-content:center;margin-top:24px"><a class="btn btn-primary" href="${L('/')}">Go home</a><a class="btn btn-outline" href="${L('/contact/')}">Contact us</a></div>
</div>` })}
`,
  }))
}

// ======================================================================
// LEGACY REDIRECT STUBS
// ======================================================================
redirectPage('/about-us/', '/about/')
redirectPage('/our-projects/', '/projects/')
redirectPage('/project-detail/', '/projects/solar-lamp-outreach-schools-learning-centres/')
redirectPage('/event-detail/', '/events/disability-inclusive-solar-installation-training-cohort-2/')
redirectPage('/blog/', '/insights/')
redirectPage('/testimonial/', '/')
for (const p of trustees) redirectPage(`/${p.slug}/`, `/people/${p.slug}/`)

// ======================================================================
// STATIC ASSETS: robots.txt, sitemap.xml
// (assets/styles.css, assets/script.js, assets/logo.png, assets/logo-80.png,
// favicon-32.png and apple-touch-icon.png are hand-maintained real files —
// this script does not touch or regenerate them)
// ======================================================================

writeFileSync(resolve(OUT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${site.domain}/sitemap.xml
`)

const allRoutes = [
  '/', '/about/', '/people/', '/projects/', '/events/', '/insights/', '/get-involved/', '/donate/', '/contact/',
  ...trustees.map((p) => `/people/${p.slug}/`),
  ...projects.map((p) => `/projects/${p.slug}/`),
  ...events.map((e) => `/events/${e.slug}/`),
  ...posts.map((p) => `/insights/${p.slug}/`),
]
writeFileSync(
  resolve(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
    .map((r) => `  <url><loc>${site.domain}${r}</loc></url>`)
    .join('\n')}\n</urlset>\n`
)

console.log(`Generated ${allRoutes.length} content pages + 6 legacy redirect stubs + 404 into ${OUT}`)
