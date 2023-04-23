import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TodoCard({ todo, handleDelete }) {
  return (
    <div
      key={todo._id}
      className="w-1/4 h-1/4 flex flex-row justify-center my-10"
    >
      <div className="mx-6">
        <div className="relative group ">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-7 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <button
              onClick={(e) => {
                handleDelete(todo._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
              </svg>
            </button>
            <div className="space-y-2">
              <h2 className="text-slate-800">{todo.title}</h2>
              <p>{todo.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ShowTodoLlist = () => {
  const [user, setUser] = useState(null);
  var localData = JSON.parse(localStorage.getItem("currentUser"));
  if (!localData) {
    window.location.href = "/";
  }
  var email = localData.email;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/todo/${email}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [handleDelete]);

  function handleDelete(e) {
    console.log(e);
    axios.delete(`http://localhost:8000/api/todo/${user.email}/${e}`);
  }

  return (
    <div className="flex flex-col items-center w-full h-full px-4">
      <Link to="/create-todo" className="button-new align-center">
        <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-center font-medium text-white hover:bg-gradient-to-l my-8 h-12 w-36 text-xl">
          New
        </button>
      </Link>
      <section className="">
        <ul className="flex flow-row flex-wrap">
          {user &&
            user.todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                handleDelete={handleDelete}
              />
            ))}
        </ul>
      </section>
    </div>
  );
};
