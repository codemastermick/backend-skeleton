import { Schema } from "mongoose";

export interface User {
    uid: string;
    displayName: string;
}

export const userSchema = new Schema({
    uid: { type: String, required: true },
    displayName: { type: String, required: true }
})