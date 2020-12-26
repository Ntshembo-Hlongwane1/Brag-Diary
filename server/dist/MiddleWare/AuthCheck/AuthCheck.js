"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheck = void 0;
const AuthCheck = (request, response, next) => {
    const userSession = request.session.user;
    try {
        if (!userSession) {
            return response
                .status(400)
                .json({ msg: "Create account or login to continue" });
        }
        next();
    }
    catch (error) {
        return response
            .status(500)
            .json({ msg: "Network Error: Process Fail please try again later" });
    }
};
exports.AuthCheck = AuthCheck;
//# sourceMappingURL=AuthCheck.js.map