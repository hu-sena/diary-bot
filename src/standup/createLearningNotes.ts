import "dotenv/config";

type LearningContext = {
  keywords: string[];
  learning: string;
};

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

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

  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${ANTHROPIC_API_KEY}`,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 3,
        },
      ],
      message: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
  if (!response.ok) {
    // TODO: error response schema
    const error = await response.text;
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();

  const fullText = data.content
    .map((block) => (block.type === "text" ? (block.text ?? "") : ""))
    .filter(Boolean)
    .join("\n");

  return fullText ?? "No research notes generated";
};
