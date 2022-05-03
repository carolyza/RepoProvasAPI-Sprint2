import { prisma } from "../database.js";

async function insert(createTestData: any) {
  return prisma.test.create({
    data: createTestData,
  });
}

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function countView(id: number) {
  return prisma.test.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  insert,
  countView,
};
