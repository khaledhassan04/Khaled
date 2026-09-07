/**
 * Portfolio Data Store - Khaled Hassan Salam
 * UI/UX Designer & Developer
 * "Understand the problem. Design the experience. Build with purpose."
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Khaled Hassan",
    role: "UI/UX Designer & Developer",
    heroHeadline: "Designing experiences. Building possibilities.",
    heroSubtitle: "I’m Khaled Hassan, a UI/UX Designer and Developer focused on creating clean, intuitive, and meaningful digital experiences. I design websites, mobile applications, dashboards, ERP systems, and digital products that combine user experience, visual design, and technology.",
    smallIntro: "Based in Bangladesh · Available for creative collaborations",
    location: "Bangladesh",
    timezone: "Asia/Dhaka", // Bangladesh Standard Time (BST, UTC+6)
    email: "khaledhassansalam@gmail.com",
    philosophy: {
      tagline: "A designer who thinks beyond the screen.",
      principlesText: "Understand the problem. Design the experience. Build with purpose.",
      fullBio: "I’m a UI/UX Designer and Developer with a passion for transforming ideas and complex requirements into simple, useful, and visually engaging digital products. My approach combines design thinking, user experience, visual design, and technical understanding. I enjoy exploring a problem, understanding the people who will use the product, and turning that understanding into an experience that feels natural and effortless. I’ve worked on different types of digital products, including mobile applications, websites, dashboards, ERP systems, business management platforms, and internal tools. I believe great design isn't simply about making something look good. It’s about making something clear, useful, accessible, and enjoyable to use."
    },
    personalStatement: {
      headline: "I'm curious about how things work.",
      question: "Can this be simpler?",
      content: "That curiosity is what brought me to UI/UX design and development. I like taking something complicated, breaking it down, understanding the underlying problem, and rebuilding it into something people can use naturally. For me, design is not just a profession. It's a way of thinking."
    },
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "Behance", url: "https://behance.net", icon: "external-link" },
      { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" }
    ],
    stats: [
      { label: "Design & Dev Focus", value: "UI/UX & Code" },
      { label: "Platforms", value: "Mobile, Web, ERP" },
      { label: "Core Foundation", value: "Graphic & CSE" },
      { label: "Location", value: "Bangladesh" }
    ]
  },

  services: [
    {
      id: "uiux-design",
      title: "UI/UX Design",
      description: "Creating intuitive interfaces and thoughtful experiences that are easy to understand and enjoyable to use.",
      icon: "layout"
    },
    {
      id: "web-design",
      title: "Web Design",
      description: "Designing modern, responsive websites that communicate a brand clearly and guide users naturally.",
      icon: "globe"
    },
    {
      id: "mobile-app-design",
      title: "Mobile App Design",
      description: "Designing mobile experiences with simple navigation, clear interactions, and platform-friendly interfaces.",
      icon: "smartphone"
    },
    {
      id: "dashboard-erp",
      title: "Dashboard & ERP Design",
      description: "Turning complex business processes and large amounts of information into organized, understandable interfaces.",
      icon: "bar-chart-3"
    },
    {
      id: "design-systems",
      title: "Design Systems",
      description: "Creating reusable components, consistent visual languages, and scalable UI systems.",
      icon: "layers"
    },
    {
      id: "frontend-development",
      title: "Frontend Development",
      description: "Bringing designs to life through responsive, clean, and functional frontend interfaces.",
      icon: "code-2"
    }
  ],

  skills: {
    design: [
      "UI/UX Design",
      "User Research",
      "User Flow",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
      "Visual Design",
      "Design Systems",
      "Responsive Design",
      "Usability"
    ],
    development: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Responsive Web Development",
      "Frontend Development"
    ],
    tools: [
      "Figma",
      "FigJam",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Git & GitHub",
      "VS Code"
    ],
    currentlyExploring: [
      "Advanced Frontend Development",
      "Product Design",
      "Design Systems",
      "AI-assisted Design & Development",
      "Modern Web Technologies"
    ]
  },

  process: [
    {
      step: "01",
      title: "Discover",
      formula: "Research → Requirements → Goals",
      description: "I start by understanding the problem, business goals, users, requirements, and constraints."
    },
    {
      step: "02",
      title: "Define",
      formula: "User Needs → Problems → Priorities",
      description: "I organize information and identify the core problems that the product needs to solve."
    },
    {
      step: "03",
      title: "Structure",
      formula: "Flow → Structure → Wireframe",
      description: "I create user flows, information architecture, and wireframes to establish how the experience should work."
    },
    {
      step: "04",
      title: "Design",
      formula: "UI → Components → Prototype",
      description: "I transform the structure into a polished visual interface with a consistent design system."
    },
    {
      step: "05",
      title: "Validate",
      formula: "Test → Learn → Improve",
      description: "I review interactions, identify usability issues, and refine the experience based on feedback."
    },
    {
      step: "06",
      title: "Build",
      formula: "Design → Code → Product",
      description: "I collaborate with developers—or use my own development skills—to turn the final design into a functional product."
    }
  ],

  projects: [
    {
      id: "alfatah-field-sales",
      title: "Al Fatah Field Sales App",
      subtitle: "Mobile Application · ERP · Field Operations",
      category: "mobile",
      categoryLabel: "Mobile ERP & Field Operations",
      image: "assets/images/project-alfatah-sales.svg",
      tags: ["UI/UX Design", "Product Design", "UX Architecture", "Field Sales ERP", "Mobile App", "Figma"],
      summary: "A field-sales management solution designed to help sales teams plan visits, track field activities, manage institutions, capture book demands, create orders, track attendance, and monitor performance.",
      contribution: "UI/UX Design · Product Design · UX Architecture",
      challenge: "The challenge was to transform a complex field-sales workflow into a mobile experience that sales representatives could use quickly while working in the field.",
      outcome: "A structured mobile experience designed around real-world field operations and business workflows.",
      features: [
        "Daily visit planning & schedule mapping",
        "GPS-based field tracking & route validation",
        "Attendance management with location lock",
        "Institution & school/library management",
        "Book promotion & sampling logs",
        "Demand capture from institutions & teachers",
        "Instant sales order creation on mobile",
        "Daily expense management & bill attachment",
        "Performance tracking & target analytics",
        "Follow-up management for pending visits",
        "Role-based manager & supervisor dashboards"
      ],
      metrics: [
        { label: "Workflow Velocity", value: "Fast Field Entry" },
        { label: "Architecture", value: "11+ Modules" },
        { label: "Platform", value: "iOS & Android" }
      ]
    },
    {
      id: "facecheck-attendance",
      title: "FaceCheck",
      subtitle: "Mobile Application · Face Recognition · Workforce Management",
      category: "mobile",
      categoryLabel: "Mobile Biometrics & Workforce",
      image: "assets/images/project-facecheck.svg",
      tags: ["UI/UX Design", "Product Design", "Biometrics UX", "Mobile App", "Restaurant Staff", "Figma"],
      summary: "A simple employee attendance solution designed for restaurant stores, allowing employees to check in and check out using facial recognition.",
      contribution: "UI/UX Design · Product Design",
      challenge: "The experience needed to be extremely simple because employees should be able to complete attendance actions quickly without navigating through complicated screens.",
      outcome: "A rapid 2-step facial check-in/check-out workflow with instant verification and store-based access control.",
      features: [
        "Quick employee onboarding & facial registration",
        "Sub-second facial recognition attendance capture",
        "Instant Check-in and Check-out toggle actions",
        "Real-time employee presence list",
        "Store-based multi-branch access permission",
        "Simple attendance monitoring for store managers",
        "Offline caching for spotty kitchen network coverage"
      ],
      metrics: [
        { label: "Action Time", value: "< 2 Seconds" },
        { label: "Interface", value: "Zero Clutter" },
        { label: "Target Users", value: "Restaurant Staff" }
      ]
    },
    {
      id: "business-management-dashboard",
      title: "Business Management Dashboard",
      subtitle: "Web Application · Dashboard · Data Visualization",
      category: "dashboard",
      categoryLabel: "Web App & Data Visualization",
      image: "assets/images/project-biz-dashboard.svg",
      tags: ["UI/UX Design", "Dashboard Design", "Data Visualization", "ERP Systems", "Web App", "Responsive Layout"],
      summary: "A dashboard experience designed to make complex business information easier to understand and act upon.",
      contribution: "UI/UX Design · Dashboard Design",
      challenge: "Transforming dense business operations, regional financial streams, and high-volume transaction tables into an organized, readable, and responsive command center.",
      outcome: "A clear visual hierarchy with intuitive KPI cards, robust multi-condition data filtering, and responsive tabular layouts across desktop and tablet.",
      features: [
        "Data hierarchy & scannable visual architecture",
        "KPI visualization for revenue, orders & branches",
        "Dynamic high-density data tables with sorting",
        "Multi-parameter date & category filters",
        "Automated operational reports and CSV/PDF export",
        "Role-based views (Admin, Branch Manager, Staff)",
        "Fluid responsive layouts optimized for all screens"
      ],
      metrics: [
        { label: "Information Hierarchy", value: "Clear & Scannable" },
        { label: "Data Scope", value: "Multi-Region ERP" },
        { label: "Design System", value: "Consistent Tokens" }
      ]
    }
  ],

  experience: [
    {
      role: "UI/UX Designer",
      company: "BizznTek Ltd.",
      badge: "Current Role",
      period: "Present",
      description: "Working on digital products and business solutions across different industries. My responsibilities include understanding product requirements, creating user flows, wireframes, high-fidelity UI designs, design systems, prototypes, and collaborating with developers to ensure accurate implementation.",
      areas: [
        "Product Design",
        "UI/UX Design",
        "Web Applications",
        "Mobile Applications",
        "ERP Systems",
        "Business Dashboards",
        "Design Systems",
        "Frontend Collaboration"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "Uttara University",
      status: "Currently Pursuing",
      description: "Strengthening my understanding of software, technology, algorithms, and computer science while continuing to grow as a designer and developer."
    },
    {
      degree: "Diploma in Graphic Design",
      institution: "Govt. Graphic Arts Institute",
      status: "Completed",
      description: "Built a strong foundation in graphic design, visual communication, typography, composition, color theory, and creative design principles."
    },
    {
      degree: "Professional Graphic Design Course",
      institution: "Creative IT Institute",
      status: "Completed",
      description: "Completed professional training in graphic design with practical experience in visual design, branding, digital graphics, and industry-standard design tools."
    }
  ],

  learningJourney: [
    { step: "Graphic Design", role: "Visual foundation, typography, color theory & aesthetics" },
    { step: "UI/UX Design", role: "User-centered thinking, wireframes & digital products" },
    { step: "Computer Science", role: "Technical understanding, engineering & logic" },
    { step: "Product Design & Dev", role: "Bridging human experience with functional code" }
  ],

  designDevDuality: {
    headline: "I speak both design and development.",
    intro: "Design and development shouldn't exist in separate worlds. My background in both areas helps me think about products from multiple perspectives.",
    designer: {
      title: "As a Designer",
      items: ["Users", "Experience", "Visuals", "Interaction"]
    },
    developer: {
      title: "As a Developer",
      items: ["Performance", "Responsiveness", "Structure", "Implementation"]
    },
    conclusion: "Together, they help me create designs that aren't just beautiful—but also practical and buildable."
  },

  whyWorkWithMe: [
    {
      title: "User-focused",
      description: "I design around real users and real problems instead of designing only for visual appeal.",
      icon: "user-check"
    },
    {
      title: "Business-aware",
      description: "I consider business requirements and workflows alongside user needs.",
      icon: "briefcase"
    },
    {
      title: "Detail-oriented",
      description: "Small details can make a big difference. I care about spacing, typography, hierarchy, consistency, and interactions.",
      icon: "check-circle-2"
    },
    {
      title: "Technically aware",
      description: "My development knowledge helps me create realistic designs and communicate effectively with developers.",
      icon: "code"
    },
    {
      title: "Always learning",
      description: "Design and technology are constantly evolving. I continuously explore new tools, ideas, and approaches.",
      icon: "compass"
    }
  ],

  principles: [
    {
      title: "Simplicity",
      desc: "Complex problems don't always need complicated solutions."
    },
    {
      title: "Clarity",
      desc: "Users should understand what to do without having to think too much."
    },
    {
      title: "Consistency",
      desc: "A strong design system creates familiarity and makes products easier to use."
    },
    {
      title: "Purpose",
      desc: "Every screen, component, and interaction should have a reason to exist."
    },
    {
      title: "People",
      desc: "Technology is built for people. Understanding them comes before designing for them."
    }
  ]
};

// Export to window for vanilla browser script usage
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
