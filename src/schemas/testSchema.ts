import Joi from "joi";

export const testSchema = Joi.object({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  category: Joi.number().required(),
  discipline: Joi.number().required(),
  instructor: Joi.number().required(),
});
