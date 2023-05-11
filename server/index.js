import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import activityRouter from './routes/activities.js';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_USER_URI,
  {
    dbName: process.env.MONGO_DATABASE,
    writeConcern: "majority",
    retryWrites: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
  }
);

app.use('/activities', activityRouter);

app.listen(8080, () => {
  console.log("Server is running.");
});