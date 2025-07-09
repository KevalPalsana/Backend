import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import httpStatus from "http-status"
const app = express()

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    callback(null, origin); 
  },
  credentials: true
}));

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './routes/auth.routes.js'
import routes from './routes/index.routes.js'
import mpRoutes from './MP/app.js'
import rotexRoutes from './Rotex/src/routes/index.routes.js'
import hotelRoutes from './HotelDamji/src/routes/index.routes.js'
import fededgeRoutes from './Fededge/src/routes/index.routes.js'
import kkRoutes from './KK/src/routes/index.routes.js'
import spjRoutes from './SPJ/routes/index.routes.js'
import {errorHandler} from "./utils/ApiError.js"
import cuckooRoutes from "./Cuckoo/src/routes/index.routes.js";
import rameshwar from "./Rameshwar/src/routes/index.routes.js";
import vinayak from "./Vinayak/src/routes/index.routes.js";
import cdh from "./CDH/src/routes/index.routes.js";
import infiRoutes from "./Infi/src/routes/index.routes.js";
import datingRoutes from "./BharatLove/src/routes/index.routes.js";
import iconRoutes from "./Icon/src/routes/index.routes.js";
import hygoRoutes from "./HYGO/src/routes/index.routes.js";
import chhapiaRoutes from "./Chhapia/src/routes/index.routes.js";

//routes declaration
app.use("/api/v2", routes);
app.use("/api/v2/mp", mpRoutes);
app.use("/api/v2/rotex", rotexRoutes);
app.use("/api/v2/hotel", hotelRoutes);
app.use("/api/v2/fededge", fededgeRoutes);
app.use("/api/v2/kk", kkRoutes);
app.use("/api/v2/spj", spjRoutes);
app.use("/api/v2/cuckoo", cuckooRoutes);
app.use("/api/v2/rameshwar", rameshwar);
app.use("/api/v2/vinayak", vinayak);
app.use("/api/v2/cdh", cdh);
app.use("/api/v2/infi", infiRoutes);
app.use("/api/v2/bharat-love", datingRoutes);
app.use("/api/v2/icon", iconRoutes);
app.use("/api/v2/hygo", hygoRoutes);
app.use("/api/v2/chhapia", chhapiaRoutes)

app.get('/', (req, res) => {
    res.status(httpStatus.OK).send({ status: 'Health Check :) Server is up and running' });
});

  app.use(errorHandler);


export { app }