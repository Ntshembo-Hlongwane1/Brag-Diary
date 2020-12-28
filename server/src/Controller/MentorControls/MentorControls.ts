import { userModel } from "../../Models/Users/Users";
import { Request, Response } from "express";

interface Mentor {
  GetAllTrainees(request: Request, response: Response): Promise<Response>;
}

class MentorController implements Mentor {
  async GetAllTrainees(request: Request, response: Response) {
    try {
      const data = await userModel.find({ isMentor: false });
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to fetch all trainees" });
    }
  }
}

export { MentorController };
