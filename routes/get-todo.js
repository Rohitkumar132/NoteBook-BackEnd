const { User } = require('../models/user');
const { Todo } = require('../models/todo');
const middleware = require('../middleware');

const router = require('express').Router();

router.get("/get-todos",middleware, async(req,res)=>{
    // const user_id = jwt.decode(req.headers['authorization']);
    // console.log(req.user._id);
    try {
        // const data = await Todo.find({user_id : req.user._id});
        const data = await Todo.aggregate([{ $match: {user_id : req.user._id}}]);
        console.log(data);
        res.status(200).send({data, message:"Todo Data Fetched Successfully"});
    } catch (error) {
        res.status(501).send({error, message:"Internal Server Error"})
    }
})

module.exports = router;