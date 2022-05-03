import supertest from "supertest";
import app from "../../src/app.js";
import tokenFactory from "../factories/tokenFactory.js";


export async function invalidToken(){

    const body = {};

    const promise = await supertest(app).get("/categories").send(body).set("Authorization", "um_token_bem_errado");

    expect(promise.status).toEqual(401);

}


export async function valid(){

    const login = await tokenFactory();

    const promise = await supertest(app).get("/categories").set("Authorization", login.body.token);

    expect(promise.status).toEqual(200);

}