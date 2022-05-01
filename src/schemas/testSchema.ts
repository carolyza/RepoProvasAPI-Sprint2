import Joi from "joi";
import { CreateTestData } from "../services/testService.js";

const categorySchema = Joi.object().keys({
    id: Joi.number(). integer(),
    name: Joi.string()
  });

export const testSchema = Joi.object<CreateTestData>({
   name: Joi.string().required(),
   pdfUrl: Joi.string().required(),
//    category: categorySchema,
//    discipline: Joi.string().required(),
//   intructor: Joi.string().required(),
});
