import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./route/userRoute.js";
import bookRoute from "./route/bookRoute.js";
const app = express();
const corsOptions = {
  origin: "*",
};

const mongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB server started successfully!`);
  } catch (err) {
    throw err;
  }
};

// MIDDLEWARES.
app.use(cors(corsOptions));
app.use(express.json()); // To validate json objects.
app.use("/user", userRoute); // user routes.
app.use("/books", bookRoute); // book routes.

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  mongo();
  console.log(`Port successfully started at ${PORT}`);
});
