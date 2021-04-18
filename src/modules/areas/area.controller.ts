import AreaServices from "./area.service";
import { Request, Response } from 'express';
import { errorResponse, successResponse } from "../common/service";

export default class AreaController {

    private areaService = new AreaServices();

    public get(req: Request, res: Response) {
        this.areaService.getAll({}, (err, data) => {
            if (err)
                errorResponse("Failed to create", err, res);
            else successResponse("Get Data", data, res);
        })
    }

    public create(req: Request, res: Response) {
        this.areaService.create(req.body, (err, data) => {
            console.log(req.files)
            if (err)
                errorResponse("Failed to create", err, res);
            else successResponse("Post success", data, res);
        })
    }

    public update(req: Request, res: Response) {
        
    }
}