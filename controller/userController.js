import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtToken.js";
import { v4 as uuidv4 } from "uuid";

export const postUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const uuidV4 = uuidv4(); 

        const newUser = new User({
            userId: uuidV4,
            name,
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();

        const token = jwtToken(newUser.userId);
        
        res.status(201).json({
            "Messages" : "User berhasil di post",
            token,
            newUser
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in postUser: ", err.message);
    }
};

export const getUser = async (req, res) => {
    const { userId } = req.body;

    try{
        const user = await User.findOne({ userId })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { token } = jwtToken(user.userId);

        return res.status(200).json({
            message: "User found",
            user,
            token
        })
    }catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
}
; 