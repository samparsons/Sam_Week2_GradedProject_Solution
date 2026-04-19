import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerText: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  downvotes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Answer = model("Answer", answerSchema);
export default Answer;