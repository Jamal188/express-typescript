import express from "express";
import helmet from 'helmet';


import userRoutes from './routes/user';
import connectDB from './config/database';

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(helmet());


app.use('/users/', userRoutes);
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

