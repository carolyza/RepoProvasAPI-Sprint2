import { prisma } from "../src/database.js";
import * as signUpControllerTest from "./controllers/signUpControllerTest.js";
import * as signInControllerTest from "./controllers/signInControllerTest.js";
import * as testControllerTest from "./controllers/testControllerTest.js";
import * as categoriesControllerTest from "./controllers/categoriesControllerTest.js";
import * as disciplinesControllerTest from "./controllers/disciplinesControllerTest.js";
import * as teacherControllerTest from "./controllers/teacherControllerTest.js";

beforeEach(truncateAll);

async function truncateAll() {
  await prisma.$executeRaw`
        TRUNCATE TABLE 
            users,
            teachers,
            terms,
            disciplines,
            categories,
            "TeacherDiscipline",
            tests
    `;
}

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it(
    "should return 409 when the email is already in use",
    signUpControllerTest.sameEmail
  );

  it("Should return 201 when create user", signUpControllerTest.createUser);
});

describe("POST /sign-in", () => {
  it(
    "should answer with status 200 when given valid credentials",
    signInControllerTest.login
  );

  it(
    "should return 409 when the email is incorrect",
    signInControllerTest.incorrectEmail
  );

  it(
    "should return 409 when the password is incorrect",
    signInControllerTest.incorrectPassword
  );

  it(
    "should return 422 when the email is invalid",
    signInControllerTest.invalidEmail
  );

  it(
    "should return 422 when the password is invalid",
    signInControllerTest.invalidPassword
  );
});

describe("POST /app/adicionar-prova", () => {
  it("should return 201 when create test", testControllerTest.createTest);

  it("returns 422 given invalid body", testControllerTest.invalidBody);
});

describe("GET /categories", () => {
  it("returns 401 given invalid token", categoriesControllerTest.invalidToken);

  it("returns 200 given valid token", categoriesControllerTest.valid);
});

describe("GET /disciplines", () => {
  it("returns 401 given invalid token", disciplinesControllerTest.invalidToken);

  it("returns 200 given valid token", disciplinesControllerTest.valid);
});

describe("GET /teachers", () => {
  it("returns 401 given invalid token", teacherControllerTest.invalidToken);

  it("returns 200 given valid token", teacherControllerTest.valid);
});

describe("GET /tests", () => {
  it("returns 401 given invalid token", testControllerTest.invalidToken);

  it("returns 400 given invalid body", testControllerTest.invalidBodyGet);

  it("returns 400 given invalid groupBy", testControllerTest.invalidGroup);

  it("returns 200 given valid token", testControllerTest.getTest);
});

describe("PATCH /tests/:id", () => {
  it("returns 200 given valid testId", testControllerTest.validId);

  it("returns 401 given invalid token", testControllerTest.invalidTokenPatch);
});
