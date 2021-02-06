import { auth, ConfigParams } from "express-openid-connect"
import { Express } from "express"

const isDevelopment = process.env.NODE_ENV === "development"

const config: ConfigParams = {
  authRequired: isDevelopment ? false : true,
  auth0Logout: true,
}

export const startAuth = (app: Express) => {
  app.use(auth(config))
}
