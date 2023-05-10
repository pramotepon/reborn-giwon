import mongoose from 'mongoose';

// Create Schema
const schema = mongoose.Schema({
    user_id: { type: mongoose.ObjectId, ref: "User" },
    activity_name: String,
    activity_type: {type: String, enum: ["run","bicycle","ride","swim","walk","hike"]},
    calendar: Date,
    duration: { 
        hour: Number,
        minute: Number,
        second: Number
     },
    description: String,
    image: String,
}, {
    collection: "activities"
});

const Activity = mongoose.model('Activity', schema);

export default Activity;