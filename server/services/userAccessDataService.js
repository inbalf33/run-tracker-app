const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAuthToken } = require("../auth/providers/jwt");

// Register new user
const registerUser = async (newUser) => {
    try {
        
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        let user = new User(newUser);
        
        user.password = await bcrypt.hash(user.password, 10);

        user = await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Login
const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email });
        if (!userFromDB) {
            throw new Error("Invalid email or password");
        }

        // Vreify password
        const validPassword = await bcrypt.compare(password, userFromDB.password);
        if (!validPassword) {
            throw new Error("Invalid email or password");
        }

        // generate token
        const token = generateAuthToken(userFromDB);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

// 3. get user
const getUser = async (userId) => {
    try {
        let user = await User.findById(userId).select("-password");
        return user;
    } catch (error) {
        throw new Error("Mongoose: " + error.message);
    }
};

module.exports = { registerUser, loginUser, getUser };