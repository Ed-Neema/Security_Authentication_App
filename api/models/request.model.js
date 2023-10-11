import mongoose from "mongoose";
const { ObjectId } = mongoose;
const RequestSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true },
    receiverId: { type: ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: ["facilitator", "admin"],
      required: true,
    },
    name: { type: String, required: true },
    sentBy: { type: String, required: true },
    message: { type: String, required: true },
    comments: [{ name: String, message: String }],
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);
export default Request;
