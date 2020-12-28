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
exports.isMentorCheck = void 0;
const Users_1 = require("../../Models/Users/Users");
const isMentorCheck = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userSession = request.session.user;
    const username = userSession.username;
    try {
        if (!userSession) {
            return response
                .status(400)
                .json({ msg: "Create account or login to continue" });
        }
        const user = yield Users_1.userModel.findOne({ username: username });
        const isMentor = user.isMentor;
        if (isMentor) {
            return next();
        }
        return response.status(400).json({ msg: "Failed to fetch Trainee's list" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ msg: "Network Error: Process Fail please try again later" });
    }
});
exports.isMentorCheck = isMentorCheck;
//# sourceMappingURL=AdminCheck.js.map