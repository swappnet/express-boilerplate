import { Router } from "express";

import post from "./src/components/posts/posts.router";

const router: Router = Router();

router.use(post);

export default router;
