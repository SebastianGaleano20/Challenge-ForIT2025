import Task from "../types";
import { readData, writeData } from "../utils/dbManagment";

export const taskModel = () => {
  const getDataTasks = async () => {
    try {
      const tasks = await readData();
      return tasks;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const saveDataTask = async (task: Task) => {
    try {
      const tasks = await readData();
      tasks.push(task);
      await writeData(tasks);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const getDataById = async (id: number) => {
    try {
      const tasks = await readData();
      const task = tasks.find((task: Task) => task.id === id);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    getDataTasks,
    saveDataTask,
    getDataById,
  };
};
