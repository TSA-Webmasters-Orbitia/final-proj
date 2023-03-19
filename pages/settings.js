import CHead from "@/components/CHead";
import Nav from "@/components/Nav";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const loggedIn = getCookie("loggedIn");

const Settings = ({ users, host }) => {
  const Router = useRouter()
    if (!loggedIn) {
            Router.push('/')
    }
  let allUsers = users.users;
  let curr;
  if (getCookie("loggedIn")) {
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.id === getCookie("userId")) {
        curr = user;
        break;
      }
    }
  }

  const [name, setName] = useState(curr ? curr.name : "");
  const [email, setEmail] = useState(curr ? curr.email : "");
  const [password, setPassword] = useState(curr ? curr.password : "");

  useEffect(() => {
    setName(curr ? curr.name : "");
    setEmail(curr ? curr.email : "");
    setPassword(curr ? curr.password : "");
  }, [curr]);

  async function updateProfile(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let fres = await fetch("/api/updateUser", {
      method: "POST",
      body: JSON.stringify({
        id: curr.id,
        name: name,
        email: email,
        password: password,
      }),
    });
    let jres = await fres.json();
    deleteCookie("loggedIn");
    deleteCookie("userId");
    window.location.href = '/login';
  }

  return (
    <>
      <CHead title={"User Settings"} />
      <Nav loggedIn={loggedIn} user={curr} />
      <div className="z-0 p-4 m-2">
        <div className="justify-center w-full p-8 space-y-4 overflow-y-scroll rounded shadow">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">
            User Settings
          </h2>
          <form onSubmit={updateProfile} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  //   console.log(email);
                }}
                value={email}
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="John Doe"
                onChange={(e) => {
                  setName(e.target.value);
                  //   console.log(name);
                }}
                value={name}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="••••••••"
                onChange={(e) => {
                  setPassword(e.target.value);
                  //   console.log(name);
                }}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;

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
