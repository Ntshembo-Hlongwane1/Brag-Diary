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

const mongoStore = MongoStore(expressSession);
const mongoURI = process.env.mongoURI;
const store = new mongoStore({
  collection: "usersessions",
  uri: mongoURI,
  expires: 365 * 60 * 60 * 24 * 1000, //Expires after a year
});
const isCookieSafe = process.env.NODE_ENV === "production";
app.use(
  expressSession({
    secret: process.env.session_secret,
    name: "_sid",
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 365 * 60 * 60 * 24 * 1000, //Expires after a year
      secure: isCookieSafe,
      signed: true,
    },
  })
);

//=================================================MongoDB Connection & Configs=========================================
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(mongoURI, connectionOptions, (error) => {
  if (error) {
    return console.error(error);
  }
  return console.log("Connection MongoDB was successful");
});

//==============================================Server Connection & Configs=============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
