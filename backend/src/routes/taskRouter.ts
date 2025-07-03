import Router from "express";

export const taskRoutes = () => {
  const taskRouter = Router();
  taskRouter.route("/").get(getTasks).post(createTask);
  return taskRouter;
};
