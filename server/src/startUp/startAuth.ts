import { auth, ConfigParams } from "express-openid-connect";
import { Express } from "express";

const config: ConfigParams = {
  authRequired: true,
  auth0Logout: true,
};

export const startAuth = (app: Express) => {
  app.use(auth(config));
};
