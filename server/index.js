import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import User from './models/User.js';
import Activity from './models/Activity.js';


const app = express();

import { mongoose } from 'mongoose';

app.use(express.json());

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = "cluster0.iuonl31";
const dbname = "g_won";
// j6iBY2bnnDfV7f8Q
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`);

app.listen(8080, () => {
    console.log('Server is running.');
});