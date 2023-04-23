import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

async function checkSignup(username, email, password) {
  // console.log(username, email, password);
  const response = await axios.get(`http://localhost:8000/api/todo/${email}`);
  const res = response.data;
  if (res.message === "Email not found!") {
    // if user doesn't exists then create a user and send data to server
    const user = {
      email: email,
      password: password,
      username: username,
      isLoggedIn: true,
      todos: [],
    };
    
    axios.post("http://localhost:8000/api/todo", user).catch((err) => {
      console.log(err.message);
    });

    toast.success("Registration Successfull!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2250);
  } else if (res) {
    // if email already exists then show account already exists
    toast.error("Account already exists!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  }
}

const SignupPage = () => {
  localStorage.removeItem("currentUser");
  const formSubmit = (e) => {
    e.preventDefault();
    checkSignup(
      e.target.username.value,
      e.target.email.value,
      e.target.password.value
    );
  };

  return (
    <div className="flex-grow">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Signup
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" onSubmit={formSubmit}>
              <div className="overflow-hidden shadow-md sm:rounded-md">
                <div className="bg-white px-4 pt-5 sm:px-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        className="mt-1 block w-full rounded-md border-[1px] border-gray-200 p-1 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        placeholder="Username"
                        required
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-[1px] border-gray-200 p-1 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        placeholder="Email address"
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 block w-full rounded-md border-[1px] border-gray-200 p-1 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        placeholder="Password"
                        required
                        minLength={6}
                        maxLength={30}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group relative mt-6 mb-2 flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                                focus:ring-offset-2 disabled:bg-green-900 disabled:text-gray-200"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
