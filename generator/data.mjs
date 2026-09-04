export const site = {
  name: 'Global Disabilities Green Initiative',
  shortName: 'GDGI',
  tagline: 'Bridging Disability Rights & Climate Justice',
  founded: '24 October 2024',
  domain: 'https://globaldisabilitiesgi.com',
  email: 'info@globaldisabilitiesgi.com',
  phones: ['+234 802 253 7699', '+234 701 223 3816', '+234 706 227 3271', '+234 816 866 9998'],
  address: { line1: 'No. 9 Morija Close, Wuse 2', line2: 'Abuja, FCT, Nigeria', mapQuery: 'No 9 Morija Close, Wuse 2, Abuja, FCT, Nigeria' },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/gdginative/' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/1DYWXwNRig/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/global-disabilities-green-initiative-420799353' },
  ],
  // Paystack payment page URL — leave empty until GDGI supplies it. The
  // Donate page shows a real "Donate via Paystack" button once this is
  // set; until then it shows the mailto fallback. No code changes needed
  // beyond pasting the URL here and re-running node generator/build.mjs.
  paystackUrl: '',
  // Backend form endpoints — leave empty until GDGI picks a form/webhook
  // provider (Formspree, Getform, a Zapier/Make catch-hook, etc.) and
  // supplies the submission URL. Each form submits to its endpoint via
  // fetch() once set (see assets/script.js); while empty, forms fall back
  // to composing a mailto: instead, so nothing is ever a dead end. No
  // other code changes needed — paste the URL here and re-run the
  // generator.
  formEndpoints: {
    contact: '',
    volunteer: '',
    summitRegistration: 'https://hook.eu1.make.com/adwff4cvtftk1h9943g9m1gh174hqyk4',
  },
  // A hidden field sent alongside each form's own fields, so the receiving
  // webhook/Make.com scenario can route or filter submissions by source.
  formTags: {
    summitRegistration: 'cot-summit',
  },
  vision: 'We envision a world where disability is central to sustainability, with every person with a disability actively participating and leading in crafting universally accessible sustainable energy solutions, designing environmental and climate initiatives with inclusivity at their core, shaping accessible and inclusive agricultural practices, and fostering a global network where advocacy for disability rights is seamlessly integrated into strategies for environmental health and agricultural innovation.',
  mission: 'To spearhead a transformative global movement that champions disability rights advocacy by delivering accessible technological innovation and sustainable energy solutions, fostering environmental stewardship, driving climate action, and advancing sustainable agriculture for an inclusive future.',
  story: [
    'Founded on October 24, 2024, the Global Disabilities Green Initiative (GDGI) is dedicated to a profound commitment to inclusivity and sustainability. GDGI works to dismantle the barriers that traditionally segregate environmental initiatives from the rights and needs of persons with disabilities.',
    "GDGI's approach is comprehensive, aiming to weave disability rights advocacy into the very fabric of energy solutions, accessible technological innovation, environmental stewardship, climate action, and sustainable agriculture — creating a more equitable, resilient, and inclusive future for all.",
  ],
  objectives: [
    'Develop and deploy accessible renewable energy technologies for Persons with Disabilities.',
    'Expand educational programs teaching inclusive sustainability practices.',
    'Influence global policies through advocacy to ensure inclusivity in sustainability initiatives.',
    'Foster innovations in agriculture that are accessible and sustainable for all.',
    'Establish innovation hubs focused on integrating disability needs with environmental solutions.',
    'Promote the inclusion of disability considerations in climate action plans.',
    'Enhance networks and community engagement to amplify the voices of Persons with Disabilities in sustainability discourse.',
    'Conduct and disseminate research on the impact of inclusive sustainability efforts.',
    'Advocate for accessible employment opportunities in green sectors for persons with disabilities.',
    'Create enduring legacy projects that support long-term advocacy and education in inclusive sustainability.',
  ],
  values: [
    { name: 'Accessibility', body: "We strive to make all aspects of sustainability — energy, agriculture, environment, and climate action — accessible and beneficial for Persons with Disabilities, ensuring no barriers exist in participation or benefit from green initiatives." },
    { name: 'Collaboration', body: 'We foster dynamic collaborations across sectors, cultures, and abilities to innovate, implement, and scale solutions that are both environmentally sustainable and socially inclusive, amplifying our impact.' },
    { name: 'Empowerment', body: 'We empower Persons with Disabilities not just as beneficiaries but as active leaders and changemakers in sustainability, providing them with the tools, education, and platforms needed to drive and shape environmental and social progress.' },
    { name: 'Equity', body: 'We are committed to equity, ensuring that all resources, opportunities, and benefits from sustainable development are distributed fairly, recognizing and addressing the unique needs of Persons with Disabilities within environmental contexts.' },
    { name: 'Innovation', body: 'We champion innovation that transcends traditional boundaries, developing technologies and practices that inherently consider disability, thereby creating solutions that are universally beneficial and promote sustainability.' },
    { name: 'Sustainability', body: 'Our commitment to sustainability goes beyond reducing environmental impact; it includes ensuring that our initiatives contribute to a future where Persons with Disabilities can thrive, promoting practices that safeguard ecosystems for all generations.' },
    { name: 'Transparency', body: 'We uphold transparency in our operations, decision-making, and partnerships, ensuring that our actions are accountable to the communities we serve, fostering trust and a culture of inclusivity and integrity in all we do.' },
  ],
  funding: {
    intro: 'GDGI employs a diverse and strategic funding model that emphasizes transparency, accountability, and sustainability, ensuring the continuation of our mission to empower persons with disabilities through inclusive, sustainable initiatives.',
    sources: [
      'Contributions from Trustees — a foundational element of our funding, reflecting the Board of Trustees’ personal commitment to our mission.',
      'Individual Donations — support from a broader community of people who share our vision.',
      'Funded Projects and Grants from Donor Agencies — secured from national and international donors and earmarked for specific initiatives.',
    ],
    practices: [
      'Zero Operating Budget — GDGI does not maintain a fixed operational budget; funds from Trustees and individual donations cover immediate operational costs, reducing overhead.',
      'Project-Based Budgeting — each project is budgeted individually, with financial plans reviewed, approved, and monitored by the Board.',
      'Financial Oversight — the Board of Trustees and designated financial committees review all financial decisions.',
      'Annual Financial Review — an annual examination of financial practices to assess efficiency and impact.',
    ],
  },
}

