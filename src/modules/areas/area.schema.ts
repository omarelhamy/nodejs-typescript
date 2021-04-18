import { getModelForClass, prop } from "@typegoose/typegoose";

class Area {
    @prop({
        type: () => String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return v.length <= 20;
            },
            message: 'value is over 20 characters long!'
        }
    })
    public name: string;
}

export interface IArea {
    _id?: string;
    name: string;
}

export default getModelForClass(Area);