const mongoose = require('mongoose');
const Joi = require('joi');

const todoSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

const validateTodo = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description")
    });
    return schema.validate(data)
};

module.exports = { Todo, validateTodo };
