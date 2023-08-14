import { User } from "@components/auth/auth.interface";
import db from "../../database/db.json";

export const getUser = async (email: string) => {
  const users: User[] = db;

  const user = users.find((user) => user.email === email);

  if (user) {
    return user;
  } else {
    return null;
  }
};
