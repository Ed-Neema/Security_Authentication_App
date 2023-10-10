import mongoose from "mongoose"


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Email address already taken"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter the user password"],
    },
    role: {
      type: String,
      enum: ["student", "facilitator", "teamLead"],
      required: [true, "Role needed"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User