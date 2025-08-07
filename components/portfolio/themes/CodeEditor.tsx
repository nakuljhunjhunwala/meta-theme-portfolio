"use client"

import { motion } from "framer-motion"

interface CodeEditorProps {
  file: string
  content: string
  language: string
}

function SyntaxHighlighter({ code, language }: { code: string; language: string }) {
  const highlight = (text: string): string => {
    let highlighted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (language === "markdown") {
      return highlighted
        .replace(/^# (.*$)/gim, '<span class="text-[#569cd6] text-2xl font-bold">$1</span>')
        .replace(/^### (.*$)/gim, '<span class="text-[#4ec9b0] text-lg font-semibold">$1</span>')
        .replace(/\*\*(.*)\*\*/gim, '<span class="text-[#c586c0] font-bold">$1</span>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" class="text-[#ce9178] underline">$1</a>');
    }

    if (language === "json") {
      return highlighted
        .replace(/"([^"]+)":/g, '<span class="text-[#9cdcfe]">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="text-[#ce9178]">"$1"</span>');
    }

    // Process TSX with a placeholder method to avoid nesting errors
    const placeholders: { [key: string]: string } = {};
    let placeholderId = 0;

    // Isolate strings and comments
    highlighted = highlighted.replace(/"([^"]*)"/g, (match) => {
      const id = `__STRING_${placeholderId++}__`;
      placeholders[id] = `<span class="text-[#ce9178]">${match}</span>`;
      return id;
    });
    highlighted = highlighted.replace(/(\/\/.*)/g, (match) => {
      const id = `__COMMENT_${placeholderId++}__`;
      placeholders[id] = `<span class="text-gray-500 italic">${match}</span>`;
      return id;
    });

    // Highlight keywords, types, etc. on the remaining text
    highlighted = highlighted
      .replace(/\b(import|from|export|default|const|class|constructor|async|return|new)\b/g, '<span class="text-[#c586c0]">$1</span>')
      .replace(/\b(ContactInfo|Developer)\b/g, '<span class="text-[#4ec9b0]">$1</span>')
      .replace(/\b(log|getPhilosophy)\b/g, '<span class="text-[#dcdcaa]">$1</span>')
      .replace(/\b(console|this)\b/g, '<span class="text-[#9cdcfe]">$1</span>');

    // Restore strings and comments
    Object.keys(placeholders).forEach(id => {
      highlighted = highlighted.replace(id, placeholders[id]);
    });

    return highlighted;
  };

  return <pre className="text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlight(code) }} />;
}

export function CodeEditor({ file, content, language }: CodeEditorProps) {
  return (
    <motion.div
      key={file}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1e1e1e] p-4 md:p-6 font-mono text-sm md:text-base leading-relaxed h-96 md:h-[500px] overflow-y-auto custom-scrollbar"
    >
      <SyntaxHighlighter code={content} language={language} />
    </motion.div>
  )
} 