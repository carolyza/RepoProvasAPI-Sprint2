import testRepository from "../repositories/testRepository.js";
import { Test } from "@prisma/client";

export type CreateTestData = Omit<Test, "id">;

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

async function createTest(createTestData: CreateTestData) {

  await testRepository.insert({ ...createTestData});
}

export default {
  find,
  createTest
};
