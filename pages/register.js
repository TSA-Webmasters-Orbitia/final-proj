import CHead from "@/components/CHead";
import { useState } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { randomIntFromInterval } from "@/utils/Numbers";
import Link from "next/link";

const Register = ({ users, params, host }) => {
  console.log(params);
  if (getCookie("loggedIn") === true) {
    window.location.href = "/";
  }
  let allUsers = users.users;
  const [errorMsg, setErrorMsg] = useState("");
  function passwordSame(a, b) {
    if (a !== b) {
      setErrorMsg("Passwords Don't Match!");
      return false;
    } else {
      return true;
    }
  }
  function emailUnique(curr) {
    let all = [];
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      console.log(user);
      all.push(user.email);
    }
    if (all.includes(curr)) {
      setErrorMsg("Email Already Registered!");
      return false;
    } else {
      return true;
    }
  }
  function numToColor(num) {
    let color = "blue";
    switch (num) {
      case 1:
        color = "red";
        break;
      case 2:
        color = "yellow";
        break;
      case 3:
        color = "green";
        break;
      case 4:
        color = "blue";
        break;
      case 5:
        color = "purple";
        break;
    }
    return color;
  }
  function getAvatarUrl(name) {
    let names = name.split(" ");
    let firstInitial = names[0].substring(0, 1).toUpperCase();
    let lastInitial = names[names.length - 1].substring(0, 1).toUpperCase();
    let num = randomIntFromInterval(1, 5);
    let color = numToColor(num);
    let url = ``;
    if (!lastInitial) {
      url = `https://i2.wp.com/d228am55mqbj0t.cloudfront.net/defaults/${color}-${firstInitial}.png`;
    } else {
      url = `https://i2.wp.com/d228am55mqbj0t.cloudfront.net/defaults/${color}-${
        firstInitial + lastInitial
      }.png`;
    }
    return url;
  }
  async function createAccount(e) {
    e.preventDefault();
    console.log(allUsers);
    let name = e.target.name.value;
    let email = e.target.email.value;
    let pass = e.target.password.value;
    let cpass = e.target.cpassword.value;
    let samePass = passwordSame(pass, cpass);
    let uniqueEmail = emailUnique(email);
    if (samePass) {
      if (uniqueEmail) {
        let fres = await fetch("/api/createUser", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            avatarUrl: getAvatarUrl(name),
            password: pass,
          }),
        });
        let jres = await fres.json();
        console.log(jres);
        setCookie("loggedIn", true);
        setCookie("userId", jres.user.id);
        params.ref
          ? (window.location.href = `/${params.ref}`)
          : (window.location.href = "/");
      }
    }
  }
  return (
    <>
      <CHead title={"Register"} />
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
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Register
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={createAccount}
                onChange={() => {
                  setErrorMsg("");
                }}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                <div>
                  <label
                    for="cpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Login here
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

export default Register;

export async function getServerSideProps(context) {
  let fres = await fetch("https://orbitia.techlion.dev/api/users", {
    method: "GET",
  });
  let jres = await fres.json();
  return {
    props: {
      users: jres,
      params: context.query,
      host: context.req.headers.host,
    },
  };
}
