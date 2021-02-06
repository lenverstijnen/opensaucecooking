import dotenv from "dotenv"
dotenv.config()
import express from "express"
import startDb from "./startUp/startDb"
import { startRoutes } from "./startUp/startRoutes"
const app = express()

startDb()
startRoutes(app)

export default app
