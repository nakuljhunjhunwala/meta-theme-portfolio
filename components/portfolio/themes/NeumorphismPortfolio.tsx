"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolioStore } from "@/stores/portfolioStore"
import { personalInfo, projects, technicalSkills, experiences } from "@/constants/portfolio"
import { getAvatarSrc, handleImageError } from "@/lib/utils"
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
  Heart,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react"

export default function NeumorphismPortfolio() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null)
  const { unlockAchievement } = usePortfolioStore()

  useEffect(() => {
    unlockAchievement("neumorphism-explorer")
  }, [unlockAchievement])

  // Enhanced color palette
  const bgColor = "#dde1e7"
  const accentColor = "#667eea" // Purple-blue
  const successColor = "#48bb78" // Green
  const warningColor = "#ed8936" // Orange
  const infoColor = "#4299e1" // Blue

  return (
    <div className="min-h-screen relative" style={{ background: `linear-gradient(135deg, ${bgColor} 0%, #e8ebf0 100%)` }} role="main" aria-label="Neumorphism Portfolio">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}40, ${successColor}40)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content - Dashboard Style */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Widget */}
        <HeroWidget accentColor={accentColor} />
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column - Stats & Quick Info (Sticky) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-6">
              <StatsWidget accentColor={accentColor} successColor={successColor} warningColor={warningColor} infoColor={infoColor} />
              <QuickInfoWidget accentColor={accentColor} />
            </div>
          </div>
          
          {/* Right Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <SkillsWidget accentColor={accentColor} successColor={successColor} />
            <ProjectsWidget accentColor={accentColor} />
            <JourneyWidget accentColor={accentColor} infoColor={infoColor} successColor={successColor} />
            <AdventuresWidget accentColor={accentColor} warningColor={warningColor} successColor={successColor} />
            <ContactWidget accentColor={accentColor} successColor={successColor} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .neuro-card {
          background: #dde1e7;
          box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .neuro-card:hover {
          box-shadow: 12px 12px 20px rgba(163, 177, 198, 0.7), -12px -12px 20px rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }
        .neuro-inset {
          background: #dde1e7;
          box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.5);
        }
        .neuro-button {
          background: linear-gradient(145deg, #e6e9ef, #d1d5db);
          box-shadow: 5px 5px 10px rgba(163, 177, 198, 0.5), -5px -5px 10px rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
        }
        .neuro-button:hover {
          box-shadow: 7px 7px 14px rgba(163, 177, 198, 0.6), -7px -7px 14px rgba(255, 255, 255, 0.6);
        }
        .neuro-button:active {
          box-shadow: inset 3px 3px 6px rgba(163, 177, 198, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}

function HeroWidget({ accentColor }: { accentColor: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neuro-card rounded-3xl p-8 md:p-12"
      aria-label="Hero section"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden neuro-card p-2"
          >
            <img
              src={getAvatarSrc(personalInfo.avatar)}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
              className="w-full h-full object-cover rounded-full"
              loading="eager"
              onError={(e) => handleImageError(e, '/placeholder.svg')}
            />
          </div>
          <motion.div
            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: accentColor, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            role="status"
            aria-label="Featured profile"
          >
            <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
          </motion.div>
        </motion.div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: accentColor }}>
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            {personalInfo.title}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {personalInfo.bio.medium}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {personalInfo.socialLinks.slice(0, 3).map((social, index) => {
              const IconComponent = social.platform === "GitHub" ? Github : social.platform === "LinkedIn" ? Linkedin : Mail
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neuro-button w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900"
                  aria-label={`${social.platform} Profile`}
                >
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function StatsWidget({ accentColor, successColor, warningColor, infoColor }: any) {
  const stats = [
    { label: "Experience", value: "4.5+", unit: "Years", icon: TrendingUp, color: accentColor },
    { label: "Projects", value: projects.filter(p => p.featured).length.toString(), unit: "Featured", icon: Briefcase, color: successColor },
    { label: "Skills", value: technicalSkills.length.toString(), unit: "Total", icon: Code, color: warningColor },
    { label: "Companies", value: experiences.length.toString(), unit: "Worked", icon: Award, color: infoColor },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="neuro-card rounded-3xl p-6"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Trophy className="w-6 h-6" style={{ color: accentColor }} aria-hidden="true" />
        Career Stats
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="neuro-inset rounded-2xl p-4 text-center"
            >
              <IconComponent className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} aria-hidden="true" />
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }} aria-label={`${stat.value} ${stat.unit}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.unit}</div>
              <div className="text-sm font-medium text-gray-700 mt-1">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

function QuickInfoWidget({ accentColor }: { accentColor: string }) {
  const info = [
    { icon: MapPin, label: "Location", value: personalInfo.location },
    { icon: Calendar, label: "Status", value: personalInfo.availability.status === "available" ? "Available" : "Busy" },
    { icon: Mail, label: "Contact", value: "Open to opportunities" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="neuro-card rounded-3xl p-6"
      aria-labelledby="quickinfo-heading"
    >
      <h2 id="quickinfo-heading" className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <User className="w-6 h-6" style={{ color: accentColor }} aria-hidden="true" />
        Quick Info
      </h2>
      <div className="space-y-3">
        {info.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl neuro-inset flex items-center justify-center"
                style={{ color: accentColor }}
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm font-medium text-gray-800">{item.value}</div>
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

function SkillsWidget({ accentColor, successColor }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const categories = ["all", "frontend", "backend", "database", "cloud", "devops"]
  const filteredSkills = selectedCategory === "all" 
    ? technicalSkills 
    : technicalSkills.filter(s => s.category === selectedCategory)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neuro-card rounded-3xl p-6 md:p-8"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Code className="w-7 h-7" style={{ color: accentColor }} aria-hidden="true" />
        Technical Skills
      </h2>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Skill categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat ? 'text-white' : 'text-gray-700 neuro-button'
            }`}
            style={selectedCategory === cat ? { 
              background: `linear-gradient(135deg, ${accentColor}, ${successColor})`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            } : {}}
            role="tab"
            aria-selected={selectedCategory === cat}
            aria-controls={`${cat}-skills-panel`}
            aria-label={`${cat} skills`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills Progress Rings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredSkills.slice(0, 8).map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut"
            }}
            className="neuro-inset rounded-2xl p-4 flex flex-col items-center"
          >
            <CircularProgress percentage={skill.proficiency} color={accentColor} />
            <div className="text-sm font-medium text-gray-800 mt-3 text-center">{skill.name}</div>
            <div className="text-xs text-gray-500">{skill.yearsExperience}y exp</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function CircularProgress({ percentage, color }: { percentage: number, color: string }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#dde1e7"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>{percentage}</span>
      </div>
    </div>
  )
}

function ProjectsWidget({ accentColor }: { accentColor: string }) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="neuro-card rounded-3xl p-6 md:p-8"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Briefcase className="w-7 h-7" style={{ color: accentColor }} aria-hidden="true" />
        Featured Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.filter(p => p.featured).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="neuro-inset rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setFlippedCard(flippedCard === project.id ? null : project.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex-1">{project.title}</h3>
              <motion.div
                animate={{ rotate: flippedCard === project.id ? 180 : 0 }}
                className="w-8 h-8 rounded-lg neuro-button flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
              </motion.div>
            </div>
            
            <AnimatePresence mode="wait">
              {flippedCard === project.id ? (
                <motion.div
                  key="back"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-gray-600 leading-relaxed">{project.description.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full neuro-button text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm neuro-button px-4 py-2 rounded-xl"
                        style={{ color: accentColor }}
                        onClick={(e) => e.stopPropagation()}
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
                        className="flex items-center gap-1 text-sm neuro-button px-4 py-2 rounded-xl"
                        style={{ color: accentColor }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="front"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description.elevator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{project.category}</span>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${accentColor}20`, color: accentColor }}>
                      Click to expand
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function JourneyWidget({ accentColor, infoColor, successColor }: any) {
  const allJourney = [
    ...experiences.map(exp => ({
      type: 'work',
      title: exp.role,
      company: exp.company,
      date: `${exp.duration.start} - ${exp.duration.current ? 'Present' : exp.duration.end}`,
      location: exp.location,
      isCurrent: exp.duration.current,
    })),
    ...personalInfo.education.map(edu => ({
      type: 'education',
      title: edu.degree,
      company: edu.institution,
      date: edu.year,
      location: edu.location,
      isCurrent: false,
    })),
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="neuro-card rounded-3xl p-6 md:p-8"
      id="work"
      aria-labelledby="journey-heading"
    >
      <h2 id="journey-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Calendar className="w-7 h-7" style={{ color: accentColor }} aria-hidden="true" />
        Professional Journey
      </h2>
      
      <div className="space-y-4">
        {allJourney.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neuro-inset rounded-2xl p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl neuro-button flex items-center justify-center flex-shrink-0"
                style={{ color: item.type === 'work' ? infoColor : successColor }}
              >
                {item.type === 'work' ? <Briefcase className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  {item.isCurrent && (
                    <span 
                      className="text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ background: `${successColor}20`, color: successColor }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-600">{item.company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
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
    </motion.section>
  )
}

function AdventuresWidget({ accentColor, warningColor, successColor }: any) {
  const bucketStats = getBucketListStats()
  const completedItems = getCompletedBucketList()
  const pendingItems = getPendingBucketList()
  const visitedPlaces = getVisitedPlaces()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="neuro-card rounded-3xl p-6 md:p-8"
      aria-labelledby="adventures-heading"
    >
      <h2 id="adventures-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Target className="w-7 h-7" style={{ color: accentColor }} aria-hidden="true" />
        Life Adventures
      </h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Completed", value: bucketStats.completed, color: successColor, icon: Trophy },
          { label: "In Progress", value: bucketStats.pending, color: warningColor, icon: Target },
          { label: "Visited", value: visitedPlaces.length, color: accentColor, icon: MapPin },
        ].map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="neuro-inset rounded-2xl p-4 text-center">
              <IconComponent className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Bucket List Items */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Adventures</h3>
        {[...completedItems, ...pendingItems].slice(0, 4).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="neuro-inset rounded-xl p-3 flex items-center gap-3"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
            </div>
            {item.completed ? (
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: successColor }}>
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full neuro-button flex items-center justify-center">
                <Zap className="w-4 h-4" style={{ color: warningColor }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function ContactWidget({ accentColor, successColor }: any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="neuro-card rounded-3xl p-6 md:p-8"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Mail className="w-7 h-7" style={{ color: accentColor }} aria-hidden="true" />
        Let's Connect
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        Ready to bring your ideas to life? Let's collaborate and create something amazing together! 🚀
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { 
            label: "Email", 
            value: personalInfo.email, 
            icon: Mail, 
            href: `mailto:${personalInfo.email}`,
            color: accentColor 
          },
          { 
            label: "WhatsApp", 
            value: "+91 885 602 0006", 
            icon: Heart, 
            href: `https://wa.me/918856020006`,
            color: successColor 
          },
        ].map((contact, index) => {
          const IconComponent = contact.icon
          return (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="neuro-inset rounded-2xl p-4 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl neuro-button flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ color: contact.color }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">{contact.label}</div>
                  <div className="text-sm font-medium text-gray-800 truncate">{contact.value}</div>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={personalInfo.resumeUrl}
          download
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium neuro-button hover:scale-105 transition-transform"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${successColor})` }}
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          Download Resume
        </a>
        <a
          href={personalInfo.socialLinks.find(s => s.platform === "LinkedIn")?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full neuro-button font-medium hover:scale-105 transition-transform"
          style={{ color: accentColor }}
          aria-label="Visit LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5" aria-hidden="true" />
          LinkedIn
        </a>
      </div>
    </motion.section>
  )
}
