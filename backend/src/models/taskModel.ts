import { readData, writeData } from "../utils/dbManagment.js";
import type { Task } from "../types/index.js";
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
      return true;
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
  const deleteData = async (id: number) => {
    try {
      const tasks = await readData();
      const task = tasks.find((task: Task) => task.id === id);
      if (!task) {
        throw new Error("Task not found");
      }
      const newTasks = tasks.filter((task: Task) => task.id !== id);
      await writeData(newTasks);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const updateDataTask = async (updatedTask: Task) => {
    try {
      const tasks = await readData();
      const index = tasks.findIndex((task: Task) => task.id === updatedTask.id);
      if (index === -1) throw new Error("Task not found");

      tasks[index] = updatedTask;
      await writeData(tasks);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return {
    getDataTasks,
    saveDataTask,
    getDataById,
    deleteData,
    updateDataTask,
  };
};
