const { User } = require("../db/index.js");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers['username'];
    const password = req.headers['password'];
    const arr= await User.find({username: new RegExp(username, 'i'),password:password});
    if(arr.length){
        next();
    }else{
        res.status(404).json({msg:"wrong username or password"});
    }
}

module.exports = userMiddleware;