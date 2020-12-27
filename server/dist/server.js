"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const Auth_1 = __importDefault(require("./Routes/Auth/Auth"));
const ProfielPicUpload_1 = __importDefault(require("./Routes/ProfilePicUpload/ProfielPicUpload"));
const Journal_1 = __importDefault(require("./Routes/Journal/Journal"));
dotenv_1.config();
const app = express_1.default();
const origin = {
    dev: "http://localhost:3000",
    prod: "",
};
//=======================================================Middlewares====================================================
app.use(cors_1.default({
    origin: process.env.NODE_ENV === "production" ? origin.prod : origin.dev,
    credentials: true,
}));
const mongoStore = connect_mongodb_session_1.default(express_session_1.default);
const mongoURI = process.env.mongoURI;
const store = new mongoStore({
    collection: "usersessions",
    uri: mongoURI,
    expires: 365 * 60 * 60 * 24 * 1000,
});
const isCookieSafe = process.env.NODE_ENV === "production";
app.use(express_session_1.default({
    secret: process.env.session_secret,
    name: "_sid",
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
        httpOnly: true,
        maxAge: 365 * 60 * 60 * 24 * 1000,
        secure: isCookieSafe,
        signed: true,
    },
}));
//=================================================MongoDB Connection & Configs=========================================
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose_1.default.connect(mongoURI, connectionOptions, (error) => {
    if (error) {
        return console.error(error);
    }
    return console.log("Connection MongoDB was successful");
});
app.use(Auth_1.default);
app.use(ProfielPicUpload_1.default);
app.use(Journal_1.default);
//==============================================Server Connection & Configs=============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
//# sourceMappingURL=server.js.map