"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.journalModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const journalSchema = new mongoose_1.default.Schema({
    owner: { type: String, required: true },
    journals: { type: [], default: [] },
});
exports.journalModel = mongoose_1.default.model("journalModel", journalSchema);
//# sourceMappingURL=Journal.js.map