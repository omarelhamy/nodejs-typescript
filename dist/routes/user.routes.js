"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../modules/users/user.controller"));
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.default();
    }
    route(app) {
        app.post("/user/login", (req, res) => {
            this.userController.login(req, res);
        });
        app.post("/user/register", (req, res) => {
            this.userController.register(req, res);
        });
    }
}
exports.default = UserRoutes;
