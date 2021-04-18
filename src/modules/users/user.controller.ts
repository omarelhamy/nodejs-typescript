import UserServices from "./user.service"
import { Request, Response } from 'express';
import { errorResponse, successResponse, validate } from "../common/service";
// import { validate } from "class-validator";
import { LoginData, RegisterData } from "./user.schema";
import { plainToClass } from "class-transformer";

export default class UserController {
    private userServices = new UserServices();

    public async login(req: Request, res: Response) {
        const loginData = plainToClass(LoginData, req.body);
        if (await validate(loginData, res)) {
            const token = await this.userServices.login(loginData);
            if (token) {
                successResponse("Login success", token, res);
            }
            else errorResponse("Invalid Username / password", null, res);
        }
    }

    public async register(req: Request, res: Response) {
        const registerData = plainToClass(RegisterData, req.body);
        if (await validate(registerData, res)) {
            const token = await this.userServices.register(registerData);
            if (token) {
                successResponse("Register success", token, res);
            }
            else errorResponse("Invalid Username / password", null, res);
        }
    }
}