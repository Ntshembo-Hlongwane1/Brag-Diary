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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePicUploaderController = void 0;
const formidable_1 = require("formidable");
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = require("dotenv");
const Users_1 = require("../../Models/Users/Users");
dotenv_1.config();
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
class ProfilePicUploaderController {
    UploadProfilePicture(request, response) {
        const form = new formidable_1.IncomingForm();
        const userSession = request.session.user;
        const user_id = userSession.id;
        const username = userSession.username;
        try {
            form.parse(request, (error, fields, files) => {
                if (error) {
                    return response
                        .status(500)
                        .json({ msg: "Network Error: Failed to upload profile picture" });
                }
                const { profilePicture } = files;
                if (!profilePicture) {
                    return response.status(400).json({ msg: "No image was provided" });
                }
                cloudinary.uploader.upload(profilePicture.path, { folder: `/BragDiary/ProfileImages/${username}` }, (error, res) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return response.status(500).json({
                            msg: "Network Error: Failed to upload profile picture",
                        });
                    }
                    const image_url = res.secure_url;
                    const updatedDoc = yield Users_1.userModel.findByIdAndUpdate(user_id, { $set: { profilePicture: image_url } }, {
                        new: true,
                    });
                    if (updatedDoc.profilePicture.length === 0) {
                        return response
                            .status(500)
                            .json({ msg: "Network Error: Failed to upload profile image" });
                    }
                    return response
                        .status(200)
                        .json({ msg: "Profile Picture upload was successful" });
                }));
            });
        }
        catch (error) {
            return response
                .status(500)
                .json({ msg: "Network Error: Failed to upload profile picture" });
        }
    }
}
exports.ProfilePicUploaderController = ProfilePicUploaderController;
//# sourceMappingURL=ProfileImageUploader.js.map