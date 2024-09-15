const router = require("express").Router();
const middleware = require("../middleware");
// const { User } = require('../models/user');
const { Todo } = require('../models/todo');
const { validateTodo } = require('../models/todo');
const jwt = require('jsonwebtoken')

router.post('/add-todo', middleware, async(req,res)=>{
    // console.log(req.user)
    const user_id = jwt.decode(req.headers['authorization']);
    try {
        // console.log(validateTodo)
        const {error} = validateTodo(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        console.log(req.body)
        // const user  = await User.findById({_id});
        await new Todo({...req.body,user_id}).save();
        res.status(200).send({message: "Todo Added Successfully"}); 
    } catch (error) {
        console.log(error)
        res.status(500).send({error, message: "Internal Server error"})
    }
});

module.exports = router;