import { prisma } from "../database.js";

async function findMany() {
  return prisma.teacher.findMany();
}

async function getTeachersByDiscipline(disciplineId: number) {
  return prisma.teacherDiscipline.findMany({
    select: {
      teacher: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    where: {
      disciplineId,
    },
  });
}

async function findTeacherDiscipline(instructor: number, discipline: number) {
  return prisma.teacherDiscipline.findFirst({
    where: {
      teacherId: instructor,
      disciplineId: discipline,
    },
  });
}

export default {
  findMany,
  getTeachersByDiscipline,
  findTeacherDiscipline,
};
