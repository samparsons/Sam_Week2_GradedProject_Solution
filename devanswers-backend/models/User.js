import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // TODO: Define schema fields
});

const User = mongoose.model("User", userSchema);
export default User;