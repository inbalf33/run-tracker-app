const express = require("express");
const { registerUser, loginUser, getUser } = require("../services/userAccessDataService");
const auth = require("../auth/authService");

const router = express.Router();

// 1. POST - register
router.post("/register", async (req, res) => {
    try {
        const newUser = req.body;
        const user = await registerUser(newUser);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// 2. POST - login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// 3. GET - user
router.get("/me", auth, async (req, res) => {
    try {        
        const userId = req.user._id;
        const user = await getUser(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;