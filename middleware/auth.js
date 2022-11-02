require('dotenv').config();

const jwt = require('jsonwebtoken');


const config = process.env;

const verifyToken = (req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];


    if(!token){
        return res.status(403).send({message:"A token is required for the authentification"});
    }
    try{
        
        const decod = jwt.verify(token,config.TOKEN_KEY)
        req.user = decod;
    }
    catch(e){
        return res.status(401).send({message:"Invalid token"});
    }
    return next();
}

module.exports = verifyToken;