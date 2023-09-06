import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const router = express.Router();

router.use(authMiddleware);

router.post;
