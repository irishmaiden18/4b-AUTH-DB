// npm init -y
// npm i express morgan mongoose dotenv bcrypt

// import express
const express = require('express');

// import morgan
const logger = require("morgan");

// connect to MongoDB
const connectToMongoDB = require("./database/connectToMongoDB")

// set up the express app
const app = express();

// set up the port
const PORT = 3000;

// set up morgan
app.use(logger("dev"))

// format our express body
app.use(express.json())


// start listening
app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)

    // call the connectToMongoDB function
    connectToMongoDB()
})