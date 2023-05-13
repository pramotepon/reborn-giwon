import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import activityRouter from './routes/activities.js';
import userRouter from './routes/users.js'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 8080;

mongoose.connect(process.env.MONGO_USER_URI,
  {
    dbName: process.env.MONGO_DATABASE,
    writeConcern: "majority",
    retryWrites: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
  }
);

app.use('/users', userRouter);
app.use('/activities', activityRouter);

app.listen(PORT, () => {
  console.log(`Server is running. ${PORT}`);
});