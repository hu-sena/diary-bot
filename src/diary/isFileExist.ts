import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const isFileExist = async (filePath: string, date: string) => {
  const appendDate = `#${date}\n`;

  try {
    await access(filePath);
  } catch {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, appendDate, "utf-8");
  }
};
