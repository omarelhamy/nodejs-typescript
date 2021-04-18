import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class User {
    @prop()
    name: string;

    @prop()
    photo_url: string;

    @prop({
        unique: true,
        required: true
    })
    username: string;

    @prop()
    num_followers: number;

    @prop()
    num_following: number;

    @prop()
    password: string;
}

export class RegisterData {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class LoginData {
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
}

export default getModelForClass(User, {
    schemaOptions: { collection: "users" }
});