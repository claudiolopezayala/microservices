import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './book.router.js';
dotenv.config();

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());


const Book = mongoose.model('Book');
const url = process.env.MONGO_URL || 'mongodb://mongo:27017/books';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Book Service is running on port ${PORT}`);
});
