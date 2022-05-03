import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import userRepository from "../../src/repositories/userRepository.js";
import { CreateUserData } from "../../src/services/userService.js";

export async function createUser(user: CreateUserData) {
  const hashedPassword = bcrypt.hashSync(user.password, 12);

  const insertedUser = await userRepository.insert({
    ...user,
    password: hashedPassword,
  });

  return insertedUser;
}

export function formatBodyCreateUser(): CreateUserData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
