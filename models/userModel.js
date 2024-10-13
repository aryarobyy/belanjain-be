import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true  
    },
    email: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true 
    },
}, { timestamps: true }); 

const User = mongoose.model("users", userSchema);

export default User;
