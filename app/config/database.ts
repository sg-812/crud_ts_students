import mongoose from "mongoose";

const URI = `${process.env.DB_URL}`;


export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
