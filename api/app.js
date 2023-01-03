import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
    authRoute,
    agencesRoute,
    tripsRoute,
    usersRoute
} from "./routes/index.js";
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFound from "./middleware/not-found.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const start = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        app.listen(port, () => {
            console.log(`Server listening to port ${port}`)
        })
    } catch (error) {
        throw error
    }
}

//middlewares
// app.use(cookieParser());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

//routes

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/agences", agencesRoute);
app.use("/api/trips", tripsRoute);


app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

start();
