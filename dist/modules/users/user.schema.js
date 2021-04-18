"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginData = exports.RegisterData = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
class User {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "photo_url", void 0);
__decorate([
    typegoose_1.prop({
        unique: true,
        required: true
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "num_followers", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "num_following", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
class RegisterData {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], RegisterData.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], RegisterData.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], RegisterData.prototype, "password", void 0);
exports.RegisterData = RegisterData;
class LoginData {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginData.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginData.prototype, "password", void 0);
exports.LoginData = LoginData;
exports.default = typegoose_1.getModelForClass(User, {
    schemaOptions: { collection: "users" }
});
