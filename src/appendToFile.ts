import path from "node:path";
import "dotenv/config";
import { getLocalDate } from "./getLocalDate";
import { isFileExist } from "./isFileExist";
import { appendFile } from "node:fs/promises";

export const appendToFile = async (content: string) => {
  const { date } = getLocalDate();

  const filePath = path.join(
    process.env.OBSIDIAN_VAULT_PATH!,
    "diary",
    `${date}`,
  );
  await isFileExist(filePath, date);
  await appendFile(filePath, `${content}\n`, "utf-8");
};
