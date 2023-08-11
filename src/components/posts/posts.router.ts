import { Router } from "express";

import {
  createPost,
  getPost,
  getPosts,
  removePost,
  updatePost,
} from "./posts.controller";
import { validatePost } from "@core/middleware/posts.middleware";

const router: Router = Router();

router.get("/posts", getPosts);

router.get("/posts/:id", getPost);

router.delete("/posts/:id", removePost);

router.post("/posts/", validatePost, createPost);

router.put("/posts/:id", validatePost, updatePost);

export default router;
