// import express
const express = require("express");

// set up router
const router = express.Router();

// import controller functionality
const { createUser, loginUser } = require("../controllers/users-controller");

// import middleware function
const verifyToken = require("../middleware/authMiddleware")

// handle GET requests to /api/v1/users/profile
// anything that has to do with out database needs async await
// run verifyToken function as middleware right before it hits the /profile route
router.get("/profile", verifyToken, (req, res) => {

    try {
        
        // send a success response to the user
        res.json ({
            message: "success",
            payload: "SECURE USER PROFILE INFORMATION!"
        })

    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error. message
        })

    }

})

// handle POST requests to /api/v1/users
// anything that has to do with out database needs async await
router.post("/", async (req,res) => {

    try {

        // call the controller createUser function using data from the request body
        const newUser = await createUser(req.body);

        // send success response to the user including the new user
        res.json ({
            message: "success",
            payload:  newUser
        })

    } catch (error) {

        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle POST requests for login
// anything that has to do with out database needs async await
router.post("/login", async (req, res) => {

    try {
        
        // call the controller loginUser function using data from the request body
        const userLoggedIn = await loginUser(req.body)

        // send a success response to the user including the logged in status
        res.json ({
            message: "success",
            payload: `${userLoggedIn.username} has logged in successfully!`,
            token: userLoggedIn.token 
        })

    } catch (error) {

        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error
        })
        
    }

})

// export the router
module.exports = router