export const people = [
  { slug: 'dr-angelina-ugben', name: 'Angelina Ugben', role: 'Chairperson, Board of Trustees · Founder & President', group: 'trustee',
    photo: 'assets/photos/angelina-ugben.jpg',
    bio: [
      'Angelina Ugben is a distinguished leader in disability rights advocacy, gender equality, and sustainable development. As the founder, Chair, and CEO of the Inclusive Skills Development Initiative (ISDI), Pearls International Women With Special Abilities, and Angel’s Enterprise Development, she has shaped these organizations since their inception. Her academic background includes a Bachelor of Science in Economics Education from Nasarawa State University and a Master of Science in Educational Administration and Planning from the National Open University of Nigeria.',
      'She has over a decade of experience advancing disability rights, with a particular emphasis on empowering women and girls. Her career highlights include her position as National Social Welfare Secretary for the Joint National Association of Persons with Disabilities (JONAPWD), where she has significantly influenced national policy to be more inclusive.',
      'Her affiliations span several influential organizations, including the School of Governance and Politics (SOGP), the Institute for Economics and Peace (IEP), Women in Politics Forum (WIPF), Women in Renewable Energy Association (WIRE-A), and Women Who Win Africa (WWWA). She represented Nigeria at the Game of the Future in Kazan, Russia, in 2024, and her work has been recognized with the Challenges Champion and Heroes Award (2024) and a place among the 100 Most Influential Women in Africa by Women Who Win Africa.',
    ] },
  { slug: 'dr-sunny-akpoyibo', name: 'Dr. Sunny Akpoyibo', role: 'Member, Board of Trustees', group: 'trustee',
    photo: 'assets/photos/sunny-akpoyibo.jpg',
    bio: [
      'Dr. Sunny Akpoyibo (PhD) is an esteemed leader in sustainable business practices and renewable energy. As the founder, Chairman, and CEO of the ASTEVEN Group of Companies, headquartered in Eppinghofen-Mülheim, Germany, with multiple branches in Nigeria, Dr. Akpoyibo has driven the company since its inception in 2010. His academic credentials include a Doctorate in Business Management.',
      'He has over 15 years of experience as a consultant specializing in renewable energy and Clean Development Mechanism (CDM) projects, and previously served as Managing Director of GSA Dienstleistung GmbH in Gelsenkirchen, Germany (2005–2007) and as a member of the Board of Trustees at FX Global Limited (UK and Germany, 2005–2010).',
      'He has provided consultancy in solar energy to Chevron Nigeria Limited’s Community Development Projects department in Warri, Delta State, and founded the Akpoyibo Green Foundation, a charity supporting communities in adopting sustainable practices.',
    ] },
  { slug: 'chief-dr-anita-nana-okuribido', name: 'Chief Dr. Anita Nana Okuribido', role: 'Secretary, Board of Trustees', group: 'trustee',
    photo: 'assets/photos/anita-nana-okuribido.jpg',
    bio: [
      'Chief Dr. Mrs. Anita Nana Okuribido is a leader in Nigeria’s renewable energy and green economy sectors. She is the founder and Chairman of the Smiling Simon Greenbuild Foundation, President of the Women in Renewable Energy Association (WIRE-A), and Chairman of the Women in Sustainable Power Africa Network (WISPANet).',
      'She holds a Bachelor of Science in Agricultural Economics from Obafemi Awolowo University and brings over three decades of experience in agricultural development, renewable energy, and sustainable economic growth. She founded the Women Green Energy Institute, Nigeria, dedicated to enhancing skills and deployment of green energy technologies among women.',
      'Her contributions have earned the Pan-African Community Leadership Award at the 2020 Africa Women in Energy conference, and she is a regularly invited speaker at international, regional, and local forums on renewable energy and sustainability.',
    ] },
  { slug: 'zainab-yusuf', name: 'Zainab Yusuf', role: 'Member, Board of Trustees', group: 'trustee', bioIncomplete: true,
    photo: 'assets/photos/zainab-yusuf.jpg',
    bio: ['Zainab Yusuf is a trailblazing advocate for disability inclusion and a proud alumna of Library and Information Science. Driven by her faith and passion for humanity, she champions accessibility and equality for persons with disabilities. As a person with albinism, Zainab embodies resilience and determination.'] },
  { slug: 'dr-paul-abolo', name: 'Dr. Paul Abolo', role: 'Member, Board of Trustees', group: 'trustee',
    photo: 'assets/photos/paul-abolo.jpg',
    bio: [
      'Dr. Paul Abolo is a distinguished figure in environmental sustainability, climate finance, and social development. As Executive Director at Empath and President of Ecologistics Integrated Services, a firm specializing in climate change investment and sustainable development, Dr. Abolo has significantly influenced global strategies in these domains. He convenes both the Nigeria Climate Change Investment Forum (NCCIF) and the Africa Climate Change Investment Forum (ACCIF).',
      'His expertise extends to Executive Director of Connect Earth Initiatives and membership of the Climate Solutions Advancement Network (Climate SAN). He has served as a Safeguard Specialist Consultant for the World Bank on the Nigeria Green Bond and as a Country Expert for Stantec on an African Development Bank project on Nationally Determined Contributions (NDCs), and led the accreditation of NIRSAL Plc. as a Direct Access Entity for the Green Climate Fund.',
      'His academic background spans Environmental Studies, Business Management, Finance, and a Doctor of Management degree specializing in Environmental and Social Sustainability, alongside strategic finance training from Harvard Business School and an MBA. He pioneered the Nigerian Pavilion at COP24 in Katowice, Poland, and his contributions include the Nigeria Climate Finance Readiness Plan and the Abuja Declaration 2016.',
    ] },
  { slug: 'adama-ojochogwu-innocent-esq', name: 'Adama, Ojochogwu Innocent, Esq.', role: 'Member, Board of Trustees', group: 'trustee', bioIncomplete: true,
    photo: 'assets/photos/adama-ojochogwu-innocent.jpg',
    bio: ['Adama, Ojochogwu Innocent, Esq. graduated from the prestigious Ahmadu Bello University (ABU), Zaria, Nigeria. He proceeded to the Nigerian Law School, Lagos Campus, and was called to the Nigerian Bar as a Barrister and Solicitor of the Supreme Court of Nigeria after a successful Bar Final Examination.'] },
  { slug: 'echiche-kenneth-adinya', name: 'Echiche Kenneth Adinya', role: 'Member, Board of Trustees', group: 'trustee', bioIncomplete: true,
    photo: 'assets/photos/echiche-kenneth-adinya.jpg',
    bio: ['Kenneth Adinya Echiche is a visually impaired person with a vast experience in disability inclusion and advocacy. He is a two-time chairman of persons with disabilities in Cross River State, and a Mass Communication graduate from the University of Jos, Nigeria. He is a former presenter with CRBC Radio in Cross River.'] },
  { slug: 'agbo-christian-obiora', name: 'Agbo Christian Obiora', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/agbo-christian-obiora.jpg' },
  { slug: 'chidi-magnus-onuoha', name: 'Prof. Chidi Magnus Onuoha', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/chidi-magnus-onuoha.jpg' },
  { slug: 'segun-adaju', name: 'Dr. Segun Adaju', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/segun-adaju.jpg' },
  { slug: 'amina-batagarawa', name: 'Prof. Amina Batagarawa', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/amina-batagarawa.jpg' },
  { slug: 'akugbe-iyam', name: 'AVM Akugbe Iyam (Rtd)', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/akugbe-iyam.jpg' },
  { slug: 'uzodinma-adirieje', name: 'Dr. Uzodinma Adirieje', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/uzodinma-adirieje.jpg' },
  { slug: 'donald-unanka', name: 'Donald Unanka', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/donald-unanka.jpg' },
  { slug: 'fauziya-muhammed-lukman', name: 'Fauziya Muhammed Lukman', role: 'Advisory Board Member', group: 'advisory', photo: 'assets/photos/fauziya-muhammed-lukman.jpg' },
]

export const projects = [
  { slug: 'solar-lamp-outreach-schools-learning-centres', title: 'Solar Lamp Outreach for Schools & Learning Centres', status: 'completed', date: '24 June 2025', location: 'Bwari & Municipal Area Council, Abuja',
    photo: 'assets/photos/solar-lamp-outreach.jpg',
    summary: 'Over 150 solar-powered reading lamps delivered to students at two Abuja schools, improving study conditions and building climate awareness.',
    partners: ['Smiling Simon Greenbuild Foundation', 'Light Up Africa'], people: ['dr-angelina-ugben', 'chief-dr-anita-nana-okuribido'],
    body: [
      'On 24 June 2025 in Abuja, GDGI, in partnership with the Smiling Simon Greenbuild Foundation through Light Up Africa, delivered over 150 solar-powered reading lamps to students at Child Care Trust School (Bwari) and GSS Piwoyi (Municipal Area Council).',
      'The distribution was led by GDGI President Angelina Ugben and supported by Chief Dr. Anita Nana Okuribido, and forms part of GDGI’s wider Energy Solutions focus area — extending clean, reliable light to students so that lack of electricity is no longer a barrier to studying after dark.',
    ] },
  { slug: 'disability-inclusive-solar-training-deployment-program', title: 'Disability-Inclusive Solar Training & Deployment Program', status: 'completed',
    photo: 'assets/photos/solar-training.jpg',
    summary: 'Hands-on solar PV training for persons with disabilities, pairing new technical skills with starter tools and installations for low-income households.',
    partners: ['ASTEVEN Energy Institute'],
    body: [
      'This program equips persons with disabilities with practical solar photovoltaic installation and maintenance skills, then follows through with starter tools and completed installations for low-income households — turning training into visible, working energy access.',
      'It runs alongside GDGI’s Cohort 2 solar installation training (see Events) and sits within the organization’s Energy Solutions and Green Jobs focus areas: building a pipeline of PWD-led installers, not just recipients, of the clean-energy transition.',
    ] },
  { slug: 'community-urban-greening-tree-restoration-initiative', title: 'Community Urban Greening & Tree Restoration Initiative', status: 'completed',
    photo: 'assets/photos/tree-planting.jpg',
    summary: 'More than 500 drought-resistant trees planted across vulnerable communities to restore green cover and build local climate resilience.',
    body: [
      'GDGI’s urban greening work has planted more than 500 drought-resistant trees across communities identified as climate-vulnerable, restoring green cover while directly involving persons with disabilities in the planning and planting process.',
      'The initiative reflects GDGI’s Environmental Stewardship focus area — inclusive, community-based conservation that treats accessibility as a design requirement from the outset, not an afterthought.',
    ] },
]

export const events = [
  { slug: 'national-summit-disability-inclusive-climate-action', title: 'National Summit on Disability-Inclusive Climate Action', state: 'upcoming', dateDisplay: '14–15 October 2026',
    location: 'Shehu Musa Yar’Adua Centre, Abuja, Nigeria · with international virtual participation', featured: true,
    // Event artwork is being designed separately — leave `photo` unset so
    // this page keeps the brand SVG placeholder until it's ready, then add
    // e.g. photo: 'assets/photos/summit-2026.jpg' and re-run the generator.
    summary: '"From Belém Commitments to COP31 Implementation" — 200 physical delegates and 2,000 virtual participants from 20+ countries, co-hosted with the Federal Ministry of Environment and the National Council on Climate Change, with confirmed sponsorship from UNDP, ILO and Oxfam Nigeria.',
    cta: { label: 'Partner with us before 11 September', href: '/contact/' },
    // Pre-summit webinars still ahead of the October summit. Source: the
    // National Summit proposal's four-webinar series (W1 20 Aug, W2 3 Sep,
    // W3 17 Sep, W4 1 Oct 2026) — these are the two remaining at time of
    // writing.
    webinars: [
      { label: 'Webinar 3', dateDisplay: 'Thursday, 17 September 2026', title: 'Loss, Damage and Community Resilience: Centring Persons with Disabilities in Nigeria\'s Adaptation and Disaster Response', partner: 'Oxfam Nigeria, with SARPIC' },
      { label: 'Webinar 4', dateDisplay: 'Thursday, 1 October 2026', title: 'Governing Inclusive Climate Action: The Climate Change Act 2021, Actions for Climate Empowerment and the Disability Act 2018 in Practice', partner: 'National Council on Climate Change, with NCPWD and the House Committees on Disability Matters and on Climate Change' },
    ],
    // Attendee registration form fields — data-driven so a new field GDGI
    // asks for later is a one-line addition here, not a template change.
    // type: 'text' | 'email' | 'tel' | 'select' | 'textarea'; options for 'select'.
    registrationFields: [
      { name: 'full_name', label: 'Full name', type: 'text', required: true },
      { name: 'email', label: 'Email address', type: 'email', required: true },
      { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Female', 'Male', 'Prefer not to say'] },
      { name: 'location', label: 'Location (city, country)', type: 'text', required: true },
      { name: 'attendance_mode', label: 'How do you plan to attend?', type: 'select', required: true, options: ['In person', 'Virtually'] },
      { name: 'designation', label: 'Designation / role', type: 'text', required: true },
      { name: 'representing_org', label: 'Are you representing an organisation?', type: 'select', required: true, options: ['Yes', 'No'] },
      { name: 'organisation_name', label: 'Organisation name (if applicable)', type: 'text', required: false },
      { name: 'has_disability', label: 'Do you identify as a person with a disability?', type: 'select', required: true, options: ['Yes', 'No', 'Prefer not to say'] },
      { name: 'disability_specify', label: 'Please specify your disability', type: 'text', required: false },
      { name: 'accessibility_needs', label: 'Any accessibility requirements we should prepare for? (optional)', type: 'textarea', required: false },
    ],
    // Speakers — none supplied yet; GDGI's client will send 2 international
    // + 2 national speakers with bios. Add entries here in the shape below
    // and re-run the generator; the page shows a "to be announced" notice
    // until at least one exists.
    // { name: '', role: '', type: 'international' | 'national', bio: '', photo: 'assets/photos/…' }
    speakers: [],
    body: [
      'GDGI proposes the inaugural National Summit on Disability-Inclusive Climate Action at the Shehu Musa Yar’Adua Centre, Abuja, on 14–15 October 2026. The summit is co-hosted by the Federal Ministry of Environment, the Office of the Senior Special Assistant to the President on Climate Technology and Operations, and the National Council on Climate Change (NCCC), with financial sponsorship confirmed from the Nigeria country offices of UNDP, ILO, and Oxfam.',
      'Nigeria is home to an estimated 19 million persons with disabilities who face two to four times higher climate vulnerability than the general population, yet only 30% of national climate plans worldwide contain disability-specific measures. The summit maps every session directly onto Nigeria’s existing climate governance architecture — the Climate Change Act 2021, the National Climate Change Policy 2021–2030, NDC 3.0, the Energy Transition Plan, and the Just Transition Guidelines and Action Plan — so its outcomes plug directly into national policy rather than sitting alongside it.',
      'The primary outcome is the Abuja Declaration on Disability-Inclusive Climate Action: ten actionable national recommendations, technically validated by the NCCC, jointly signed by GDGI and its co-hosts, and transmitted to the COP31 Presidency and the UNFCCC Secretariat.',
      'The summit runs five thematic policy dialogue tracks — Climate Finance & Green Investment, PWD-Led Climate Adaptation & Community Resilience, Loss & Damage, Inclusive Climate Education & Technology, and Green Jobs & Entrepreneurship — each chaired by a named partner, alongside four pre-summit webinars (August–October 2026) and four peer-reviewed research papers.',
      'The Ask: GDGI is seeking USD 87,000 (NGN 139,200,000) in cash sponsorship and USD 38,000 (NGN 60,800,000) in in-kind support against a fully itemised USD 125,000 budget — every line, from accessibility services to virtual-platform interpretation, is individually sponsorable. Sponsorship and registration close 11 September 2026.',
    ] },
  { slug: 'disability-inclusive-solar-installation-training-cohort-2', title: 'Disability-Inclusive Solar Installation Training (Cohort 2 Launch)', state: 'past',
    dateDisplay: 'July 2025 (date to be reconfirmed with GDGI — see README)', location: 'Abuja, Nigeria',
    photo: 'assets/photos/solar-training.jpg',
    summary: 'A two-week, hands-on program equipping persons with disabilities with technical knowledge and skills in solar PV installation, maintenance, and renewable-energy entrepreneurship.',
    body: [
      'This flagship capacity-building program equips Persons with Disabilities with technical knowledge and hands-on skills in solar PV installation, maintenance, and renewable energy entrepreneurship, in partnership with the ASTEVEN Energy Institute.',
      'Target group: Persons with Disabilities (PWDs). Duration: two weeks. The program covers practical solar installation and wiring, safety and troubleshooting, solar business opportunities, team projects, certification assessments, and mentorship — designed to open accessible pathways into the fast-growing renewable energy sector.',
    ] },
  { slug: 'pre-launch-lecture-disability-climate-change', title: 'Pre-Launch Lecture: "Disability & Climate Change — The Untapped Connection"', state: 'past',
    dateDisplay: '18 June 2025', location: 'Virtual, via Zoom',
    photo: 'assets/photos/pre-launch-lecture-flyer.jpg',
    summary: 'Ahead of GDGI\'s official launch, a virtual lecture bringing together disability-climate advocates from Nigeria, the USA, and Cameroon to make the case that disability inclusion is central to climate action.',
    body: [
      'On 18 June 2025, GDGI held a Pre-Launch Lecture — "Disability & Climate Change: The Untapped Connection" — over Zoom, ahead of its official launch on 26 June 2025 at the National Assembly Complex, Abuja.',
      'The lecture featured Angelina Ugben, Founder & President of GDGI (Nigeria, host); Dr. Sefakor G.M.A. Komabu-Pomeyie, Founder of EEPD Africa (USA, lecturer); and Nogning Armelle A., Founder of CCCWGD (Cameroon, special guest) — framing the gathering, in GDGI\'s own words, as "the dawn of a new era where persons with disabilities lead climate action."',
    ] },
]

export const posts = [
  { slug: 'gdgi-launches-national-assembly-complex-abuja', title: 'GDGI Officially Launches at the National Assembly Complex, Abuja', isoDate: '2025-06-26', dateDisplay: '26 June 2025',
    photo: 'assets/photos/national-assembly-launch.jpg',
    summary: 'Disability leaders, government representatives, royal representatives, and country directors from ILO, WHO and UNDP gathered for GDGI’s official launch and a panel on disability-led climate action.',
    body: [
      'The Global Disabilities Green Initiative officially launched on 26 June 2025 at the National Assembly Complex, Abuja, bringing together disability leaders, government representatives, royal representatives, and country directors from the ILO, WHO and UNDP.',
      'The launch featured panel discussions on disability-led climate action, setting out GDGI’s intent to place persons with disabilities at the center of Nigeria’s renewable energy, climate policy, and sustainable agriculture agendas — not as beneficiaries alone, but as leaders shaping the transition.',
    ] },
  { slug: 'advocacy-visit-un-house-abuja', title: 'Advocacy Visit to the UN House, Abuja', isoDate: '2025-03-04', dateDisplay: '4 March 2025',
    summary: 'GDGI President Angelina Ugben led a delegation to the UN House in Abuja, welcomed by Resident Coordinator Mohamed Malick Fall, opening pathways for collaboration with the United Nations.',
    body: [
      'On 4 March 2025, GDGI took a step toward global impact when President Angelina Ugben led a delegation to the UN House in Abuja, Nigeria, welcomed by Mr. Mohamed Malick Fall, UN Resident Coordinator and Humanitarian Coordinator, and his team.',
      'The visit reaffirmed GDGI’s commitment to intertwining disability rights with environmental sustainability, and illuminated pathways for collaboration with the United Nations on joint initiatives that amplify GDGI’s mission.',
    ] },
  { slug: 'cren-2025-agm', title: "Participating in CREN's 2025 AGM", isoDate: '2025-02-28', dateDisplay: '28 February 2025',
    summary: 'GDGI joined the Council for Renewable Energy Nigeria (CREN) at its Annual General Meeting in Abuja, deepening a shared vision for disability inclusion in Nigeria’s renewable energy future.',
    body: [
      'On 28 February 2025, GDGI marked a milestone by joining the Council for Renewable Energy Nigeria (CREN) at its Annual General Meeting, hosted at the Nicon Luxury Hotel in Abuja.',
      'The participation deepened GDGI’s partnership with CREN and its shared vision to weave Persons with Disabilities into the fabric of Nigeria’s renewable energy future, alongside trailblazing stakeholders and experts from across the sector.',
    ] },
  { slug: 'partnership-house-committee-disability-matters', title: 'Partnership with the Office of the Chairman, House Committee on Disability Matters', isoDate: '2025-03-19', dateDisplay: '19 March 2025',
    photo: 'assets/photos/house-committee-partnership.jpg',
    summary: 'GDGI President Angelina Ugben met with Rt. Hon. Bashiru Dawodu Anyila to strengthen partnership and formally receive a letter of collaboration on merging disability inclusion with climate action.',
    body: [
      'On 19 March 2025, GDGI President Angelina Ugben led a team to meet with Rt. Hon. Bashiru Dawodu Anyila, Chairman of the House Committee on Disability Matters, to strengthen GDGI’s partnership with the Committee.',
      'During the meeting, the Chairman presented a letter of collaboration to Mrs. Ugben and her team — a milestone in merging disability inclusion into climate action — with discussions centered on strategies to empower persons with disabilities in climate action and address the unique challenges this community faces.',
    ] },
  { slug: 'visit-ecowas-commission-abuja', title: 'Visit to ECOWAS Commission, Abuja', isoDate: '2025-04-10', dateDisplay: '10 April 2025',
    summary: 'GDGI, alongside partners ASTEVEN Group and WAANSA, met the ECOWAS Commission to explore partnership opportunities integrating disability inclusion into regional green-environment policy.',
    body: [
      'On 10 April 2025, GDGI President Angelina Ugben led a delegation of GDGI’s partners — ASTEVEN Group and WAANSA — to the ECOWAS Commission Annex Office in Abuja to explore partnership opportunities.',
      'Receiving the delegation, Dr. Alves D’Almada Fernando Jorge, Head of the Division of Social Affairs at the ECOWAS Commission, emphasized the need to integrate the disability community into policies that enhance green environment and promote sustainable agricultural techniques for food security in the sub-region, and pledged the Commission’s support for GDGI’s mission.',
    ] },
  { slug: 'national-validation-workshop-just-transition-guidelines', title: 'National Validation Workshop: Nigeria\'s Just Transition Guidelines and Action Plan', isoDate: '2025-10-06', dateDisplay: '6–7 October 2025',
    photo: 'assets/photos/jtgap-workshop.jpg',
    summary: 'GDGI joined the National Council on Climate Change Secretariat, in collaboration with ILO, UNIDO and UNDP, to validate Nigeria\'s Just Transition Guidelines and Action Plan (JT-GAP) — the framework GDGI helped shape with disability provisions in 2025.',
    body: [
      'On 6–7 October 2025, GDGI took part in the National Council on Climate Change Secretariat\'s validation workshop for Nigeria\'s Just Transition Guidelines and Action Plan (JT-GAP), held in collaboration with the International Labour Organization (ILO), UNIDO, and the UN Development Programme (UNDP).',
      'GDGI contributed disability provisions to the JT-GAP during 2025, and the National Summit on Disability-Inclusive Climate Action (14–15 October 2026) will track implementation of those provisions and generate evidence for the framework\'s next review cycle.',
    ] },
]

export const jobs = [
  { slug: 'communications-media-assistant', title: 'Communications & Media Assistant', location: 'Remote / Hybrid', type: 'Full-time', department: 'Media & Communications',
    photo: 'assets/photos/job-communications.jpg',
    summary: 'Drive GDGI’s storytelling through social media, digital campaigns, newsletters, and visual content that highlight our impact.',
    responsibilitiesIncomplete: true,
    responsibilities: ['Create engaging content for social media and the website.', 'Cover events and produce human-interest stories.', 'Assist with graphics, short videos, and advocacy materials.'] },
]

// "Moments of Impact" gallery on the Projects page — candid photos from
// GDGI's advocacy engagements that don't each carry a full dated writeup.
export const gallery = [
  { src: 'assets/photos/gallery-1.jpg', alt: 'GDGI representatives visiting a government office in Abuja' },
  { src: 'assets/photos/gallery-2.jpg', alt: 'GDGI at a stakeholder roundtable discussion' },
  { src: 'assets/photos/gallery-3.jpg', alt: 'GDGI delegates at a National Council on Climate Change workshop' },
  { src: 'assets/photos/gallery-4.jpg', alt: 'GDGI delegation on stage at the Just Transition Guidelines validation workshop' },
  { src: 'assets/photos/gallery-5.jpg', alt: 'GDGI representatives at a National Council on Climate Change event' },
  { src: 'assets/photos/gallery-6.jpg', alt: 'GDGI group photo at a National Council on Climate Change event' },
  { src: 'assets/photos/gallery-7.jpg', alt: 'A GDGI advocate in conversation with a healthcare professional' },
  { src: 'assets/photos/gallery-8.jpg', alt: 'GDGI representatives at a national climate change project meeting' },
  { src: 'assets/photos/gallery-9.jpg', alt: 'GDGI at the Youth Creative Conference, with the African Union and Federal Ministry of Youth Development' },
  { src: 'assets/photos/gallery-10.jpg', alt: 'GDGI representatives at an international roundtable meeting' },
]
