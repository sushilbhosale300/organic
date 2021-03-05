const jwt  = require('jsonwebtoken');

exports.requireSignin = (req,res,next) =>{

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,process.env.JWT_SECRETE);
        req.user = user;
    }else{
        
        return res.status(400).json({message : 'Authorization Required '});
    }
    next();
}

exports.userMiddleware = (req,res,next) =>{
    if(req.user.status !== 'Inactive'){
        return res.status(400).json({ message: 'User Access denied '})
    }

    next();
}

