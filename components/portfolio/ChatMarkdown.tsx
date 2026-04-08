"use client"

interface ChatMarkdownProps {
  content: string
}

export default function ChatMarkdown({ content }: ChatMarkdownProps) {
  const blocks = content.split("\n")
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let listType: "ul" | "ol" | null = null

  function flushList() {
    if (listItems.length === 0) return
    const items = listItems.map((item, i) => (
      <li key={i} className="ml-4 mb-0.5">
        <InlineMarkdown text={item} />
      </li>
    ))
    if (listType === "ol") {
      elements.push(
        <ol key={elements.length} className="list-decimal pl-1 my-1.5 space-y-0.5">
          {items}
        </ol>
      )
    } else {
      elements.push(
        <ul key={elements.length} className="list-disc pl-1 my-1.5 space-y-0.5">
          {items}
        </ul>
      )
    }
    listItems = []
    listType = null
  }

  for (const line of blocks) {
    const trimmed = line.trim()

    // Bullet list
    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)/)
    if (bulletMatch) {
      if (listType === "ol") flushList()
      listType = "ul"
      listItems.push(bulletMatch[1])
      continue
    }

    // Numbered list
    const numMatch = trimmed.match(/^\d+[.)]\s+(.+)/)
    if (numMatch) {
      if (listType === "ul") flushList()
      listType = "ol"
      listItems.push(numMatch[1])
      continue
    }

    flushList()

    if (trimmed === "") {
      elements.push(<div key={elements.length} className="h-2" />)
      continue
    }

    // Heading-like bold lines
    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
      elements.push(
        <p key={elements.length} className="font-semibold text-stone-800 mt-2 mb-0.5">
          {trimmed.slice(2, -2)}
        </p>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={elements.length} className="mb-1">
        <InlineMarkdown text={trimmed} />
      </p>
    )
  }

  flushList()

  return <div className="text-[14px] leading-relaxed">{elements}</div>
}

function InlineMarkdown({ text }: { text: string }) {
  // Process inline: **bold**, *italic*, `code`
  const parts: React.ReactNode[] = []
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <strong key={match.index} className="font-semibold text-stone-800">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // *italic*
      parts.push(
        <em key={match.index} className="italic">
          {match[3]}
        </em>
      )
    } else if (match[4]) {
      // `code`
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-stone-100 text-indigo-600 text-[13px] font-mono"
        >
          {match[4]}
        </code>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}
