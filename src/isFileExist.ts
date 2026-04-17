import { access, mkdir, writeFile } from "node:fs/promises";

export const isFileExist = async (filePath: string, date: string) => {
  const appendDate = `#${date}\n`;

  try {
    await access(filePath);
  } catch {
    await mkdir(filePath);
    await writeFile(filePath, appendDate, "utf-8");
  }
};
