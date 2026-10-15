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

export const skillGroups = [
  { name: 'Languages', items: ['C++', 'HTML/CSS', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL'] },
  { name: 'Frameworks', items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap'] },
  { name: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { name: 'Cloud', items: ['Docker', 'Amazon EC2', 'S3', 'CloudFront', 'Redshift', 'IAM', 'ELB', 'Route 53', 'RDS', 'DynamoDB'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'Postman'] },
  { name: 'Concepts', items: ['REST APIs', 'DBMS', 'OOP', 'Data Structures'] },
]

// Hero chart: bar height = number of tools in each group (relative to the largest)
const maxGroup = Math.max(...skillGroups.map((g) => g.items.length))
export const skills = skillGroups.map((g) => ({ name: g.name, level: Math.round((g.items.length / maxGroup) * 92) }))

export const toolkit = skillGroups.flatMap((g) => g.items)

export const education = [
  {
    title: 'Master of Computer Applications (MCA)',
    school: 'ABES Engineering College',
    period: '2025 — Present',
    score: '90.45%',
    points: ['Building full-stack and AI projects alongside coursework in cloud computing, databases and software engineering.'],
    tags: ['Cloud', 'DBMS', 'Full-stack'],
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    school: 'I.I.M.T College of Management',
    period: '2021 — 2024',
    score: '75.02%',
    points: ['Foundations in programming, data structures, OOP and database management.'],
    tags: ['C++', 'Java', 'SQL'],
  },
  {
    title: 'Intermediate (Class 12)',
    school: 'Devasthaly Vidyapeeth',
    period: '2019 — 2020',
    score: '68.02%',
    points: [],
    tags: [],
  },
  {
    title: 'High School (Class 10)',
    school: 'Devasthaly Vidyapeeth',
    period: '2017 — 2018',
    score: '77.33%',
    points: [],
    tags: [],
  },
]

// Project `art` picks one of the animated card illustrations: terminal | share | comment | review | chart
// github / live can be null — the button is hidden then.
export const projects = [
  {
    title: 'AI Personal Finance Advisor',
    blurb:
      'AI advisor that extracts financial data from natural language and gives savings and investment recommendations through a modular multi-agent workflow.',
    highlights: [
      '5 specialised agents: financial calculation, market analysis, savings, investment and consolidated reporting',
      'Planner Agent orchestrates the workflow dynamically for personalised analysis',
      'Live market data via yFinance',
    ],
    tech: ['Python', 'LangChain', 'Gemini Flash API', 'yFinance'],
    github: null,
    live: null,
    art: 'review',
  },
  {
    title: 'Webhook Manager',
    blurb:
      'Centralised platform to register webhooks, ingest events through token-based endpoints, monitor deliveries and replay failed events.',
    highlights: [
      '9 RESTful API endpoints with JWT authentication',
      'Mongoose models for users, webhook configs and event payloads',
      'React dashboard for inspecting, monitoring and replaying events',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React', 'JWT'],
    github: 'https://github.com/Priyanshu2068/Webhook-Manager',
    live: null,
    art: 'terminal',
  },
  {
    title: 'Prepare.ai',
    blurb:
      'Full-stack interview-prep app: subject and topic-wise MCQ practice, Gemini-generated quizzes and feedback, and progress analytics.',
    highlights: [
      'JWT auth, saved attempts and a dashboard of score trends, strong and weak topics',
      'Gemini-powered quiz generation with a static fallback question bank',
      'Admin panel for users, subjects and questions',
    ],
    tech: ['Next.js', 'React', 'Express', 'MongoDB', 'Gemini', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/Priyanshu2068/Prepare-Ai',
    live: 'https://prepare-ai-gt2d.vercel.app',
    art: 'comment',
  },
  {
    title: 'Voyager',
    blurb:
      'MERN travel platform for booking hotels, tours, restaurants, vehicles, flights and trains — with real-time chat and maps.',
    highlights: [
      'Reservation flows across hotels, tours, restaurants, vehicles, flights and trains',
      'Real-time chat with Socket.io and email notifications with Nodemailer',
      'Leaflet maps, Material UI dashboards and PDF reports',
    ],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'Material UI', 'Leaflet'],
    github: 'https://github.com/Priyanshu2068/Voyager',
    live: 'https://voyager-five-ruby.vercel.app',
    art: 'share',
  },
  {
    title: 'FitPulse',
    blurb:
      'Fitness tracker for workouts, water intake, weight and goals, with an analytics dashboard, light/dark themes and PDF export.',
    highlights: [
      'Redux Toolkit store for auth, fitness data and UI state',
      'Recharts analytics with goal progress and trends',
      'Forms with React Hook Form and report export with jsPDF',
    ],
    tech: ['React', 'Redux Toolkit', 'Recharts', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Priyanshu2068/FitPulse_Fitness_Tracker',
    live: 'https://fit-pulse-fitness-tracker.vercel.app',
    art: 'chart',
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
  { id: 'education', label: 'Education' },
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
