// import the user model
const User = require("../models/users-model")

// import bcrypt
const bcrypt = require("bcrypt")

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

// export controller functions
module.exports = { createUser }