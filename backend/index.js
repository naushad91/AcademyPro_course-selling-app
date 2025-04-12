import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from  "./routes/course.route.js"
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload"
const app = express()
dotenv.config()
const port = process.env.PORT||3000
const DB_URL = process.env.MONGO_URL;

try {
    await mongoose.connect(DB_URL);
     console.log("Connected to MongoDB");
   } catch (error) {
     console.log(error);
   }
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use('/api/vi/course', courseRoute)
// Cloudinary configuration code
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})