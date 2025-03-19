import mongoose from "mongoose";
import { nanoid } from "nanoid";
const DocSchema = new mongoose.Schema({
    userId: { type: String, required: true },//clerk userId
    title: { type: String, required: true },
    shareId: { type: String,unique: true, default: () => nanoid(10) },
    content: { type: JSON}
}, { timestamps: true });
const Doc = mongoose.models.Doc ||mongoose.model("Doc", DocSchema);
export default Doc;