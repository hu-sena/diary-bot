import "dotenv/config";
import { postPrompt } from "./postPrompt";

type LearningContext = {
  keywords: string[];
  learning: string;
};

export const createLearningNotes = async (input: LearningContext) => {
  const prompt = `You are a personal knowledge assistant. User just had a learning session.
  
  Context of what they learned:
  "${input.learning}"

  Keywords to research: ${input.keywords.join(", ")}

  Instructions:
1. Use web_search to look up each keyword
2. Write a concise reference note (2-4 sentences per keyword) explaining what it is and why it matters
3. Focus on practical, actionable insights — not just definitions
4. Connect back to the user's learning context where relevant
5. Format as clean markdown with a ## header per keyword
 
  Return ONLY the markdown content, no preamble.`;

  // const data = await postPrompt(prompt);

  const fullText = "";
  // data.content
  //   .map((block) => (block.type === "text" ? (block.text ?? "") : ""))
  //   .filter(Boolean)
  //   .join("\n");

  return fullText ?? "No research notes generated";
};
