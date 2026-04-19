import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

import { users, questions, answers } from './seed-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set. Expected it in .env.local at the project root.');
    }

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await mongoose.connect(process.env.MONGODB_URI, CONNECT_OPTIONS);
        console.log('MongoDB connected for seeding');
        return;
      } catch (error) {
        const isLastAttempt = attempt === maxAttempts;
        const errorCode = error?.cause?.code || error?.code;

        if (isLastAttempt) {
          throw error;
        }

        console.warn(
          `MongoDB connection attempt ${attempt}/${maxAttempts} failed (${errorCode || 'unknown'}). Retrying...`,
        );
        await sleep(1500 * attempt);
      }
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);

    if (err?.cause?.code === 'ETIMEDOUT' || err?.code === 'ETIMEDOUT') {
      console.error('Troubleshooting tips: check internet stability, VPN/proxy/firewall rules, and Atlas Network Access/IP allowlist.');
    }

    process.exit(1);
  }
}

async function clearExistingData() {
  try {
    await Promise.all([
      User.deleteMany({}),
      Question.deleteMany({}),
      Answer.deleteMany({}),
    ]);
    console.log('Deleted existing data');
  } catch (error) {
    console.error('Error clearing existing data:', error);
    throw error;
  }
}

async function createUsers(users) {
  try {
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('Error creating users:', error);
    throw error;
  }
}

async function createQuestions(questions) {
  try {
    const createdQuestions = await Question.insertMany(questions);
    console.log(`Created ${createdQuestions.length} questions`);
    return createdQuestions;
  } catch (error) {
    console.error('Error creating questions:', error);
    throw error;
  }
}

async function createAnswers(answers) {
  try {
    const createdAnswers = await Answer.insertMany(answers);
    console.log(`Created ${createdAnswers.length} answers`);
    return createdAnswers;
  } catch (error) {
    console.error('Error creating answers:', error);
    throw error;
  }
}

async function main() {
  try {
    await connectToDatabase();
    await clearExistingData();
    await createUsers(users);
    await createQuestions(questions);
    await createAnswers(answers);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

main().catch(console.error);
