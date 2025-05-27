const jwt = require("jsonwebtoken");
require("dotenv").config({
    path:"./.env"
})

// console.log(process.env.JWT_SECRET);

const createJwtToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports = {createJwtToken};