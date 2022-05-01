import teacherRepository from "../repositories/teacherRepository.js";

async function findMany() {
  return teacherRepository.findMany();
}

async function findByDiscipline(discipline) {
 return teacherRepository.getTeachersByDiscipline(discipline);
}

export default {
  findMany,
  findByDiscipline
};
