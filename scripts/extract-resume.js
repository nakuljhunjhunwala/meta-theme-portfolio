const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const RESUME_PATH = path.join(__dirname, "..", "public", "resume.docx");
const OUTPUT_PATH = path.join(__dirname, "..", "lib", "chatbot", "resume-text.ts");

async function main() {
  if (!fs.existsSync(RESUME_PATH)) {
    console.warn("resume.docx not found, skipping extraction");
    return;
  }

  const result = await mammoth.extractRawText({ path: RESUME_PATH });
  const text = result.value.trim();

  const output = `// Auto-generated from public/resume.docx — run \`npm run extract-resume\` to update
export const RESUME_TEXT = ${JSON.stringify(text)}
`;

  fs.writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log("Resume text extracted to lib/chatbot/resume-text.ts");
}

main().catch((err) => {
  console.error("Failed to extract resume:", err);
  process.exit(1);
});
