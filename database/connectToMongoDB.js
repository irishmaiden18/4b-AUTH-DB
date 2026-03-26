// import mongoose
const mongoose = require("mongoose");

// set up .env use
const dotenv = require("dotenv");

// loads everything from our .env file
dotenv.config()

// create a connection function that connects to our database
// everything that has to do with our database requires async/await
const connectToMongoDB = async () => {
    
    try {

        // mongoose.connect function attempts to use the connection string (MONGODB_URI) to make a connection to the database we created
        await mongoose.connect(process.env.MONGODB_URI)

        // log a message that confirms we are connected
        console.log("Connected to DB")

    } catch (error) {

        // log the error
        console.log(error)
    }
}

// export the function
module.exports = connectToMongoDB;