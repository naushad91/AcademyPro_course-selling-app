import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from  "./routes/course.route.js"
import userRoute from "./routes/user.route.js"
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
// app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/admin", adminRoute);
// app.use("/api/v1/order", orderRoute);
// Cloudinary configuration code
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})