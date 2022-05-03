import testRepository from "../repositories/testRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import {Test} from "@prisma/client";

export type CreateTestData = Omit<Test, "id"| "views">;

interface Filter {
  groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers();
  }
}

async function createTest(name: string,
  pdfUrl: string,
  category: number,
  discipline: number,
  instructor: number) {
  
  const { id: teacherDisciplineId } =
  await teacherRepository.findTeacherDiscipline(instructor, discipline);

  const data = {
    name,
    pdfUrl,
    categoryId: category,
    teacherDisciplineId,
  };
  console.log(data);
  await testRepository.insert(data);
}

async function countView(id: number){
await testRepository.countView(id);
}

export default {
  find,
  createTest,
  countView
};
