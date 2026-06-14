export const siteConfig = {
  name: "Sam Ramseyer",
  title: "Full Stack Developer",
  heroEyebrow: "Carpenter · Developer · Veteran",
  tagline:
    "I've spent most of my life building things with my hands — custom cabinets, precise trim, heavy equipment, and convoys. Today I bring that same care for craft, structure, and detail to full stack web development.",
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

  about: [
    "I joined the U.S. Army in 2006 and was dual MOS-qualified as a 21E Heavy Equipment Operator and an 88M Motor Transport Operator — moving earth, running machinery, and keeping missions rolling on the road.",
    "Outside of the military, I've spent most of my life as a carpenter specializing in custom cabinetry and trim. That work taught me patience, precision, and pride in the finish — whether the project is a built-in bookshelf or a production web app.",
    "I hold a bachelor's degree in public relations and marketing, which shaped how I think about messaging, audience, and presenting work clearly. In 2025, I earned my Full Stack Software Engineering certificate from the University of Tennessee — bringing formal training in modern web development together with everything I learned on the job site and in the field.",
    "Now I'm channeling that builder's mindset into full stack development — writing clean code, crafting responsive interfaces, and shipping projects that hold up over time.",
  ],

  highlights: [
    "U.S. Army veteran (since 2006) — dual MOS 21E & 88M",
    "Custom cabinetry and trim carpenter",
    "Full Stack Software Engineering certificate — University of Tennessee (2025)",
    "Bachelor's in Public Relations & Marketing",
    "Full stack projects synced live from GitHub",
  ],

  skills: [
    {
      category: "Development",
      theme: "dev",
      description:
        "Building digital products with the same precision I learned laying out a kitchen — structure first, clean finish last.",
      items: [
        "Full Stack Software Engineering",
        "React",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Node.js",
        "REST APIs",
        "Git",
      ],
    },
    {
      category: "Trade & Craft",
      theme: "craft",
      description:
        "Most of my life has been spent in the shop — custom cabinetry, detailed trim, and finish work that has to look right up close.",
      items: [
        "Custom Cabinetry",
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
      title: "Carpenter",
      detail: "Custom cabinetry and trim — precision, patience, and pride in the finish",
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
        "Full Stack Software Engineering certificate — University of Tennessee",
    },
  ],

  sectionCopy: {
    aboutTitle: "Built by hand, refined in code",
    aboutDescription:
      "From the job site to the keyboard — a path shaped by service, craft, and communication.",
    skillsTitle: "Skills across trades",
    skillsDescription:
      "From bulldozers and convoys to cabinet shops and code editors — the same builder's mindset runs through all of it.",
    skillsEyebrow: "Skills & Background",
  },

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
