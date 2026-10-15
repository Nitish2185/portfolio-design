// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here — edit this file and the
//  UI updates itself.
// ─────────────────────────────────────────────────────────────

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
    'I build REST APIs and database-driven web apps — from webhook platforms to multi-agent AI advisors — on solid foundations in cloud computing, databases and data structures.',
  about: {
    title: 'Where I design, build and ship.',
    body: 'I’m an MCA student at ABES Engineering College with hands-on experience building full-stack apps with Node.js, Express.js, MongoDB and React.js. I enjoy turning ideas into working products — webhook infrastructure, AI-powered finance tools, travel and fitness apps — and deploying them with AWS and Docker.',
    points: [
      { icon: 'bot', title: 'AI-curious builder', text: 'Multi-agent workflows with LangChain and Gemini, from finance advice to quiz generation.' },
      { icon: 'globe', title: 'Cloud-ready', text: 'NPTEL Cloud Computing (Elite, 85%) and hands-on with AWS services and Docker.' },
      { icon: 'seal', title: 'Open to work', text: 'Looking for software development internships and entry-level roles.' },
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

// url: add the credential link to show a Verify button
export const certifications = [
  {
    title: 'Cloud Computing (Elite)',
    issuer: 'NPTEL · IIT Kharagpur',
    date: '12 weeks',
    meta: [['Score', '85%'], ['Grade', 'Elite'], ['Duration', '12 weeks']],
    url: null,
  },
  {
    title: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'Udemy',
    date: '14.5 hours',
    meta: [['Exam', 'CLF-C02'], ['Course', '14.5 hours']],
    url: null,
  },
  {
    title: 'Software Engineer Intern',
    issuer: 'HackerRank',
    date: 'Certified',
    meta: [['Issuer', 'HackerRank'], ['Type', 'Role certification']],
    url: null,
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'Certified',
    meta: [['Issuer', 'Cisco NetAcad'], ['Track', 'Python']],
    url: null,
  },
]

export const faqs = [
  { q: 'Are you open to new opportunities?', a: 'Yes — I’m looking for software development internships and entry-level roles, especially in full-stack, backend or cloud work.' },
  { q: 'What kind of work do you do?', a: 'Full-stack web development: REST APIs and database-driven apps with Node.js, Express.js and MongoDB, React front ends, and AI features built with LangChain and Gemini.' },
  { q: 'What is your tech stack?', a: 'JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB, MySQL and PostgreSQL, Tailwind CSS — plus Python, C++, Java and SQL. On the cloud side: Docker and AWS (EC2, S3, CloudFront, IAM, RDS, DynamoDB and more).' },
  { q: 'What are you studying?', a: 'A Master of Computer Applications at ABES Engineering College (2025–present, 90.45%), after a BCA from I.I.M.T College of Management.' },
  { q: 'Where can I see your code?', a: 'On GitHub at github.com/Priyanshu2068 — Prepare.ai, Voyager and FitPulse also have live demos linked from the Projects section.' },
  { q: 'How do I reach you fastest?', a: 'Use the contact form below or email prish.3d@gmail.com directly.' },
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
    '[ok] booting ' + profile.handle + '.dev',
    '[ok] loading profile',
    '[ok] 0 errors · ready',
  ],
  prompt: 'whoami --verbose',
  fetch: [
    '> name      [' + profile.fullName + ']',
    '> role      [' + profile.role + ']',
    '> studying  [MCA · ABES Engineering College]',
    '> status    [open to work]',
  ],
  share: { placeholder: 'Add email to share…', typed: 'recruiter@company.com', button: 'Send', done: 'Sent ✓' },
  composer: 'Make this resume hire-ready',
  prdTitle: 'Resume — draft v1',
  prdRewritten: 'Resume — ' + profile.role,
  thread: [
    { who: 'You', text: 'Make this resume hire-ready' },
    { who: profile.name + '’s agent', text: 'On it — tightening the title and impact lines.', bot: true },
    { who: profile.name + '’s agent', text: 'Done. Title updated ✓', bot: true },
  ],
}
