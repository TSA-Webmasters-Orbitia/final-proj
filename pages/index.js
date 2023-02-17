import CHead from "@/components/CHead";
import Nav from "@/components/Nav";

import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";

const Home = ({users}) => {
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
      <CHead title={"Home"} />
      <Nav loggedIn={getCookie("loggedIn")} user={curr} />
      <div className="h-screen p-4 m-2 ">Hello World!</div>
    </>
  );
};

export default Home;


export async function getServerSideProps(context) {
  let Ufres = await fetch("http://localhost:3000/api/users", {
    method: "GET",
  });
  let Ujres = await Ufres.json();
  return {
    props: {
      users: Ujres,
    },
  };
}
