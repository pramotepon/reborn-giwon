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

// Hash password
schema.methods.encryptPassword = async (password) => {
    // Generate salt
    const salt = await bcrypt.genSalt(5);
    // Hash password by password and salt
    const hashPassword = await bcrypt.hash(password, salt);
    // Return hash password
    return hashPassword;
}

// Compare password
schema.methods.checkPassword = async (password) => {
    // Bcrypt compare (password from aggrument, password from schema)
    const isValid = await bcrypt.compare(password, this.password);
    // Return true or false
    return isValid;
}

const user = mongoose.model('User', schema);


export default user;