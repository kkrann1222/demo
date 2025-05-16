import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Database connected successfully");

    // Start server only after DB connects
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});

// Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const UserModel = mongoose.model("users", userSchema);

// Routes
app.get("/getUsers", async (req, res) => {
    try {
        const userData = await UserModel.find();
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
