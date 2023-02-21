import CHead from "@/components/CHead";
import DateCard from "@/components/DateCard";
import FlightTypeCard from "@/components/FlightTypeCard";
import Nav from "@/components/Nav";
import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";

const Flight = ({ users, flights, id, host }) => {
  const allFlights = flights.flights;
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

  let currF;
  for (let i = 0; i < allFlights.length; i++) {
    const flight = allFlights[i];
    if (flight.id === id) {
      currF = flight;
      break;
    }
  }

  return (
    <>
      <CHead title={"Flight Details"} />
      <Nav loggedIn={getCookie("loggedIn")} user={curr} />
      <div className="p-4 m-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 place-items-center">
          <DateCard
            host={host}
            initId={id}
            initDate={currF.takeOff}
            initTitle={"Take Off"}
          />
          <DateCard
            host={host}
            initId={id}
            initDate={currF.landing}
            initTitle={"Landing"}
          />
          <div className="w-full h-full md:col-end-3 md:col-start-1">
            <FlightTypeCard host={host} initId={id} type={currF.shipType} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flight;

export async function getServerSideProps(context) {
  let fres = await fetch("https://orbitia.techlion.dev/api/flights", {
    method: "GET",
  });
  let jres = await fres.json();
  let Ufres = await fetch("https://orbitia.techlion.dev/api/users", {
    method: "GET",
  });
  let Ujres = await Ufres.json();
  return {
    props: {
      flights: jres,
      users: Ujres,
      id: context.query.id,
      host: context.req.headers.host
    },
  };
}
