import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function findMany(req: Request, res: Response) {
  const teachers = await teacherService.findMany();
  res.send({ teachers });
}

async function findByDiscipline(req: Request, res: Response) {
  const { discipline } = req.params;

  const teachers = await teacherService.findByDiscipline(parseInt(discipline));
  res.send({ teachers });
}

export default {
  findMany,
  findByDiscipline,
};
