// import mongoose
const mongoose = require("mongoose")

// set up a user Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// create the user model
const User = mongoose.model("User", userSchema)

// export the user model
module.exports = User
