import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import httpStatus from "http-status"
import mongoose from "mongoose"
const app = express()

app.use(cors());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

mongoose.set("strictPopulate", false);


import userRouter from './routes/auth.routes.js'
import routes from './routes/index.routes.js'
import {errorHandler} from "./utils/ApiError.js"

//routes declaration
app.use("/api/v1", routes)

app.get('/', (req, res) => {
    res.status(httpStatus.OK).send({ status: 'Health Check :) Server is up and running' });
});

  app.use(errorHandler);


export { app }