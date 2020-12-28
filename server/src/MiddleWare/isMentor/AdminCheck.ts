import { Request, Response, NextFunction } from "express";
import { userModel } from "../../Models/Users/Users";

export const isMentorCheck = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userSession = request.session.user;
  const username = userSession.username;

  try {
    if (!userSession) {
      return response
        .status(400)
        .json({ msg: "Create account or login to continue" });
    }

    const user: any = await userModel.findOne({ username: username });
    const isMentor = user.isMentor;
    if (isMentor) {
      return next();
    }
    return response.status(400).json({ msg: "Failed to fetch Trainee's list" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Network Error: Process Fail please try again later" });
  }
};
