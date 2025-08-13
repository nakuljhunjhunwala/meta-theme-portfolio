"use client"

import { useCallback } from "react"
import { personalInfo, projects, technicalSkills, experiences } from "@/constants/portfolio"
import type { Command } from "./TerminalPortfolio"

const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I've got a great UDP joke, but I'm not sure you'll get it.",
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
]

export const commandList = {
    welcome: "Show a welcome message with quick tips",
    help: "Show this help message",
    about: "Display detailed information about me",
    skills: "List my technical skills. Usage: skills [--category <cat>]",
    projects: "Show my featured projects. Usage: projects [--id <id>]",
    experience: "Display my professional work experience",
    education: "Show my educational background and qualifications",
    contact: "Show my contact information",
    socials: "Display my social media links",
    whoami: "Display the current user",
    pwd: "Print the current working directory",
    ls: "List files in the current directory",
    cat: "Display content of a file. Usage: cat <filename>",
    date: "Display the current date and time",
    joke: "Tell a random programmer joke",
    neofetch: "Display a summary of my profile",
    clear: "Clear the terminal history",
}

const files = {
    "README.md": `# ${personalInfo.name}\n\n${personalInfo.bio.detailed}`,
    "projects.md": projects
        .map((p) => `### ${p.title}\n\n${p.description.summary}\n**Stack**: ${p.techStack.join(", ")}`)
        .join("\n\n---\n\n"),
    "skills.json": JSON.stringify(
        technicalSkills.map(({ name, category, proficiency }) => ({ name, category, proficiency })),
        null,
        2
    ),
}

const levenshteinDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length
    const matrix = Array(a.length + 1)
        .fill(null)
        .map(() => Array(b.length + 1).fill(null))
    for (let i = 0; i <= b.length; i++) {
        matrix[0][i] = i
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[j][0] = j
    }
    for (let j = 1; j <= a.length; j++) {
        for (let i = 1; i <= b.length; i++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1
            matrix[j][i] = Math.min(
                matrix[j - 1][i] + 1,
                matrix[j][i - 1] + 1,
                matrix[j - 1][i - 1] + cost
            )
        }
    }
    return matrix[a.length][b.length]
}

