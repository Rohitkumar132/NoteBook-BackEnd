const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
)

const generateAuthToken = function(_id){
    const token = jwt.sign({_id},process.env.JWTPRIVATEKEY,{expiresIn: "1d"})
    return token;   
}

const User = mongoose.model("user", userSchema);

const validate = (data) =>{
    const schmea = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })

    return schmea.validate(data)
}

module.exports = {User , 
    validate, generateAuthToken}; 
