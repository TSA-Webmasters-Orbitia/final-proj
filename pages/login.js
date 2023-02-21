import CHead from "@/components/CHead";
import { useState } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
const Login = ({ users }) => {
  if (getCookie("loggedIn") === true) {
    window.location.href = "/";
  }
  let allUsers = users.users;
  const [errorMsg, setErrorMsg] = useState("");
  async function loginUser(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let pass = e.target.password.value;
    let curr;
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.email === email) {
        curr = user;
        break;
      }
    }
    if (curr) {
      if (pass === curr.password) {
        setCookie("loggedIn", true);
        setCookie("userId", curr.id);
        window.location.href = "/";
      } else {
        setErrorMsg("Incorrect Credentials!")
      }
    } else {
      setErrorMsg("User Not Found!")
    }
  }
  return (
    <>
      <CHead title={"Login"} />
      <div className="h-screen py-8 overflow-y-scroll bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 focus:outline-none"
          >
            <img
              className="mr-2 w-14 h-14"
              src="https://cdn.orbitia.techlion.dev/logos/png/icon/color.png"
              alt="logo"
            />
            <h3 className="logo">Orbitia</h3>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={loginUser}
                onChange={() => {
                  setErrorMsg("");
                }}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
              <div
                className={
                  !errorMsg
                    ? "hidden"
                    : "" + "p-4 font-medium bg-red-200 text-red-700 rounded-lg"
                }
              >
                {errorMsg}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  let fres = await fetch("https://orbitia.techlion.dev/api/users", {
    method: "GET",
  });
  let jres = await fres.json();
  return {
    props: {
      users: jres,
      host: context.req.headers.host
    },
  };
}
