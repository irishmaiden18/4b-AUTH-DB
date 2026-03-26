// npm init -y
// npm i express morgan mongoose dotenv bcrypt

// import express
const express = require('express');

// set up the express app
const app = express();

// import morgan
const logger = require("morgan");

// set up middleware

// set up morgan
app.use(logger("dev"))

// format our express body
app.use(express.json())

// connect to MongoDB
const connectToMongoDB = require("./database/connectToMongoDB")

// import and use the user router
const usersRouter = require("./routes/users-router")
app.use("/api/v1/users", usersRouter)

// set up the port
const PORT = 3000;

// start listening
app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)

    // call the connectToMongoDB function
    connectToMongoDB()
})

//220