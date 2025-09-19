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
    "id": "credit-card-recommendation-system",
    "title": "Credit Card Recommendation System",
    "subtitle": "AI-Powered PDF Analysis & Personalized Credit Card Optimization Platform",
    "description": {
      "elevator": "Revolutionary AI-powered system that analyzes credit card statements via PDF upload and provides personalized card recommendations to maximize rewards and optimize spending patterns",
      "summary": "A comprehensive full-stack application that combines PDF statement processing with advanced AI transaction categorization, intelligent MCC discovery, and personalized credit card recommendations. Features Google Gemini AI integration, background job processing with real-time updates, secure session management, and advanced spending pattern analysis with savings calculations.",
      "detailed": "The Credit Card Recommendation System represents a breakthrough in financial optimization technology. It seamlessly processes PDF credit card statements using advanced text extraction, leverages Google Gemini AI for intelligent transaction categorization with 90%+ accuracy, and employs sophisticated MCC (Merchant Category Code) discovery through fuzzy matching algorithms. The system features a self-improving database that gets smarter with each processed statement, background job processing with real-time progress updates, and generates personalized credit card recommendations with detailed savings analysis. The architecture includes secure session management, comprehensive error handling, rate limiting, and production-ready deployment configurations."
    },
    "category": "fintech-ai-platform",
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
      "documentation": "/credit-card-api-docs"
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
    "category": "interactive-portfolio",
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
      "themes": {
        "retro": "https://nakuljhunjhunwala.in/themes/retro",
        "code": "https://nakuljhunjhunwala.in/themes/code",
        "terminal": "https://nakuljhunjhunwala.in/themes/terminal",
        "glass": "https://nakuljhunjhunwala.in/themes/glass"
      }
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
    },
    "gameDetails": {
      "breakout": {
        "description": "Classic brick-breaking game with paddle physics and power-ups",
        "controls": "Arrow keys to move paddle, space to launch ball"
      },
      "snake": {
        "description": "Traditional snake game with growing mechanics and collision detection",
        "controls": "Arrow keys for direction, space to start/restart"
      },
      "tetris": {
        "description": "Full Tetris implementation with line clearing and increasing speed",
        "controls": "Arrow keys to move/rotate, space to drop"
      },
      "spaceInvaders": {
        "description": "Classic space shooter with enemy waves and power-ups",
        "controls": "Arrow keys to move, space to shoot"
      },
      "pong": {
        "description": "Two-player Pong with AI opponent and physics",
        "controls": "Arrow keys to move paddle"
      },
      "flappyBird": {
        "description": "Bird flying game with obstacle avoidance mechanics",
        "controls": "Space to flap wings"
      },
      "dinoGame": {
        "description": "Chrome dinosaur-style endless runner",
        "controls": "Space to jump over obstacles"
      },
      "roadRush": {
        "description": "Car racing game with traffic dodging mechanics",
        "controls": "Arrow keys to steer and accelerate"
      },
      "ticTacToe": {
        "description": "Strategic tic-tac-toe with AI opponent",
        "controls": "Click to place markers"
      }
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