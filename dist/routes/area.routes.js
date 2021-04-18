"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const area_controller_1 = __importDefault(require("../modules/areas/area.controller"));
const passport_1 = __importDefault(require("passport"));
class AreaRoutes {
    constructor(m) {
        this.areaController = new area_controller_1.default();
        this.upload = m;
    }
    route(app) {
        app.get("/area/", passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
            this.areaController.get(req, res);
        });
        app.post("/area/", passport_1.default.authenticate('jwt', { session: false }), this.upload.array('images', 2), (req, res) => {
            this.areaController.create(req, res);
        });
    }
}
exports.default = AreaRoutes;
