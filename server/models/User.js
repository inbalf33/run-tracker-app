const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, EMAIL } = require("./helpers/mongooseValidators");

const userSchema = new mongoose.Schema({
    name: DEFAULT_VALIDATION,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;