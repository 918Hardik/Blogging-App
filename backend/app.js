import express from "express";

import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";

import { errorMiddleware } from './middleware/error.js'

import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config({ path: "./config/config.env" });

//use is a middleware 
app.use(cors({
    origin: [process.env.FRONTEND_URL],  //origin ek array hota h jisme hum front end ka path dete h
    methods: ["GET", "PUT", "DELETE", "POST"],  //methods jo hum use krenge apne project mai example, delete , post ,get 
    credentials: true,

}))

app.use(cookieParser());
app.use(express.json()); //bhejna or get krna data jo json form mai hota h


app.use(express.urlencoded({ extended: true })); //use to determin type of data (string arrya bbla bla)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;