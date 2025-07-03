import { Router } from "express";
import { taskRoutes } from "./routes/taskRouter.js";

const routes = Router();

routes.use("/tasks", taskRoutes());

export default routes;
