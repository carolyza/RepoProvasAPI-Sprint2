import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

export function formatBodyCreateTeacher(disciplineId) {
  return {
    discipline: disciplineId,
  };
}

export async function getIds() {
  const categoryId = `P${faker.datatype.number(6)}`;

  const category = await prisma.category.upsert({
    where: {
      name: categoryId,
    },
    update: {},
    create: {
      name: categoryId,
    },
  });

  const teacherName = faker.name.findName();

  const teacher = await prisma.teacher.upsert({
    where: {
      name: teacherName,
    },
    update: {},
    create: {
      name: teacherName,
    },
  });

  const termNumber = faker.datatype.number(10);

  const term = await prisma.term.upsert({
    where: {
      number: termNumber,
    },
    update: {},
    create: {
      number: termNumber,
    },
  });

  const disciplineName = faker.name.jobArea();

  const discipline = await prisma.discipline.upsert({
    where: {
      name: disciplineName,
    },
    update: {},
    create: {
      name: disciplineName,
      termId: term.id,
    },
  });

  const teacherDiscipline = await prisma.teacherDiscipline.create({
    data: {
      teacherId: teacher.id,
      disciplineId: discipline.id,
    },
  });

  return discipline.id;
}
