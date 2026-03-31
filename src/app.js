import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
