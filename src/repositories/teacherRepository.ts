import { prisma } from "../database.js";

async function findMany() {
  return prisma.teacher.findMany();
}

async function getTeachersByDiscipline(disciplineId: number) {
  return prisma.teacherDiscipline.findMany({
    select: {
      teacher: {
        select:{
        name: true,
        id: true
        }
      },
    },
    where: {
      disciplineId,
    },
  }); 
}

// include: {
//   teacherDisciplines: {
//     include: {
//       discipline: true
//     },
    
//       disciplineId: parseInt(disciplineId)
//     }
//   }
// }


export default {
  findMany,
  getTeachersByDiscipline
};