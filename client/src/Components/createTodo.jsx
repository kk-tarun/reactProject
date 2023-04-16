import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const CreateTodo = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    todos: [
      {
        title: "",
        description: "",
      },
    ],
  });

  function handleChange(e) {
    console.log(e.target.value)
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const todo = {
      email: data.email,
      password: data.password,
      todos: data.todos
    };

    console.log({ todo });
    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) => {
        setData({
          email: "",
          password: "",
          todos: [
            {
              title: "",
              description: "",
            },
          ],
        });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  return (
    <section className="container">
      <Link to="/" classNamebutton-back>
        <button className="button" type="button">
          Back
        </button>
      </Link>
      <section className="contents">
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input"
          />

          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input"
          />

          <button type="submit" className="submit">
            Create TODO
          </button>
        </form>
      </section>
    </section>
  );
};
