"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, projects, getSkillsByCategory } from "@/constants/portfolio"
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  Star,
  Calendar,
  MapPin,
} from "lucide-react"

type SectionId = "home" | "about" | "skills" | "projects" | "contact"

export default function GlassPortfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("glass-explorer")

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [unlockAchievement])

  const sections: Array<{ id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const handleNavigate = (id: SectionId) => {
    setActiveSection(id)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic Background with better contrast */}
      <div
        className="fixed inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(139, 92, 246, 0.2) 0%, 
              rgba(59, 130, 246, 0.15) 25%, 
              rgba(16, 185, 129, 0.1) 50%, 
              transparent 70%
            ),
            linear-gradient(135deg, 
              rgba(139, 92, 246, 0.05) 0%, 
              rgba(59, 130, 246, 0.03) 25%, 
              rgba(16, 185, 129, 0.05) 50%, 
              rgba(245, 101, 101, 0.03) 75%, 
              rgba(251, 191, 36, 0.05) 100%
            )
          `,
        }}
      />

      {/* Floating Glass Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 md:w-32 md:h-32 rounded-full backdrop-blur-sm bg-white/5 border border-white/10"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-xl py-2 md:py-3 min-h-[72px] md:min-h-[88px]">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {sections.map((section) => {
                const IconComponent = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                      activeSection === section.id
                        ? "bg-white/30 text-white shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-[72px] md:pt-[88px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
             {activeSection === "home" && <HomeSection onNavigate={handleNavigate} />}
            {activeSection === "about" && <AboutSection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "contact" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Ambient Light Effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, 0.1) 0%, 
            transparent 50%
          )`,
        }}
      />
    </div>
  )
}

function HomeSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="relative min-h-[calc(100vh-88px)] md:min-h-[calc(100vh-88px)] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 mx-auto mb-4 md:mb-8 rounded-full backdrop-blur-xl bg-black/20 border border-white/30 flex items-center justify-center text-4xl md:text-6xl shadow-2xl overflow-hidden"
        >
          <img
            src={personalInfo.avatar || "/placeholder.svg"}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 drop-shadow-lg"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/90 mb-5 md:mb-6 leading-relaxed drop-shadow-md max-w-3xl mx-auto"
        >
          {personalInfo.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => onNavigate("projects")}
            className="px-8 py-3 backdrop-blur-xl bg-black/30 border border-white/30 rounded-full text-white font-semibold hover:bg-black/40 transition-all transform hover:scale-105 shadow-lg"
            aria-label="View My Work"
          >
            View My Work
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-3 backdrop-blur-xl bg-purple-500/30 border border-purple-400/50 rounded-full text-white font-semibold hover:bg-purple-500/40 transition-all transform hover:scale-105 shadow-lg"
            aria-label="Get In Touch"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-6"
        >
          {personalInfo.socialLinks.slice(0, 3).map((social, index) => {
            const IconComponent =
              social.platform === "GitHub" ? Github : social.platform === "LinkedIn" ? Linkedin : Twitter
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 backdrop-blur-xl bg-black/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-all transform hover:scale-110 shadow-lg"
                aria-label={social.platform}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60 animate-bounce" />
        </motion.div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-white/90 text-lg leading-relaxed mb-6 drop-shadow-sm">{personalInfo.bio.detailed}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>
                  {personalInfo.availability.status === "available"
                    ? "Available for opportunities"
                    : personalInfo.availability.message}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Award className="w-5 h-5" />
                <span>{personalInfo.availability.message}</span>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-black/10 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">Quick Facts</h3>
            <div className="space-y-3">
              {[
                "🚀 Senior Full-stack developer",
                "☁️ Cloud architecture specialist",
                "🎨 UI/UX design enthusiast",
                "📱 Mobile-first approach",
                "🔧 DevOps practitioner",
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-white/90 drop-shadow-sm"
                >
                  {fact}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SkillsSection() {
  const skillCategories = ["frontend", "backend", "database", "cloud", "devops"] as const

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Skills & Technologies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => {
          const categorySkills = getSkillsByCategory(category)
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-4 capitalize drop-shadow-sm">{category}</h3>
              <div className="space-y-3">
                {categorySkills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between">
                    <span className="text-white/90 drop-shadow-sm">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-4 h-4 ${
                            starIndex < Math.floor(skill.proficiency / 20)
                              ? "text-yellow-400 fill-current"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects
          .filter((p) => p.featured)
          .map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl overflow-hidden hover:bg-black/30 transition-all transform hover:scale-105 shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl">
                {project.media?.hero ? (
                  <img
                    src={project.media.hero}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">No preview</div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-sm">{project.title}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed drop-shadow-sm">
                  {project.description.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs backdrop-blur-xl bg-black/20 border border-white/30 rounded-full text-white/90 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 text-xs text-white/60">+{project.techStack.length - 3} more</span>
                  )}
                </div>

                <div className="flex space-x-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-2 backdrop-blur-xl bg-black/20 border border-white/30 rounded-lg text-white/90 hover:bg-black/30 transition-all text-sm shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-2 backdrop-blur-xl bg-black/20 border border-white/30 rounded-lg text-white/90 hover:bg-black/30 transition-all text-sm shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {!project.links.live && !project.links.github && (
                    <span className="text-white/60 text-sm">Links unavailable</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

function ContactSection() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">Let's Work Together</h2>

        <p className="text-white/90 text-lg mb-8 leading-relaxed drop-shadow-sm">
          I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to
          say hi, I'll try my best to get back to you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Mail,
              label: "Email",
              value: personalInfo.email,
              href: `mailto:${personalInfo.email}`,
            },
            {
              icon: Github,
              label: "GitHub",
              value: personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.handle || "@alexchen",
              href: personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.url || "#",
            },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.handle || "Alex Chen",
              href: personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "#",
            },
          ].map((contact, index) => {
            const IconComponent = contact.icon
            return (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-xl bg-black/10 border border-white/20 rounded-2xl p-6 hover:bg-black/20 transition-all transform hover:scale-105 shadow-lg max-w-full"
              >
                <IconComponent className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-white/70 text-sm mb-1 drop-shadow-sm">{contact.label}</div>
                <div className="text-white font-medium drop-shadow-sm break-all">{contact.value}</div>
              </a>
            )
          })}
        </div>

        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center space-x-2 px-8 py-4 backdrop-blur-xl bg-purple-500/30 border border-purple-400/50 rounded-full text-white font-semibold hover:bg-purple-500/40 transition-all transform hover:scale-105 shadow-lg"
        >
          <Mail className="w-5 h-5" />
          <span>Send Message</span>
        </a>
      </motion.div>
    </div>
  )
}
