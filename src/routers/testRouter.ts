import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

 testRouter.post("/app/adicionar-prova",   ensureAuthenticatedMiddleware,
 testController.createTest);
//testRouter.post("/app/adicionar-prova", ensureAuthenticatedMiddleware, testController.find);

export default testRouter;
