import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateTodo = () => {
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
  }, [handleSubmit]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    axios
      .post(`http://localhost:8000/api/todo/${user.email}`, data)
      .then((res) => {
        toast.success("Task Successfully Created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2250);
      })
      .catch((err) => {
        console.log("Error couldn't create task!");
        console.log(err.message);
      })
      .finally();
  }

  return (
    <section className="flex flex-col w-full h-full px-4 ">
      <Link to="/dashboard">
        <button
          className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-center text-base font-medium text-white hover:bg-gradient-to-l mt-5"
          type="button"
        >
          Back
        </button>
      </Link>
      <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          className="w-full max-w-md shadow-md px-4 py-4"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <input
              id="title"
              name="title"
              type="text"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm my-5"
              placeholder="Title"
            />

            <input
              id="description"
              name="description"
              type="textarea"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm my-5"
              placeholder="Description"
            />
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
              focus:ring-offset-2 disabled:bg-green-900 disabled:text-gray-200 my-5"
          >
            Create
          </button>
        </form>
      </section>
    </section>
  );
};
