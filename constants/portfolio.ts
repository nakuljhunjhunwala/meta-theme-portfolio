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
  title: "Senior Full-Stack Developer & AI-Driven Development Specialist",
  tagline: "Pioneering AI-driven development to achieve 80-90% productivity gains while building scalable, user-centric applications",
  bio: {
    short: "4.6+ year Full-Stack Developer specializing in AI-driven development, achieving 80-90% productivity increases and reducing development cycles from weeks to days.",
    medium:
      "Passionate full-stack developer with 4.6+ years of experience in AI-driven development, modern web technologies, and cloud architecture. Pioneered AI development tool adoption achieving 80-90% productivity gains, reducing 4-week cycles to 2-3 days. Expert in React, Node.js, NestJS, microservices architecture, and enterprise-scale solutions. Google Cloud Professional & Associate Certified architect with proven track record of 100% on-time delivery and technical leadership.",
    detailed:
      "I'm a senior full-stack developer with 4.6+ years of experience revolutionizing development workflows through AI-driven tools and modern web technologies. I pioneered AI development adoption at UnicoConnect, achieving 80-90% productivity increases and compressing 4-week development cycles into 2-3 days. My expertise spans the entire stack: React, Vue.js, Node.js, NestJS, TypeScript, microservices architecture, and cloud platforms (AWS, GCP). I've architected enterprise-scale notification frameworks processing high-throughput communications, built AI-powered financial analysis platforms, and created innovative portfolio experiences. As a Google Cloud Professional & Associate Certified architect, I combine technical excellence with business impact, maintaining a 100% on-time delivery record while leading teams through AI transformation. I'm passionate about leveraging cutting-edge AI tools to build intelligent, scalable solutions that solve real-world problems.",
  },
  location: "Mumbai, India",
  avatar: "/profile_photo.jpg",
  email: "jhunjhunwalanakul@gmail.com",
  website: "https://nakuljhunjhunwala.in",
  whatsappNumber: 8856020006,
  resumeUrl: "/resume.pdf",
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
  // Frontend & Languages
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 95,
    yearsExperience: 4.6,
    icon: "javascript",
    color: "#F7DF1E",
    description: "Expert-level JavaScript (ES6+) with deep understanding of async/await, closures, prototypes, and modern language features",
    projects: ["storytime-calendar", "digicard", "b2b-api-system", "nlp-chatbot", "unicoconnect-backend"],
    lastUsed: "2024-12",
  },
  {
    name: "React.js",
    category: "frontend",
    proficiency: 95,
    yearsExperience: 4.6,
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
    yearsExperience: 4.6,
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
    yearsExperience: 4.6,
    icon: "nodejs",
    color: "#339933",
    description: "Advanced Node.js development with microservices, async patterns, and performance optimization",
    projects: ["storytime-calendar", "b2b-api-system", "unicoconnect-backend", "nlp-chatbot"],
    lastUsed: "2024-12",
  },
  {
    name: "NestJS",
    category: "backend",
    proficiency: 90,
    yearsExperience: 1.5,
    icon: "nestjs",
    color: "#E0234E",
    description: "Enterprise-grade backend framework with TypeScript, dependency injection, and microservices architecture for scalable notification systems",
    projects: ["unicoconnect-notification-system", "enterprise-backend-projects"],
    lastUsed: "2024-12",
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 92,
    yearsExperience: 4.6,
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
  {
    name: "RESTful APIs",
    category: "backend",
    proficiency: 95,
    yearsExperience: 4.6,
    icon: "api",
    color: "#009688",
    description: "Expert in designing and implementing RESTful API architectures with proper HTTP methods, status codes, and API versioning",
    projects: ["storytime-calendar", "b2b-api-system", "digicard", "unicoconnect-backend"],
    lastUsed: "2024-12",
  },
  {
    name: "Microservices Architecture",
    category: "backend",
    proficiency: 88,
    yearsExperience: 2.5,
    icon: "microservices",
    color: "#FF6B6B",
    description: "Design and implementation of microservices-based architectures with service isolation, API gateways, and inter-service communication",
    projects: ["unicoconnect-notification-system", "prosperoware-integrations", "scalable-backend-systems"],
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
    yearsExperience: 4.6,
    icon: "mongodb",
    color: "#47A248",
    description: "Document modeling and database design with Mongoose and aggregation pipelines",
    projects: ["b2b-api-system", "digicard", "nlp-chatbot"],
    lastUsed: "2024-12",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 85,
    yearsExperience: 1.5,
    icon: "redis",
    color: "#DC382D",
    description: "High-performance caching, session management, queue systems for enterprise notification frameworks",
    projects: ["storytime-calendar", "unicoconnect-notification-system"],
    lastUsed: "2024-12",
  },
  {
    name: "DynamoDB",
    category: "database",
    proficiency: 78,
    yearsExperience: 2,
    icon: "dynamodb",
    color: "#4053D6",
    description: "NoSQL database design with AWS DynamoDB for serverless applications and high-throughput workloads",
    projects: ["prosperoware-integrations", "aws-serverless-apps"],
    lastUsed: "2023-06",
  },
  {
    name: "MySQL",
    category: "database",
    proficiency: 82,
    yearsExperience: 3,
    icon: "mysql",
    color: "#4479A1",
    description: "Relational database design, query optimization, and data integrity management",
    projects: ["enterprise-applications", "backend-systems"],
    lastUsed: "2024-06",
  },
  {
    name: "Elasticsearch",
    category: "database",
    proficiency: 75,
    yearsExperience: 1.5,
    icon: "elasticsearch",
    color: "#005571",
    description: "Full-text search, log analytics, and real-time data indexing for enterprise applications",
    projects: ["prosperoware-integrations", "search-systems"],
    lastUsed: "2023-06",
  },
  {
    name: "Firebase",
    category: "database",
    proficiency: 80,
    yearsExperience: 2,
    icon: "firebase",
    color: "#FFCA28",
    description: "Real-time database, authentication, and cloud functions for rapid application development",
    projects: ["real-time-apps", "mobile-backend"],
    lastUsed: "2023-12",
  },
  {
    name: "SQL",
    category: "database",
    proficiency: 85,
    yearsExperience: 4.6,
    icon: "sql",
    color: "#00758F",
    description: "Advanced SQL query writing, database design, optimization, and data manipulation across PostgreSQL and MySQL",
    projects: ["storytime-calendar", "enterprise-applications", "backend-systems"],
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
  // Development Tools & AI
  {
    name: "AI-Driven Development",
    category: "ai",
    proficiency: 95,
    yearsExperience: 1.5,
    icon: "ai-tools",
    color: "#10A37F",
    description: "Pioneered AI development tool adoption (Cursor IDE, code generation) achieving 80-90% productivity gains and reducing development cycles from 4 weeks to 2-3 days",
    projects: ["unicoconnect-ai-transformation", "rapid-development-projects"],
    lastUsed: "2024-12",
  },
  {
    name: "Git",
    category: "devops",
    proficiency: 92,
    yearsExperience: 4.6,
    icon: "git",
    color: "#F05032",
    description: "Advanced version control, branching strategies, and collaborative development workflows",
    projects: ["all-projects"],
    lastUsed: "2024-12",
  },
  {
    name: "CI/CD",
    category: "devops",
    proficiency: 82,
    yearsExperience: 3,
    icon: "cicd",
    color: "#2088FF",
    description: "Continuous integration and deployment pipelines with automated testing and release management",
    projects: ["enterprise-applications", "automated-deployments"],
    lastUsed: "2024-12",
  },
  {
    name: "Serverless Architecture",
    category: "cloud",
    proficiency: 85,
    yearsExperience: 2.5,
    icon: "serverless",
    color: "#FD5750",
    description: "AWS Lambda, serverless frameworks, and event-driven architectures for cost-effective scalability",
    projects: ["prosperoware-integrations", "aws-lambda-functions"],
    lastUsed: "2023-06",
  },
  {
    name: "Agile/Scrum",
    category: "other",
    proficiency: 90,
    yearsExperience: 3.5,
    icon: "agile",
    color: "#0052CC",
    description: "Expert in Agile methodologies, sprint planning, daily standups, retrospectives, and delivering in iterative cycles with 95% on-time success rate",
    projects: ["prosperoware-integrations", "codeflip-projects", "unicoconnect-development"],
    lastUsed: "2024-12",
  },
  {
    name: "Performance Optimization",
    category: "other",
    proficiency: 88,
    yearsExperience: 4,
    icon: "performance",
    color: "#00D084",
    description: "Code optimization, database query tuning, caching strategies, and application performance monitoring",
    projects: ["prosperoware-integrations", "unicoconnect-backend", "storytime-calendar"],
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
      ],
      demo: "https://github.com/nakuljhunjhunwala/StoryTimeCalendar#demo"
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
    "id": "credit-card-recommendation-system",
    "title": "Credit Card Recommendation System",
    "subtitle": "AI-Powered PDF Analysis & Personalized Credit Card Optimization Platform",
    "description": {
      "elevator": "Revolutionary AI-powered system that analyzes credit card statements via PDF upload and provides personalized card recommendations to maximize rewards and optimize spending patterns",
      "summary": "A comprehensive full-stack application that combines PDF statement processing with advanced AI transaction categorization, intelligent MCC discovery, and personalized credit card recommendations. Features Google Gemini AI integration, background job processing with real-time updates, secure session management, and advanced spending pattern analysis with savings calculations.",
      "detailed": "The Credit Card Recommendation System represents a breakthrough in financial optimization technology. It seamlessly processes PDF credit card statements using advanced text extraction, leverages Google Gemini AI for intelligent transaction categorization with 90%+ accuracy, and employs sophisticated MCC (Merchant Category Code) discovery through fuzzy matching algorithms. The system features a self-improving database that gets smarter with each processed statement, background job processing with real-time progress updates, and generates personalized credit card recommendations with detailed savings analysis. The architecture includes secure session management, comprehensive error handling, rate limiting, and production-ready deployment configurations."
    },
    "category": "ai-platform",
    "status": "completed",
    "featured": true,
    "techStack": [
      "Node.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Google Gemini AI",
      "React.js",
      "Vite",
      "Zustand",
      "shadcn/ui",
      "Tailwind CSS",
      "PDF-Parse",
      "Fuzzy Matching",
      "Background Jobs",
      "Rate Limiting",
      "Session Management"
    ],
    "features": [
      {
        "title": "Intelligent PDF Statement Analysis",
        "description": "Advanced PDF processing with text extraction, validation, and AI-powered transaction parsing using Google Gemini",
        "impact": "Automated transaction extraction from any bank's PDF format with 95%+ accuracy and secure file handling"
      },
      {
        "title": "AI-Powered Transaction Categorization",
        "description": "Smart categorization using Google Gemini AI with merchant name standardization and MCC code assignment",
        "impact": "90%+ categorization accuracy with self-improving algorithms and confidence scoring"
      },
      {
        "title": "MCC Discovery & Research Engine",
        "description": "Intelligent merchant category code identification through fuzzy matching and AI-enhanced research",
        "impact": "Comprehensive MCC database that grows smarter with each processed statement"
      },
      {
        "title": "Background Job Processing",
        "description": "Asynchronous processing pipeline with real-time status updates and retry mechanisms",
        "impact": "Scalable system handling intensive AI operations without blocking user experience"
      },
      {
        "title": "Personalized Card Recommendations",
        "description": "Advanced matching algorithms considering spending patterns, annual fees, and benefit optimization",
        "impact": "Tailored recommendations with detailed savings projections and ROI calculations"
      },
      {
        "title": "Advanced Spending Analytics",
        "description": "Comprehensive spending pattern analysis with category breakdowns and trend identification",
        "impact": "Deep insights into spending habits with actionable optimization recommendations"
      },
      {
        "title": "Secure Session Management",
        "description": "Session-based architecture with automatic cleanup and no persistent user data storage",
        "impact": "Privacy-first approach with enterprise-level security and data protection"
      },
      {
        "title": "Modern React Frontend",
        "description": "Responsive UI with Zustand state management, shadcn/ui components, and real-time progress tracking",
        "impact": "Intuitive user experience with seamless processing feedback and beautiful interface"
      }
    ],
    "challenges": [
      {
        "title": "Multi-Format PDF Processing",
        "description": "Handling diverse PDF layouts from different banks with varying transaction formats",
        "solution": "Implemented robust PDF parsing with format detection and intelligent text preprocessing"
      },
      {
        "title": "AI Transaction Accuracy",
        "description": "Achieving high accuracy in transaction extraction and categorization from unstructured PDF text",
        "solution": "Developed sophisticated prompt engineering with Google Gemini and confidence scoring validation"
      },
      {
        "title": "MCC Code Discovery",
        "description": "Identifying merchant category codes for unknown merchants while building comprehensive database",
        "solution": "Created fuzzy matching algorithms with AI-powered research and self-improving database architecture"
      },
      {
        "title": "Real-time Processing Updates",
        "description": "Providing live progress updates for time-intensive background AI processing jobs",
        "solution": "Implemented background job queue with status polling and real-time progress tracking"
      },
      {
        "title": "Spending Pattern Analysis",
        "description": "Accurately analyzing complex spending patterns to generate meaningful insights and recommendations",
        "solution": "Built comprehensive analytics engine with statistical analysis and pattern recognition algorithms"
      }
    ],
    "metrics": [
      {
        "label": "Transaction Accuracy",
        "value": "95%+",
        "description": "AI-powered extraction and categorization success rate"
      },
      {
        "label": "Processing Speed",
        "value": "<30s",
        "description": "Average PDF statement processing time"
      },
      {
        "label": "MCC Database",
        "value": "4000+",
        "description": "Comprehensive merchant category codes"
      },
      {
        "label": "Categorization Accuracy",
        "value": "90%+",
        "description": "Smart transaction categorization success"
      },
      {
        "label": "API Response Time",
        "value": "<2s",
        "description": "Average API endpoint response time"
      },
      {
        "label": "System Uptime",
        "value": "99.5%+",
        "description": "Target system availability and reliability"
      }
    ],
    "media": {
      "hero": "/credit-card-system-hero.png",
      "gallery": [
        "/pdf-upload-interface.png",
        "/ai-transaction-analysis.png",
        "/spending-analytics-dashboard.png",
        "/card-recommendations.png",
        "/mcc-discovery-engine.png"
      ]
    },
    "links": {
      "github": "https://github.com/nakuljhunjhunwala/CreditCardSuggestor",
      "caseStudy": "https://github.com/nakuljhunjhunwala/CreditCardSuggestor#readme"
    },
    "timeline": {
      "start": "2024-09-01",
      "end": "2024-11-15",
      "duration": "2.5 months of comprehensive development"
    },
    "team": {
      "size": 1,
      "role": "Lead Full-Stack Developer & AI Integration Specialist",
      "responsibilities": [
        "Architected complete AI-powered financial analysis system",
        "Implemented advanced PDF processing and text extraction",
        "Built intelligent MCC discovery and categorization engine",
        "Designed comprehensive spending analytics and recommendation algorithms",
        "Created modern React frontend with real-time progress tracking",
        "Developed production-ready backend with security and scalability"
      ]
    },
    "achievements": [
      "Built comprehensive AI-powered financial analysis platform",
      "Achieved 95%+ accuracy in PDF transaction extraction",
      "Implemented self-improving MCC discovery system with 4000+ codes",
      "Created advanced recommendation engine with savings calculations",
      "Developed secure session-based architecture with automatic cleanup",
      "Built scalable background job processing with real-time updates",
      "Implemented comprehensive spending analytics and pattern recognition",
      "Created production-ready system with full documentation and deployment guides"
    ],
    "testimonial": {
      "text": "This project demonstrates exceptional fintech engineering capabilities, combining advanced AI integration with sophisticated financial analysis. The MCC discovery system and recommendation algorithms showcase senior-level problem-solving skills.",
      "author": "Technical Review",
      "role": "Senior Fintech Engineer",
      "company": "Industry Expert"
    }
  }, {
    "id": "meta-portfolio-website",
    "title": "Meta Portfolio Website",
    "subtitle": "Immersive Multi-Theme Portfolio with Interactive Gaming Experiences",
    "description": {
      "elevator": "Revolutionary portfolio website featuring multiple immersive themes including a retro arcade with playable mini-games, code editor interface, terminal experience, and glass morphism design",
      "summary": "An innovative Next.js portfolio that transcends traditional presentation formats by offering multiple interactive experiences. Features a fully functional retro arcade with 9 playable games, a realistic code editor interface, an interactive terminal with real commands, and a stunning glass morphism theme. Built with performance, SEO optimization, and accessibility in mind while delivering unprecedented user engagement through gamification and interactive storytelling.",
      "detailed": "The Meta Portfolio represents a paradigm shift in personal branding and portfolio presentation. It combines cutting-edge web technologies with creative interactive experiences to create an unforgettable user journey. The retro arcade theme features fully playable games including Breakout, Snake, Tetris, Space Invaders, and more, all built with HTML5 Canvas and optimized performance. The code editor theme presents information in a familiar IDE interface, while the terminal theme offers a fully functional command-line experience with real commands. The system includes advanced SEO optimization with JSON-LD structured data, route-based navigation with SSG, persistent user preferences, and comprehensive accessibility features."
    },
    "category": "web-app",
    "status": "completed",
    "featured": true,
    "techStack": [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "HTML5 Canvas",
      "next-themes",
      "Lucide Icons",
      "shadcn/ui",
      "JSON-LD",
      "SSG",
      "Accessibility APIs",
      "Performance Optimization"
    ],
    "features": [
      {
        "title": "Retro Arcade Experience",
        "description": "Fully functional retro gaming experience with 9 playable mini-games built with HTML5 Canvas",
        "impact": "Revolutionary portfolio engagement with games including Breakout, Snake, Tetris, Space Invaders, Pong, Flappy Bird, Dino Game, Road Rush, and Tic-Tac-Toe"
      },
      {
        "title": "Code Editor Interface",
        "description": "Realistic IDE-style presentation of portfolio content with syntax highlighting and familiar developer experience",
        "impact": "Appeals to technical audiences with authentic code editor aesthetics and functionality"
      },
      {
        "title": "Interactive Terminal Experience",
        "description": "Fully functional terminal interface with real commands for exploring portfolio content",
        "impact": "Engaging command-line experience with commands like 'about', 'skills --category frontend', 'projects --id', 'neofetch', and more"
      },
      {
        "title": "Glass Morphism Theme",
        "description": "Modern glass morphism design with stunning visual effects and smooth animations",
        "impact": "Cutting-edge aesthetic appeal with translucent elements and backdrop filters"
      },
      {
        "title": "Route-Based Theme Navigation",
        "description": "Direct URL access to specific themes with SSG optimization and canonical URLs",
        "impact": "SEO-optimized theme routing with shareable links and fast loading through static generation"
      },
      {
        "title": "Advanced SEO Optimization",
        "description": "Comprehensive SEO with JSON-LD structured data, robots.txt, sitemap, and rich snippets",
        "impact": "Maximum search engine visibility with structured data for Person, WebSite, and Project schemas"
      },
      {
        "title": "Persistent User Preferences",
        "description": "Zustand-powered state management with local storage persistence for theme preferences and visit stats",
        "impact": "Personalized experience that remembers user choices and tracks engagement"
      },
      {
        "title": "Performance & Accessibility",
        "description": "Optimized performance with hydration guards, motion preferences, keyboard navigation, and high contrast support",
        "impact": "Inclusive design meeting WCAG standards while maintaining exceptional performance"
      }
    ],
    "challenges": [
      {
        "title": "Multi-Game Development",
        "description": "Building 9 different playable games with consistent performance and responsive controls",
        "solution": "Implemented optimized HTML5 Canvas rendering with efficient game loops and unified control schemes"
      },
      {
        "title": "Theme System Architecture",
        "description": "Creating seamless transitions between vastly different UI experiences without performance degradation",
        "solution": "Developed route-based theme system with SSG optimization and eliminated global animations to prevent conflicts"
      },
      {
        "title": "Terminal Command System",
        "description": "Building a realistic terminal experience with actual command parsing and help systems",
        "solution": "Created comprehensive command parser with auto-completion, help system, and contextual content delivery"
      },
      {
        "title": "SEO for Dynamic Content",
        "description": "Optimizing SEO for multiple themes while maintaining structured data and canonical URLs",
        "solution": "Implemented advanced JSON-LD schemas with per-theme metadata and comprehensive sitemap generation"
      },
      {
        "title": "Performance with Rich Interactions",
        "description": "Maintaining 60fps performance across games and animations while supporting all devices",
        "solution": "Optimized Canvas rendering, implemented efficient state management, and added performance monitoring"
      }
    ],
    "metrics": [
      {
        "label": "Interactive Experiences",
        "value": "4",
        "description": "Retro Arcade, Code Editor, Terminal, Glass Morphism"
      },
      {
        "label": "Playable Games",
        "value": "9",
        "description": "Fully functional mini-games with optimized performance"
      },
      {
        "label": "Performance Score",
        "value": "95+",
        "description": "Lighthouse performance score across all themes"
      },
      {
        "label": "SEO Score",
        "value": "100",
        "description": "Perfect SEO optimization with structured data"
      },
      {
        "label": "Accessibility Score",
        "value": "98+",
        "description": "WCAG compliant with keyboard navigation"
      },
      {
        "label": "Load Time",
        "value": "<1.5s",
        "description": "First contentful paint with SSG optimization"
      }
    ],
    "media": {
      "hero": "/meta-portfolio-hero.png",
      "gallery": [
        "/retro-arcade-games.png",
        "/code-editor-interface.png",
        "/terminal-experience.png",
        "/glass-morphism-theme.png",
        "/theme-switcher.png"
      ]
    },
    "links": {
      "live": "https://nakuljhunjhunwala.in",
      "github": "https://github.com/nakuljhunjhunwala/portfolio",
      "caseStudy": "https://github.com/nakuljhunjhunwala/portfolio#themes"
    },
    "timeline": {
      "start": "2024-10-01",
      "end": "2024-12-15",
      "duration": "2.5 months of creative development"
    },
    "team": {
      "size": 1,
      "role": "Lead Frontend Developer & UX Innovation Specialist",
      "responsibilities": [
        "Architected innovative multi-theme portfolio system",
        "Developed 9 playable HTML5 Canvas games with optimized performance",
        "Built realistic terminal interface with command parsing system",
        "Implemented advanced SEO optimization with JSON-LD structured data",
        "Created accessible design system supporting multiple interaction modes",
        "Designed seamless theme switching with route-based navigation"
      ]
    },
    "achievements": [
      "Created revolutionary portfolio format with 4 distinct interactive experiences",
      "Built 9 fully playable games with consistent 60fps performance",
      "Achieved perfect SEO scores with comprehensive structured data",
      "Implemented realistic terminal experience with 15+ functional commands",
      "Developed innovative theme system with SSG optimization",
      "Created accessible design supporting keyboard navigation and screen readers",
      "Built comprehensive analytics tracking user engagement across themes",
      "Established new paradigm for interactive portfolio presentation"
    ],
    "testimonial": {
      "text": "This portfolio redefines what's possible in personal branding. The combination of technical excellence, creative vision, and flawless execution creates an unforgettable experience that showcases exceptional frontend engineering skills.",
      "author": "Design Review",
      "role": "Senior UX Engineer",
      "company": "Industry Expert"
    }
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
      caseStudy: "https://github.com/nakuljhunjhunwala/b2b-model-api#readme"
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
        "A sophisticated chatbot that combines natural language processing with WhatsApp integration to deliver personalized user experiences. The bot provides weather information, location-based services, entertainment content, and context-aware responses including upcoming holiday information based on user location. Published as an NPM package with 500+ downloads.",
    },
    category: "ml",
    status: "completed",
    featured: true,
    techStack: ["Node.js", "Wit.ai", "WhatsApp Web.js", "Multiple APIs", "Natural Language Processing"],
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
  },
  {
    id: "digicard",
    title: "DigiCard - Digital Business Card Platform",
    subtitle: "User-friendly digital card creation and sharing platform",
    description: {
      elevator: "Effortless creation and sharing of personalized digital business cards for streamlined professional connections",
      summary:
        "Built a comprehensive digital business card platform using ReactJS, ExpressJS, and MongoDB for creating and sharing professional e-cards. Features an intuitive interface that simplifies the creation process, making it accessible for everyone to create personalized digital cards.",
      detailed:
        "DigiCard is a modern digital business card platform that revolutionizes how professionals share their information. Built with the MERN stack, it provides a seamless experience for creating, customizing, and sharing digital cards that showcase GitHub profiles, contact information, social links, and professional details. The platform features an intuitive card creation interface, real-time preview, responsive design for all devices, and instant sharing capabilities. Future enhancements include customizable card templates for further personalization and increased user engagement.",
    },
    category: "web-app",
    status: "completed",
    featured: true,
    techStack: ["React.js", "Express.js", "Node.js", "MongoDB", "JavaScript", "REST APIs", "Responsive Design"],
    features: [
      {
        title: "Comprehensive Professional Information",
        description: "Digital cards showcase GitHub profiles, phone numbers, email, social media links, and professional details",
        impact: "Streamlines professional networking by consolidating all contact information in one place",
      },
      {
        title: "Intuitive Card Creation Interface",
        description: "Simplified creation process with user-friendly interface accessible to everyone",
        impact: "Enables anyone to create professional digital cards without technical expertise",
      },
      {
        title: "Real-Time Preview & Customization",
        description: "Live preview of card design with instant updates during editing",
        impact: "Enhanced user experience with immediate visual feedback",
      },
      {
        title: "Instant Sharing Capabilities",
        description: "Easy sharing of digital cards via links, QR codes, and social media",
        impact: "Facilitates quick professional connections and networking",
      },
      {
        title: "Responsive Design",
        description: "Fully responsive cards that look great on all devices",
        impact: "Ensures consistent professional presentation across mobile, tablet, and desktop",
      },
    ],
    challenges: [
      {
        title: "User-Friendly Design",
        description: "Creating an interface simple enough for non-technical users while powerful enough for customization",
        solution: "Implemented intuitive drag-and-drop interface with smart defaults and progressive disclosure of advanced features",
      },
      {
        title: "Data Management",
        description: "Efficiently storing and retrieving card data with quick load times",
        solution: "Optimized MongoDB schemas with proper indexing and implemented caching strategies",
      },
      {
        title: "Cross-Platform Compatibility",
        description: "Ensuring cards display correctly across different devices and screen sizes",
        solution: "Built responsive design system with mobile-first approach and extensive device testing",
      },
    ],
    metrics: [
      { label: "Card Creation Time", value: "<3min", description: "Average time to create a complete digital card" },
      { label: "Platform Stack", value: "MERN", description: "MongoDB, Express, React, Node.js" },
      { label: "Response Time", value: "<1s", description: "Card loading and sharing speed" },
      { label: "User Accessibility", value: "100%", description: "No technical knowledge required" },
    ],
    media: {
      hero: "/digicard-hero.png",
      gallery: [
        "/digicard-dashboard.png",
        "/card-creation-interface.png",
        "/card-preview-mobile.png",
        "/sharing-options.png",
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
    team: {
      size: 1,
      role: "Full-Stack Developer",
      responsibilities: [
        "Designed and implemented complete MERN stack application",
        "Built intuitive user interface with React.js",
        "Developed RESTful APIs with Express.js and Node.js",
        "Designed database schema and data models with MongoDB",
        "Implemented responsive design for cross-device compatibility",
      ],
    },
    achievements: [
      "Successfully launched digital card platform with MERN stack",
      "Created intuitive interface requiring zero technical knowledge",
      "Built comprehensive card sharing system with multiple options",
      "Implemented responsive design working across all devices",
      "Designed scalable architecture for future template customization",
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
      "Pioneering AI-driven development adoption to revolutionize productivity, architecting enterprise-scale notification frameworks, and leading full-stack development as sole backend engineer for critical client projects.",
    responsibilities: [
      "Pioneered AI-driven development adoption: Research, implement, and train teams on AI development tools, achieving 80-90% productivity increase",
      "Architect scalable notification framework: Deliver mission-critical communication service (push, email, SMS) for largest client's Brain app using NestJS, Redis queues, and microservices",
      "Lead full-stack development as sole backend engineer: Successfully replicate entire Brain app functionality for Unischool project with same-day API delivery",
      "Maintain technical excellence: Achieve 100% on-time delivery record while establishing comprehensive documentation standards for code and no-code platforms (Xano)",
      "Demonstrate technical leadership: Conduct cross-functional training sessions and voluntarily manage challenging client engagements",
    ],
    achievements: [
      "Reduced 4-week development cycles to 2-3 days across full-stack projects through AI-driven tools",
      "Achieved 80-90% productivity increase by pioneering AI development adoption and training teams",
      "Improved system reliability by 40% through microservices architecture for enterprise notification framework",
      "Maintained 100% on-time delivery record across all projects",
      "Delivered mission-critical notification service (push, email, SMS) within 30 days for largest client",
      "Successfully replicated entire Brain app functionality maintaining same-day API delivery pace and 95%+ design fidelity",
      "Earned GCP certifications (Associate Cloud Engineer, Professional Cloud Architect)",
      "Established comprehensive documentation standards for both code and no-code platforms",
    ],
    technologies: ["React.js", "NestJS", "Redis", "Node.js", "TypeScript", "Microservices", "AI Development Tools", "Xano", "Google Cloud Platform"],
    projects: ["unicoconnect-notification-system", "brain-app-replication", "unischool-backend", "ai-driven-development"],
    teamSize: 8,
    companyInfo: {
      industry: "Educational Technology",
      size: "50-100 employees",
      description: "Providing comprehensive educational management solutions for institutions",
    },
    highlights: [
      "Pioneered AI-driven development achieving 80-90% productivity gains",
      "Architected high-throughput enterprise notification system improving reliability by 40%",
      "100% on-time delivery record as sole backend engineer",
      "GCP Associate & Professional Cloud Architect certified",
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
      "Led creation of comprehensive UI kits for CometChat platform using Vue, React, and Lit Element, streamlining UI development and publishing open-source components to expand platform accessibility.",
    responsibilities: [
      "Streamlined UI development: Led creation of UI kits for CometChat leveraging Vue, React, and Lit Element to boost efficiency and consistency",
      "Built reusable UI components: Crafted versatile and independent components empowering users with granular control over features, styling, and smooth view transitions",
      "Implemented dynamic UI using decorator patterns: Employed decorator patterns to implement complex UIs, enabling flexible and efficient view exchange",
      "Enhanced accessibility through open-source: Published well-documented components on NPM, expanding reach and promoting broader accessibility",
      "Ensured consistent user experience across different framework implementations",
    ],
    achievements: [
      "Successfully created multi-framework UI kits (Vue, React, Lit Element) boosting development efficiency and consistency",
      "Built versatile and independent components with granular control enabling smooth view transitions",
      "Published well-documented open-source components on NPM, expanding platform reach and accessibility",
      "Implemented complex UI patterns using decorator design patterns for flexible view exchange",
      "Enhanced developer experience across multiple frontend frameworks",
    ],
    technologies: ["Vue.js", "React.js", "Lit Element", "TypeScript", "NPM", "Component Libraries", "Decorator Patterns", "UI/UX Design"],
    projects: ["cometchat-ui-kits", "component-library", "npm-packages"],
    teamSize: 6,
    companyInfo: {
      industry: "Communication Technology",
      size: "100-200 employees",
      website: "https://cometchat.com",
      description: "Leading provider of chat APIs and messaging SDKs for applications",
    },
    highlights: [
      "Led multi-framework UI kit development (Vue, React, Lit Element)",
      "Published NPM packages expanding open-source accessibility",
      "Implemented decorator patterns for complex UI functionality",
      "Enhanced platform developer experience and consistency",
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
      "Developed legal workflow automation software achieving 50% reduction in manual processes, designed AWS-based content migration solutions for major platforms, and maintained 95% on-time delivery rate in Agile environment.",
    responsibilities: [
      "Legal workflow automation: Developed software for law firms achieving 50% reduction in manual data management processes",
      "Collaborative content movement: Designed and implemented modules using AWS (Lambda, S3, SNS, SQS, SES) to seamlessly transfer content between IManage, Teams, and NetDocuments",
      "Agile delivery champion: Achieved 95% success rate in meeting project deadlines and delivering scalable solutions through Agile team collaboration",
      "Code revitalization: Modernized legacy codebases, optimized performance, and implemented NPM packages for improved functionality",
      "Scalable architecture: Utilized microservices for scalable backend architecture and cloud-based solutions",
    ],
    achievements: [
      "Achieved 50% reduction in manual data management processes for law firms through workflow automation",
      "Successfully delivered seamless content transfer between IManage, Teams, and NetDocuments using AWS services",
      "Maintained 95% success rate in meeting project deadlines across all projects",
      "Modernized legacy codebases improving performance and maintainability",
      "Implemented NPM packages and microservices for scalable backend architecture",
      "Delivered scalable solutions through effective Agile team collaboration",
    ],
    technologies: ["Node.js", "AWS Lambda", "AWS S3", "AWS SNS", "AWS SQS", "AWS SES", "Microservices", "JavaScript", "Express.js", "NPM", "Agile/Scrum"],
    projects: ["legal-workflow-automation", "content-migration-system", "imanage-integration", "teams-netdocuments-transfer"],
    teamSize: 10,
    companyInfo: {
      industry: "Legal Technology",
      size: "200-500 employees",
      website: "https://prosperoware.com",
      description: "Providing document and workflow management solutions for legal professionals",
    },
    highlights: [
      "50% reduction in manual processes through workflow automation",
      "AWS-based content migration between major platforms (IManage, Teams, NetDocuments)",
      "95% on-time delivery rate in Agile environment",
      "Legacy code modernization and performance optimization",
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
  return 4.6
}

export const getSkillCategories = () => {
  return Array.from(new Set(technicalSkills.map((skill) => skill.category)))
}