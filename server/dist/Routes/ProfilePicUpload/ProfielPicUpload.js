"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileImageUploader_1 = require("../../Controller/ProfileImageUploader/ProfileImageUploader");
const AuthCheck_1 = require("../../MiddleWare/AuthCheck/AuthCheck");
const router = express_1.Router();
const Controller = new ProfileImageUploader_1.ProfilePicUploaderController();
router.post("/api/upload-profile-picture", AuthCheck_1.AuthCheck, (request, response) => {
    Controller.UploadProfilePicture(request, response);
});
exports.default = router;
//# sourceMappingURL=ProfielPicUpload.js.map