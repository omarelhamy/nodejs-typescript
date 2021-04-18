import { Application, Request, Response } from "express";
import AreaController from "../modules/areas/area.controller";
import passport from 'passport';
import multer from "multer";

export default class AreaRoutes {
    private areaController = new AreaController();
    private upload: multer.Multer

    constructor(m?: multer.Multer) {
        this.upload = m;
    }

    public route(app: Application) {
        app.get("/area/", passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
            this.areaController.get(req, res);
        });

        app.post("/area/", passport.authenticate('jwt', { session: false }), this.upload.array('images', 1), (req: Request, res: Response) => {
            this.areaController.create(req, res);
        });
    }
}