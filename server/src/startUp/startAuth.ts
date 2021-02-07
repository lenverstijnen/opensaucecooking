import { Express } from "express";
import { checkJwt } from "../auth/check-jwt";

// const isDevelopment = process.env.NODE_ENV === "development"O

export const startAuth = (app: Express) => {
  app.use(checkJwt);
};
