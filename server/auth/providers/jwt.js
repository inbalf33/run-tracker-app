
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key_12345";

// generate auth token
const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
    return token;
};

// verify token
const verifyToken = (tokenFromClient) => {
    try {
        const userData = jwt.verify(tokenFromClient, SECRET_KEY);
        return userData;
    } catch (error) {
        return null;
    }
};

module.exports = { generateAuthToken, verifyToken };