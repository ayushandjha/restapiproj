require('dotenv').config();
const { errorMonitor } = require('events');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { log } = require('console');



const learnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email");
            }
        }
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    phone:{
        type:Number,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

});

// for generating web tokens
learnerSchema.methods.genToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = await this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}


// for hashing
learnerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})




const Learner = new mongoose.model('Learner', learnerSchema);

module.exports = Learner;