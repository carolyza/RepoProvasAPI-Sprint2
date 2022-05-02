import testRepository from "../repositories/testRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";

//export type CreateTestData = Omit<Test, "id">;

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

export default {
  find,
  createTest
};
