import { getDateString } from "../shared/utils/getDateString";

type NoteInput = {
  today: string;
  learning: string;
  keywords: string[];
  tags: string[];
  researchNotes: string;
};

export const formatNotes = (input: NoteInput): string => {
  const { today, learning, keywords, tags, researchNotes } = input;

  const date = getDateString();

  const tagsList = tags.map((tag) => `${tag}`).join(", ");
  const keywordsList = keywords.map((keyword) => `${keyword}`).join(", ");

  const formattedNotes = `---
  date: ${date}
  tags: [${tagsList}]
  ---
  
  ## what i did today
  ${today}

  ## what i learned
  ${learning}

  ## keywords
  ${keywordsList}

  ## research notes
  ${researchNotes}
  `;

  return formattedNotes;
};
