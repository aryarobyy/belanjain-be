import User from "../models/userModel.js"
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
            "Messages" : "Success posting user",
            token,
            newUser
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log("Error in postUser: ", e.message);
    }
};

export const getUserByUsername = async (req, res) => {
    const { username,  password } = req.body;
    console.log("Searching for user with username:", username);

    try{
        const user = await User.findOne({ username: { $regex: new RegExp("^" + username.toLowerCase(), "i") } });

        if (!user ) {
            return res.status(404).json({
                "Messages" : "User not found",
            })
        } 

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            return res.status(401).json({
                "Messages" : "Invalid password",
                })
        }

        const token = jwtToken(user.userId);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
              username: user.username,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
        });
    } catch (e) {
        return res.status(500).json({
            message: "An error occurred",
            error: e.message
        });
    }
}

export const getUserById = async (req, res) => {
    const { userId, password } = req.body;

    try{
        const user = await User.findOne({ userId })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            return res.status(401).json({
                "Messages" : "Invalid password",
                })
        }

        const { token } = jwtToken(user.userId);

        return res.status(200).json({
            message: "User found",
            user,
            token
        })
    } catch (e) {
        return res.status(500).json({
            message: "An error occurred",
            error: e.message
        });
    }
}
; 