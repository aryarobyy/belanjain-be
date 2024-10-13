import express, { query } from 'express';
import connectDB from './utils/mongodb.js';
import cors from 'cors';
import { postUser, getUser } from './controller/userController.js';
import dotenv from 'dotenv';

dotenv.config(); 
connectDB();

const app = express();
const port = 5000;



app.use(express.json());
app.use(cors());

app.post('/auth/register', postUser);

app.get('/auth/:userId', getUser)

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});