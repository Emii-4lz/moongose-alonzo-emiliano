import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        unique: false
    },
    last_name: {
        type: String,
        required: true,
        unique: false
    },
    bio: {
        type: String,
        required: false,
        unique: false,
    },
    address: [{
        _id: false,
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        }
    }],
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const profileModel = model("Profile", profileSchema);