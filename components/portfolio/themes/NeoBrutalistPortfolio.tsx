"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, projects, technicalSkills, experiences } from "@/constants/portfolio"
import { 
  bucketList, 
  travelExperiences,
  getCompletedBucketList, 
  getPendingBucketList,
  getVisitedPlaces,
} from "@/constants/personal"
import {
  Code,
  Briefcase,
  Mail,
  Star,
  MapPin,
  Calendar,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Trophy,
  Target,
  Zap,
  ArrowRight,
  Award,
  ChevronRight,
} from "lucide-react"

export default function NeoBrutalistPortfolio() {
  const [activeSection, setActiveSection] = useState<string>("all")
  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("neo-brutalist-explorer")
  }, [unlockAchievement])

  // Bold neo-brutalism colors - comfortable yet striking
  const colors = {
    bg: "#D8E9E0", // Soft sage green background
    primary: "#00C853", // Strong green (less bright)
    secondary: "#6B4EFF", // Rich purple
    accent: "#FFD600", // Golden yellow (less intense)
    highlight: "#FF4081", // Vibrant pink (toned down)
    cyan: "#00ACC1", // Deep cyan
    orange: "#FF6D00", // Bold orange
    black: "#000000",
    white: "#FAFAFA", // Slightly off-white
    card: "#EDE7F6", // Soft lavender for cards
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: colors.bg }}>
      {/* Brutal Background Pattern */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)
          `,
          backgroundSize: '40px 40px',
        }}/>
      </div>

      {/* Fixed Header Bar */}
      <div 
        className="fixed top-0 left-0 right-0 text-black border-b-4 md:border-b-8 border-black"
        style={{ 
          backgroundColor: colors.accent,
          zIndex: 30
        }}
      >
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <div className="font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-tight">
              {personalInfo.name.split(' ')[0]}
            </div>
            <div className="flex gap-2">
              {["Skills", "Work", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase())
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hidden md:block px-4 py-2 text-black font-bold uppercase text-sm border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  style={{
                    backgroundColor: colors.white,
                    boxShadow: '4px 4px 0px 0px #000000'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-40 md:pb-20">
        {/* Hero Section - Magazine Style */}
        <HeroSection colors={colors} />

        {/* Stats Bar */}
        <StatsBar colors={colors} />

        {/* Skills Section */}
        <SkillsSection colors={colors} />

        {/* Projects Grid */}
        <ProjectsSection colors={colors} />

        {/* Experience Timeline */}
        <ExperienceSection colors={colors} />

        {/* Adventures Grid */}
        <AdventuresSection colors={colors} />

        {/* Contact Section */}
        <ContactSection colors={colors} />
      </div>

      <style jsx>{`
        :global(.brutalist-card) {
          border: 4px solid #000000;
          box-shadow: 8px 8px 0px 0px #000000;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.brutalist-card:hover) {
          transform: translate(4px, 4px);
          box-shadow: 4px 4px 0px 0px #000000;
        }
        :global(.brutalist-button) {
          border: 4px solid #000000;
          box-shadow: 4px 4px 0px 0px #000000;
          transition: all 0.1s ease-out;
        }
        :global(.brutalist-button:hover) {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px 0px #000000;
        }
        :global(.brutalist-button:active) {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px 0px #000000;
        }
      `}</style>
    </div>
  )
}

function HeroSection({ colors }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Left - Avatar */}
        <div className="md:col-span-4 max-w-md mx-auto md:max-w-none md:mx-0">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div 
              className="aspect-square border-8 border-black p-4"
              style={{ 
                backgroundColor: colors.secondary,
                boxShadow: '16px 16px 0px 0px #000000' 
              }}
            >
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover border-4 border-black"
              />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-black font-black px-4 py-2 border-4 border-black uppercase text-sm"
              style={{ 
                backgroundColor: colors.highlight,
                boxShadow: '4px 4px 0px 0px #000000' 
              }}
            >
              Available!
            </motion.div>
          </motion.div>
        </div>

        {/* Right - Info */}
        <div className="md:col-span-8">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-4 break-words"
            style={{ 
              WebkitTextStroke: '2px black',
              color: 'white',
              textShadow: '4px 4px 0px #000000'
            }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-black p-6 mb-6 border-4 border-black"
            style={{ 
              backgroundColor: colors.card,
              boxShadow: '8px 8px 0px 0px ' + colors.cyan 
            }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase mb-2 text-black leading-tight">
              {personalInfo.title}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
              {personalInfo.bio.medium}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: Github, url: personalInfo.socialLinks.find(s => s.platform === "GitHub")?.url, color: colors.purple },
              { icon: Linkedin, url: personalInfo.socialLinks.find(s => s.platform === "LinkedIn")?.url, color: colors.blue },
              { icon: Mail, url: `mailto:${personalInfo.email}`, color: colors.red },
            ].map((social, index) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="brutalist-button w-14 h-14 flex items-center justify-center bg-white"
                  style={{ backgroundColor: social.color }}
                >
                  <IconComponent className="w-7 h-7 text-black" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StatsBar({ colors }: any) {
  const stats = [
    { label: "Years Exp", value: personalInfo.bio.short.match(/\d+/)?.[0] + "+", color: colors.accent },
    { label: "Projects", value: projects.filter(p => p.featured).length, color: colors.highlight },
    { label: "Skills", value: technicalSkills.length, color: colors.cyan },
    { label: "Companies", value: experiences.length, color: colors.primary },
  ]

  return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="p-4 md:p-6 border-3 md:border-4 border-black text-center"
            style={{ 
              backgroundColor: stat.color,
              boxShadow: '4px 4px 0px 0px #000000'
            }}
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-2 text-black">{stat.value}</div>
            <div className="text-xs md:text-sm lg:text-base font-bold uppercase text-black leading-tight">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

function SkillsSection({ colors }: any) {
  const categories = ["frontend", "backend", "database", "cloud", "devops"]
  const [selectedCat, setSelectedCat] = useState("frontend")

  return (
    <div className="mb-16" id="skills">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4"
      >
        <span className="text-black px-3 py-2 md:px-4 border-4 border-black inline-block"
          style={{ 
            backgroundColor: colors.accent,
            boxShadow: '6px 6px 0px 0px ' + colors.secondary 
          }}>
          Skills
        </span>
        <ChevronRight className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-6 py-3 font-bold uppercase text-sm md:text-base border-4 border-black transition-all ${
              selectedCat === cat 
                ? 'text-white translate-x-1 translate-y-1' 
                : 'text-black brutalist-button'
            }`}
            style={{
              backgroundColor: selectedCat === cat ? colors.black : colors.white
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technicalSkills
          .filter(s => s.category === selectedCat)
          .map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              className="p-4 border-4 border-black"
              style={{ 
                backgroundColor: colors.white,
                boxShadow: '4px 4px 0px 0px #000000'
              }}
            >
              <div className="font-bold text-base md:text-lg mb-2 text-black">{skill.name}</div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 border-2 border-black ${
                      i < Math.floor(skill.proficiency / 20) ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs font-bold uppercase text-gray-700">
                {skill.yearsExperience}y experience
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

function ProjectsSection({ colors }: any) {
  return (
    <div className="mb-16" id="projects">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4"
      >
        <span className="text-black px-3 py-2 md:px-4 border-4 border-black inline-block"
          style={{ 
            backgroundColor: colors.highlight,
            boxShadow: '6px 6px 0px 0px ' + colors.primary 
          }}>
          Projects
        </span>
        <ChevronRight className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.filter(p => p.featured).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="brutalist-card p-6 relative overflow-hidden group"
            style={{ backgroundColor: colors.white }}
          >
            {/* Color accent */}
            <div 
              className="absolute top-0 left-0 w-2 h-full"
              style={{ backgroundColor: [colors.accent, colors.highlight, colors.cyan, colors.primary][index % 4] }}
            />

            <div className="pl-4">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-3 text-black">
                {project.title}
              </h3>
              <p className="text-sm md:text-base mb-4 leading-relaxed text-gray-800">
                {project.description.summary}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-black text-white text-xs font-bold uppercase border-2 border-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button inline-flex items-center gap-2 px-4 py-2 font-bold uppercase text-sm text-black"
                    style={{ backgroundColor: colors.white }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutalist-button inline-flex items-center gap-2 px-4 py-2 text-black font-bold uppercase text-sm"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ExperienceSection({ colors }: any) {
  const allJourney = [
    ...experiences.map(exp => ({
      type: 'work',
      title: exp.role,
      company: exp.company,
      date: `${exp.duration.start} - ${exp.duration.current ? 'Present' : exp.duration.end}`,
      location: exp.location,
      description: exp.description,
      color: colors.blue,
    })),
    ...personalInfo.education.map(edu => ({
      type: 'education',
      title: edu.degree,
      company: edu.institution,
      date: edu.year,
      location: edu.location,
      description: `${edu.degree} from ${edu.institution}`,
      color: colors.green,
    })),
  ]

  return (
    <div className="mb-16" id="work">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4"
      >
        <span className="text-black px-3 py-2 md:px-4 border-4 border-black inline-block"
          style={{ 
            backgroundColor: colors.cyan,
            boxShadow: '6px 6px 0px 0px ' + colors.highlight 
          }}>
          Experience
        </span>
        <ChevronRight className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.h2>

      <div className="space-y-6">
        {allJourney.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="border-4 border-black p-6 relative"
              style={{ 
              backgroundColor: index % 2 === 0 ? colors.accent : colors.primary,
              boxShadow: '6px 6px 0px 0px #000000'
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center">
                    {item.type === 'work' ? (
                      <Briefcase className="w-5 h-5 text-white" />
                    ) : (
                      <Award className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-black">{item.title}</h3>
                </div>
                <p className="text-lg font-bold mb-2 text-black">{item.company}</p>
                <p className="text-sm mb-2 text-gray-900">{item.description}</p>
                <div className="flex flex-wrap gap-3 text-xs font-bold uppercase text-gray-900">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AdventuresSection({ colors }: any) {
  const completed = getCompletedBucketList()
  const pending = getPendingBucketList()
  const visited = getVisitedPlaces()

  return (
    <div className="mb-16">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4"
      >
        <span className="text-black px-3 py-2 md:px-4 border-4 border-black inline-block"
          style={{ 
            backgroundColor: colors.primary,
            boxShadow: '6px 6px 0px 0px ' + colors.accent 
          }}>
          Adventures
        </span>
        <ChevronRight className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Completed Goals", value: completed.length, color: colors.primary },
          { label: "In Progress", value: pending.length, color: colors.accent },
          { label: "Places Visited", value: visited.length, color: colors.cyan },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 border-4 border-black text-center"
            style={{ 
              backgroundColor: stat.color,
              boxShadow: '6px 6px 0px 0px #000000'
            }}
          >
            <div className="text-5xl font-black mb-2 text-black">{stat.value}</div>
            <div className="text-sm font-bold uppercase text-black">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...completed, ...pending].slice(0, 6).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="p-4 border-4 border-black flex items-start gap-3"
            style={{ 
              backgroundColor: colors.white,
              boxShadow: '4px 4px 0px 0px #000000' 
            }}
          >
            <span className="text-3xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-sm mb-1 text-black">{item.title}</p>
              {item.completed && (
                <span className="inline-block px-2 py-1 bg-black text-white text-xs font-bold uppercase">
                  ✓ Done
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ContactSection({ colors }: any) {
  return (
    <div className="mb-16" id="contact">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4"
      >
        <span className="text-white px-3 py-2 md:px-4 border-4 border-black inline-block"
          style={{ 
            backgroundColor: colors.secondary,
            boxShadow: '6px 6px 0px 0px ' + colors.highlight 
          }}>
          Contact
        </span>
        <ChevronRight className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 text-white border-4 border-black"
          style={{ 
            backgroundColor: colors.secondary,
            boxShadow: '12px 12px 0px 0px ' + colors.accent 
          }}
        >
          <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 md:mb-6">Let's Work Together!</h3>
          <p className="text-base md:text-lg mb-4 md:mb-6">
            Ready to create something amazing? Drop me a message and let's make it happen! 🚀
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <a href={`mailto:${personalInfo.email}`} className="text-lg font-bold hover:underline">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span className="text-lg font-bold">{personalInfo.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {[
            { 
              label: "Download Resume", 
              icon: Download, 
              href: personalInfo.resumeUrl,
              color: colors.accent,
              download: true 
            },
            { 
              label: "WhatsApp Me", 
              icon: Mail, 
              href: personalInfo.socialLinks.find(s => s.platform === "WhatsApp")?.url,
              color: colors.primary 
            },
            { 
              label: "LinkedIn Profile", 
              icon: Linkedin, 
              href: personalInfo.socialLinks.find(s => s.platform === "LinkedIn")?.url,
              color: colors.cyan 
            },
          ].map((action, index) => {
            const IconComponent = action.icon
            return (
              <motion.a
                key={index}
                href={action.href}
                download={action.download}
                target={!action.download ? "_blank" : undefined}
                rel={!action.download ? "noopener noreferrer" : undefined}
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="brutalist-button flex items-center justify-between p-6 font-bold uppercase text-lg group text-black"
                style={{ backgroundColor: action.color }}
              >
                <span>{action.label}</span>
                <IconComponent className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

