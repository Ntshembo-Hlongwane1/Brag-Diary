"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../../Controller/Auth/Auth");
const router = express_1.Router();
const Controller = new Auth_1.AuthController();
router.post("/api/user-signup", (request, response) => {
    Controller.SignUp(request, response);
});
router.post("/api/user-signin", (request, response) => {
    Controller.SignIn(request, response);
});
router.get("/api/check-user-auth-status", (request, response) => {
    Controller.isUserLoggedIn(request, response);
});
exports.default = router;
//# sourceMappingURL=Auth.js.map