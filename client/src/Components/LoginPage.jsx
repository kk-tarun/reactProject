import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

async function authenticateUser(email, password) {
  const response = await axios.get(`http://localhost:8000/api/todo/${email}`);
  const res = response.data;
  if (res.message === "Email not found!") {
    // User does not exist
    toast.error("User not found!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  } else if (res) {
    // User exists then check for password
    if (password === res.data.password) {
      toast.success("Login Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      localStorage.setItem('currentUser', JSON.stringify(res.data));

      setTimeout(()=>{
        window.location.href = "/dashboard";
      }, 2250);
    } else {
      toast.error("Invalid Credentials!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }
}

const LoginPage = () => {
  localStorage.removeItem("currentUser");
  const formSubmit = (e) => {
    e.preventDefault();
    authenticateUser(e.target.email.value, e.target.password.value);
  };

  return (
    <div className="flex-grow">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md shadow-md px-4 py-4">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Create an account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" method="POST" onSubmit={formSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={6}
                  maxLength={30}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                                focus:ring-offset-2 disabled:bg-green-900 disabled:text-gray-200"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
