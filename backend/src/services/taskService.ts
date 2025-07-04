import { taskModel } from "../models/taskModel.js";
import type { Task } from "../types/index.js";

export const taskService = () => {
  const { getDataById, getDataTasks, saveDataTask, deleteData } = taskModel();

  const getAllTasks = async () => {
    try {
      const tasks = await getDataTasks();
      return tasks;
    } catch (error) {
      throw error;
    }
  };
  const createTask = async (task: Task) => {
    try {
      const newTask = await saveDataTask(task);
      return newTask;
    } catch (error) {
      throw error;
    }
  };
  const updateTask = async (dataTask: Partial<Task>, taskId: number) => {
    try {
      const task = await getDataById(taskId);
      if (!task) throw new Error("Task not found");
      Object.assign(task, dataTask);
      await saveDataTask(task);
      return true;
    } catch (error) {
      throw error;
    }
  };
  const deleteTask = async (taskId: number) => {
    try {
      await deleteData(taskId);
      return true;
    } catch (error) {
      throw error;
    }
  };
  return {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
