import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes
import category from './routes/category.js'
import subCategory from './routes/subCategory.js'
import auth from './routes/auth.js'
import listings from './routes/listings.js'
import admin from './routes/admin.js'
import user from './routes/user.js'

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

//end point apis
app.use('/api/category',category)
app.use('/api/subcategory',subCategory)
app.use('/api/auth',auth)
app.use('/api/listings',listings)
app.use('/api/admin',admin)
app.use('/api/users',user)
app.get("/", (req, res) => {
  res.send("success");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listed on port ${PORT}`);
});