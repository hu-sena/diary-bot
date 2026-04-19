import { access, mkdir } from "node:fs/promises";
import path from "node:path";

export const createFile = async (filePath: string) => {
  try {
    await access(filePath);
  } catch {
    await mkdir(path.dirname(filePath), { recursive: true });
  }
};
