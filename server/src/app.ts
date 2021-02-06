import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { startAuth } from "./startUp/startAuth"
import startDb from "./startUp/startDb"
import { startMiddleware } from "./startUp/startMiddleware"
import { startRoutes } from "./startUp/startRoutes"
const app = express()

startDb()
startMiddleware(app)
startAuth(app)
startRoutes(app)

export default app
