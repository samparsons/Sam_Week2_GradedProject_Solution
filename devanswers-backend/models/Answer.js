import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  // TODO: Define schema fields
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;