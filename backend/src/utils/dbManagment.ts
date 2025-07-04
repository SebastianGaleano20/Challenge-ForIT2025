import { readFile, writeFile } from "fs/promises";
import { Task } from "../types/index.js";

export const readData = async () => {
  try {
    const data = await readFile("./db/taskDb.json", "utf-8");
    const tasks = JSON.parse(data);
    return tasks;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const writeData = async (data: Task[]) => {
  try {
    await writeFile("./db/taskDb.json", JSON.stringify(data));
  } catch (error: any) {
    throw new Error(error.message);
  }
};
