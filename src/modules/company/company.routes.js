import express from "express";
import { create } from "./company.controller.js";

const router = express.Router();

router.post("/", create);

export default router;

