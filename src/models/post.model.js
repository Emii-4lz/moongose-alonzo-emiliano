import { model, Schema, Types } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [{
        type: Types.ObjectId,
        ref: "Tag"
    }]
});

export const postModel = model("Post", postSchema);