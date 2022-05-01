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
  const test = req.body;

  await testService.createTest(test);

  res.sendStatus(201);
}

export default {
  find,
  createTest
};
