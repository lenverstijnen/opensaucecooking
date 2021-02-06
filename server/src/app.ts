import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { startAuth } from "./startUp/startAuth";
import { startMiddleware } from "./startUp/startMiddleware";
import { startRoutes } from "./startUp/startRoutes";

const app = express();

startMiddleware(app);
startAuth(app);
startRoutes(app);

export default app;
