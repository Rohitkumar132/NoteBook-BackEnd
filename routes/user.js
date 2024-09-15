const router = require("express").Router();
const {User} = require('../models/user');
const {validate} = require('../models/user');
const bcrypt = require('bcrypt')

router.post('/users', async(req,res)=>{
    // console.log(req.body);
    try {
        const {error} = validate(req.body);

        if(error)
            return res.status(400).send({message: error.details[0].message})

        const user = await User.findOne({email : req.body.email});

        console.log(user)
        if(user)
            return res.status(400).send({message : "User with given email already exist"})
    
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const email = req.body.email.toLowerCase();
        await new User({...req.body, email, password: hashPassword}).save();
        res.status(201).send({message: "User Created Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send ({message: "Internal Server Error"})
    }
})
module.exports = router;