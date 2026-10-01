export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  year: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  number: string;
  company: string;
  role: string;
  period: string;
  location: string;
  badge?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  period: string;
  institution: string;
  degree: string;
  score: string;
  location: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  type: string;
}

export const PERSONAL_INFO = {
  fullName: "Ubaikab Abdul Rab Shaikh",
  displayName: "UBAIKAB SHAIKH",
  role: "FULL STACK DEVELOPER",
  secondaryRole: "AI PROMPT ENGINEER",
  location: "Mumbai, India",
  email: "ubaikabshaikh@gmail.com",
  phone: "+91 90282 05824",
  github: "https://github.com/Ubaikab",
  linkedin: "https://www.linkedin.com/in/ubaikab-shaikh-b08b462a9/",
  resume: "/resume/Ubaik-Resume.pdf",
  year: "©2026",
  status: "AVAILABLE FOR ROLES",
  tagline: "I build responsive, high-performance web applications and design intelligent AI workflows.",
};

export const EXPERIENCES: Experience[] = [
  {
    id: "modelsuite",
    number: "01",
    company: "ModelSuite AI",
    role: "Full Stack Developer (Internship)",
    period: "JULY 2026 — SEP 2026",
    location: "Remote / Mumbai, India",
    responsibilities: [
      "Architecting end-to-end full-stack web features with modern JavaScript frameworks and scalable backend APIs.",
      "Developing responsive, high-performance user interfaces and integrating robust authentication and data pipelines.",
      "Optimizing web application speed, component lifecycle performance, and modern state architectures.",
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "soul-ai",
    number: "02",
    company: "Soul AI",
    role: "AI Prompt Engineer (Freelance)",
    period: "JAN 2025 — AUG 2025",
    location: "Remote",
    responsibilities: [
      "Engineered, evaluated, and iterated on prompt systems for accuracy, safety, and contextual alignment.",
      "Optimized generative AI use cases across diverse domains, boosting prompt output relevance.",
      "Collaborated with cross-functional product and engineering teams to integrate LLM pipelines into production applications.",
    ],
    technologies: ["Prompt Optimization", "LLM Evaluation", "Safety Alignment", "OpenAI API", "Context Engineering"],
  },
  {
    id: "outlier-ai",
    number: "03",
    company: "Outlier AI",
    role: "AI Prompt Engineer (Freelance)",
    period: "OCT 2024 — MAR 2025",
    location: "Remote",
    responsibilities: [
      "Built automated prompt testing workflows, data-aware strategies, and modular reusable prompt templates.",
      "Designed prompts for educational AI tools and LLM-based intelligent tutoring frameworks.",
      "Conducted systematic benchmark testing and qualitative refinement for optimal instructional and reasoning performance.",
    ],
    technologies: ["Automated Evaluation", "Prompt Templating", "Reasoning Benchmarks", "Educational AI"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "crown-construction",
    number: "01",
    title: "CROWN CONSTRUCTION",
    tagline: "FULL STACK / ANIMATION-RICH WEB EXPERIENCE",
    year: "2025",
    category: "Full Stack Development & Creative Web",
    description:
      "A responsive, animation-rich commercial construction web platform crafted to showcase premium architectural and construction services. Features 3D hero interactions, scroll-triggered storytelling, lazy loading, and fine-tuned UI components for maximum conversion and high fidelity.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Intersection Observer API"],
    features: [
      "Responsive, fluid architecture with custom viewport scaling",
      "3D hero animations and scroll-triggered narrative sections",
      "Modular reusable UI component library",
      "Lazy loading and deep performance optimization",
    ],
    image: "/images/crown-construction.jpg",
    liveUrl: "https://github.com/Ubaikab/CrownConstruction",
    githubUrl: "https://github.com/Ubaikab/CrownConstruction",
    featured: true,
  },
  {
    id: "botilla",
    number: "02",
    title: "BOTILLA CHAT APP",
    tagline: "REAL-TIME MESSAGING & INTELLIGENT COMMUNICATION",
    year: "2024",
    category: "Real-Time Full Stack Application",
    description:
      "A high-concurrency real-time chat application featuring instant WebSocket messaging, online user presence tracking, live typing indicators, secure JWT authentication, Cloudinary media uploads, Arcjet security rate limiting, and Resend transactional notification emails.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Socket.io",
      "MongoDB",
      "Cloudinary",
      "Arcjet",
      "Resend",
    ],
    features: [
      "Real-time bi-directional messaging with Socket.io",
      "Live user presence tracking and typing status indicators",
      "JWT-based secure authentication & session management",
      "Cloudinary media handling & Arcjet automated rate limiting",
      "Resend automated transactional and welcome email pipelines",
    ],
    image: "/images/botilla.jpg",
    liveUrl: "https://github.com/Ubaikab/Botilla",
    githubUrl: "https://github.com/Ubaikab/Botilla",
    featured: true,
  },
  {
    id: "sketch2create",
    number: "03",
    title: "SKETCH2CREATE",
    tagline: "AI-POWERED WIREFRAME TO UI CARD GENERATOR",
    year: "2025",
    category: "AI / Generative Design Tool",
    description:
      "An intelligent AI design tool that transforms raw Figma-style wireframes and rough mockups into polished, production-ready UI design cards — driven entirely by a natural language prompt. Bridging the gap between ideation and implementation with generative AI.",
    technologies: [
      "React",
      "TypeScript",
      "OpenAI API",
      "Node.js",
      "Tailwind CSS",
      "Canvas API",
    ],
    features: [
      "Upload raw Figma mockups or hand-drawn wireframes",
      "Describe your desired style via a natural language prompt",
      "AI generates polished, themed UI cards in seconds",
      "Export generated designs as image or component code",
      "Multiple style presets: glassmorphism, minimal, brutalist",
    ],
    image: "/images/sketch2create.jpg",
    liveUrl: "https://github.com/Ubaikab/S2C",
    githubUrl: "https://github.com/Ubaikab/S2C",
    featured: true,
  },
  {
    id: "fabby",
    number: "04",
    title: "FABBY ECOMMERCE",
    tagline: "FULL STACK BABY ESSENTIALS STORE",
    year: "2025",
    category: "Full Stack E-Commerce",
    description:
      "A full-featured, production-ready e-commerce platform for baby essentials — diapers, wipes, and care products. Built with a robust backend, secure payment flow, product filtering, user authentication, cart management, and an intuitive storefront designed for trust and conversion.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Stripe",
    ],
    features: [
      "Full product catalog with category filtering and search",
      "Secure JWT-based authentication and user accounts",
      "Cart management with persistent sessions",
      "Integrated payment gateway and order tracking",
      "Admin dashboard for inventory and order management",
    ],
    image: "/images/fabby.jpg",
    liveUrl: "https://github.com/Ubaikab/Fabby",
    githubUrl: "https://github.com/Ubaikab/Fabby",
    featured: true,
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Bootstrap",
      "DaisyUI",
      "Intersection Observer API",
      "Responsive UI/UX",
      "Component Architecture",
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "BACKEND",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "Java",
      "C++",
      "REST APIs",
      "JWT Authentication",
      "Socket.io",
      "API Rate Limiting",
      "Arcjet",
      "Resend",
      "Cloudinary",
    ],
  },
  {
    id: "database-devops",
    number: "03",
    title: "DATABASE & DEVOPS",
    skills: [
      "MongoDB",
      "Mongoose",
      "Firebase",
      "Git",
      "GitHub",
      "CI/CD Basics",
      "Vercel",
      "Sevalla",
      "Render",
      "Netlify",
    ],
  },
  {
    id: "ai-prompt",
    number: "04",
    title: "AI & PROMPT ENGINEERING",
    skills: [
      "Prompt Engineering",
      "OpenAI APIs",
      "LLM Evaluation",
      "Chatbot Development",
      "AI Feature Integration",
      "Light Model Fine-Tuning",
      "Context Optimization",
      "Safety Benchmarking",
    ],
  },
  {
    id: "system-design",
    number: "05",
    title: "SYSTEM DESIGN",
    skills: [
      "Scalable Architecture",
      "State Management",
      "Zustand",
      "Performance Optimization",
      "Lazy Loading",
      "Code Splitting",
      "Real-Time App Design",
      "Clean Code Practices",
    ],
  },
  {
    id: "soft-skills",
    number: "06",
    title: "CORE COMPETENCIES",
    skills: [
      "Agile Development",
      "Cross-Functional Collaboration",
      "Critical Thinking",
      "Problem Solving",
      "Time Management",
      "Clear Technical Communication",
      "Requirement Analysis",
    ],
  },
];

