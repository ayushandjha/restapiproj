const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Learner = require('../dbModel/dbModel');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const async = require('hbs/lib/async');
const auth = require('../middleware/auth.js');

router.get('/', async (req,res)=>{
    res.status(200).render('index')
});
router.get('/courses', async (req,res)=>{
    res.status(200).render('course')
});
router.get('/signin', async (req,res)=>{
    
    res.status(200).render('signin');
    // console.log(`This is the cookie ${req.cookies.jwt}`);
});
router.get('/signup', async (req,res)=>{
    // console.log(`This is the cookie ${req.cookie.jwt}`);
    res.status(200).render('signup')
});
router.get('/exclusive',auth, async (req,res)=>{

    res.status(200).render('exclusive');
})
router.get('/logout', auth, async(req,res)=>{
    try {
        await res.clearCookie('jwt');
        // req.user.tokens = await req.user.tokens.filter((currentElement)=>{
        //     return currentElement.token != req.token;
        // })
        
        // logging out from all devices
        req.user.tokens = [];
        await req.user.save();
        res.status(200).render('index')
    } catch (error) {
        res.status(500).render('accdenied')
    }
})

router.post('/signup', async(req,res)=>{
    try {
        const signupLearner = req.body;
        if (signupLearner.password===signupLearner.confirmPassword) {
            const learnerData = new Learner({
                name:signupLearner.name,
                email:signupLearner.email,
                dob:signupLearner.dob,
                gender:signupLearner.gender,
                address:signupLearner.address,
                phone:signupLearner.phone,
                password:signupLearner.password
            });
            const tokenG = await learnerData.genToken();
            
            const learnerDataSave = await learnerData.save();
            res.cookie("jwt", tokenG,{
                expires:new Date(Date.now + 600000),
                httpOnly:true,
                // secure:true
            });
            res.render("exclusive");
        } else {
            res.send("Password Should be same");
        }
    } catch (error) {
        console.log(error);
        res.send("Server error");
    }

})

router.post('/signin', async (req,res)=>{
    try {
        const learnerSignin = req.body;
        const learnerSigninEmail = req.body.email;
        const learnerFind = await Learner.findOne({email:learnerSigninEmail}).exec();
        const isMatch = await bcrypt.compare(learnerSignin.password, learnerFind.password);

        if(!learnerFind){
            res.send("Invalid Login")
        }
        else if(isMatch) {
            const tokenG = await learnerFind.genToken();
            res.cookie("jwt", tokenG, {
                expires:new Date(Date.now + 600000),
                httpOnly:true,
                // secure:true
            });

            res.render("exclusive");

        } else {
            res.send("Invalid Login");
        }
    } catch (error) {
        res.send(error)
    }
})

router.get('/*', (req,res)=>{
    res.status(404).render('error');
})













module.exports = router;