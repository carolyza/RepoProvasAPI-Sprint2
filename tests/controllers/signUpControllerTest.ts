import supertest from "supertest";
import app from "../../src/app.js";
import * as userFactory from "../factories/userFactory.js";
import { prisma} from "../../src/database.js";

export async function createUser(){
    const body = userFactory.formatBodyCreateUser();
    const result = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
  
      expect(result.status).toEqual(201);
      expect(user).not.toBeNull();
    
}

export async function sameEmail(){
    const body = userFactory.formatBodyCreateUser();
    await supertest(app).post("/sign-up").send(body);
    const result = await supertest(app).post("/sign-up").send(body);
    
    expect(result.status).toEqual(409);
}

// export async function invalidEmail(){
//     const {password} = userFactory.formatBodyCreateUser();

//     const result = await supertest(app).post("sign-up").send({email:"", password});

//     expect(result.status).toEqual(422);
// }

// export async function invalidPassword(){
//     const {email} = userFactory.formatBodyCreateUser();

//     const result = await supertest(app).post("sign-up").send({email, password:""});
//     console.log(result.status);
//     expect(result.status).toEqual(422);
// }
