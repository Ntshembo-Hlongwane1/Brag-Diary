import { IncomingForm, Fields } from "formidable";
import { journalModel } from "../../Models/Journal/Journal";
import { Request, Response } from "express";

interface Journal {
  CreateNewJournal(request: Request, response: Response): Response;
}

class JournalController implements Journal {
  private months: Array<string>;
  constructor() {
    this.months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }
  CreateNewJournal(request: Request, response: Response) {
    const form = new IncomingForm();
    const userSession = request.session.user;
    const username = userSession.username;

    try {
      form.parse(request, async (error, fields: Fields) => {
        if (error) {
          return response.status(500).json({
            msg:
              "Network Error: Failed to add your new journal please try again later",
          });
        }

        const { journal } = fields;

        if (!journal) {
          return response.status(400).json({
            msg: "No journal received make sure you have written one",
          });
        }

        const isUserAlreadyHavingAJournal = await journalModel.findOne({
          owner: username,
        });

        const date = new Date();
        const currentMonth = this.months[date.getMonth()];
        const currentDate = date.getDate();

        if (!isUserAlreadyHavingAJournal) {
          const newUserJouranl = new journalModel({
            owner: username,
            journals: {
              date: `${currentMonth} ${currentDate}`,
              journal: journal,
              upvotes: 0,
              downvotes: 0,
              comments: [],
              isPublic: false,
              isPdPublic: false,
            },
          });
          const savedJournal = await newUserJouranl.save();
          return response
            .status(201)
            .json({ msg: "Journal Successfully entered" });
        }

        const userJournal = isUserAlreadyHavingAJournal;
        const comments: Array<string> = [];
        const newJournal = {
          date: `${currentMonth} ${currentDate}`,
          journal: journal,
          upvotes: 0,
          downvotes: 0,
          comments: comments,
          isPublic: false,
          isPdPublic: false,
        };

        const updatedDoc = await journalModel.findByIdAndUpdate(
          userJournal._id,
          { $push: { journals: newJournal } },
          { new: true }
        );

        return response
          .status(201)
          .json({ msg: "Journal Successfully created" });
      });
    } catch (error) {
      return response.status(500).json({
        msg:
          "Network Error: Failed to add your new journal please try again later",
      });
    }
  }
}

export { JournalController };
