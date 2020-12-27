"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Journal_1 = require("../../Controller/Journal/Journal");
const AuthCheck_1 = require("../../MiddleWare/AuthCheck/AuthCheck");
const router = express_1.Router();
const Controller = new Journal_1.JournalController();
router.post("/api/create-new-journal", AuthCheck_1.AuthCheck, (request, response) => {
    Controller.CreateNewJournal(request, response);
});
router.get("/api/get-all-user-journals", (request, response) => {
    Controller.GetUserJournalList(request, response);
});
exports.default = router;
//# sourceMappingURL=Journal.js.map