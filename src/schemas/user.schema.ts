import { Schema } from "mongoose";

export const userSchema = new Schema({
    uid: { type: String, required: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    avatarUrl: { type: String, required: false }
})