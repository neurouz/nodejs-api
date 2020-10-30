const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true, max: 255
    },
    lastName: {
        type: String, required: true, max: 255
    },
    username: {
        type: String, required: true, max: 125, min: 3
    },
    password: {
        type: String, required: true, min: 8
    },
    dateCreated: {
        type: Date, default: Date.now
    },
    lastLogin: {
        type: Date, required: false, default: null
    }
});

module.exports = mongoose.model('User', userSchema);