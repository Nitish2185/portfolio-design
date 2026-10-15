// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Replace the lorem ipsum
//  placeholders with your real details — the UI updates itself.
// ─────────────────────────────────────────────────────────────

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'

export const profile = {
  name: 'Priyanshu',
  fullName: 'Priyanshu Tripathi',
  handle: 'priyanshu',
  role: 'Full-Stack Developer',
  location: 'India',
  email: 'prish.3d@gmail.com',
  phone: '+91-8957208526',
  resume: '/resume.pdf', // replace public/resume.pdf with your own
  openToWork: true,
  headline: ['Hi, I’m Priyanshu.', 'I build for the web.'],
  intro:
    'MCA student at ABES Engineering College building REST APIs and database-driven apps with Node.js, Express, MongoDB and React — with a soft spot for AI and the cloud.',
  tagline: ['learn', 'build', 'ship'],
  statement:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus — posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo, in a new era of building on the web.',
  about: {
    title: 'Where I design, build and ship.',
    body: LOREM + ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    points: [
      { icon: 'bot', title: 'Lorem-first', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { icon: 'globe', title: 'Based in Lorem', text: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
      { icon: 'seal', title: 'Open to work', text: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
    ],
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/Priyanshu2068', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyanshu2068/', icon: 'linkedin' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/priyanshu2068/', icon: 'leetcode' },
  ],
}

export const skills = [
  { name: 'Lorem', level: 92 },
  { name: 'Ipsum', level: 84 },
  { name: 'Dolor', level: 78 },
  { name: 'Sit', level: 70 },
  { name: 'Amet', level: 88 },
  { name: 'Elit', level: 64 },
  { name: 'Sed', level: 74 },
]

export const toolkit = ['Lorem', 'Ipsum', 'Dolor', 'Sit Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Tempor', 'Magna', 'Aliqua']

export const experience = [
  {
    role: 'Lorem Ipsum Engineer',
    company: 'Lorem Corp',
    period: '2025 — Present',
    location: 'Remote',
    points: [LOREM, 'Duis aute irure dolor in reprehenderit in voluptate velit esse.'],
    tags: ['Lorem', 'Ipsum', 'Dolor'],
  },
  {
    role: 'Dolor Sit Developer',
    company: 'Ipsum Labs',
    period: '2024 — 2025',
    location: 'Lorem City',
    points: [LOREM, 'Excepteur sint occaecat cupidatat non proident.'],
    tags: ['Amet', 'Elit'],
  },
  {
    role: 'Consectetur Intern',
    company: 'Adipiscing Studio',
    period: '2023 — 2024',
    location: 'Ipsum Town',
    points: [LOREM],
    tags: ['Sed', 'Tempor'],
  },
  {
    role: 'B.Lorem in Ipsum Science',
    company: 'University of Lorem',
    period: '2020 — 2024',
    location: 'Education',
    points: ['Lorem ipsum dolor sit amet — CGPA 0.0 / 10.'],
    tags: ['Education'],
  },
]

// Project `art` picks one of the animated card illustrations: terminal | share | comment | review
export const projects = [
  {
    title: 'Lorem Ipsum App',
    blurb: 'Ship straight from idea to production. ' + LOREM,
    tech: ['React', 'Node', 'Lorem'],
    github: 'https://github.com/Nitish2185',
    live: '#',
    art: 'terminal',
  },
  {
    title: 'Dolor Dashboard',
    blurb: 'Effortless analytics. ' + LOREM,
    tech: ['Ipsum', 'Dolor'],
    github: 'https://github.com/Nitish2185',
    live: '#',
    art: 'share',
  },
  {
    title: 'Sit Amet Chat',
    blurb: 'Inline, real-time conversations. ' + LOREM,
    tech: ['Sit', 'Amet', 'Elit'],
    github: 'https://github.com/Nitish2185',
    live: '#',
    art: 'comment',
  },
  {
    title: 'Consectetur Bot',
    blurb: 'A built-in reviewer that never sleeps. ' + LOREM,
    tech: ['Consectetur', 'AI'],
    github: 'https://github.com/Nitish2185',
    live: '#',
    art: 'review',
  },
]

export const certifications = [
  { title: 'Lorem Ipsum Certified', issuer: 'Lorem Academy', date: '2026', id: 'LOREM-0001', url: '#' },
  { title: 'Dolor Sit Professional', issuer: 'Ipsum Institute', date: '2025', id: 'IPSUM-0002', url: '#' },
  { title: 'Amet Cloud Associate', issuer: 'Dolor Cloud', date: '2025', id: 'DOLOR-0003', url: '#' },
  { title: 'Consectetur Fundamentals', issuer: 'Elit Foundation', date: '2024', id: 'ELIT-0004', url: '#' },
  { title: 'Adipiscing Specialist', issuer: 'Tempor Org', date: '2024', id: 'TEMP-0005', url: '#' },
  { title: 'Sed Do Practitioner', issuer: 'Magna University', date: '2023', id: 'MAGN-0006', url: '#' },
]

export const faqs = [
  { q: 'Are you open to new opportunities?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'What kind of work do you do?', a: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { q: 'What is your tech stack?', a: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { q: 'Do you take freelance projects?', a: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { q: 'Where are you based?', a: 'Lorem ipsum dolor sit amet. Remote-friendly across time zones, consectetur adipiscing elit.' },
  { q: 'How do I reach you fastest?', a: 'Use the contact form below or email directly — lorem ipsum, I usually reply within a day.' },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'faq', label: 'FAQs' },
]

// Hero storyboard copy (the flipping card at the top of the page)
export const story = {
  documents: ['about.sh', 'projects.html', 'resume.pdf'],
  boot: [
    '[ok] booting nitish.dev',
    '[ok] loading profile',
    '[ok] 0 errors · ready',
  ],
  prompt: 'whoami --verbose',
  fetch: [
    '> name      [Nitish]',
    '> role      [' + profile.role + ']',
    '> based in  [' + profile.location + ']',
    '> status    [open to work]',
  ],
  share: { placeholder: 'Add email to share…', typed: 'hello@lorem.com', button: 'Send', done: 'Sent ✓' },
  composer: 'Make this resume hire-ready',
  prdTitle: 'Resume — draft v1',
  prdRewritten: 'Resume — ' + profile.role,
  thread: [
    { who: 'You', text: 'Make this resume hire-ready' },
    { who: 'Nitish’s agent', text: 'On it — tightening the title and impact lines.', bot: true },
    { who: 'Nitish’s agent', text: 'Done. Title updated ✓', bot: true },
  ],
}
