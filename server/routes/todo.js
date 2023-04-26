//will contain the files with the endpoints
const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
  findEmail,
  signUp
} = require("../controllers/todo");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/", getAllTodo);

// router for email finding
router.get("/email", findEmail);


/**
 * @route POST api/todo/
 * @description add a new todo
 * @access public
 */
router.post("/:email", postCreateTodo);

// route for setting up new user to database
router.post("/", signUp);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:email", putUpdateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:email/:id", deleteTodo);

module.exports = router;