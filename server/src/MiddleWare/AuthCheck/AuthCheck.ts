import { Request, Response, NextFunction } from "express";

export const AuthCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userSession = request.session.user;

  try {
    if (!userSession) {
      return response
        .status(400)
        .json({ msg: "Create account or login to continue" });
    }

    next();
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Network Error: Process Fail please try again later" });
  }
};
