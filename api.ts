import express, { Router } from "express";

import authRoutes from "@components/auth/auth.router";

const router: Router = Router();

router.use(express.json());
router.use(authRoutes);

export default router;
