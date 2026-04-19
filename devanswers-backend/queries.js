import mongoose from "mongoose";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function query1() {
  const newUser = await User.create({
    name: "Robin",
    email: "robin@example.com",
    password: "hashed_password_7",
    createdAt: new Date("2025-06-25T10:15:00Z"),
  });
  console.log("Created user:", newUser);
}

async function query2() {
  const user = await User.findOne({ email: "alice@example.com" });
  console.log("Fetched user:", user);
}

async function query3() {
  const question = await Question.findOne({
    title: "How can I improve the performance of a react app?",
  });
  console.log("Fetched question:", question);
}

async function query4() {
  const questions = await Question.find({ tags: "javascript" });
  console.log("Questions tagged with 'javascript':", questions);
}

async function query5() {
  const questions = await Question.find({
    createdAt: { $gt: new Date("2023-04-01T00:00:00Z") },
  });
  console.log("Questions posted after April 1, 2023:", questions);
}

async function query6() {
  const questions = await Question.find({
    tags: { $in: ["javascript", "react"] },
  });
  console.log("Questions tagged with 'javascript' or 'react':", questions);
}

async function query7() {
  const distinctTags = await Question.distinct("tags");
  console.log("Distinct tags used in questions:", distinctTags);
}

async function query8() {
  const questions = await Question.find({ views: { $gte: 50 } });
  console.log("Questions with at least 50 views:", questions);
}

async function query9() {
  const answers = await Answer.find({ voteCount: 0 });
  console.log("Answers with a vote count of 0:", answers);
}

async function query10() {
  const answers = await Answer.find({ voteCount: { $gt: 0 } });
  console.log("Answers with a vote count greater than 0:", answers);
}

async function query11() {
  const users = await User.find({
    createdAt: { $gte: new Date("2023-01-01T00:00:00Z"), $lt: new Date("2023-05-01T00:00:00Z") },
  });
  console.log("Users created between January 1, 2023 and May 1, 2023:", users);
}

async function query12() {
  const question = await Question.findOne({
    title: "How do I set up routing with react router v6?",
  });

  if (!question) {
    console.log("Question not found");
    return;
  }

  const answers = await Answer.find({ questionId: question._id }).select("answerText author");
  console.log("Answers for the question 'How do I set up routing with react router v6?':", answers);
}

async function query13() {
  const usersWithAnswers = await Answer.distinct("author");
  const usersWithoutAnswers = await User.find({ _id: { $nin: usersWithAnswers } });
  console.log("Users who have not posted any answers:", usersWithoutAnswers);
}

async function query14() {
  const topQuestions = await Question.find().sort({ voteCount: -1 }).limit(2);
  console.log("Top two most voted questions:", topQuestions);
}

async function query15() {
  const answerCounts = await Answer.aggregate([
    { $group: { _id: "$author", answerCount: { $sum: 1 } } },
  ]);
  console.log("User IDs and their answer counts:", answerCounts);
}

async function query16() {
  const topUsers = await Answer.aggregate([
    { $group: { _id: "$author", answerCount: { $sum: 1 } } },
    { $sort: { answerCount: -1 } },
    { $limit: 2 },
  ]);
  console.log("Top two users who posted the most answers:", topUsers);
}

async function query17() {
  const updatedQuestion = await Question.findOneAndUpdate(
    { title: "Why is my async function returning a promise instead of the actual value?" },
    { $set: { tags: ["javascript", "async"] } },
    { new: true }
  );
  console.log("Updated question:", updatedQuestion);
}

async function query18() {
  const updatedUser = await User.findOneAndUpdate(
    { email: "alice@example.com" },
    { $set: { name: "Alice Smith" } },
    { new: true }
  );
  console.log("Updated user:", updatedUser);
}

async function query19() {
  const deletedUser = await User.findOneAndDelete({ email: "jhonny@example.com" });
  console.log("Deleted user:", deletedUser);
}

async function query20() {
  const user = await User.findOne({ email: "alice@example.com" });
  if (!user) {
    console.log("User not found");
    return;
  }
  const deletedAnswers = await Answer.deleteMany({ author: user._id });
  console.log("Deleted answers of the user 'alice@example.com':", deletedAnswers);
}

async function runQueries() {
  printHeader(
    1,
    "Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z",
  );
  await query1();
  printHeader(2, "Fetch the user with email alice@example.com");
  await query2();
  printHeader(
    3,
    'Fetch question with the title "How can I improve the performance of a react app?"',
  );
  await query3();
  printHeader(4, 'Find all questions tagged with "javascript"');
  await query4();
  printHeader(5, "Retrieve all questions posted after April 1, 2023");
  await query5();
  printHeader(6, "Find all questions tagged with javascript or react");
  await query6();
  printHeader(7, "Find all the distinct tags used in questions");
  await query7();
  printHeader(8, "Retrieve all questions with at least 50 views");
  await query8();
  printHeader(9, "List all answers with a vote count of 0");
  await query9();
  printHeader(10, "Retrieve all answers with a voteCount greater than 0");
  await query10();
  printHeader(
    11,
    "Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)",
  );
  await query11();
  printHeader(
    12,
    'Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"',
  );
  await query12();
  printHeader(13, "Find all users who have not posted any answers");
  await query13();
  printHeader(14, "Find the top two most upvoted questions");
  await query14();
  printHeader(
    15,
    "Retrieve the ids of all users who have posted answers, along with the number of answers they have posted",
  );
  await query15();
  printHeader(16, "Identify the top two users who posted the most answers");
  await query16();
  printHeader(
    17,
    "Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']",
  );
  await query17();
  printHeader(
    18,
    "Update the name of the user with email 'alice@example.com' to 'Alice Smith'",
  );
  await query18();
  printHeader(19, "Delete the user with email 'jhonny@example.com'");
  await query19();
  printHeader(
    20,
    "Delete all answers of the user with email 'alice@example.com'",
  );
  await query20();
}

const printHeader = (num, title) => {
  console.log("\n" + "─".repeat(60));
  console.log(`Q${num}. ${title}`);
  console.log("─".repeat(60));
};

async function main() {
  try {
    dotenv.config({ path: path.join(__dirname, ".env.local") });

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set. Expected it in .env.local at the project root.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to database");
    await runQueries();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

main();
