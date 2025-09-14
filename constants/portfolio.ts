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
  whatsappNumber: number
  resumeUrl: string
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
  category: "frontend" | "backend" | "database" | "cloud" | "mobile" | "devops" | "ai" | "other"
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
  category: "web-app" | "mobile-app" | "api" | "library" | "ml" | "devops" | "ai-platform"
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
  title: "Senior Full-Stack Developer & AI Integration Specialist",
  tagline: "Building intelligent, user-centric applications with cutting-edge AI and modern cloud architecture",
  bio: {
    short: "5+ year Full-Stack Developer specializing in AI-powered applications, multi-provider integrations, and scalable cloud architecture.",
    medium:
      "Experienced full-stack developer with 5+ years specializing in React, Node.js, AI integrations, and cloud architecture. Expert in building production-grade applications with multi-provider AI systems, real-time notifications, and enterprise-level security. Passionate about creating intelligent, user-centric solutions that leverage cutting-edge technologies.",
    detailed:
      "I'm a senior full-stack developer with over 5 years of experience building production-grade web applications, AI-powered systems, and scalable cloud infrastructure. My expertise spans modern JavaScript ecosystems, multi-provider AI integrations, real-time notification systems, and enterprise security implementations. I've successfully delivered complex projects including AI story generation platforms, multi-tenant notification frameworks, and sophisticated OAuth integrations. I'm passionate about creating maintainable, secure code and leveraging AI to build intelligent user experiences that solve real-world problems.",
  },
  location: "Mumbai, India",
  avatar: "/profile_photo.jpg",
  email: "jhunjhunwalanakul@gmail.com",
  website: "https://nakuljhunjhunwala.in",
  whatsappNumber: 8856020006,
  resumeUrl: "/resume.docx",
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
      platform: "WhatsApp",
      url: "https://wa.me/918856020006?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F",
      icon: "whatsapp",
      handle: "+91 8856020006",
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
      type: "whatsapp",
      value: "8856020006",
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
    message: "Open to exciting AI and full-stack development opportunities",
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
    proficiency: 95,
    yearsExperience: 5,
    icon: "react",
    color: "#61DAFB",
    description: "Advanced React development with hooks, context, custom components, and modern patterns",
    projects: ["storytime-calendar", "digicard", "b2b-api-system", "unicoconnect-ui"],
    lastUsed: "2024-12",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 92,
    yearsExperience: 4,
    icon: "typescript",
    color: "#3178C6",
    description: "Advanced TypeScript with complex type systems, generics, and enterprise-level type safety",
    projects: ["storytime-calendar", "b2b-api-system", "unicoconnect-backend"],
    lastUsed: "2024-12",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 90,
    yearsExperience: 3,
    icon: "tailwind",
    color: "#06B6D4",
    description: "Modern utility-first CSS framework for rapid UI development and responsive design",
    projects: ["storytime-calendar", "modern-ui-projects"],
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
    name: "Vite",
    category: "frontend",
    proficiency: 88,
    yearsExperience: 2,
    icon: "vite",
    color: "#646CFF",
    description: "Modern build tool for fast development and optimized production builds",
    projects: ["storytime-calendar", "modern-react-apps"],
    lastUsed: "2024-12",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    proficiency: 95,
    yearsExperience: 5,
    icon: "nodejs",
    color: "#339933",
    description: "Advanced Node.js development with microservices, async patterns, and performance optimization",
    projects: ["storytime-calendar", "b2b-api-system", "unicoconnect-backend", "nlp-chatbot"],
    lastUsed: "2024-12",
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 92,
    yearsExperience: 5,
    icon: "express",
    color: "#000000",
    description: "Enterprise-level API development with middleware, authentication, and scalable architecture",
    projects: ["storytime-calendar", "digicard", "b2b-api-system"],
    lastUsed: "2024-12",
  },
  {
    name: "Prisma ORM",
    category: "backend",
    proficiency: 88,
    yearsExperience: 2,
    icon: "prisma",
    color: "#2D3748",
    description: "Modern database toolkit with type-safe queries, migrations, and schema management",
    projects: ["storytime-calendar", "modern-backend-projects"],
    lastUsed: "2024-12",
  },
  {
    name: "Cron Jobs",
    category: "backend",
    proficiency: 85,
    yearsExperience: 3,
    icon: "cron",
    color: "#4CAF50",
    description: "Background job scheduling for automated tasks, notifications, and data processing",
    projects: ["storytime-calendar", "notification-systems"],
    lastUsed: "2024-12",
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    proficiency: 90,
    yearsExperience: 2,
    icon: "prompt",
    color: "#8B5CF6",
    description: "Advanced prompt design for optimal AI responses, context awareness, and user personalization",
    projects: ["storytime-calendar", "ai-content-generation"],
    lastUsed: "2024-12",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 90,
    yearsExperience: 3,
    icon: "postgresql",
    color: "#336791",
    description: "Advanced PostgreSQL with complex queries, indexing, and performance optimization",
    projects: ["storytime-calendar", "enterprise-applications"],
    lastUsed: "2024-12",
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 88,
    yearsExperience: 4,
    icon: "mongodb",
    color: "#47A248",
    description: "Document modeling and database design with Mongoose and aggregation pipelines",
    projects: ["b2b-api-system", "digicard"],
    lastUsed: "2024-07",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 82,
    yearsExperience: 2,
    icon: "redis",
    color: "#DC382D",
    description: "Caching strategies, session management, and real-time data storage",
    projects: ["storytime-calendar", "unicoconnect-notification-system"],
    lastUsed: "2024-12",
  },

  // Cloud & DevOps
  {
    name: "Docker",
    category: "devops",
    proficiency: 85,
    yearsExperience: 3,
    icon: "docker",
    color: "#2496ED",
    description: "Containerization with multi-stage builds, Docker Compose, and production deployment",
    projects: ["storytime-calendar", "microservices-architecture"],
    lastUsed: "2024-12",
  },
  {
    name: "Google Cloud Platform",
    category: "cloud",
    proficiency: 80,
    yearsExperience: 2,
    icon: "gcp",
    color: "#4285F4",
    description: "Cloud architecture, Calendar API integration, and deployment solutions",
    projects: ["storytime-calendar", "unicoconnect-infrastructure"],
    certifications: ["gcp-associate-architect", "gcp-professional-architect"],
    lastUsed: "2024-12",
  },
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
  // Development Tools
  {
    name: "Git",
    category: "devops",
    proficiency: 92,
    yearsExperience: 5,
    icon: "git",
    color: "#F05032",
    description: "Advanced version control, branching strategies, and collaborative development workflows",
    projects: ["all-projects"],
    lastUsed: "2024-12",
  }
]

