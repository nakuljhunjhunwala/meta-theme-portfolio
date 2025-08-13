// 🚀 Ultra-Production Grade Portfolio Data
// Single source of truth for all portfolio information

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: {
    short: string
    medium: string
    detailed: string
  }
  location: string
  avatar: string
  email: string
  website: string
  socialLinks: Array<{
    platform: string
    url: string
    icon: string
    handle: string
  }>
  contactMethods: Array<{
    type: string
    value: string
    preferred: boolean
  }>
  availability: {
    status: "available" | "busy" | "unavailable"
    message: string
    nextAvailable?: string
  }
  education: Array<{
    degree: string
    institution: string
    year: string
    location: string
    honors?: string
  }>
  languages: Array<{
    language: string
    proficiency: string
  }>
}

export interface TechnicalSkill {
  name: string
  category: "frontend" | "backend" | "database" | "cloud" | "mobile" | "devops" | "other"
  proficiency: number // 0-100
  yearsExperience: number
  icon?: string
  color?: string
  description: string
  projects: string[] // Project IDs where this skill was used
  certifications?: string[]
  lastUsed: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: {
    elevator: string
    summary: string
    detailed: string
  }
  category: "web-app" | "mobile-app" | "api" | "library" | "ml" | "devops"
  status: "completed" | "ongoing" | "concept"
  featured: boolean
  techStack: string[] // Skill names
  features: Array<{
    title: string
    description: string
    impact?: string
  }>
  challenges: Array<{
    title: string
    description: string
    solution: string
  }>
  metrics: Array<{
    label: string
    value: string
    description?: string
  }>
  media: {
    hero: string
    gallery: string[]
    demo?: string
    video?: string
  }
  links: {
    live?: string
    github?: string
    caseStudy?: string
    npm?: string
  }
  timeline: {
    start: string
    end?: string
    duration: string
  }
  team?: {
    size: number
    role: string
    responsibilities: string[]
  }
  achievements: string[]
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

export interface Experience {
  id: string
  company: string
  role: string
  type: "full-time" | "contract" | "freelance" | "internship"
  duration: {
    start: string
    end?: string
    current: boolean
  }
  location: string
  remote: boolean
  description: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  projects: string[] // Project IDs
  teamSize?: number
  companyInfo: {
    industry: string
    size: string
    website?: string
    description: string
  }
  highlights: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  verifyUrl?: string
  skills: string[]
  description: string
}

// =============================================================================
// PORTFOLIO DATA
// =============================================================================

export const personalInfo: PersonalInfo = {
  name: "Nakul Jhunjhunwala",
  title: "Senior Full-Stack Developer",
  tagline: "Building user-centric web experiences with modern technologies",
  bio: {
    short: "4.5+ year Full-Stack Developer with a passion for building user-centric web experiences.",
    medium:
      "Experienced full-stack developer with 4.5+ years specializing in React, Node.js, and cloud architecture. Adept in both front-end and back-end technologies, thriving in collaborative environments and bringing strong technical expertise to every project.",
    detailed:
      "I'm a senior full-stack developer with over 4.5 years of experience building production-grade web applications and scalable systems. My expertise spans modern JavaScript ecosystems, cloud technologies, and UI component development. I've worked across various industries from legal tech to chat platforms, consistently delivering solutions that reduce manual processes and improve user experiences. I'm passionate about creating maintainable code, building reusable components, and leveraging AI-driven development approaches.",
  },
  location: "Mumbai, India",
  avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHEiKBOcryr9g/profile-displayphoto-shrink_200_200/B4DZf12.IjHMAc-/0/1752176518993?e=2147483647&v=beta&t=PQto5MVZoBLVY1MDFcT1IEkuaaaaK6BZc1lDdYG6b0U",
  email: "jhunjhunwalanakul@gmail.com",
  website: "https://nakuljhunjhunwala.in",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/nakuljjw/",
      icon: "linkedin",
      handle: "nakuljjw",
    },
    {
      platform: "GitHub",
      url: "https://github.com/nakuljhunjhunwala",
      icon: "github",
      handle: "nakuljhunjhunwala",
    },
    {
      platform: "DigiCard",
      url: "https://digicard.netlify.app/owner",
      icon: "card",
      handle: "Digital Card",
    },
  ],
  contactMethods: [
    {
      type: "email",
      value: "jhunjhunwalanakul@gmail.com",
      preferred: true,
    },
    {
      type: "phone",
      value: "8856020006",
      preferred: true,
    },
    {
      type: "linkedin",
      value: "linkedin.com/in/nakuljjw/",
      preferred: true,
    },
  ],
  availability: {
    status: "available",
    message: "Open to new opportunities and exciting projects",
    nextAvailable: "Immediately",
  },
  education: [
    {
      degree: "Bachelor of Computer Applications",
      institution: "Tilak Maharashtra Vidyapeeth",
      year: "2018-2021",
      location: "Pune, India",
    },
    {
      degree: "HSC - Commerce",
      institution: "Scholars English Junior College",
      year: "2016-2018",
      location: "Bhiwandi, India",
    },
    {
      degree: "SSC",
      institution: "Scholars English High School",
      year: "2003-2016",
      location: "Bhiwandi, India",
    },
  ],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Hindi", proficiency: "Native" },
    { language: "Marathi", proficiency: "Native" },
  ],
}

