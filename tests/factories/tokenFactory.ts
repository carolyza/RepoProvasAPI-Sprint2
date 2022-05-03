import supertest from "supertest";
import app from "../../src/app";
import * as userFactory from  "./userFactory.js";

export default async function tokenFactory() {
    const body = userFactory.formatBodyCreateUser();

    await userFactory.createUser(body);

    return await supertest(app).post("/sign-in").send(body);
}