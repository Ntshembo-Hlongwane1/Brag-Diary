import { Router } from "express";
import { isMentorCheck } from "../../MiddleWare/isMentor/AdminCheck";
import { MentorController } from "../../Controller/MentorControls/MentorControls";

const router = Router();
const Controller = new MentorController();

router.get("/api/get-trainee-list", isMentorCheck, (request, response) => {
  Controller.GetAllTrainees(request, response);
});

export default router;
