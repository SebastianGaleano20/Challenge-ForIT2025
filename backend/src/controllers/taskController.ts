import { Response, Request, NextFunction } from "express";
import { httpStatus } from "../utils/httpStatus.js";
import { taskService } from "../services/taskService.js";
import type { Task } from "../types/index.js";

export const taskController = () => {
  const { getAllTasks, createTask, deleteTask, updateTask, getTaskById } =
    taskService();

  const createNewTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task = req.body as Task;
      const newTask = await createTask(task);
      if (!newTask) {
        throw new Error("Task not created");
      }
      res
        .status(httpStatus.CREATED)
        .json({ message: "Task created successfully", task: task });
    } catch (error) {
      next(error);
    }
  };

  const getAllDataTask = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tasks = await getAllTasks();
      if (!tasks) {
        throw new Error("Tasks not found");
      }
      res
        .status(httpStatus.OK)
        .json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      next(error);
    }
  };

  const updateDataTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const task = req.body as Task;
      const id = req.params.id;
      const taskId = parseInt(id);
      const updatedTask = await updateTask(task, taskId);
      if (!updatedTask) {
        throw new Error("Task not updated");
      }
      res
        .status(httpStatus.OK)
        .json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      next(error);
    }
  };
  const deleteDataTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const taskId = parseInt(id);
      const deletedTask = await deleteTask(taskId);
      if (!deletedTask) {
        throw new Error("Task not deleted");
      }
      res
        .status(httpStatus.OK)
        .json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      next(error);
    }
  };
  const getDataTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const taskId = parseInt(id);
      const task = await getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      res
        .status(httpStatus.OK)
        .json({ message: "Task retrieved successfully", task });
    } catch (error) {
      next(error);
    }
  };

  return {
    createNewTask,
    getDataTaskById,
    getAllDataTask,
    updateDataTask,
    deleteDataTask,
  };
};
