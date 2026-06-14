export const professionalTitle =
  "Full Stack Developer building scalable web applications, developer tools, and AI-powered products." as const;

export const siteConfig = {
  name: "Sam Ramseyer",
  title: professionalTitle,
  heroEyebrow: "Finish Carpenter · Developer · Veteran",
  heroRole: "Full Stack Developer",
  heroSubline:
    "Scalable web applications · developer tools · AI-powered products",
  tagline:
    "I've spent most of my life working with my hands — installing custom cabinets, hanging precise trim, running heavy equipment, and convoys. Today I bring that same care for craft, structure, and detail to full stack web development.",
  email: "sam.ramseyer.88@gmail.com",
  githubUsername: "samramseyer",
  githubUrl: "https://github.com/samramseyer",
  linkedinUrl: "",
  resumeUrl: "",

  army: {
    joined: 2006,
    roles: [
      { code: "21E", title: "Heavy Equipment Operator" },
      { code: "88M", title: "Motor Transport Operator" },
    ],
  },

  education: {
    certificate: {
      title: "Full Stack Software Engineering Certificate",
      school: "University of Tennessee",
      year: 2025,
    },
    degree: "Bachelor's Degree in Public Relations & Marketing",
  },

  craft: "Custom cabinetry and trim carpentry",

  featuredProject: {
    name: "TechHelp Hub",
    tagline: "Full-stack MERN Q&A forum — my capstone-style build",
    demoUrl: "https://samramseyer.github.io/Tech-Help/",
    repoUrl: "https://github.com/samramseyer/Tech-Help",
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },

  heroBadges: [
    { label: "Custom cabinetry and trim carpentry", style: "craft" },
    {
      label: "University of Tennessee · Full Stack Software Engineering (2025)",
      style: "edu",
    },
    { label: "Bachelor's in Public Relations & Marketing", style: "edu" },
    { label: "Army 2006 · 21E & 88M", style: "army" },
  ] as const,
  /** Add GitHub organization slugs to include their public repos */
  organizations: [] as string[],

  /** Repositories to hide from the projects grid (case-insensitive) */
  hiddenRepos: ["Sam-Portfolio", "project4"],

  /** Override titles and descriptions for the Live from GitHub grid */
  projectOverrides: {
    "Vacation-Website": {
      title: "Lakeside Cabins",
      description:
        "Responsive cabin rental site with a photo gallery, booking flow, and availability calendar — built with HTML, CSS, and JavaScript, deployed on GitHub Pages.",
    },
    "Todo-App": {
      title: "Todo List App",
      description:
        "React single-page app with full todo CRUD, status filters, keyboard accessibility, and a validated contact form — routing, state, and UX patterns in one project.",
      demoUrl: "https://samramseyer.github.io/Todo-App/",
    },
    "Tech-Help": {
      title: "TechHelp Hub",
      description:
        "Full-stack MERN Q&A forum with JWT auth, category browsing, upvotes, accepted answers, and reputation — a capstone-style community help platform.",
    },
    "Giphy-Shed": {
      title: "Giphy Shed",
      description:
        "GIF search app powered by the Giphy REST API — fetch and display results in a responsive layout with clean CSS and live API integration.",
    },
  } as Record<string, { title?: string; description: string; demoUrl?: string }>,

  about: [
    "I joined the U.S. Army in 2006 and was dual MOS-qualified as a 21E Heavy Equipment Operator and an 88M Motor Transport Operator — moving earth, running machinery, and keeping missions rolling on the road.",
    "Outside of the military, I've spent most of my life as a carpenter in custom cabinetry and trim carpentry — installing cabinets and trim, not building them from scratch. That work taught me patience, precision, and pride in the finish — whether the job is a kitchen run or a production web app.",
    "I hold a bachelor's degree in public relations and marketing, which shaped how I think about messaging, audience, and presenting work clearly. In 2025, I earned my Full Stack Software Engineering certificate from the University of Tennessee — bringing formal training in modern web development together with everything I learned on the job site and in the field.",
    "Today I'm focused on building scalable web applications, developer tools, and AI-powered products — writing clean code, crafting responsive interfaces, and shipping work that holds up over time.",
  ],

  highlights: [
    professionalTitle,
    "U.S. Army veteran (since 2006) — dual MOS 21E & 88M",
    "Custom cabinetry and trim carpentry — cabinet and trim installation",
    "Full Stack Software Engineering certificate — University of Tennessee (2025)",
    "Bachelor's in Public Relations & Marketing",
  ],

  skills: [
    {
      category: "Technical Stack",
      theme: "dev",
      description:
        "Scalable web applications, developer tools, and AI-powered products — from interface to API to deployment.",
      stack: [
        {
          label: "Frontend",
          items: ["React", "Next.js", "TypeScript"],
        },
        {
          label: "Backend",
          items: ["Node.js", "PostgreSQL", "REST APIs"],
        },
        {
          label: "Infrastructure",
          items: ["Docker", "AWS", "CI/CD"],
        },
      ],
    },
    {
      category: "Trade & Craft",
      theme: "craft",
      description:
        "Most of my career has been on job sites installing custom cabinets and detailed trim — finish work that has to look right up close.",
      items: [
        "Cabinet Installation",
        "Trim Carpentry",
        "Finish Work",
        "Precision Layout",
        "Blueprint Reading",
      ],
    },
    {
      category: "Service & Communication",
      theme: "service",
      description:
        "Army service since 2006, dual MOS as 21E and 88M, a PR and marketing degree, and a 2025 Full Stack Software Engineering certificate from the University of Tennessee.",
      items: [
        "21E Heavy Equipment Operator",
        "88M Motor Transport",
        "Public Relations",
        "Marketing",
        "Project Planning",
      ],
    },
  ],

  journey: [
    {
      year: "2006",
      title: "U.S. Army",
      detail: "Dual MOS 21E Heavy Equipment Operator & 88M Motor Transport",
    },
    {
      year: "Craft",
      title: "Finish Carpenter",
      detail: "Installed custom cabinetry and trim — precision, patience, and pride in the finish",
    },
    {
      year: "Degree",
      title: "PR & Marketing",
      detail: "Bachelor's degree shaping how I communicate and present work",
    },
    {
      year: "2025",
      title: "Full Stack Engineer",
      detail:
        "Building scalable web applications, developer tools, and AI-powered products — UT Full Stack Software Engineering certificate",
    },
  ],

  sectionCopy: {
    aboutTitle: "Installed with care, refined in code",
    aboutDescription:
      "Full stack developer focused on scalable web applications, developer tools, and AI-powered products — with a path shaped by service, craft, and communication.",
    skillsTitle: "Skills across trades",
    skillsDescription:
      "Scalable web applications, developer tools, and AI-powered products — built with the same builder's mindset I bring from the job site, the field, and the shop.",
    skillsEyebrow: "Skills & Background",
  },

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
