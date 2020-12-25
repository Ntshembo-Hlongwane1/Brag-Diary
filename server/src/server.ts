import express, { Application } from "express";
import cors from "cors";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const origin = {
  dev: "http://localhost:3000",
  prod: "",
};
//=======================================================Middlewares====================================================
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? origin.prod : origin.dev,
    credentials: true,
  })
);
