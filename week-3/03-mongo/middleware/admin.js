const { Admin } = require("../db/index.js");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers['username'];
    const password = req.headers['password'];
    const arr= await Admin.find({username: new RegExp(username, 'i'),password:password});
    if(arr.length){
        next();
    }else{
        res.status(404).json({msg:"wrong username or password"});
    }
}

module.exports = adminMiddleware;