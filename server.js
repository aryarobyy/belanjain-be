import express from 'express';
import connectDB from './utils/mongodb.js';
import cors from 'cors';
import { postUser, getUserById, getUserByUsername } from './controller/userController.js';
import dotenv from 'dotenv';
import { postProduct } from './controller/productController.js';
import { WebSocketServer } from 'ws';


dotenv.config(); 
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/auth/register', postUser); 
app.post('/image/post', postProduct); 

app.get('/auth/:username', getUserByUsername)
app.get('/auth/:userId', getUserById); 

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
