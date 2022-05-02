import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

 testRouter.post("/app/adicionar-prova",   ensureAuthenticatedMiddleware, validateSchemaMiddleware(testSchema),
 testController.createTest);
testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.patch("/tests/:id", ensureAuthenticatedMiddleware, testController.countView);

export default testRouter;
