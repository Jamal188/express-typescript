import express from "express";
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/user.ts';
import authRoutes from './routes/authRoutes.ts';
import productRoutes from './routes/product.ts';
import connectDB from './config/database.ts';

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(helmet());


app.use('/users/', userRoutes);
app.use('/auth/', authRoutes);
app.use('/products/', productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});


connectDB().then(() => {
  app.listen(port!, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});

