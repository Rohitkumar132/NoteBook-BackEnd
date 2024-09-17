const router = require("express").Router();
const { User, generateAuthToken } = require('../models/user');
const Joi = require("joi");
const bcrypt = require('bcrypt')

router.post("/auth", async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message})
        const email = req.body.email.toLowerCase();
        const user = await User.findOne({email});
        
        console.log(user);
        if(!user)
            return res.status(401).send({message:"User Not Register"});

        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = await bcrypt.hash(req.body.password, salt);
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
            )

        console.log(validPassword , user.password)

        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or password"});

        const token = generateAuthToken(user._id);
        console.log(token);

        res.status(200).send({data:token, user, message:"Logged in successfully"})
    
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
    }
})

const validate = (data) => {
    const schmea = Joi.object({
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    
    })

    return schmea.validate(data)
}

module.exports = router;