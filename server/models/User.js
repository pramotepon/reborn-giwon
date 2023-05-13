import mongoose from 'mongoose';
// Import Bcrypt 
import bcrypt from 'bcryptjs';

// Create Schema
const schema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    displayName: { type: String, required: true, maxLength: 11 },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "prefer not to say"] },
    image: { type: String, default: null },
    goal: { type: Number, default: null },
}, {
    collection: "users"
});

const user = mongoose.model('User', schema);


export default user;