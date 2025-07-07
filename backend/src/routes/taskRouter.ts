import Router from "express";
import { taskController } from "../controllers/taskController.js";
export const taskRoutes = () => {
  const {
    getAllDataTask,
    getDataTaskById,
    createNewTask,
    updateDataTask,
    deleteDataTask,
  } = taskController();
  const taskRouter = Router();
  taskRouter.route("/").get(getAllDataTask);
  taskRouter.route("/create").post(createNewTask);
  taskRouter.route("/:id").get(getDataTaskById);
  taskRouter.route("/edit/:id").put(updateDataTask);
  taskRouter.route("/delete/:id").delete(deleteDataTask);
  return taskRouter;
};
