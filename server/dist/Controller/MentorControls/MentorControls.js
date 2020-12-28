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
exports.MentorController = void 0;
const Users_1 = require("../../Models/Users/Users");
const formidable_1 = require("formidable");
const nodemailer_1 = require("nodemailer");
class MentorController {
    GetAllTrainees(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Users_1.userModel.find({ isMentor: false });
                return response.status(200).json(data);
            }
            catch (error) {
                return response
                    .status(500)
                    .json({ msg: "Network Error: Failed to fetch all trainees" });
            }
        });
    }
    AddTraineeToMentorGroup(request, response) {
        const form = new formidable_1.IncomingForm();
        const mentorUserssion = request.session.user;
        const mentor_id = mentorUserssion.id;
        try {
            form.parse(request, (error, fields) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return response
                        .status(500)
                        .json({ msg: "Network Error: Failed to add Trainee to PD group" });
                }
                const { TraineeID } = fields;
                const traniee = yield Users_1.userModel.findOne({ _id: TraineeID });
                const mentor = yield Users_1.userModel.findOne({ _id: mentor_id });
                const mentorPdGroup = mentor.pdGroup;
                if (traniee.pdGroup > 0) {
                    return response.status(400).json({
                        msg: `Trainee already add to a groupNo:${traniee.pdGroup}`,
                    });
                }
                const updatedDoc = yield Users_1.userModel.findByIdAndUpdate(TraineeID, {
                    $set: { pdGroup: mentorPdGroup },
                }, { new: true });
                const transporter = nodemailer_1.createTransport({
                    service: "SendinBlue",
                    auth: {
                        user: process.env.sendinBlue__login,
                        pass: process.env.sendinBlue__pass,
                    },
                });
                const message = {
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
            }));
        }
        catch (error) {
            return response
                .status(500)
                .json({ msg: "Network Error: Failed to add Trainee to PD group" });
        }
    }
}
exports.MentorController = MentorController;
//# sourceMappingURL=MentorControls.js.map