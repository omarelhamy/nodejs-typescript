import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads/')
        },

        filename: function (req: any, file: any, cb: any) {
            cb(null, file.originalname)
        }
    });
    const fileFilter = (req: any, file: any, cb: any) => {
        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png") {

            cb(null, true);
        } else {
            cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
        }
    }

    return multer({ storage: storage, fileFilter: fileFilter });
}