"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const formidable_1 = require("formidable");
const bcrypt_1 = require("bcrypt");
const UserSessions_1 = require("../../Models/UserSessions/UserSessions");
const Users_1 = require("../../Models/Users/Users");
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
dotenv_1.config();
class AuthController {
    constructor() {
        this.baseURL = {
            dev: "http://localhost:3000/verify-account/:id",
            prod: "",
        };
        this.url =
            process.env.NODE_ENV === "production"
                ? this.baseURL.prod
                : this.baseURL.dev;
    }
    SignUp(request, response) {
        const form = new formidable_1.IncomingForm();
        try {
            form.parse(request, (error, fields) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return response
                        .status(500)
                        .json({ msg: "Network Error: Failed to sign user up" });
                }
                const { username, password, email, verifiedPassword } = fields;
                if (!username || !password || !email || !verifiedPassword) {
                    return response.status(400).json({ msg: "All fields are required" });
                }
                if (password.trim().length < 6) {
                    return response
                        .status(400)
                        .json({ msg: "Password has to be at least 6 characters long" });
                }
                if (password.trim() !== verifiedPassword.trim()) {
                    return response.status(400).json({ msg: "Password do not match" });
                }
                const isUsernameExisting = yield Users_1.userModel.findOne({
                    username: username,
                });
                if (isUsernameExisting) {
                    return response
                        .status(400)
                        .json({ msg: "Account with this username already exist" });
                }
                const isEmailExisting = yield Users_1.userModel.findOne({ email: email });
                if (isEmailExisting) {
                    return response
                        .status(400)
                        .json({ msg: "Account with this email already exist" });
                }
                const salt = yield bcrypt_1.genSalt(15);
                const hashedPassword = yield bcrypt_1.hash(password, salt);
                const newUser = new Users_1.userModel({
                    username,
                    email,
                    password: hashedPassword,
                });
                const savedUser = yield newUser.save();
                if (!savedUser) {
                    return response.status(500).json({
                        msg: "Network Error: Failed to sign you up, please try again later",
                    });
                }
                const transporter = nodemailer_1.createTransport({
                    service: "SendinBlue",
                    auth: {
                        user: process.env.sendinBlue__login,
                        pass: process.env.sendinBlue__pass,
                    },
                });
                const message = {
                    from: "noreply@bragdiary.co.za",
                    to: email,
                    subject: "Account Activation",
                    priority: "high",
                    html: `
          
              <h1>Account Activation</h1>
              <h3>Click link below</h3>
              <a href=${this.url}>Activate account</a>

              <h4 style="margin-top:4rem;">Any Queries?</h4>
              <h5>Email: juniorWebProjects@gmail.com</h5>
          
          `,
                };
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        return response.status(500).json({
                            msg: "Network Error: Failed to send Account activation link",
                            error,
                        });
                    }
                    return response
                        .status(201)
                        .json({ msg: `Email sent to ${email} for account activation` });
                });
            }));
        }
        catch (error) {
            return response.status(500).json({
                msg: "Network Error: Failed to sign you up, please try again later",
            });
        }
    }
    SignIn(request, response) {
        const form = new formidable_1.IncomingForm();
        try {
            form.parse(request, (error, fields) => __awaiter(this, void 0, void 0, function* () {
                const { username, password } = fields;
                if (error) {
                    return response.status(500).json({
                        msg: "Network Error: Failed to sign you in plese try again later",
                    });
                }
                if (!username || !password) {
                    return response.status(400).json({ msg: "All fields are required" });
                }
                //Giving a Boolean(ish) variable to represent whether username is existing or not
                const isUsernameExisting = yield Users_1.userModel.findOne({
                    username: username,
                });
                if (!isUsernameExisting) {
                    return response
                        .status(404)
                        .json({ msg: "Account with this username does not exist" });
                }
                const user = isUsernameExisting; //swapping variable to because user is validated and existing
                const usersHashedPassword = user.password;
                const isPasswordVaild = yield bcrypt_1.compare(password, usersHashedPassword);
                if (!isPasswordVaild) {
                    return response.status(400).json({ msg: "Invalid credentials" });
                }
                const isUserSessionActive = yield UserSessions_1.userSessionModel.findOne({
                    "session.user.id": user._id,
                });
                if (isUserSessionActive) {
                    return response.status(200).json({ msg: "Session is active" });
                }
                const userSessionObject = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                };
                request.session.user = userSessionObject;
                return response.status(200).json(request.sessionID);
            }));
        }
        catch (error) {
            return response.status(500).json({
                msg: "Network Error: Failed to sign you in please try again later",
            });
        }
    }
    isUserLoggedIn(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSession = request.session.user || false;
            try {
                if (userSession) {
                    const username = userSession.username;
                    const user_id = userSession.id;
                    const user = yield Users_1.userModel.findOne({ _id: user_id });
                    return response.status(200).json({
                        auth_status: true,
                        username: username,
                        profilePicture: user.profilePicture,
                        isMentor: user.isMentor,
                        pdGroup: user.pdGroup,
                    });
                }
                return response.status(200).json({ auth_status: false });
            }
            catch (error) {
                return response
                    .status(500)
                    .json({ msg: "Network Error; Failed to check user auth status" });
            }
        });
    }
    Logout(request, response) {
        const userSession = request.session.user;
        try {
            if (userSession) {
                request.session.destroy();
                return response.status(200).json({ msg: "Logged out" });
            }
            response.status(400);
        }
        catch (error) {
            return response
                .status(500)
                .json({ msg: "Network Error: Failed to log you out " });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=Auth.js.map