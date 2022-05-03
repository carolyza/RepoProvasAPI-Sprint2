import supertest from "supertest";
import app from "../../src/app.js";
import { getIds } from "../factories/teacherFactory.js";
import tokenFactory from "../factories/tokenFactory.js";


export async function invalidToken(){
  const id = await getIds();

    const promise = await supertest(app).get(`/teachers/${id}`).set("Authorization", "um_token_bem_errado");

    expect(promise.status).toEqual(401);

}


export async function valid(){

    const id = await getIds();

    const login = await tokenFactory();

    const promise = await supertest(app).get(`/teachers/${id}`).set("Authorization", login.body.token);

    expect(promise.status).toEqual(200);
}
