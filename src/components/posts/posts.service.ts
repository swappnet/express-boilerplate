import { Request } from "express";
import { IPost } from "./posts.interface";

import db from "../../database/db.json";

const read = () => {
  try {
    const posts = db.posts;
    return posts;
  } catch (e) {
    throw e;
  }
};

const readSingle = (req: Request) => {
  try {
    const postId = parseInt(req.params.id);

    const posts = db.posts;

    const post = posts.find((post: IPost) => post.id === postId);

    return post;
  } catch (e) {
    throw e;
  }
};

const create = (user: IPost): boolean => {
  try {
    db.posts.push(user);

    return true;
  } catch (e) {
    return false;
  }
};

export { read, readSingle, create };
