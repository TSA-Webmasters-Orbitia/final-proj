import CHead from "@/components/CHead";
import Nav from "@/components/Nav";

import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";

const Dashboard = ({ users, flights, host }) => {
  const allUsers = users.users;
  const allFlights = flights.flights;
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
      <CHead title={"Astronaut Dashboard"} />
      <Nav loggedIn={getCookie("loggedIn")} user={curr} />
      <div className="h-screen p-4 m-2">
        {allFlights.map((flight, index) => {
          return (
              <>
                  <a href={"/flight/"+flight.id}>
                      <p>Flight {index + 1}</p>
                  </a>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  let Ufres = await fetch("http://" + context.req.headers.host + "/api/users", {
    method: "GET",
  });
  let Ujres = await Ufres.json();
  let Ffres = await fetch(
    "http://" + context.req.headers.host + "/api/flights",
    {
      method: "GET",
    }
  );
  let Fjres = await Ffres.json();
  return {
    props: {
      users: Ujres,
      flights: Fjres,
      host: context.req.headers.host,
    },
  };
}
