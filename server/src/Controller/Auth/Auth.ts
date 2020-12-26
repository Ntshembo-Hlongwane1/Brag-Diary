import { IncomingForm, Fields } from "formidable";
import { compare, genSalt, hash } from "bcrypt";
import { userSessionModel } from "../../Models/UserSessions/UserSessions";
import { userModel } from "../../Models/Users/Users";
import { Request, Response } from "express";
import { createTransport } from "nodemailer";
import { config } from "dotenv";
config();

interface Auth {
  SignUp(request: Request, resposne: Response): Response;
  SignIn(request: Request, response: Response): Response;
}

class AuthController implements Auth {
  private baseURL = {
    dev: "http://localhost:3000/verify-account/:id",
    prod: "",
  };
  private url: string;
  constructor() {
    this.url =
      process.env.NODE_ENV === "production"
        ? this.baseURL.prod
        : this.baseURL.dev;
  }

  SignUp(request: Request, response: Response) {
    const form = new IncomingForm();

    try {
      form.parse(request, async (error, fields: Fields | any) => {
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

        const isUsernameExisting = await userModel.findOne({
          username: username,
        });
        if (isUsernameExisting) {
          return response
            .status(400)
            .json({ msg: "Account with this username already exist" });
        }

        const isEmailExisting = await userModel.findOne({ email: email });
        if (isEmailExisting) {
          return response
            .status(400)
            .json({ msg: "Account with this email already exist" });
        }

        const salt = await genSalt(15);
        const hashedPassword = await hash(password, salt);

        const newUser = new userModel({
          username,
          email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();

        if (!savedUser) {
          return response.status(500).json({
            msg: "Network Error: Failed to sign you up, please try again later",
          });
        }

        const transporter = createTransport({
          service: "SendinBlue",
          auth: {
            user: process.env.sendinBlue__login,
            pass: process.env.sendinBlue__pass,
          },
        });

        const message: any = {
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
            .json(`Email sent to ${email} for account activation`);
        });
      });
    } catch (error) {
      return response.status(500).json({
        msg: "Network Error: Failed to sign you up, please try again later",
      });
    }
  }

  SignIn(request: Request, response: Response) {
    const form = new IncomingForm();

    try {
      form.parse(request, async (error, fields: Fields | any) => {
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
        const isUsernameExisting = await userModel.findOne({
          username: username,
        });
        if (!isUsernameExisting) {
          return response
            .status(404)
            .json({ msg: "Account with this username does not exist" });
        }

        const user: any = isUsernameExisting; //swapping variable to because user is validated and existing

        const usersHashedPassword = user.password;
        const isPasswordVaild = await compare(password, usersHashedPassword);

        if (!isPasswordVaild) {
          return response.status(400).json({ msg: "Invalid credentials" });
        }

        const isUserSessionActive = await userSessionModel.findOne({
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
      });
    } catch (error) {
      return response.status(500).json({
        msg: "Network Error: Failed to sign you in please try again later",
      });
    }
  }
}

export { AuthController };
