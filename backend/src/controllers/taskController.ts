import { Response, Request, NextFunction } from "express";
import httpStatus from "../utils/httpStatus.js";

export const taskController = () => {
  const createTask = (req: Request, res: Response, next: NextFunction) => {};
  const getTasks = (req: Request, res: Response, next: NextFunction) => {};
  const editTask = (req: Request, res: Response, next: NextFunction) => {};
  const deleteTask = (req: Request, res: Response, next: NextFunction) => {};
  return { createTask, getTasks, editTask, deleteTask };
};
