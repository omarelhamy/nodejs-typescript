import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose';
import AreaRoutes from '../routes/area.routes';
import "reflect-metadata";
import UserRoutes from '../routes/user.routes';
import UserModel, { User } from '../modules/users/user.schema';
import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import multer from 'multer';
import path from 'path'
import { errorResponse } from 'modules/common/service';
class App {
    public app: express.Application;

    private mongoUrl: string = `mongodb://localhost:27017/${process.env.DB_NAME}`;

    private upload: multer.Multer;

    private areaRoutes;
    private userRoutes = new UserRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.connectMongoDB();
        this.initRoutes();
        this.initPassport();
    }

    private config() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/static', express.static('public'))

        this.initMulter();
        this.areaRoutes = new AreaRoutes(this.upload);
        this.userRoutes = new UserRoutes();
    }

    private connectMongoDB() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
            .then(() => console.log("Success connect to DB"))
            .catch(err => console.error(err));
    }

    private initRoutes() {
        this.areaRoutes.route(this.app)
        this.userRoutes.route(this.app)
    }

    private initPassport() {
        passport.use(new Strategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, async (token, done) => {
            try {
                const user = await UserModel.findOne({ username: token.username })
                if (user)
                    return done(null, user)
                else done(null, false)
            } catch (error) {
                done(error)
            }
        }))
    }

    private initMulter() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/uploads/')
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
                cb("Invalid file type", false);
            }
        }

        this.upload = multer({ storage: storage, fileFilter: fileFilter });
    }
}

export default new App().app