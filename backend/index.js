require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nittfest")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    gender: { type: String },
    dauthId: { type: String },
    phoneNumber: { type: String },
    batch: { type: String },
    department: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.send("API is running...");
});

// DAuth Callback Route
app.post("/auth/dauth/callback", async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Authorization code missing" });
        }

        // 1. Exchange 'code' for 'access_token'
        const tokenResponse = await axios.post("https://auth.delta.nitt.edu/api/oauth/token", new URLSearchParams({
            client_id: process.env.DAUTH_CLIENT_ID,
            client_secret: process.env.DAUTH_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.DAUTH_REDIRECT_URI,
        }), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(500).json({ error: "Failed to obtain access token" });
        }

        // 2. Fetch User Profile
        const userResponse = await axios.post("https://auth.delta.nitt.edu/api/resources/user", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const userData = userResponse.data;

        // NITT DAuth returns properties like gender, name, email, phoneNumber, batch, id, etc.
        const { email, name, gender, id, phoneNumber, batch, department } = userData;

        if (!email) {
            return res.status(400).json({ error: "Email not provided by DAuth" });
        }

        // 3. Find or Create User in DB
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                email,
                name,
                gender,
                dauthId: id,
                phoneNumber,
                batch,
                department,
            });
            await user.save();
        } else {
            // Update any changed info if needed
            user.name = name || user.name;
            user.gender = gender || user.gender;
            user.dauthId = id || user.dauthId;
            user.phoneNumber = phoneNumber || user.phoneNumber;
            user.batch = batch || user.batch;
            user.department = department || user.department;
            await user.save();
        }

        // 4. Generate JWT for our app
        const appToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "fallback_secret_for_development",
            { expiresIn: "7d" }
        );

        // 5. Send token and user info
        res.json({ token: appToken, user: { email: user.email, name: user.name, gender: user.gender } });

    } catch (error) {
        console.error("DAuth callback error:", error?.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error during DAuth login" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
