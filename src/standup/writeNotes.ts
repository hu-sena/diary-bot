import path from "node:path";
import { getDateString } from "../shared/utils/getDateString";
import { writeFile } from "node:fs/promises";
import { createFile } from "../shared/utils/createFile";

const OBSIDIAN_VAULT_PATH = process.env.OBSIDIAN_VAULT_PATH!;
const OBSIDIAN_FILE_DIRECTORY = path.join(OBSIDIAN_VAULT_PATH, "standup");

export const writeNotes = async (noteContent: string) => {
  const today = getDateString();

  const filePath = path.join(OBSIDIAN_FILE_DIRECTORY, `${today}.md`);

  await createFile(filePath);
  await writeFile(filePath, noteContent, "utf-8");
};
