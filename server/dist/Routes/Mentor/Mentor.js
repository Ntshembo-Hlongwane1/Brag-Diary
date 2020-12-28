"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCheck_1 = require("../../MiddleWare/isMentor/AdminCheck");
const MentorControls_1 = require("../../Controller/MentorControls/MentorControls");
const router = express_1.Router();
const Controller = new MentorControls_1.MentorController();
router.get("/api/get-trainee-list", AdminCheck_1.isMentorCheck, (request, response) => {
    Controller.GetAllTrainees(request, response);
});
exports.default = router;
//# sourceMappingURL=Mentor.js.map