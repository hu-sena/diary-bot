import path from "node:path";
import "dotenv/config";
import { getLocalDate } from "./getLocalDate";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";

const OBSIDIAN_VAULT_PATH = process.env.OBSIDIAN_VAULT_PATH!;
const OBSIDIAN_FILE_DIRECTORY = path.join(OBSIDIAN_VAULT_PATH, "diary");

export const appendMessage = async (messageContent: string) => {
  const { year, month, date } = getLocalDate();

  const filePath = path.join(OBSIDIAN_FILE_DIRECTORY, `${year}-${month}.md`);
  await mkdir(path.dirname(filePath), { recursive: true });

  let existingContent = "";

  try {
    existingContent = await readFile(filePath, "utf-8");
  } catch {
    throw new Error("Failed to read file");
  }

  const currentDateHeader = `#${date}`;

  if (existingContent.trim() === "") {
    await writeFile(
      filePath,
      `${currentDateHeader}\n${messageContent}\n`,
      "utf-8",
    );
    return filePath;
  }

  const lastDateHeader = existingContent
    .trim()
    .match(/^#\d{4}-\d{2}-\d{2}$/gm)
    ?.at(-1);

  if (lastDateHeader === currentDateHeader) {
    await appendFile(filePath, `${messageContent}\n`, "utf-8");
  } else {
    await appendFile(
      filePath,
      `\n${currentDateHeader}\n${messageContent}\n`,
      "utf-8",
    );
  }

  return filePath;
};
