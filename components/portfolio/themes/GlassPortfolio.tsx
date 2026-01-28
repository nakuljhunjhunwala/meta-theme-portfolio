"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, projects, getSkillsByCategory, experiences } from "@/constants/portfolio"
import { getAvatarSrc, getProjectImageSrc, handleImageError } from "@/lib/utils"
import {
  bucketList,
  travelExperiences,
  getBucketListStats,
  getCompletedBucketList,
  getPendingBucketList,
  getVisitedPlaces,
  getDreamDestinations
} from "@/constants/personal"
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
  GraduationCap,
  Building,
  Download,
  Target,
  Compass,
} from "lucide-react"
import PhysicsDreamsBucket from "./PhysicsDreamsBucket"
import AdvancedGlassMap from "./AdvancedGlassMap"


type SectionId = "home" | "about" | "journey" | "skills" | "projects" | "adventures" | "contact"

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
    { id: "journey", label: "Journey", icon: Calendar },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "adventures", label: "Adventures", icon: Compass },

    { id: "contact", label: "Contact", icon: Mail },
  ]

  const handleNavigate = (id: SectionId) => {
    setActiveSection(id)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-xl py-2 md:py-3">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-2xl p-2 sm:p-4 shadow-2xl">
            <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
              {sections.map((section) => {
                const IconComponent = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-2 rounded-xl transition-all flex-shrink-0 min-w-[44px] ${activeSection === section.id
                        ? "bg-white/30 text-white shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline text-xs md:text-sm font-medium whitespace-nowrap">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-[72px] md:pt-[88px] pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]"
          >
            {activeSection === "home" && <HomeSection onNavigate={handleNavigate} />}
            {activeSection === "about" && <AboutSection />}
            {activeSection === "journey" && <JourneySection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "adventures" && <AdventuresSection />}

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

      {/* Custom CSS for hiding scrollbars */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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
            src={getAvatarSrc(personalInfo.avatar)}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
            onError={(e) => handleImageError(e, '/placeholder.svg')}
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
                          className={`w-4 h-4 ${starIndex < Math.floor(skill.proficiency / 20)
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
                <img
                  src={getProjectImageSrc(project.media?.hero)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">Let's Build Something Amazing</h2>

        <p className="text-white/90 text-lg mb-6 leading-relaxed drop-shadow-sm">
          Ready to bring your ideas to life? I'm passionate about creating innovative solutions and would love to collaborate with you! Whether it's a complex web application or a quick chat about your project - let's connect! 🚀
        </p>

        <div className="text-center mb-8">
          <div className="inline-block bg-green-500/20 border border-green-400/50 rounded-full px-4 py-2 text-green-300 text-sm font-semibold">
            ⚡ Available for Immediate Projects • Quick Response Guaranteed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Mail,
              label: "Email",
              value: personalInfo.email,
              href: `mailto:${personalInfo.email}?subject=Hi%20Nakul!%20Let's%20collaborate&body=Hi%20Nakul,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20love%20to%20discuss%20potential%20opportunities.%0A%0ABest%20regards`,
              isPrimary: false
            },
            {
              icon: Mail, // Placeholder, will be handled specially
              label: "WhatsApp",
              value: `+91 ${personalInfo.whatsappNumber}`,
              href: `https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F`,
              isPrimary: true
            },
            {
              icon: Github,
              label: "GitHub",
              value: personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.handle || "@nakuljhunjhunwala",
              href: personalInfo.socialLinks.find((s) => s.platform === "GitHub")?.url || "#",
              isPrimary: false
            },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.handle || "nakuljjw",
              href: personalInfo.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "#",
              isPrimary: false
            },
          ].map((contact, index) => {
            const IconComponent = contact.icon
            return (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`backdrop-blur-xl ${contact.isPrimary ? 'bg-green-500/20 border-green-400/50 hover:bg-green-500/30' : 'bg-black/10 border-white/20 hover:bg-black/20'} border rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg max-w-full group`}
              >
                {contact.label === "WhatsApp" ? (
                  <div className="w-8 h-8 text-white mx-auto mb-3 flex items-center justify-center text-2xl">💬</div>
                ) : (
                  <IconComponent className="w-8 h-8 text-white mx-auto mb-3" />
                )}
                <div className={`text-sm mb-1 drop-shadow-sm ${contact.isPrimary ? 'text-green-300' : 'text-white/70'}`}>
                  {contact.label}
                </div>
                <div className="text-white font-medium drop-shadow-sm break-all text-sm">{contact.value}</div>
                {contact.isPrimary && (
                  <div className="text-green-300 text-xs mt-2 opacity-75 group-hover:opacity-100 transition-opacity">
                    Click to chat instantly!
                  </div>
                )}
              </a>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/91${personalInfo.whatsappNumber}?text=Hi%20Nakul!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20opportunities.%20Are%20you%20available%20for%20a%20quick%20chat%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 backdrop-blur-xl bg-green-500/30 border border-green-400/50 rounded-full text-white font-semibold hover:bg-green-500/40 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-lg">💬</div>
            <span>WhatsApp Me</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}?subject=Hi%20Nakul!%20Let's%20collaborate&body=Hi%20Nakul,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20impressed%20with%20your%20work.%20I'd%20love%20to%20discuss%20potential%20opportunities.%0A%0ABest%20regards`}
            className="inline-flex items-center space-x-2 px-8 py-4 backdrop-blur-xl bg-purple-500/30 border border-purple-400/50 rounded-full text-white font-semibold hover:bg-purple-500/40 transition-all transform hover:scale-105 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            <span>Send Email</span>
          </a>
          <a
            href={personalInfo.resumeUrl}
            download="Nakul_Jhunjhunwala_Resume.pdf"
            className="inline-flex items-center space-x-2 px-8 py-4 backdrop-blur-xl bg-blue-500/30 border border-blue-400/50 rounded-full text-white font-semibold hover:bg-blue-500/40 transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}



function AdventuresSection() {
  return (
    <div className="min-h-screen p-6 space-y-8 pb-20">
      {/* Travel Map - Top */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🗺️</span>
              Travel Journey
            </h2>
            <div className="text-emerald-300 text-sm bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-400/30">
              Interactive
            </div>
          </div>
          <div className="h-[450px] sm:h-[550px] md:h-[650px] lg:h-[700px] rounded-xl overflow-hidden relative">
            <AdvancedGlassMap />
          </div>
        </div>
      </motion.div>

      {/* Dreams Bucket - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 border border-white/25 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🪣</span>
              Dreams Bucket
            </h2>
            <div className="text-purple-300 text-sm bg-purple-500/20 px-4 py-2 rounded-full border border-purple-400/30">
              Drag & Drop
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden" style={{ minHeight: '600px' }}>
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 100%)'
              }}
            />
            <PhysicsDreamsBucket />
          </div>
        </div>
      </motion.div>
    </div>
  )
}



function JourneySection() {
  // Combine and sort experience and education data chronologically
  const journeyItems = [
    ...experiences.map((exp) => ({
      type: 'experience' as const,
      id: exp.id,
      title: exp.role,
      subtitle: exp.company,
      startDate: exp.duration.start,
      endDate: exp.duration.current ? "Present" : exp.duration.end,
      location: exp.location,
      description: exp.description,
      achievements: exp.achievements,
      technologies: exp.technologies,
      isCurrent: exp.duration.current
    })),
    ...personalInfo.education.map((edu, index) => ({
      type: 'education' as const,
      id: `edu-${index}`,
      title: edu.degree,
      subtitle: edu.institution,
      startDate: edu.year.split('-')[0],
      endDate: edu.year.split('-')[1] || edu.year.split('-')[0],
      location: edu.location,
      description: edu.degree.includes('Computer') ?
        "Focused on software development, programming fundamentals, database management, and computer science principles." :
        edu.degree.includes('Commerce') ?
          "Studied business fundamentals, commerce principles, and analytical thinking skills." :
          "Built strong foundational knowledge and critical thinking skills.",
      achievements: edu.honors ? [edu.honors] : [],
      technologies: [],
      isCurrent: false
    }))
  ].sort((a, b) => {
    // Sort by start date, most recent first
    const dateA = new Date(a.startDate)
    const dateB = new Date(b.startDate)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Enhanced Glass Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative"
      >
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-3xl -z-10"></div>
        <div className="p-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Professional & Educational Journey
          </h2>
          <p className="text-white/80 text-lg">A timeline of growth, learning, and achievement</p>
        </div>
      </motion.div>

      {/* Enhanced Timeline Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Timeline Line with Multiple Gradients - Fixed positioning */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:transform md:-translate-x-1/2 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-blue-400 via-green-400 to-pink-400"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>

        {/* Journey Items */}
        <div className="space-y-8 md:space-y-16">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Enhanced Timeline Node - Fixed positioning to match timeline exactly */}
              <motion.div
                className="absolute left-6 md:left-1/2 top-6 md:transform md:-translate-x-1/2 z-20"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                style={{ marginLeft: '-12px' }} // Perfect center alignment
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Timeline dot */}
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-2xl ${item.type === 'experience'
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400'
                      : 'bg-gradient-to-r from-pink-400 to-purple-400'
                    }`}></div>

                  {/* Emoji positioned exactly on center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] leading-none filter drop-shadow-sm">
                      {item.type === 'experience' ? '💼' : '🎓'}
                    </span>
                  </div>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                </div>
              </motion.div>

              {/* Enhanced Content Card with proper responsive sizing */}
              <div className={`w-full md:w-[45%] pl-16 md:pl-0 pr-4 md:pr-0 ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                }`}>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl hover:border-white/50 transition-all duration-300"
                >
                  {/* Glass Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Type Badge */}
                  <div className={`absolute -top-2 -right-2 md:-top-3 md:-right-3 px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold rounded-full border-2 backdrop-blur-xl ${item.type === 'experience'
                      ? 'bg-purple-500/30 border-purple-400/50 text-purple-200'
                      : 'bg-pink-500/30 border-pink-400/50 text-pink-200'
                    }`}>
                    {item.type === 'experience' ? 'WORK' : 'STUDY'}
                  </div>

                  {/* Header */}
                  <div className="relative z-10 mb-3 md:mb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg mb-1 leading-tight">{item.title}</h3>
                        <p className={`text-sm md:text-base font-medium ${item.type === 'experience' ? 'text-purple-300' : 'text-pink-300'
                          }`}>{item.subtitle}</p>
                      </div>
                      {item.isCurrent && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-2 py-0.5 md:px-2 md:py-1 bg-green-500/30 border border-green-400/50 rounded-full text-[10px] md:text-xs font-bold text-green-200"
                        >
                          CURRENT
                        </motion.div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 text-xs md:text-sm text-white/70 space-y-1 md:space-y-0">
                      <span className="font-medium">{item.startDate} - {item.endDate}</span>
                      <span className="text-[10px] md:text-xs text-white/60">{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-white/90 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 drop-shadow-sm">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements.length > 0 && (
                    <div className="relative z-10 mb-3 md:mb-4">
                      <h4 className="text-xs md:text-sm font-semibold text-blue-300 mb-2">
                        {item.type === 'experience' ? 'Key Achievements' : 'Honors & Recognition'}
                      </h4>
                      <ul className="space-y-1">
                        {item.achievements.slice(0, 3).map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start text-[10px] md:text-xs text-white/80">
                            <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 fill-current mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {item.technologies.length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-1.5 md:gap-2">
                      {item.technologies.slice(0, 5).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/90 shadow-sm hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {item.technologies.length > 5 && (
                        <span className="px-2 py-0.5 text-[10px] md:text-xs text-white/60">+{item.technologies.length - 5} more</span>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Summary */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: journeyItems.length * 0.1 + 0.3 }}
        className="mt-16 relative"
      >
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-3xl -z-10"></div>
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Journey Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Years Experience", value: "4.5+", icon: "⚡", color: "from-purple-400 to-blue-400" },
              { label: "Companies", value: experiences.length, icon: "🏢", color: "from-blue-400 to-green-400" },
              { label: "Technologies", value: "15+", icon: "🚀", color: "from-green-400 to-yellow-400" },
              { label: "Education", value: personalInfo.education.length, icon: "🎓", color: "from-pink-400 to-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: journeyItems.length * 0.1 + 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
