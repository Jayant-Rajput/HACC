import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contact.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb'}));   //profile picture upload from frontend may have size more than 1 mb.
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.use("/api/auth", authRoutes);
app.use("/api/contact",contactRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT: ", PORT);
    connectDB();
})



