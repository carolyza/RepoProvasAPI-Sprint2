import { Router } from "express";
import teacherController from "../controllers/teacherController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const teacherRouter = Router();

teacherRouter.get(
  "/teachers/:discipline",
  ensureAuthenticatedMiddleware,
  teacherController.findByDiscipline
);

export default teacherRouter;
