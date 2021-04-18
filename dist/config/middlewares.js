"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
function uploadMiddleware(req, res, next) {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads/');
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
    return multer_1.default({ storage: storage, fileFilter: fileFilter });
}
exports.uploadMiddleware = uploadMiddleware;