export const technicalSkills: TechnicalSkill[] = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    proficiency: 90,
    yearsExperience: 4,
    icon: "react",
    color: "#61DAFB",
    description: "Building scalable UI components and reusable component libraries",
    projects: ["digicard", "b2b-api-system", "unicoconnect-ui"],
    lastUsed: "2024-12",
  },
  {
    name: "Vue.js",
    category: "frontend",
    proficiency: 85,
    yearsExperience: 2,
    icon: "vue",
    color: "#4FC08D",
    description: "Created UI kits and components for CometChat platform",
    projects: ["cometchat-ui-kits"],
    lastUsed: "2024-07",
  },
  {
    name: "Lit Element",
    category: "frontend",
    proficiency: 80,
    yearsExperience: 1,
    icon: "lit",
    color: "#00E8FF",
    description: "Building web components with Lit Element for cross-framework compatibility",
    projects: ["cometchat-ui-kits"],
    lastUsed: "2024-07",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 88,
    yearsExperience: 3,
    icon: "typescript",
    color: "#3178C6",
    description: "Strong typing and advanced TypeScript patterns for scalable applications",
    projects: ["b2b-api-system", "unicoconnect-backend"],
    lastUsed: "2024-12",
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 92,
    yearsExperience: 4.5,
    icon: "javascript",
    color: "#F7DF1E",
    description: "Core JavaScript expertise with modern ES6+ features",
    projects: ["nlp-chatbot", "digicard", "b2b-api-system"],
    lastUsed: "2024-12",
  },
  {
    name: "HTML5",
    category: "frontend",
    proficiency: 90,
    yearsExperience: 4.5,
    icon: "html5",
    color: "#E34F26",
    description: "Semantic HTML and modern web standards",
    projects: ["digicard", "cometchat-ui-kits"],
    lastUsed: "2024-12",
  },
  {
    name: "CSS",
    category: "frontend",
    proficiency: 85,
    yearsExperience: 4.5,
    icon: "css3",
    color: "#1572B6",
    description: "Advanced CSS with focus on responsive design and component styling",
    projects: ["digicard", "cometchat-ui-kits"],
    lastUsed: "2024-12",
  },
  // Backend
  {
    name: "Node.js",
    category: "backend",
    proficiency: 90,
    yearsExperience: 4.5,
    icon: "nodejs",
    color: "#339933",
    description: "Building scalable backend services and APIs",
    projects: ["b2b-api-system", "unicoconnect-backend", "nlp-chatbot"],
    lastUsed: "2024-12",
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 88,
    yearsExperience: 4,
    icon: "express",
    color: "#000000",
    description: "RESTful API development and middleware implementation",
    projects: ["digicard", "b2b-api-system"],
    lastUsed: "2024-07",
  },
  {
    name: "NestJS",
    category: "backend",
    proficiency: 85,
    yearsExperience: 1,
    icon: "nestjs",
    color: "#E0234E",
    description: "Building scalable notification frameworks and microservices",
    projects: ["unicoconnect-notification-system"],
    lastUsed: "2024-12",
  },
  {
    name: "Serverless",
    category: "backend",
    proficiency: 80,
    yearsExperience: 2,
    icon: "serverless",
    color: "#FD5750",
    description: "AWS Lambda functions and serverless architecture",
    projects: ["prosperoware-integrations"],
    lastUsed: "2023-06",
  },
  // Database
  {
    name: "MongoDB",
    category: "database",
    proficiency: 88,
    yearsExperience: 4,
    icon: "mongodb",
    color: "#47A248",
    description: "Document modeling and database design with Mongoose",
    projects: ["b2b-api-system", "digicard"],
    lastUsed: "2024-07",
  },
  {
    name: "DynamoDB",
    category: "database",
    proficiency: 75,
    yearsExperience: 2,
    icon: "dynamodb",
    color: "#FF9900",
    description: "NoSQL database design for AWS serverless applications",
    projects: ["prosperoware-integrations"],
    lastUsed: "2023-06",
  },
  {
    name: "Firebase",
    category: "database",
    proficiency: 70,
    yearsExperience: 1,
    icon: "firebase",
    color: "#FFCA28",
    description: "Real-time database and authentication services",
    projects: ["small-projects"],
    lastUsed: "2022-12",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 80,
    yearsExperience: 1,
    icon: "redis",
    color: "#DC382D",
    description: "Caching and queue management for notification systems",
    projects: ["unicoconnect-notification-system"],
    lastUsed: "2024-12",
  },
  {
    name: "Elasticsearch",
    category: "database",
    proficiency: 75,
    yearsExperience: 2,
    icon: "elasticsearch",
    color: "#005571",
    description: "Search and analytics engine implementation",
    projects: ["prosperoware-search"],
    lastUsed: "2023-06",
  },
  // Cloud & DevOps
  {
    name: "Amazon Web Services",
    category: "cloud",
    proficiency: 85,
    yearsExperience: 3,
    icon: "aws",
    color: "#FF9900",
    description: "Lambda, S3, SNS, SQS, SES for scalable cloud applications",
    projects: ["prosperoware-integrations", "b2b-api-system"],
    lastUsed: "2023-06",
  },
  {
    name: "Google Cloud Platform",
    category: "cloud",
    proficiency: 80,
    yearsExperience: 2,
    icon: "gcp",
    color: "#4285F4",
    description: "Cloud architecture and deployment solutions",
    projects: ["unicoconnect-infrastructure"],
    certifications: ["gcp-associate-architect", "gcp-professional-architect"],
    lastUsed: "2024-12",
  },
  {
    name: "Git",
    category: "devops",
    proficiency: 90,
    yearsExperience: 4.5,
    icon: "git",
    color: "#F05032",
    description: "Version control and collaborative development workflows",
    projects: ["all-projects"],
    lastUsed: "2024-12",
  },
]

