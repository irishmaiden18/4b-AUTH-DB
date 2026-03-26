// import express
const express = require("express");

// set up router
const router = express.Router();

// import controller functionality
const { createUser } = require("../controllers/users-controller");

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

// export the router
module.exports = router