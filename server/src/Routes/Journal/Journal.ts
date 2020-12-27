import { Router } from "express";
import { JournalController } from "../../Controller/Journal/Journal";
import { AuthCheck } from "../../MiddleWare/AuthCheck/AuthCheck";

const router = Router();
const Controller = new JournalController();

router.post("/api/create-new-journal", AuthCheck, (request, response) => {
  Controller.CreateNewJournal(request, response);
});

router.get("/api/get-all-user-journals", (request, response) => {
  Controller.GetUserJournalList(request, response);
});
export default router;
