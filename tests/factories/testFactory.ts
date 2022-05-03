import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import testRepository from "../../src/repositories/testRepository.js";
import { CreateTestData } from "../../src/services/testService.js";
import {prisma} from "../../src/database.js"
import { isDataView } from "util/types";

export async function createTest(){
    const ids = await getIds();

    const test = formatBodyCreateTest(ids.categoryId,ids.teacherDisciplineId);

    const insertedTest = await testRepository.insert(test);

    return insertedTest;
}



export function formatBodyCreateTest(categoryId, instructorId):CreateTestData{
    // const categoryId = `P${faker.datatype.number(6)}`.toString();
    // const teacherDisciplineId = `P${faker.datatype.number(6)}`.toString();
    // const instructorId = `P${faker.datatype.number(6)}`.toString();

    
    return{
        name: faker.name.findName(),
        pdfUrl: faker.internet.url(),
        categoryId: categoryId,
        teacherDisciplineId:  instructorId
    };
}

 export async function getIds(){
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

      const ids = {
         categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id
    };
     return ids;
 }