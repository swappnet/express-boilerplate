import { Request, Response } from "express";
import httpStatus from "http-status";
import { create, read, readSingle } from "./posts.service";
import { IPost } from "./posts.interface";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = read();

    res.status(httpStatus.OK);
    res.send(posts);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const post = readSingle(req);

    if (!post) {
      res.status(httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK);
    res.send(post);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const post = req.body as IPost;
    create(post);

    res.status(httpStatus.CREATED);
    res.send({ message: "Created" });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export { getPosts, getPost, createPost };
