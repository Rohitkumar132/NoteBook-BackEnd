const router = require('express').Router();

const middleware = require('../middleware');
const {Todo} = require('../models/todo');

router.post('/delete-todo', middleware, async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.body.id);
        res.status(200).send({message:"Todo Removed Successfully"})
    } catch (error) {
        res.status(501).send({message: "Internal Server Error"})
    }
})

module.exports = router;