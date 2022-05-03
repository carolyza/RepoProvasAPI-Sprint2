import supertest from "supertest";
import app from "../../src/app.js";
import * as testFactory from "../factories/testFactory.js";
import { prisma} from "../../src/database.js";
import  tokenFactory from "../factories/tokenFactory.js";

// testRouter.post("/app/adicionar-prova",   ensureAuthenticatedMiddleware, validateSchemaMiddleware(testSchema),
// testController.createTest);
// testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
// testRouter.patch("/tests/:id", ensureAuthenticatedMiddleware, testController.countView);

// export async function createUser(){
//     const body = testFactory.formatBodyCreateTest();
//     const result = await supertest(app).post("/app/adicionar-prova").send(body);
  
//       expect(result.status).toEqual(201);
         
// }
export async function createTest(){

const login = await tokenFactory();

const ids = await testFactory.getIds();

const test = testFactory.formatBodyCreateTest(ids.categoryId,ids.teacherDisciplineId,);

const promise = await supertest(app).post("/app/adicionar-prova").send(test).set("Authorization", login.body.token);

const tests = await prisma.test.findMany({
    where: {
        name: test.name,
    },
});

expect(promise.status).toEqual(201);
expect(tests.length).toEqual(1);
}


export async function invalidBody(){

    const login = await tokenFactory();

    const ids = await testFactory.getIds();

    const test = testFactory.formatBodyCreateTest(ids.categoryId,ids.teacherDisciplineId);

    const wrong = "wrong new param";

    const promise = await supertest(app).post("/app/adicionar-prova").send({ ...test, wrong }).set("Authorization", login.body.token);

    expect(promise.status).toEqual(422);

}

export async function invalidToken(){
 
    const body = {};

    const promise = await supertest(app).get("/tests").send(body).set("Authorization", "wrong-token");

    expect(promise.status).toEqual(401);

}

export async function invalidBodyGet(){

    const body = { bananinha: 123 };

    const login = await tokenFactory();

    const promise = await supertest(app).get("/tests").send(body).set("Authorization", login.body.token);

    expect(promise.status).toEqual(400);

}


export async function invalidGroup(){
 
    const body = { groupBy: "nonexistent" };

    const login = await tokenFactory();

    const promise = await supertest(app).get("/tests").send(body).set("Authorization", login.body.token);

    expect(promise.status).toEqual(400);

}

export async function getTest(){
    const body = { groupBy: "discipline" };

    const login = await tokenFactory();

    const promise = await supertest(app).get("/tests").send(body).set("Authorization", login.body.token);

    expect(promise.status).toEqual(200);
    expect(typeof promise.body).toEqual("object");

}

export async function validId(){

    const testId = 1;

    const login = await tokenFactory();

    const promise = await supertest(app).patch(`/tests/${testId}`).set("Authorization", login.body.token);

    expect(promise.status).toEqual(200);

}

export async function invalidTokenPatch(){

    const testId = 1;

    const promise = await supertest(app).patch(`/tests/${testId}`).set("Authorization", "wrong-token");

    expect(promise.status).toEqual(401);

}
