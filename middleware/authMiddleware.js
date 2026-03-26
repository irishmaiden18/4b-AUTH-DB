// import jsonwebtoken
const jwt = require("jsonwebtoken")

// set up .env use
const dotenv = require("dotenv");

// loads everything from our .env file
dotenv.config()

// custom middleware function to verify the token
// needs to bee middleware, we want to verify before we hit our routes
const verifyToken = (req, res, next) => {

    // go to Headers tab in Postman
    // key: Authorization
    // value: our token

    // first we read our token
    // if our token exists, it will be sent in request headers
    // Authorization headers are for sending auth details/requirements like tokens
    const token = req.header("Authorization")

    if (!token) {

        // need to return response in middleware to exit function early
        // 401 is unauthorized 
        return res.status(401).json ({
            message: "failure",
            payload: "Unable to authorize user"
        })
    }

    // at this point in the code, they have the token
    // verify the token against the secret key
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)

    // attach tokenData to our request
    req.username = tokenData.username

    // end our function with next()
    // request will be routed to next middleware OR the proper route
    next()
}

// export function
module.exports = verifyToken