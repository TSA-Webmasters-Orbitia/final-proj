import CHead from "@/components/CHead";
import Nav from "@/components/Nav";

import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";

const About = ({ users }) => {
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
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold text-center">About Orbitia</h2>
          <article className="prose text-justify md:prose-lg lg:prose-xl">
            <p>
              At Orbitia, a team of visionary engineers, scientists, and
              astronauts work tirelessly to design and build spacecraft that are
              faster, more efficient, and more powerful than anything that has
              ever been built before. Their advanced propulsion systems,
              advanced materials, and cutting-edge technology have allowed them
              to develop spacecraft that can travel further and faster than ever
              before, reaching new frontiers in our solar system and beyond.
            </p>
            <p>
              Orbitia's spacecraft are designed to be versatile and adaptable,
              able to support a wide range of missions, from scientific research
              to commercial transportation to space tourism. Their launch
              vehicles are some of the most reliable and cost-effective in the
              industry, allowing customers to launch payloads of all sizes into
              orbit with ease.
            </p>
            <p>
              In addition to their spacecraft and launch vehicles, Orbitia is
              also actively engaged in developing technologies that will enable
              sustainable space colonization. They are exploring ways to create
              self-sustaining habitats, grow food in space, and even mine
              resources from asteroids and other celestial bodies.
            </p>
            <p>
              At Orbitia, they believe that the future of humanity lies in
              space, and they are dedicated to making that future a reality.
              Through their relentless pursuit of innovation and their
              commitment to excellence, they are pushing the boundaries of what
              is possible and inspiring a new generation to dream big and reach
              for the stars.
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

export default About;

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
