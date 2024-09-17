const jwt = require('jsonwebtoken');
const { User } = require('../models/user')
const middleware = async (req, res, next) => {

    try {
        const data = req.headers['authorization'];
        const userId = jwt.decode(data);
        const user = await User.findById(userId);
        // console.log(user);
        if (!user)
            return res.status(400).send({message: "User not Valid"})
        // if(user)
        //     return res.status(400).send({message: "Token Expired Please Re-login"});
        req.user = userId
        console.log("NIce" , req.user)
        next();
    } catch (error) {
        console.log(error)
        return res.status(501).send({message: 'Internal Server Error'})
    }
}

module.exports = middleware;