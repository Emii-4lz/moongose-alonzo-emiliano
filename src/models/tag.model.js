import { model, Schema } from "mongoose"

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
            unique: true
        }
    }
);

export const tagModel = model("Tag", tagSchema);