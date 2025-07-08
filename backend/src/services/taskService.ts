import { taskModel } from "../models/taskModel.js";
import type { Task } from "../types/index.js";
import { readData } from "../utils/dbManagment.js";

export const taskService = () => {
  const {
    getDataById,
    updateDataTask,
    getDataTasks,
    saveDataTask,
    deleteData,
  } = taskModel();

  const getAllTasks = async () => {
    try {
      const tasks = await getDataTasks();
      return tasks;
    } catch (error) {
      throw error;
    }
  };
  const createTask = async (
    task: Omit<Task, "id" | "createdAt" | "completed">
  ) => {
    try {
      const existingTasks = await readData();
      const newId =
        existingTasks.length > 0
          ? Math.max(...existingTasks.map((t: Task) => t.id)) + 1
          : 1;

      const newTask: Task = {
        id: newId,
        createdAt: new Date().toISOString(),
        completed: false,
        ...task,
      };

      const savedTask = await saveDataTask(newTask);
      return savedTask;
    } catch (error) {
      throw error;
    }
  };
  const updateTask = async (dataTask: Partial<Task>, taskId: number) => {
    try {
      const task = await getDataById(taskId);
      if (!task) throw new Error("Task not found");

      const updatedTask = { ...task, ...dataTask };
      await updateDataTask(updatedTask);
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
  const getTaskById = async (taskId: number) => {
    try {
      const task = await getDataById(taskId);
      return task;
    } catch (error) {
      throw error;
    }
  };
  return {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
};
