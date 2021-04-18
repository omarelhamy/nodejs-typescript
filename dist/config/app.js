"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const area_routes_1 = __importDefault(require("../routes/area.routes"));
require("reflect-metadata");
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const user_schema_1 = __importDefault(require("../modules/users/user.schema"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
class App {
    constructor() {
        this.mongoUrl = `mongodb://localhost:27017/${process.env.DB_NAME}`;
        this.userRoutes = new user_routes_1.default();
        this.app = express_1.default();
        this.config();
        this.connectMongoDB();
        this.initRoutes();
        this.initPassport();
    }
    config() {
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path.join(process.cwd(), 'dist'), { maxAge: '7d' }));
        this.initMulter();
        this.areaRoutes = new area_routes_1.default(this.upload);
        this.userRoutes = new user_routes_1.default();
    }
    connectMongoDB() {
        mongoose_1.default.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
            .then(() => console.log("Success connect to DB"))
            .catch(err => console.error(err));
    }
    initRoutes() {
        this.areaRoutes.route(this.app);
        this.userRoutes.route(this.app);
    }
    initPassport() {
        passport_1.default.use(new passport_jwt_1.Strategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, (token, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findOne({ username: token.username });
                if (user)
                    return done(null, user);
                else
                    done(null, false);
            }
            catch (error) {
                done(error);
            }
        })));
    }
    initMulter() {
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
            }
        };
        this.upload = multer_1.default({ storage: storage, fileFilter: fileFilter });
    }
}
exports.default = new App().app;
