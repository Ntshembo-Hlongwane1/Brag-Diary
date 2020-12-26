import { Router } from "express";
import { ProfilePicUploaderController } from "../../Controller/ProfileImageUploader/ProfileImageUploader";
import { AuthCheck } from "../../MiddleWare/AuthCheck/AuthCheck";

const router = Router();
const Controller = new ProfilePicUploaderController();

router.post("/api/upload-profile-picture", AuthCheck, (request, response) => {
  Controller.UploadProfilePicture(request, response);
});

export default router;
