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
const area_schema_1 = __importDefault(require("./area.schema"));
class AreaServices {
    create(area, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_schema_1.default.create(area, callback);
        });
    }
    getAll(query, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_schema_1.default.find(query, callback);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_schema_1.default.findById(id);
        });
    }
    update(id, area, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_schema_1.default.findByIdAndUpdate(id, area, callback);
        });
    }
    delete(id, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_schema_1.default.findByIdAndRemove(id, callback);
        });
    }
}
exports.default = AreaServices;
