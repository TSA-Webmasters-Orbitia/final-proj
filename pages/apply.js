import CHead from "@/components/CHead";
import Nav from "@/components/Nav";
import { useState } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const Apply = ({ users }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const allUsers = users.users;
  let curr;
  if (getCookie("loggedIn")) {
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.id === getCookie("userId")) {
        curr = user;
        break;
      }
    }
  } else {
    curr = undefined;
  }
  return (
    <>
      <CHead title={"Apply"} />
      <Nav loggedIn={getCookie("loggedIn")} user={curr} />
      <div className="flex flex-col items-center justify-center h-screen overflow-y-scroll">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Become An Astronaut
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={() => {
                alert("Applied!");
              }}
              onChange={() => {
                setErrorMsg("");
              }}
            >
              <div>
                <label
                  for="reason"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  When Would You Like To Take Off?
                </label>
                <input
                  type="datetime-local"
                  name="reason"
                  id="reason"
                  className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
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
    </>
  );
};

export default Apply;

export async function getServerSideProps(context) {
  let fres = await fetch("http://localhost:3000/api/users", {
    method: "GET",
  });
  let jres = await fres.json();
  return {
    props: {
      users: jres,
    },
  };
}
