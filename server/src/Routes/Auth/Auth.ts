import { Router } from "express";
import { AuthController } from "../../Controller/Auth/Auth";

const router = Router();
const Controller = new AuthController();

router.post("/api/user-signup", (request, response) => {
  Controller.SignUp(request, response);
});

router.post("/api/user-signin", (request, response) => {
  Controller.SignIn(request, response);
});

router.get("/api/check-user-auth-status", (request, response) => {
  Controller.isUserLoggedIn(request, response);
});

export default router;
