"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const area_service_1 = __importDefault(require("./area.service"));
const service_1 = require("../common/service");
class AreaController {
    constructor() {
        this.areaService = new area_service_1.default();
    }
    get(req, res) {
        this.areaService.getAll({}, (err, data) => {
            if (err)
                service_1.errorResponse("Failed to create", err, res);
            else
                service_1.successResponse("Get Data", data, res);
        });
    }
    create(req, res) {
        this.areaService.create(req.body, (err, data) => {
            console.log(req.files);
            if (err)
                service_1.errorResponse("Failed to create", err, res);
            else
                service_1.successResponse("Post success", data, res);
        });
    }
    update(req, res) {
    }
}
exports.default = AreaController;
