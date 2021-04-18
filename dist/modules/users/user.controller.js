"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const service_1 = require("../common/service");
// import { validate } from "class-validator";
const user_schema_1 = require("./user.schema");
const class_transformer_1 = require("class-transformer");
class UserController {
    constructor() {
        this.userServices = new user_service_1.default();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = class_transformer_1.plainToClass(user_schema_1.LoginData, req.body);
            if (yield service_1.validate(loginData, res)) {
                const token = yield this.userServices.login(loginData);
                if (token) {
                    service_1.successResponse("Login success", token, res);
                }
                else
                    service_1.errorResponse("Invalid Username / password", null, res);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerData = class_transformer_1.plainToClass(user_schema_1.RegisterData, req.body);
            if (yield service_1.validate(registerData, res)) {
                const token = yield this.userServices.register(registerData);
                if (token) {
                    service_1.successResponse("Register success", token, res);
                }
                else
                    service_1.errorResponse("Invalid Username / password", null, res);
            }
        });
    }
}
exports.default = UserController;
