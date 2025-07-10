const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    // const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message : 'Unauthorized'});
    }       

    const isBlacklisted = await userModel.findOne({token : token});
    if(isBlacklisted){
        return res.status(401).json({message : 'Unauthorized'});
    }

    //if got token then decoding

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    }catch(err){
        return res.status(401).json({message : 'Unauthorized'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log('Token:', token);

    if(!token){
        return res.status(401).json({message : 'Unauthorized'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token : token});

    console.log('Is Blacklisted:', isBlacklisted);

    if(isBlacklisted){
        return res.status(401).json({message : 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;

        return next();
    }catch(err){
        res.status(401).json({message : 'Unauthorized'});
    }
}


