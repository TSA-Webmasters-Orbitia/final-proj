import CHead from "@/components/CHead";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Apply = ({ users, host }) => {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("loggedIn")) {
      router.push("/register?ref=apply");
    }
  });

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

  async function applyForm(e) {
    e.preventDefault();
    let error;
    let takeOff = e.target.takeOff.value;
    let takeOffD = new Date(takeOff);
    console.log(takeOff);
    let landing = e.target.landing.value;
    let landingD = new Date(landing);
    console.log(landing);
    let shipType = e.target.underline_select.value;
    console.log(shipType);
    if (shipType === "Select A Ship Type:") {
      setErrorMsg("Please Select A Ship Type");
      error = true;
    }
    let takeOffToday = isToday(new Date(takeOff));
    let landingAfterTakeOff = landing > takeOff;
    let takeOffBeforeToday = takeOffD < new Date();
    console.log(landingAfterTakeOff);
    console.log(takeOffToday);
    console.log(takeOffBeforeToday);
    if (takeOffBeforeToday) {
      setErrorMsg("You Can't Take Off Before Tommorow");
      error = true;
    }
    if (takeOffToday) {
      setErrorMsg("Same Day Take Offs Are Not Possible");
      error = true;
    }
    if (!landingAfterTakeOff) {
      setErrorMsg("You Can't Land Before You Take Off, Silly");
      error = true;
    }
    if (!error) {
      let fres = await fetch(
        "/api/createApplication",
        {
          method: "POST",
          body: JSON.stringify({
            takeOff: takeOffD,
            landing: landingD,
            shipType: shipType,
            astronautId: getCookie("userId"),
          }),
        }
      );
      let jres = await fres.json();
      console.log(jres);
      router.push("/flight/" + jres.application.id);
    }
  }

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  return (
    <>
      <CHead title={"Apply"} />
      <Nav loggedIn={getCookie("loggedIn")} user={curr} />
      <div className="flex flex-col items-center justify-center h-screen overflow-y-scroll">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Become An Astronaut
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={applyForm}
              onChange={() => {
                setErrorMsg("");
              }}
            >
              <div>
                <label
                  for="takeOff"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  When Would You Like To Take Off?
                </label>
                <input
                  type="datetime-local"
                  name="takeOff"
                  id="takeOff"
                  className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  for="landing"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  When Would You Like To Land?
                </label>
                <input
                  type="datetime-local"
                  name="landing"
                  id="landing"
                  className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  for="flightType"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Your Spaceship Type
                </label>
                <select
                  required
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected className={"font-bold text-center italic"}>
                    {" "}
                    Select A Ship Type:
                  </option>
                  <option
                    className={"font-bold text-center text-green-600"}
                    value="Economy"
                  >
                    Economy Ship
                  </option>
                  <option
                    className={"font-bold text-center text-violet-600"}
                    value="Premium"
                  >
                    Premium Economy Ship
                  </option>
                  <option
                    className={"font-bold text-center text-amber-500"}
                    value="Buisiness"
                  >
                    Buisiness Ship
                  </option>
                  <option
                    className={"font-bold text-center text-sky-600"}
                    value="FirstClass"
                  >
                    First Class Ship
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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
  let fres = await fetch("https://orbitia.techlion.dev/api/users", {
    method: "GET",
  });
  let jres = await fres.json();
  return {
    props: {
      users: jres,
      host: context.req.headers.host,
    },
  };
}
