//files which have the methods for the endpoint to communicate with the database
const Todo = require("../models/todo");

// getAllTodo: The find() method will return all the todo in the collection. If the collection is empty then it will return a 404 error.
exports.getAllTodo = (req, res) => {
  Todo.find()
    .then((todo) => res.json(todo))
    .catch((err) => {
      res.status(404).json({ message: "Todo not found", error: err.message });
    });
};

// postCreateTodo: The create() method will create a todo and return a success message. Otherwise, it will return a 400 error.
exports.postCreateTodo = (req, res) => {
  Todo.updateOne({ email: req.params.email }, { $push: { todos: req.body } })
    .then((data) => {
      res.json({ message: "Todo added successfully", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message });
    });
};

// putUpdateTodo: The findByIdAndUpdate() will require two parameters the id and data of the todo to be updated. The id parameter will be extracted from req.params.id.
exports.putUpdateTodo = (req, res) => {
  const filter = { email: req.params.email };
  const update = {
    username: req.body.username,
    password: req.body.password,
  };

  Todo.findOneAndUpdate(filter, update, { new: true })
    .then((data) => {
      res.json({ message: "Updated successfully", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Failed to update user", error: err.message });
    });
};

// deleteTodo: The findByIdAndRemove() method will require only one parameter that is the id of the todo.
exports.deleteTodo = (req, res) => {
  Todo.updateOne(
    { email: req.params.email },
    { $pull: { todos: { _id: req.params.id } } },
    { new: true }
  )
    .then((data) => {
      res.json({ message: "Todo deleted successfully", data });
    })
    .catch((err) => {
      res.status(404).json({ message: "Todo not found", error: err.message });
    });
};

// it finds the user corresponding to email at login
exports.findEmail = (req, res) => {
  var email = req.params.email;
  Todo.findOne({ email: email })
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Email successfully found!", data });
      } else {
        res.json({ message: "Email not found!" }).status(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