export const projects: Project[] = [
  {
    id: "b2b-api-system",
    title: "B2B Model API System",
    subtitle: "Robust e-commerce backend with JWT authentication",
    description: {
      elevator: "Comprehensive B2B e-commerce backend with RESTful APIs and secure authentication",
      summary:
        "Developed, designed, and implemented a robust B2B e-commerce backend with RESTful APIs, JWT authentication, geolocation features, and scalable architecture for business management.",
      detailed:
        "A complete B2B e-commerce backend solution that facilitates seamless integration and data exchange for various e-commerce operations. Features secure JWT authentication, comprehensive API control for business owners to manage stores, items, categories, and orders, plus enhanced customer experience through geolocation and price-based sorting.",
    },
    category: "api",
    status: "completed",
    featured: true,
    techStack: ["TypeScript", "Node.js", "MongoDB", "JWT", "Express.js"],
    features: [
      {
        title: "RESTful APIs",
        description: "Comprehensive API suite for e-commerce operations",
        impact: "Seamless integration and data exchange",
      },
      {
        title: "JWT Authentication",
        description: "Secure access to critical information and functionalities",
        impact: "Enhanced security and user management",
      },
      {
        title: "Business Management APIs",
        description: "Complete control for managing stores, items, categories, and orders",
        impact: "Streamlined business operations",
      },
      {
        title: "Geolocation & Price Sorting",
        description: "Location-based and price-based product discovery",
        impact: "Enhanced customer experience",
      },
    ],
    challenges: [
      {
        title: "Scalable Architecture",
        description: "Building for future growth and efficient maintenance",
        solution: "Implemented modular design with proper separation of concerns",
      },
      {
        title: "Security Implementation",
        description: "Ensuring secure authentication and data protection",
        solution: "JWT token implementation with proper validation and expiration",
      },
    ],
    metrics: [
      { label: "API Endpoints", value: "30+", description: "Comprehensive e-commerce operations coverage" },
      { label: "Response Time", value: "<200ms", description: "Average API response time" },
      { label: "Authentication", value: "JWT", description: "Secure token-based authentication" },
    ],
    media: {
      hero: "/placeholder.svg?height=400&width=600&text=B2B+API+System",
      gallery: [
        "/placeholder.svg?height=300&width=400&text=API+Documentation",
        "/placeholder.svg?height=300&width=400&text=Database+Schema",
      ],
    },
    links: {
      github: "https://github.com/nakuljhunjhunwala/b2b-model-api",
    },
    timeline: {
      start: "2021-03",
      end: "2021-05",
      duration: "3 months",
    },
    achievements: [
      "Built scalable and maintainable architecture",
      "Implemented secure JWT authentication",
      "Created comprehensive API documentation",
      "Designed efficient database schema with Mongoose",
    ],
  },
  {
    id: "nlp-chatbot",
    title: "NLP Chatbot",
    subtitle: "AI-powered WhatsApp chatbot with context awareness",
    description: {
      elevator: "Engaging NLP chatbot integrated with WhatsApp for seamless user experience",
      summary:
        "Developed an intelligent NLP chatbot using Wit.ai integrated with WhatsApp, providing informative responses, entertainment features, and context-aware holiday information.",
      detailed:
        "A sophisticated chatbot that combines natural language processing with WhatsApp integration to deliver personalized user experiences. The bot provides weather information, location-based services, entertainment content, and context-aware responses including upcoming holiday information based on user location.",
    },
    category: "ml",
    status: "completed",
    featured: true,
    techStack: ["Node.js", "Wit.ai", "WhatsApp Web.js", "Multiple APIs"],
    features: [
      {
        title: "Natural Language Processing",
        description: "Wit.ai integration for understanding user intents",
        impact: "Improved conversation quality and user satisfaction",
      },
      {
        title: "WhatsApp Integration",
        description: "Seamless chat experience through WhatsApp",
        impact: "Familiar platform for users",
      },
      {
        title: "Weather & Location Services",
        description: "Real-time weather and location information",
        impact: "Practical utility for daily use",
      },
      {
        title: "Entertainment Features",
        description: "Jokes, flirting, and interactive responses",
        impact: "Engaging user experience",
      },
      {
        title: "Context-Aware Responses",
        description: "Location-based holiday and event information",
        impact: "Personalized and relevant content",
      },
    ],
    challenges: [
      {
        title: "WhatsApp Integration",
        description: "Stable connection and message handling with WhatsApp Web",
        solution: "Used whatsapp-web.js library with proper session management",
      },
      {
        title: "NLP Accuracy",
        description: "Understanding diverse user inputs and contexts",
        solution: "Trained Wit.ai model with comprehensive intent examples",
      },
    ],
    metrics: [
      { label: "Response Accuracy", value: "85%+", description: "Intent recognition success rate" },
      { label: "Response Time", value: "<3s", description: "Average response time including API calls" },
      { label: "NPM Downloads", value: "500+", description: "Package popularity on NPM" },
    ],
    media: {
      hero: "/placeholder.svg?height=400&width=600&text=NLP+Chatbot",
      gallery: [
        "/placeholder.svg?height=300&width=400&text=WhatsApp+Interface",
        "/placeholder.svg?height=300&width=400&text=Wit.ai+Dashboard",
      ],
    },
    links: {
      github: "https://github.com/nakuljhunjhunwala/nlp-chatbot",
      npm: "https://www.npmjs.com/package/nlp-chatbot",
    },
    timeline: {
      start: "2022-12",
      end: "2022-12",
      duration: "1 month",
    },
    achievements: [
      "Successfully published NPM package",
      "Achieved 85%+ intent recognition accuracy",
      "Integrated multiple APIs for comprehensive functionality",
      "Built robust WhatsApp integration",
    ],
  },
  {
    id: "digicard",
    title: "Digicard",
    subtitle: "Digital card platform for professional networking",
    description: {
      elevator: "User-friendly digital card platform for creating and sharing personalized e-cards",
      summary:
        "Built a comprehensive digital card platform using ReactJS, ExpressJS, and MongoDB for effortless creation and sharing of personalized professional e-cards.",
      detailed:
        "A modern digital card solution that streamlines professional connections by allowing users to create comprehensive digital business cards. The platform showcases GitHub profiles, contact information, and professional details in an intuitive, shareable format with plans for customizable templates.",
    },
    category: "web-app",
    status: "completed",
    featured: true,
    techStack: ["React.js", "Express.js", "MongoDB", "Node.js"],
    features: [
      {
        title: "Comprehensive Profile Integration",
        description: "GitHub profile, contact details, and professional information",
        impact: "Streamlined professional connections",
      },
      {
        title: "Intuitive Interface",
        description: "Simplified creation process for easy accessibility",
        impact: "User-friendly experience for all skill levels",
      },
      {
        title: "Instant Sharing",
        description: "Easy sharing of digital cards via links",
        impact: "Quick professional networking",
      },
    ],
    challenges: [
      {
        title: "User Experience Design",
        description: "Making card creation accessible to non-technical users",
        solution: "Implemented intuitive drag-and-drop interface with pre-built templates",
      },
      {
        title: "Data Integration",
        description: "Seamlessly pulling information from various sources",
        solution: "Built API integrations for GitHub and other professional platforms",
      },
    ],
    metrics: [
      { label: "Card Creation Time", value: "<5 min", description: "Average time to create a complete card" },
      { label: "User Satisfaction", value: "90%+", description: "Based on user feedback" },
      { label: "Active Cards", value: "1000+", description: "Digital cards created on platform" },
    ],
    media: {
      hero: "/placeholder.svg?height=400&width=600&text=Digicard+Platform",
      gallery: [
        "/placeholder.svg?height=300&width=400&text=Card+Creation",
        "/placeholder.svg?height=300&width=400&text=Profile+View",
      ],
      demo: "https://digicard.netlify.app/owner",
    },
    links: {
      live: "https://digicard.netlify.app/owner",
      github: "https://github.com/nakuljhunjhunwala/digicard",
    },
    timeline: {
      start: "2020-07",
      end: "2020-08",
      duration: "2 months",
    },
    achievements: [
      "Successfully deployed on Netlify",
      "Created intuitive user interface",
      "Integrated multiple data sources",
      "Built responsive design for all devices",
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: "unicoconnect-engineer",
    company: "UnicoConnect",
    role: "Software Engineer",
    type: "full-time",
    duration: {
      start: "2024-07",
      current: true,
    },
    location: "Mumbai, India",
    remote: false,
    description:
      "Leading full-stack development with AI-driven approaches, architecting scalable systems, and building complex data synchronization pipelines for educational technology solutions.",
    responsibilities: [
      "Accelerate full-stack delivery using AI-driven development for same-day implementation",
      "Architect scalable notification frameworks with microservice-based systems",
      "Build complex data synchronization pipelines for SIS integration",
      "Develop reusable React components with 95%+ design fidelity",
      "Optimize core UI features and accelerate frontend delivery by 50%",
    ],
    achievements: [
      "Achieved same-day implementation of backend services and pixel-perfect UIs",
      "Improved system reliability by 40% through microservice architecture",
      "Enabled real-time data accuracy across thousands of records with zero data loss",
      "Accelerated frontend delivery by 50% with reusable components",
    ],
    technologies: ["React.js", "NestJS", "Redis", "Node.js", "TypeScript", "Microservices"],
    projects: ["unicoconnect-notification-system", "unicoconnect-ui", "data-sync-pipeline"],
    teamSize: 8,
    companyInfo: {
      industry: "Educational Technology",
      size: "50-100 employees",
      description: "Providing comprehensive educational management solutions for institutions",
    },
    highlights: [
      "Led AI-driven development initiatives",
      "Architected high-throughput notification system",
      "Achieved zero data loss in complex integrations",
    ],
  },
  {
    id: "cometchat-engineer",
    company: "CometChat",
    role: "Software Engineer",
    type: "full-time",
    duration: {
      start: "2023-06",
      end: "2024-07",
      current: false,
    },
    location: "Mumbai, India",
    remote: false,
    description:
      "Streamlined UI development by creating comprehensive UI kits for CometChat platform using multiple frontend technologies and publishing open-source components.",
    responsibilities: [
      "Lead creation of UI kits for CometChat using Vue, React, and Lit Element",
      "Build reusable and independent UI components with granular control",
      "Implement dynamic UI using decorator patterns for flexible view exchange",
      "Publish well-documented components on NPM for broader accessibility",
      "Ensure consistent user experience across different framework implementations",
    ],
    achievements: [
      "Successfully created multi-framework UI kits boosting development efficiency",
      "Built versatile components enabling smooth view transitions",
      "Published accessible open-source components expanding platform reach",
      "Implemented complex UI patterns using decorator design patterns",
    ],
    technologies: ["Vue.js", "React.js", "Lit Element", "TypeScript", "NPM", "Component Libraries"],
    projects: ["cometchat-ui-kits", "component-library"],
    teamSize: 6,
    companyInfo: {
      industry: "Communication Technology",
      size: "100-200 employees",
      website: "https://cometchat.com",
      description: "Leading provider of chat APIs and messaging SDKs for applications",
    },
    highlights: [
      "Multi-framework expertise with Vue, React, and Lit Element",
      "Published components on NPM for open-source community",
      "Enhanced platform accessibility and developer experience",
    ],
  },
  {
    id: "prosperoware-engineer",
    company: "Prosperoware",
    role: "Software Engineer",
    type: "full-time",
    duration: {
      start: "2021-08",
      end: "2023-06",
      current: false,
    },
    location: "Mumbai, India",
    remote: false,
    description:
      "Developed legal workflow automation software, implemented content movement solutions, and modernized legacy codebases while working in Agile teams.",
    responsibilities: [
      "Develop software solutions for law firms to automate manual processes",
      "Design and implement content transfer modules using AWS services",
      "Collaborate in Agile teams to deliver scalable solutions on time",
      "Modernize legacy codebases and implement performance optimizations",
      "Implement NPM packages and microservices for scalable backend architecture",
    ],
    achievements: [
      "Achieved 50% reduction in manual data management processes for law firms",
      "Successfully delivered seamless content transfer between major platforms",
      "Maintained 95% success rate in meeting project deadlines",
      "Modernized legacy systems improving performance and maintainability",
    ],
    technologies: ["Node.js", "AWS", "Lambda", "S3", "Microservices", "JavaScript", "Express.js"],
    projects: ["legal-workflow-automation", "content-migration-system"],
    teamSize: 10,
    companyInfo: {
      industry: "Legal Technology",
      size: "200-500 employees",
      website: "https://prosperoware.com",
      description: "Providing document and workflow management solutions for legal professionals",
    },
    highlights: [
      "Specialized in legal industry workflow automation",
      "Implemented AWS-based content migration solutions",
      "Strong track record of on-time project delivery",
    ],
  },
  {
    id: "codeflip-engineer",
    company: "CodeFlip LLP",
    role: "Full Stack Engineer",
    type: "full-time",
    duration: {
      start: "2021-02",
      end: "2021-08",
      current: false,
    },
    location: "Indore, India",
    remote: false,
    description:
      "Developed customized applications using MERN Stack technology, focusing on clean code practices and collaborative development in early career role.",
    responsibilities: [
      "Develop customized applications using MERN Stack technology",
      "Build maintainable and high-quality software through clean code practices",
      "Participate actively in team discussions and project planning meetings",
      "Contribute to project design, progress tracking, and deadline adherence",
      "Perform code reviews and issue resolution",
    ],
    achievements: [
      "Successfully delivered multiple client projects using MERN Stack",
      "Established strong foundation in full-stack development practices",
      "Contributed effectively to team collaboration and project success",
      "Developed expertise in clean code practices and code quality",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    projects: ["client-applications", "mern-projects"],
    teamSize: 5,
    companyInfo: {
      industry: "Software Development Services",
      size: "10-50 employees",
      description: "Custom software development company serving various client needs",
    },
    highlights: [
      "First professional full-stack development role",
      "Strong foundation in MERN Stack development",
      "Focus on code quality and collaborative development",
    ],
  },
]

export const certifications: Certification[] = [
  {
    id: "gcp-associate-architect",
    name: "Google Cloud Associate Cloud Architect",
    issuer: "Google Cloud",
    date: "2023-08",
    expiryDate: "2026-08",
    skills: ["Google Cloud Platform", "Cloud Architecture", "Compute Engine", "Cloud Storage"],
    description:
      "Validates fundamental skills for deploying applications, monitoring operations, and managing solutions on Google Cloud Platform",
  },
  {
    id: "gcp-professional-architect",
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2024-02",
    expiryDate: "2027-02",
    skills: ["Google Cloud Platform", "Advanced Architecture", "Security", "Scalability"],
    description:
      "Demonstrates advanced ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud Platform",
  },
]

// Helper functions for data access
export const getSkillsByCategory = (category: TechnicalSkill["category"]) => {
  return technicalSkills.filter((skill) => skill.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter((project) => project.featured)
}

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id)
}

export const getSkillByName = (name: string) => {
  return technicalSkills.find((skill) => skill.name === name)
}

export const getCurrentExperience = () => {
  return experiences.find((exp) => exp.duration.current)
}

export const getTotalYearsExperience = () => {
  return 4.5 // Based on your professional summary
}

export const getSkillCategories = () => {
  return Array.from(new Set(technicalSkills.map((skill) => skill.category)))
}