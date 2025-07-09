import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import httpStatus from "http-status"
import mongoose from "mongoose"
import { Server } from "socket.io"
import http from "http"

const app = express()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered for socket notifications.`);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log("Socket disconnected:", socket.id);
  });
});


io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("sendNotification", (data) => {
      console.log("Notification Data:", data);
      io.emit("newNotification", data); 
  });

  socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);
  });
});

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