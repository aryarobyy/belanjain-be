import express, { query } from 'express';
import connectDB from './utils/mongodb.js';
import cors from 'cors';
import { postUser, getUser } from './controller/userController.js';
import dotenv from 'dotenv';

dotenv.config(); 
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());

app.post('/auth/register', postUser);

app.get('/auth/:userId', getUser)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});