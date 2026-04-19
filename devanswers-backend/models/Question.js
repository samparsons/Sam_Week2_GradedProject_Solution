import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
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
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Question = model("Question", questionSchema);
export default Question;