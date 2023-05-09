import express from 'express'
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();

mongoose.connect('mongodb+srv://g-won:j6iBY2bnnDfV7f8Q@cluster0.iuonl31.mongodb.net/');

app.get('/users', async (req, res) => {
    // get data
    const user = await User.find({});
    console.log(user);
    res.json(user);
});

app.listen(8080, () => {
    console.log('Server is running.');
});