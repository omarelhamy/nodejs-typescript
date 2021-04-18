import { Application, Request, Response } from "express";
import UserController from "../modules/users/user.controller";

export default class UserRoutes {
    private userController = new UserController();

    public route(app: Application) {
        app.post("/user/login", (req: Request, res: Response) => {
            this.userController.login(req, res);
        });
        
        app.post("/user/register", (req: Request, res: Response) => {
            this.userController.register(req, res);
        });
        
    }
}