import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";

export const startMiddleware = (app: Express) => {
  app.use(bodyParser.json());
  app.use(cors());
};
