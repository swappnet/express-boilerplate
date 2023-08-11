import { Router } from "express";

import { createPost, getPost, getPosts } from "./posts.controller";

const router: Router = Router();

router.get("/posts", getPosts);

router.get("/posts/:id", getPost);

router.post("/posts/create", createPost);

export default router;
