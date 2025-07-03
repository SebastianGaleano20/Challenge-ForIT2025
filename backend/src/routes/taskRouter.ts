import Router from "express";
import { taskController } from "../controllers/taskController";
export const taskRoutes = () => {
  const { getTasks, createTask, editTask, deleteTask } = taskController();
  const taskRouter = Router();
  taskRouter.route("/").get(getTasks);
  taskRouter.route("/create").post(createTask);
  taskRouter.route("/edit/:id").put(editTask);
  taskRouter.route("/delete/:id").delete(deleteTask);
  return taskRouter;
};
