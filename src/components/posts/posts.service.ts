import { Request } from "express";
import fs from "fs";
import { IPost } from "@components/posts/posts.interface";
import path from "path";

import db from "@database/db.json";

const databasePath = path.join(__dirname, "../../database/db.json");

const read = () => {
  try {
    const posts = db;
    return posts;
  } catch (e) {
    throw e;
  }
};

const readSingle = (req: Request) => {
  try {
    const postId = parseInt(req.params.id);

    const posts = db;

    const post = posts.find((post: IPost) => post.id === postId);

    return post;
  } catch (e) {
    throw e;
  }
};

const create = (req: {
  title: string;
  content: string;
  author: string;
}): Boolean => {
  try {
    const posts: IPost[] = db;

    const post: IPost = {
      id: posts.length + 1,
      title: req.title,
      author: req.author,
      content: req.content,
      timestamp: new Date().toISOString(),
    };

    posts.push(post);

    const updatedPosts = JSON.stringify(posts, null, 2);

    fs.writeFileSync(databasePath, updatedPosts, "utf-8");

    return true;
  } catch (e) {
    throw new Error("Failed to create a post.");
  }
};

const remove = (id: number): Boolean => {
  try {
    const posts: IPost[] = db;

    if (posts.length === 0) {
      throw new Error("No posts available to delete.");
    }

    const postToDelete = posts.find((post) => post.id === id);

    if (!postToDelete) {
      throw new Error(`Post with id ${id} not found.`);
    }

    const newPosts = posts.filter((post) => post.id !== id);

    const updatedPosts = JSON.stringify(newPosts, null, 2);

    fs.writeFileSync(databasePath, updatedPosts, "utf-8");

    return true;
  } catch (e) {
    throw new Error("Failed to remove a post.");
  }
};

const update = (
  id: number,
  data: { title?: string; content?: string; author?: string }
): Boolean => {
  try {
    const posts: IPost[] = db;

    const postToUpdate = posts.find((post) => post.id === id);

    if (!postToUpdate) {
      throw new Error(`Post with id ${id} not found.`);
    }

    if (data.title !== undefined) {
      postToUpdate.title = data.title;
    }
    if (data.content !== undefined) {
      postToUpdate.content = data.content;
    }
    if (data.author !== undefined) {
      postToUpdate.author = data.author;
    }

    const updatedPosts = JSON.stringify(posts, null, 2);

    fs.writeFileSync(databasePath, updatedPosts, "utf-8");

    return true;
  } catch (e) {
    throw new Error("Failed to update a post.");
  }
};

export { create, read, readSingle, remove, update };
