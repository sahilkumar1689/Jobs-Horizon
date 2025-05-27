const jwt = require("jsonwebtoken");
require("dotenv").config({
    path:"./.env"
});


const jwtAuthMiddleware = (req,res,next)=>{
    
    // Firstly Extract the token from the request headers:
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({
        errorMessage:"Unauthorized"
    });

    // If token present then verify the token and send resonse accordingly:
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        req.userPayload = payload;
        next();

    } catch (err) {
        return res.status(401).json({
            errorMessage:"Invalid Token or Expire Token"
        })
    }
}

module.exports = jwtAuthMiddleware;