import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  // TODO: Define schema fields
});

const Question = mongoose.model("Question", questionSchema);
export default Question;