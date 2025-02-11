import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    online: { type:Boolean, default:false },
}, { timestamps: true });

type User = InferSchemaType<typeof schema>;

export default model<User>("users", schema);