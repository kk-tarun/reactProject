import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handdleEdit, handleDelete }) {
  const { _id, email, password, username, isLoggedIn, todos, createdAt, updatedAt } = data;

  return (
    <section>
      {_id}
      {email}
      {password}
      {username}
      <br />
      wefrg
      {isLoggedIn}
      <br />
      {createdAt}
      {updatedAt}
      {/* {todos} */}
      {todos.map((data) => (
        <li key={data._id}>
          <div className="title-description">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <p>{data._id}</p>
          </div>
          <div className="button-container">
            <button name={data._id} className="button" onClick={handdleEdit}>
              Edit
            </button>
            <button name={data._id} className="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </section>
  );
}

export const ShowTodoLlist = () => {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        // console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [update]);

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    console.log("update: ", update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    console.log(e.target.name);
    axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

    setTodo((data) => {
      console.log(data.todos)
      return data.todos.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  return (
    <div className="container">
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (  
              <TodoCard
                key={data._id}
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
          ))}
        </ul>
      </section>
      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <p className="close" onClick={handleClose}>
              &times;
            </p>
            <UpdateTodo
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};