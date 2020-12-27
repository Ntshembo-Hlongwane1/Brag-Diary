"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isMentor: { type: Boolean, default: false },
    pdGroup: { type: Number, default: 0 },
    profilePicture: { type: String, default: "" },
});
exports.userModel = mongoose_1.default.model("userModel", userSchema);
//# sourceMappingURL=Users.js.map