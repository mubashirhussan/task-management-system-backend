import express from "express";
import { register, login, logout } from "./auth.controller.js";
import { requireTenant } from "../../middlewares/tenant.middleware.js";

const router = express.Router();

router.post("/register", requireTenant, register);
router.post("/login", requireTenant, login);
router.post("/logout", logout);

export default router;
