"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, getTotalYearsExperience, technicalSkills, projects } from "@/constants/portfolio"
import { CodeEditor } from "./CodeEditor"
import { CodeFileTabs } from "./CodeFileTabs"
import { CodeStatusBar } from "./CodeStatusBar"
import { CodeWindow } from "./CodeWindow"

export type PortfolioFileType =
  | "portfolio.tsx"
  | "skills.json"
  | "projects.md"
  | "contact.tsx"
  | "certificates.md"

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
    "contact.tsx": {
      language: "typescript",
      content: `import { Mail, Phone } from 'lucide-react';

const ContactInfo = () => ({
  email: "${personalInfo.email}",
  website: "${personalInfo.website}",
  socials: {
    LinkedIn: "${personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url}",
    GitHub: "${personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.url}",
    DigiCard: "${personalInfo.socialLinks.find((s) => s.platform === "DigiCard")?.url}",
  }
});

export default ContactInfo;
`,
    },
    "certificates.md": {
      language: "markdown",
      content: `# Certifications & Education\n\n${personalInfo.education
        .map((e: any) => `### ${e.degree} - ${e.institution}\n*${e.year}*`)
        .join("\n\n")}`,
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

          <CodeEditor
            file={activeFile}
            content={portfolioFiles[activeFile].content}
            language={portfolioFiles[activeFile].language}
          />

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
