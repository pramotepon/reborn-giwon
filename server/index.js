import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import User from './models/User.js';
import Activity from './models/Activity.js';

const app = express();

import mongoose from 'mongoose';

app.use(express.json());

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = "cluster0.iuonl31";
const dbname = "g_won";

mongoose.connect(process.env.MONGO_USER_URI,
  {
    dbName: process.env.MONGO_DATABASE,
    writeConcern: "majority",
    retryWrites: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
  }
);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(8080, () => {
  console.log("Server is running.");
});