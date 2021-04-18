import UserModel, { LoginData, RegisterData, User } from "./user.schema";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserServices {

    public async login(login: LoginData) {
        const user = await UserModel.findOne({ username: login.username });
        if (user) {
            const isMatch = await bcrypt.compare(login.password, user.password);
            if (isMatch)
                return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        }
        return null;
    }

    public async register(register: RegisterData) {
        register.password = await bcrypt.hash(register.password, 12)
        const user = await UserModel.create(register as User);
        return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
}