const jwt = require('jsonwebtoken');
const Learner = require('../dbModel/dbModel');

const auth  = async (req,res,next)=>{
    try {
        const token = await req.cookies.jwt;
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);
        const user = await Learner.findOne({_id:verifyUser._id});
        // console.log(user);

        req.token = token;
        req.user = user;

        next();



    } catch (error) {
        res.status(401).render('accdenied');
    }
}

module.exports = auth;