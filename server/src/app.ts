import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { startRoutes } from "./startUp/startRoutes"
const app = express()

startRoutes(app)

export default app
