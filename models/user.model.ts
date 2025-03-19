import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    avatarUrl: { type: String },
}, { timestamps: true });
const User = mongoose.models.User ||mongoose.model("User", UserSchema);
export default User;