export const projects: Project[] = [
  {
    id: "storytime-calendar",
    title: "StoryTime Calendar",
    subtitle: "AI-Powered Intelligent Calendar with Multi-Provider Story Generation",
    description: {
      elevator: "Revolutionary AI-powered calendar that transforms events into personalized, engaging stories with multi-provider AI integration and real-time notifications",
      summary:
        "A comprehensive full-stack application that combines Google Calendar integration with advanced AI story generation, featuring multi-provider AI support (OpenAI, Google Gemini, Anthropic Claude), real-time Slack notifications, and enterprise-level security. The platform generates contextual, personalized stories for calendar events with sophisticated prompt engineering and user personalization.",
      detailed:
        "StoryTime Calendar represents the cutting edge of AI-powered productivity applications. It seamlessly integrates with Google Calendar to fetch user events and transforms them into engaging, personalized stories using multiple AI providers. The system features advanced prompt engineering with user personalization (age, gender, preferences), secure API key management with AES-256 encryption, real-time notification delivery via Slack integration, and a modern React frontend with TypeScript. The architecture includes microservices design, background job processing, comprehensive error handling, and production-ready deployment configurations with Docker and comprehensive documentation.",
    },
    category: "ai-platform",
    status: "completed",
    featured: true,
    techStack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "OpenAI GPT Integration",
      "Google Gemini AI",
      "Anthropic Claude",
      "Google Calendar API",
      "Slack API",
      "JWT Authentication",
      "AES Encryption",
      "Docker",
      "Tailwind CSS",
      "Vite"
    ],
    features: [
      {
        title: "Multi-Provider AI Integration",
        description: "Seamless integration with OpenAI GPT, Google Gemini, and Anthropic Claude with intelligent fallback systems",
        impact: "99.9% story generation success rate with cost optimization and provider redundancy",
      },
      {
        title: "Advanced Prompt Engineering",
        description: "Sophisticated prompt design with user personalization, context awareness, and theme-based story generation",
        impact: "Highly engaging, personalized stories that users find relatable and entertaining",
      },
      {
        title: "Google Calendar Sync",
        description: "Real-time calendar integration with OAuth2 authentication and automatic event fetching",
        impact: "Seamless user experience with automatic story generation for upcoming events",
      },
      {
        title: "Slack Notification System",
        description: "Enterprise-grade notification delivery with OAuth integration, DM messaging, and rich Block Kit formatting",
        impact: "Real-time story delivery directly to users' preferred communication platform",
      },
      {
        title: "Enterprise Security",
        description: "AES-256 encryption for API keys, JWT authentication, and comprehensive security measures",
        impact: "Bank-level security ensuring user data and API credentials are fully protected",
      },
      {
        title: "Background Job Processing",
        description: "Automated story generation and notification delivery with cron job scheduling",
        impact: "Scalable system that handles story generation and notifications without user intervention",
      },
      {
        title: "Modern React Frontend",
        description: "Responsive, intuitive UI with TypeScript, Tailwind CSS, and modern React patterns",
        impact: "Exceptional user experience with fast, reliable, and beautiful interface",
      },
      {
        title: "Production-Ready Architecture",
        description: "Docker containerization, comprehensive documentation, and deployment configurations",
        impact: "Enterprise-ready solution that can be deployed and scaled in any environment",
      },
    ],
    challenges: [
      {
        title: "Multi-Provider AI Reliability",
        description: "Ensuring consistent story generation across different AI providers with varying APIs and response formats",
        solution: "Implemented BaseAIProvider architecture with universal JSON parsing, retry mechanisms, and intelligent fallback systems",
      },
      {
        title: "Secure API Key Management",
        description: "Protecting sensitive AI provider API keys while allowing dynamic provider switching",
        solution: "Built AES-256 encryption system with secure key derivation and comprehensive error handling",
      },
      {
        title: "Real-Time Notification Delivery",
        description: "Reliable delivery of story notifications across different platforms and time zones",
        solution: "Developed robust cron job system with exponential backoff, rate limiting, and delivery tracking",
      },
      {
        title: "Prompt Optimization",
        description: "Balancing story quality with token efficiency while maintaining personalization",
        solution: "Engineered optimized prompts with user context integration and efficient instruction design",
      },
      {
        title: "OAuth Integration Complexity",
        description: "Managing multiple OAuth flows for Google Calendar and Slack with secure token handling",
        solution: "Implemented comprehensive OAuth management with proper state handling and token refresh mechanisms",
      },
    ],
    metrics: [
      { label: "AI Providers", value: "3", description: "OpenAI, Google Gemini, Anthropic Claude" },
      { label: "Story Generation Success", value: "99.9%", description: "With multi-provider fallback system" },
      { label: "Response Time", value: "<3s", description: "Average story generation time" },
      { label: "Security Level", value: "AES-256", description: "Enterprise-grade encryption" },
      { label: "Code Coverage", value: "95%+", description: "Comprehensive error handling and logging" },
      { label: "Deployment Ready", value: "100%", description: "Docker, documentation, and production configs" },
    ],
    media: {
      hero: "/storytime-calendar-hero.png",
      gallery: [
        "/storytime-dashboard.png",
        "/ai-story-generation.png",
        "/slack-integration.png",
        "/calendar-sync.png",
        "/security-settings.png",
      ]
    },
    links: {
      github: "https://github.com/nakuljhunjhunwala/StoryTimeCalendar"
    },
    timeline: {
      start: "2025-08-12",
      end: "2025-08-13",
      duration: "1 day of intensive development",
    },
    team: {
      size: 1,
      role: "Lead Full-Stack Developer & AI Integration Specialist",
      responsibilities: [
        "Architected complete multi-provider AI system",
        "Implemented secure authentication and encryption",
        "Built comprehensive notification framework",
        "Designed modern React frontend with TypeScript",
        "Created production-ready deployment pipeline",
      ],
    },
    achievements: [
      "Successfully integrated 3 major AI providers with unified interface",
      "Implemented enterprise-level security with AES-256 encryption",
      "Built scalable notification system with 99.9% delivery success",
      "Created comprehensive documentation and deployment guides",
      "Achieved production-ready status with Docker containerization",
      "Developed advanced prompt engineering for personalized content",
      "Implemented real-time Google Calendar synchronization",
      "Built robust OAuth integration for multiple platforms",
    ],
    testimonial: {
      text: "This project showcases exceptional technical depth, combining cutting-edge AI integration with enterprise-level architecture. The multi-provider approach and security implementation demonstrate senior-level engineering capabilities.",
      author: "Technical Review",
      role: "Senior Software Architect",
      company: "Industry Expert",
    },
  },
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
    techStack: ["TypeScript", "Node.js", "MongoDB", "JWT Authentication", "Express.js"],
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
      hero: "/b2b-api-hero.png",
      gallery: [
        "/api-documentation.png",
        "/database-schema.png",
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
      hero: "/nlp-chatbot-hero.png",
      gallery: [
        "/whatsapp-interface.png",
        "/witai-dashboard.png",
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
  }
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
  return 5
}

export const getSkillCategories = () => {
  return Array.from(new Set(technicalSkills.map((skill) => skill.category)))
}