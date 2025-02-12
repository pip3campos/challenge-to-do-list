import { InferSchemaType, model, Schema, Types } from "mongoose";

const noteSchema = new Schema({
    author_id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);