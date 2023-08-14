import fs from "fs";
import bcrypt from "bcrypt";
import { getUser } from "@core/helpers/getUser";
import { User } from "./auth.interface";
import db from "@database/db.json";
import path from "path";
import ServerError from "@core/instances/ServerError";

const login = async (email: string, password: string) => {
  try {
    const user = await getUser(email);

    if (!user) {
      throw new ServerError("No user found with this email.", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    } else {
      throw new ServerError("The password is not valid.", 422);
    }
  } catch (error) {
    if (error instanceof ServerError) {
      throw new ServerError(error.message, error.code || 500);
    }
  }
};

const register = async (user: User) => {
  try {
    const users: User[] = db;

    const databasePath = path.join(__dirname, "../../database/db.json");

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser: User = {
      email: user.email,
      password: hashedPassword,
      username: user.username,
    };

    users.push(newUser);

    const updatedUsers = JSON.stringify(users, null, 2);

    fs.writeFileSync(databasePath, updatedUsers, "utf-8");

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      throw new ServerError(error.message, error.code || 500);
    }
  }
};

export { login, register };
