import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { Task } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = resolve(__dirname, "../../src/db/taskDb.json");

export const readData = async () => {
  const data = await readFile(DB_PATH, "utf-8");
  const tasks = JSON.parse(data);
  return tasks as Task[];
};

export const writeData = async (data: Task[]) => {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
};
