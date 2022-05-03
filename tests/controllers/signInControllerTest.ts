import supertest from "supertest";
import app from "../../src/app.js";
import * as userFactory from "../factories/userFactory.js";

export async function incorrectEmail() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: "incorrect" + user.email, password: user.password });

  expect(result.status).toEqual(401);
}

export async function incorrectPassword() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: user.email, password: "incorrect" + user.password });

  expect(result.status).toEqual(401);
}

export async function invalidEmail() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: "", password: user.password });

  expect(result.status).toEqual(422);
}

export async function invalidPassword() {
  const user = await insertUser();

  const result = await supertest(app)
    .post("/sign-in")
    .send({ email: user.email, password: "" });

  expect(result.status).toEqual(422);
}

async function insertUser() {
  const user = userFactory.formatBodyCreateUser();
  await userFactory.createUser(user);
  return user;
}
export async function login() {
  const body = userFactory.formatBodyCreateUser();

  await userFactory.createUser(body);

  const result = await supertest(app).post("/sign-in").send(body);

  expect(result.status).toEqual(200);
  expect(typeof result.body.token).toEqual("string");
  expect(result.body.token.length).toBeGreaterThan(0);
}
