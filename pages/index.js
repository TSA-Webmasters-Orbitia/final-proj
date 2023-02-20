import CHead from "@/components/CHead";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";

const Home = ({ users }) => {
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
      <div className="h-screen p-4 m-2">
        <Hero
          variant={"img"}
          title={"Welcome To Space!"}
          description={
            "Orbitia is a leading space company that has revolutionized the way humanity interacts with space. Founded in the early 21st century, Orbitia's mission is to make space accessible to everyone by developing innovative technologies and solutions that open up new possibilities for space exploration, commercialization, and colonization."
          }
          imgSrc={"https://cdn.orbitia.techlion.dev/graphics/astro-flag.jpg"}
          imgAlt={"Astronaut In Space"}
          primaryBtn={"Become An Astronaut!"}
          primaryBtnLink={
            getCookie("loggedIn") ? "/apply" : "/register?ref=apply"
          }
          secondaryBtn={"Learn More"}
          secondaryBtnLink={"/about"}
        />
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  let Ufres = await fetch(context.req.headers.referer + "/api/users", {
    method: "GET",
  });
  let Ujres = await Ufres.json();
  return {
    props: {
      users: Ujres,
    },
  };
}
