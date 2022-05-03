import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy } = req.query as { groupBy: string };

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy });
  res.send({ tests });
}

async function createTest(req: Request, res: Response) {
  const { name, pdfUrl, category, discipline, instructor } = req.body;
  await testService.createTest(name, pdfUrl, category, discipline, instructor);
  res.sendStatus(201);
}

async function countView(req: Request, res: Response) {
  const { id } = req.params;

  await testService.countView(parseInt(id));

  res.sendStatus(200);
}

export default {
  find,
  createTest,
  countView,
};
