import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'
import activityRouter from './routes/activities.js';
import userRouter from './routes/users.js'

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 8080;

// Configuration 
cloudinary.config({
  cloud_name: "dvaolcq3n",
  api_key: "763929584218726",
  api_secret: "IUabsGIfumXPr_mEudYj0wuiaPw"
});

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