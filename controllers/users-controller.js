// import the user model
const User = require("../models/users-model")

// import bcrypt
const bcrypt = require("bcrypt")

// import jsonwebtoken
const jwt = require("jsonwebtoken")

// set up .env use
const dotenv = require("dotenv");

// loads everything from our .env file
dotenv.config()

// write a createUser function that creates a user from userData
// everything that has to do with our database is awaite/async
const createUser = async (userData) => {

    /*
        userData = {
            username: "exampleUser123",
            password: "examplePass319280"
        }
    */

    try {

        // produces a string of random characters then keeps utilizing that string to create an even more random set of characters, goes through 10 rounds of this by default
        const salt = await bcrypt.genSalt()

        // takes in data you are trying to hash and the salt and creates a hashed password
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // creates a user object from the data that stores the username and the hashed password
        const secureUserData = {
            username: userData.username,
            password: hashedPassword
        }

        // create a new user for the database using our user object
        const newUser = User.create(secureUserData)

        // return the new user for the database
        return newUser
        
    } catch (error) {

        // propogates error to router file
        throw error 
    }

}

// write a login function that authenticates the user
// everything that has to do with our database is awaite/async
const loginUser = async (userData) => {

    try {

        // verify that username exists in db
        const user = await User.findOne({username: userData.username})

        // if the username is not in our database
        if (!user) {

            // throw an error
            throw "User not found"
        }

        // compare the incoming passwrord with the hashed password in the database
        // db.compare(incomingPassword, hashedPassword)
        const isCorrectPassword = await bcrypt.compare(userData.password, user.password)

        // if the passwords DONT match
        if(!isCorrectPassword) {

            // throw an error
            throw "Passwords do NOT match"
        }

        // at this point in the code, if an error has not been thrown, we know the user has successfully logged in (authenticated themselves)
        // we can now setup our JWT token for the user

        // create a token
        // jwt.sign({payload}, secretKey)
        // payload is just the data that we want to store with the token (can be whatever you want, typically for private user information)
        // secretKey -- generated online: https://jwtsecretkeygenerator.com/
        // add secretKey using our .env
        // secretKey - your app's exclusive key used to sign the token when it's created and verify the token when the user tries to access a protected route (your app's signature)
        const token = jwt.sign({username: user.name}, process.env.JWT_SECRET_KEY)

        // return the username and the token ONLY
        return {username: user.username, token: token}
        
    } catch (error) {
        
        // propogates error to router file
        throw error
    }

}

// export controller functions
module.exports = { createUser, loginUser }