export const useCommands = ({ setHistory }: { setHistory: React.Dispatch<React.SetStateAction<Command[]>> }) => {
    const executeCommand = useCallback(
        (cmd: string) => {
            const [commandName, ...args] = cmd.trim().split(" ")

            const commands: { [key: string]: (args: string[]) => string } = {
                welcome: () =>
                    `Welcome to ${personalInfo.name}'s interactive portfolio!\n\n` +
                    `Type \"help\" to see available commands. Try \"about\", \"projects\", \"skills\" or \"contact\".\n` +
                    `Tip: Use TAB to autocomplete commands.`,
                help: () =>
                    "Available Commands:\n" +
                    Object.entries(commandList)
                        .map(([name, desc]) => `  ${name.padEnd(12)} - ${desc}`)
                        .join("\n"),

                about: () =>
                    `A ${personalInfo.title} based in ${personalInfo.location}.\n\n` +
                    `${personalInfo.bio.detailed}\n\n` +
                    `Currently ${personalInfo.availability.status.toLowerCase()} for new opportunities.`,

                skills: (args) => {
                    const categoryArg = args.indexOf("--category") !== -1 ? args[args.indexOf("--category") + 1] : null
                    let skillsToList = technicalSkills
                    if (categoryArg) {
                        skillsToList = technicalSkills.filter((s) => s.category.toLowerCase() === categoryArg.toLowerCase())
                        if (skillsToList.length === 0) return `No skills found for category: ${categoryArg}`
                    }
                    return (
                        `Technical Skills${categoryArg ? ` (Category: ${categoryArg})` : ""}:\n` +
                        skillsToList.map((skill) => `  - ${skill.name} (${skill.proficiency}%)`).join("\n")
                    )
                },

                projects: (args) => {
                    const idArg = args.indexOf("--id") !== -1 ? args[args.indexOf("--id") + 1] : null
                    let projectsToList = projects.filter((p) => p.featured)
                    if (idArg) {
                        projectsToList = projects.filter((p) => p.id === idArg)
                        if (projectsToList.length === 0) return `No project found with ID: ${idArg}`
                    }
                    return (
                        `Featured Projects${idArg ? ` (ID: ${idArg})` : ""}:\n\n` +
                        projectsToList
                            .map(
                                (p) =>
                                    `  **${p.title}** - [${p.id}]\n` +
                                    `  ${p.description.summary}\n` +
                                    `  Stack: ${p.techStack.join(", ")}\n` +
                                    `  Links: ${p.links.github ? `[GitHub](${p.links.github})` : ""}${p.links.live ? ` | [Live](${p.links.live})` : ""
                                    }`
                            )
                            .join("\n\n")
                    )
                },

                experience: () =>
                    "Professional Experience:\n\n" +
                    experiences
                        .map(
                            (e) =>
                                `  **${e.role}** @ ${e.company} (${e.duration.start} - ${e.duration.end || "Present"})\n` +
                                `  ${e.description}`
                        )
                        .join("\n\n"),

                education: () =>
                    "Educational Background:\n\n" +
                    personalInfo.education
                        .map(
                            (edu) =>
                                `  **${edu.degree}**\n` +
                                `  ${edu.institution} (${edu.year})\n` +
                                `  Location: ${edu.location}\n` +
                                `${edu.honors ? `  Honors: ${edu.honors}\n` : ""}` +
                                `  Focus: ${edu.degree.includes('Computer') ?
                                    'Software Development, Programming, Database Management' :
                                    edu.degree.includes('Commerce') ?
                                        'Business Fundamentals, Commerce Principles, Analytical Thinking' :
                                        'Core Academic Subjects, Critical Thinking, Problem Solving'}`
                        )
                        .join("\n\n"),

                contact: () => `Email: ${personalInfo.email}\nWebsite: ${personalInfo.website}`,
                socials: () =>
                    "Social Media:\n" +
                    personalInfo.socialLinks.map((s) => `  - ${s.platform}: ${s.url}`).join("\n"),
                whoami: () => personalInfo.name,
                pwd: () => "/home/portfolio",
                ls: () => Object.keys(files).join("\n"),
                cat: (args) => {
                    const filename = args[0] as keyof typeof files
                    return files[filename] || `cat: ${filename}: No such file or directory`
                },
                date: () => new Date().toString(),
                joke: () => jokes[Math.floor(Math.random() * jokes.length)],
                neofetch: () =>
                    `
        \`"-.          ${personalInfo.name}@portfolio
      ,dP  \`Y8b,      -----------------
      8b.   \`88b     OS: Interactive Web Portfolio
   ,\`db,.\`"-. \`8b    Host: Your Browser
  d8P"  "b   \`88   Kernel: JavaScript (React)
  88"    \`"-. \`8P  Uptime: Since you arrived
  \`Y8b.   \`"-.dP   Shell: zsh (emulated)
   \`"db,"-..dP"     CPU: Your Brain
      "b,dP"        GPU: Your Eyes
`,
                clear: () => {
                    setHistory([])
                    return ""
                },
            }

            const commandFunc = commands[commandName]

            if (commandFunc) {
                const output = commandFunc(args)
                if (commandName.toLowerCase() !== "clear") {
                    setHistory((prev) => [...prev, { command: cmd, output }])
                }
            } else {
                const suggestions = Object.keys(commandList)
                    .map((c) => ({ command: c, dist: levenshteinDistance(commandName, c) }))
                    .filter((c) => c.dist < 3)
                    .sort((a, b) => a.dist - b.dist)

                let output = `zsh: command not found: ${commandName}`
                if (suggestions.length > 0) {
                    const bestMatch = suggestions[0].command
                    output += `\n\nDid you mean: "${bestMatch}"?`
                }
                setHistory((prev) => [...prev, { command: cmd, output }])
            }
        },
        [setHistory]
    )

    return { executeCommand }
} 