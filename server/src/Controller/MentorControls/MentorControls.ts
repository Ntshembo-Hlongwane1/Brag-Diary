import { userModel } from "../../Models/Users/Users";
import { Request, Response } from "express";
import { IncomingForm, Fields } from "formidable";
import { createTransport } from "nodemailer";

interface Mentor {
  GetAllTrainees(request: Request, response: Response): Promise<Response>;
  AddTraineeToMentorGroup(request: Request, response: Response): Response;
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

  AddTraineeToMentorGroup(request: Request, response: Response) {
    const form = new IncomingForm();
    const mentorUserssion = request.session.user;
    const mentor_id = mentorUserssion.id;
    try {
      form.parse(request, async (error, fields: Fields) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to add Trainee to PD group" });
        }

        const { TraineeID } = fields;

        const traniee: any = await userModel.findOne({ _id: TraineeID });
        const mentor: any = await userModel.findOne({ _id: mentor_id });
        const mentorPdGroup = mentor.pdGroup;

        if (traniee.pdGroup > 0) {
          return response.status(400).json({
            msg: `Trainee already add to a groupNo:${traniee.pdGroup}`,
          });
        }
        const updatedDoc: any = await userModel.findByIdAndUpdate(
          TraineeID,
          {
            $set: { pdGroup: mentorPdGroup },
          },
          { new: true }
        );
        const transporter = createTransport({
          service: "SendinBlue",
          auth: {
            user: process.env.sendinBlue__login,
            pass: process.env.sendinBlue__pass,
          },
        });

        const message: any = {
          from: "noreply@bragdiary.co.za",
          to: updatedDoc.email,
          subject: `Invitation To PD Group ${mentorPdGroup}`,
          priority: "high",
          html: `
          
            <h1>You have been add to join PD Group ${mentorPdGroup}</h1>

            <h4 style="margin-top:4rem;">Any Queries?</h4>
            <h5>Email: juniorWebProjects@gmail.com</h5>
          
          `,
        };

        transporter.sendMail(message, (error, info) => {
          if (error) {
            return response.status(500).json({
              msg: "Network Error Failed to send Trainee email notifcation.",
            });
          }
          return response
            .status(200)
            .json({ msg: "Successfully added Trainee to group" });
        });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to add Trainee to PD group" });
    }
  }
}

export { MentorController };
