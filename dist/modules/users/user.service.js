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
const user_schema_1 = __importDefault(require("./user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.findOne({ username: login.username });
            if (user) {
                const isMatch = yield bcrypt_1.default.compare(login.password, user.password);
                if (isMatch)
                    return jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
            }
            return null;
        });
    }
    register(register) {
        return __awaiter(this, void 0, void 0, function* () {
            register.password = yield bcrypt_1.default.hash(register.password, 12);
            const user = yield user_schema_1.default.create(register);
            return jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        });
    }
}
exports.default = UserServices;
