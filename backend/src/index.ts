import { Router } from "express";

const routes = Router();

routes.use("/tasks", taskRoutes());

export default routes;
