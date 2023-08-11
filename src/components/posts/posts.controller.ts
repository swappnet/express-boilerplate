import { Request, Response } from "express";
import httpStatus from "http-status";
import { create, read, readSingle, remove, update } from "./posts.service";

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
    const post = req.body as { title: string; content: string; author: string };

    create(post);

    res.status(httpStatus.CREATED);
    res.send({ message: "Post successfully created." });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({ message: error.message });
  }
};

const removePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;

    remove(parseInt(postId));

    res.status(httpStatus.CREATED);
    res.send({ message: "Post successfully removed." });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({ message: error.message });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;

    const data = req.body as {
      title?: string;
      content?: string;
      author?: string;
    };

    update(parseInt(postId), data);

    res.status(httpStatus.CREATED);
    res.send({ message: "Post successfully updated." });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({ message: error.message });
  }
};

export { getPosts, getPost, createPost, removePost, updatePost };
