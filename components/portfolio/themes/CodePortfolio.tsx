"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, getTotalYearsExperience, technicalSkills, projects, experiences } from "@/constants/portfolio"
import { 
  travelExperiences, 
  getBucketListStats, 
  getCompletedBucketList, 
  getPendingBucketList,
  getVisitedPlaces,
  getDreamDestinations,
} from "@/constants/personal"
import { CodeEditor } from "./CodeEditor"
import { CodeFileTabs } from "./CodeFileTabs"
import { CodeStatusBar } from "./CodeStatusBar"
import { CodeWindow } from "./CodeWindow"
import TravelEmbed from "../TravelEmbed"

export type PortfolioFileType =
  | "portfolio.tsx"
  | "journey.tsx"
  | "skills.json"
  | "projects.md"
  | "dreams.ts"
  | "travel-explorer.tsx"
  | "contact.tsx"

export default function CodePortfolio() {
  const [activeFile, setActiveFile] = useState<PortfolioFileType>("portfolio.tsx")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 2000)
  }

  const portfolioFiles = {
    "portfolio.tsx": {
      language: "typescript",
      content: `// Welcome to ${personalInfo.name}'s Development Universe
// Building the future, one line at a time

class Developer {
  constructor() {
    this.name = "${personalInfo.name}";
    this.title = "${personalInfo.title}";
    this.location = "${personalInfo.location}";
    this.passion = "Creating amazing user experiences";
    this.skills = this.loadSkillMatrix();
    this.experience = this.calculateExperience();
  }

  async buildAmazingThings() {
    const creativity = await this.generateIdeas();
    const technology = this.selectBestTools();
    const teamwork = this.collaborateWithOthers();
    
    return this.combine(creativity, technology, teamwork);
  }

  getPhilosophy() {
    return "Crafting exceptional digital experiences with cutting-edge technology";
  }
}

const nakul = new Developer();
console.log(nakul.getPhilosophy());`,
    },
    "journey.tsx": {
      language: "typescript",
      content: `// Professional & Educational Journey
// Complete timeline of career and academic growth

interface JourneyItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  duration: {
    start: string;
    end?: string;
    current: boolean;
  };
  location: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

// Combined journey timeline
const journeyTimeline: JourneyItem[] = [
  // Professional Experience
${experiences.map((exp, index) => `  {
    id: "${exp.id}",
    type: "experience",
    title: "${exp.role}",
    organization: "${exp.company}",
    duration: {
      start: "${exp.duration.start}",
      ${exp.duration.end ? `end: "${exp.duration.end}",` : ''}
      current: ${exp.duration.current}
    },
    location: "${exp.location}",
    description: "${exp.description.replace(/"/g, '\\"')}",
    achievements: [
${exp.achievements.slice(0, 3).map(achievement => `      "${achievement.replace(/"/g, '\\"')}"`).join(',\n')}
    ],
    technologies: [
${exp.technologies.slice(0, 6).map(tech => `      "${tech}"`).join(',\n')}
    ]
  }${index < experiences.length - 1 || personalInfo.education.length > 0 ? ',' : ''}`).join(',\n')}${personalInfo.education.length > 0 ? ',\n' : ''}
  // Educational Background
${personalInfo.education.map((edu, index) => `  {
    id: "edu-${index}",
    type: "education",
    title: "${edu.degree}",
    organization: "${edu.institution}",
    duration: {
      start: "${edu.year.split('-')[0]}",
      ${edu.year.includes('-') ? `end: "${edu.year.split('-')[1]}",` : ''}
      current: false
    },
    location: "${edu.location}",
    description: "${edu.degree.includes('Computer') ? 
      'Focused on software development, programming fundamentals, and computer science principles.' :
      edu.degree.includes('Commerce') ?
      'Studied business fundamentals, commerce principles, and analytical thinking.' :
      'Built strong foundational knowledge and critical thinking skills.'}",
    achievements: [${edu.honors ? `\n      "${edu.honors}"\n    ` : ''}]
  }${index < personalInfo.education.length - 1 ? ',' : ''}`).join(',\n')}
].sort((a, b) => new Date(b.duration.start).getTime() - new Date(a.duration.start).getTime());

// Journey Statistics
const journeyStats = {
  totalExperience: "4.5+ years",
  companiesWorked: ${experiences.length},
  degreesEarned: ${personalInfo.education.length},
  technologiesUsed: 15,
  achievements: ${experiences.reduce((acc, exp) => acc + exp.achievements.length, 0)}
};

export { journeyTimeline, journeyStats };`,
    },
    "skills.json": {
      language: "json",
      content: JSON.stringify(
        technicalSkills.map(({ name, category }) => ({ name, category })),
        null,
        2
      ),
    },
    "projects.md": {
      language: "markdown",
      content: `# Featured Projects\n\n${projects
        .filter((p) => p.featured)
        .map(
          (p: any) =>
            `### ${p.title}\n**Stack**: ${p.techStack.join(", ")}\n[View Project](${
              p.links.live || p.links.github
            })`
        )
        .join("\n\n---\n")}`,
    },
    "dreams.ts": {
      language: "typescript",
      content: `// Life Dreams & Bucket List
// Personal goals and aspirations with progress tracking

interface DreamItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  completed: boolean;
}

const dreamStats = {
  total: ${getBucketListStats().total},
  completed: ${getBucketListStats().completed},
  pending: ${getBucketListStats().pending},
  completionRate: ${getBucketListStats().completionRate}
};

// Achieved Dreams 🏆
const achievedDreams: DreamItem[] = [
${getCompletedBucketList().map(item => `  {
    id: "${item.id}",
    title: "${item.title}",
    icon: "${item.icon}",
    color: "${item.color}",
    completed: true
  }`).join(',\n')}
];

// Future Dreams ⭐
const futureDreams: DreamItem[] = [
${getPendingBucketList().map(item => `  {
    id: "${item.id}",
    title: "${item.title}",
    icon: "${item.icon}",
    color: "${item.color}",
    completed: false
  }`).join(',\n')}
];

export { dreamStats, achievedDreams, futureDreams };

// 🎯 Next milestone: Complete ${getPendingBucketList()[0]?.title || 'next dream on the list'}!`,
    },
    "travel-explorer.tsx": {
      language: "tsx",
      content: `// travel-explorer.tsx — Live Travel Dashboard
// This file renders an interactive travel map with real trip data

import { TravelMap } from '@/components/maps/IndiaMap';
import { useTripData } from '@/hooks/useTripData';

export default function TravelExplorer() {
  const { trips, stats } = useTripData();

  // Stats: ${getVisitedPlaces().length} places visited
  //        ${getDreamDestinations().length} dream destinations
  //        ${[...new Set(travelExperiences.map(t => t.country))].length} countries

  return (
    <TravelMap
      trips={trips}
      interactive={true}
      showStats={true}
    />
  );
}

// See live preview in the panel below ↓`,
    },

    "contact.tsx": {
      language: "typescript",
      content: `import { Mail, MessageCircle, ExternalLink } from 'lucide-react';

const ContactInfo = () => ({
  email: "${personalInfo.email}",
  whatsapp: "+91 ${personalInfo.whatsappNumber}",
  website: "${personalInfo.website}",
  resume: "${personalInfo.resumeUrl}",
  
  // Quick contact actions
  quickContact: {
    whatsapp: "https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F",
    email: "mailto:${personalInfo.email}?subject=Hi%20Nakul!%20Let's%20collaborate&body=Hi%20Nakul,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20love%20to%20discuss%20potential%20opportunities.%0A%0ABest%20regards",
    resume: "${personalInfo.resumeUrl}"
  },
  
  socials: {
    LinkedIn: "${personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url}",
    GitHub: "${personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.url}",
    DigiCard: "${personalInfo.socialLinks.find((s) => s.platform === "DigiCard")?.url}",
    WhatsApp: "${personalInfo.socialLinks.find((s) => s.platform === "WhatsApp")?.url}",
  },
  
  // Availability status
  availability: {
    status: "${personalInfo.availability.status}",
    message: "${personalInfo.availability.message}",
    nextAvailable: "${personalInfo.availability.nextAvailable}"
  }
});

// Ready to collaborate? Let's build something amazing! 🚀
export default ContactInfo;
`,
    },

  }

  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center p-4 font-mono antialiased">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        <CodeWindow title={`${activeFile} - ${personalInfo.name} Portfolio`}>
          <div className="relative">
            <CodeFileTabs
              files={Object.entries(portfolioFiles).map(([name, { language }]) => ({
                name: name as PortfolioFileType,
                language,
              }))}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
          </div>

          {activeFile === "travel-explorer.tsx" ? (
            <div className="flex flex-col h-full">
              <div className="flex-none h-[25%] overflow-auto">
                <CodeEditor
                  file={activeFile}
                  content={portfolioFiles[activeFile].content}
                  language={portfolioFiles[activeFile].language}
                />
              </div>
              <div className="flex-none h-[2px] bg-[#3e3e42]" />
              <div className="flex-1 relative">
                <div className="absolute top-0 left-0 right-0 bg-[#2d2d30] border-b border-[#3e3e42] px-3 py-1 text-[11px] text-gray-400 flex items-center gap-2 z-10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  Live Preview
                </div>
                <div className="pt-6 h-full">
                  <TravelEmbed
                    view="map"
                    height="100%"
                    showExploreButton={false}
                    onTripClick={(slug) => window.open(`https://travel.nakuljhunjhunwala.in/trips/${slug}`, '_blank')}
                  />
                </div>
              </div>
            </div>
          ) : (
            <CodeEditor
              file={activeFile}
              content={portfolioFiles[activeFile].content}
              language={portfolioFiles[activeFile].language}
            />
          )}

          <CodeStatusBar
            fileName={activeFile}
            lines={portfolioFiles[activeFile].content.split("\n").length}
          />
        </CodeWindow>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleRun}
            className={`bg-[#007acc] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg ${
              isRunning ? "bg-[#4ec9b0] text-black" : "hover:bg-[#006bb3]"
            }`}
            disabled={isRunning}
            whileHover={{ scale: isRunning ? 1 : 1.05, y: -2 }}
            whileTap={{ scale: isRunning ? 1 : 0.95 }}
          >
            {isRunning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Compiling...
              </>
            ) : (
              "▶ npm start"
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
