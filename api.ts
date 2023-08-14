import express, { Router } from "express";

import auth from "@components/auth/auth.router";

const router: Router = Router();

router.use(express.json());
router.use(auth);

export default router;