export const EDUCATION_LIST: Education[] = [
  {
    id: "rizvi",
    period: "2023 — 2026",
    institution: "Rizvi College of Arts, Science & Commerce",
    degree: "Bachelor of Science in Computer Science",
    score: "8.58 CGPA",
    location: "Mumbai, India",
  },
  {
    id: "wonderland",
    period: "2021 — 2023",
    institution: "Wonderland High School & Junior College",
    degree: "HSC — Science Stream",
    score: "56%",
    location: "Maharashtra, India",
  },
  {
    id: "holy-family",
    period: "2012 — 2021",
    institution: "Holy Family Convent High School",
    degree: "SSC — Secondary School Certificate",
    score: "81%",
    location: "Maharashtra, India",
  },
];

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    id: "jpmorgan",
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. — Forage",
    type: "Industry Simulation",
  },
  {
    id: "simplilearn",
    title: "Introduction to Front-End Development",
    issuer: "Simplilearn SkillUp",
    type: "Professional Course",
  },
  {
    id: "udemy-python",
    title: "NumPy, Pandas & Python for Data Analysis",
    issuer: "Udemy",
    type: "Data Engineering",
  },
  {
    id: "udemy-cs",
    title: "Computer Science MetaBootCamp",
    issuer: "Udemy",
    type: "Computer Science",
  },
  {
    id: "udemy-chatgpt",
    title: "ChatGPT for Product Management & Innovation",
    issuer: "Udemy",
    type: "AI & Innovation",
  },
  {
    id: "udemy-security",
    title: "Web Hacking for Beginners",
    issuer: "Udemy",
    type: "Web Security",
  },
];

export const LANGUAGES = [
  { name: "English", level: "Proficient" },
  { name: "Hindi", level: "Proficient" },
  { name: "Marathi", level: "Proficient" },
];
