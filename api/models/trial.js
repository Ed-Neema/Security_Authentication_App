// User Collection
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "facilitator", "teamLead"],
    required: true,
  },
  // other user-related fields
});

// Request Collection
const RequestSchema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: ["facilitator", "admin"],
    required: true,
  },
  message: { type: String, required: true },
  feedbacks: [{ type: ObjectId, ref: "Feedback" }],
  // other request-related fields
});

// Feedback Collection
const FeedbackSchema = new Schema({
  requestId: { type: ObjectId, ref: "Request", required: true },
  facilitatorId: { type: ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  // other feedback-related fields
});

// Task Collection
const TaskSchema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  comments: { type: String },
  // other task-related fields
});
