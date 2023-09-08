// Import necessary modules from all folders
require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRouter from './src/routes/blog.route';
import userRouter from './src/routes/user.route';
const app = express();
app.use(bodyParser.json());
app.use('/user/post', postRouter);
app.use('/user', userRouter);

app.listen(8081, async () => {
    console.log('server is running at port 8081')
    await mongoose.connect('mongodb://127.0.0.1/hmp-blogProject');
    console.log('Connected to mongoDB');
})
export {};