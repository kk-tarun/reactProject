//it will define the mongodb schema
var mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    username: {
        type: String,
        required: [true, "Please provide Username!"],
        unique: false,
    },
    isLoggedIn: {
        type: Boolean,
    },
    todos: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
        },
    ],
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;