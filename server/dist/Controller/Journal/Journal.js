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
exports.JournalController = void 0;
const formidable_1 = require("formidable");
const Journal_1 = require("../../Models/Journal/Journal");
class JournalController {
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
    CreateNewJournal(request, response) {
        const form = new formidable_1.IncomingForm();
        const userSession = request.session.user;
        const username = userSession.username;
        try {
            form.parse(request, (error, fields) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return response.status(500).json({
                        msg: "Network Error: Failed to add your new journal please try again later",
                    });
                }
                const { journal } = fields;
                if (!journal) {
                    return response.status(400).json({
                        msg: "No journal received make sure you have written one",
                    });
                }
                const isUserAlreadyHavingAJournal = yield Journal_1.journalModel.findOne({
                    owner: username,
                });
                const date = new Date();
                const currentMonth = this.months[date.getMonth()];
                const currentDate = date.getDate();
                if (!isUserAlreadyHavingAJournal) {
                    const newUserJouranl = new Journal_1.journalModel({
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
                    const savedJournal = yield newUserJouranl.save();
                    return response
                        .status(201)
                        .json({ msg: "Journal Successfully entered" });
                }
                const userJournal = isUserAlreadyHavingAJournal;
                const comments = [];
                const newJournal = {
                    date: `${currentMonth} ${currentDate}`,
                    journal: journal,
                    upvotes: 0,
                    downvotes: 0,
                    comments: comments,
                    isPublic: false,
                    isPdPublic: false,
                };
                const updatedDoc = yield Journal_1.journalModel.findByIdAndUpdate(userJournal._id, { $push: { journals: newJournal } }, { new: true });
                return response
                    .status(201)
                    .json({ msg: "Journal Successfully created" });
            }));
        }
        catch (error) {
            return response.status(500).json({
                msg: "Network Error: Failed to add your new journal please try again later",
            });
        }
    }
}
exports.JournalController = JournalController;
//# sourceMappingURL=Journal.js.map