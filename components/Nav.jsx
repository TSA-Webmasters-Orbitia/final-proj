import { useState } from "react";
import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";
const Nav = ({ user, loggedIn }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  if (!loggedIn) {
    return (
      <>
        <nav className="sticky top-0 z-50 flex items-center justify-between p-2 px-6 py-4 bg-blue-100 rounded-b-lg shadow-lg ">
          <div className="menu">
            <button
              onClick={() => {
                setNavMenuOpen(!navMenuOpen);
              }}
              className="p-4 rounded-lg hover:bg-blue-200"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex justify-center w-full ">
            <a href="/">
              <div className="flex flex-row items-center justify-center gap-2 text-center">
                <img
                  src="https://cdn.orbitia.techlion.dev/logos/png/icon/color.png"
                  className="w-16"
                  alt="Orbitia Logo"
                />
                <strong className="text-2xl logo">Orbitia</strong>
              </div>
            </a>
          </div>
          <div className="flex justify-end ">
            <a href="/login">
              <button className="p-2 text-white rounded-md bg-sky-500 hover:scale-105">
                Login
              </button>
            </a>
          </div>
        </nav>
        {navMenuOpen ? (
          <div className="fixed z-40 top-[106px] flex flex-col gap-4 w-fit">
            <div className="p-4 mx-2 -mt-4 z-[60] bg-blue-100 rounded-lg shadow-lg w-fit">
              <NavLink text={"Home"} url={"/"} />
              <NavLink text={"About Us"} url={"/about"} />
              <NavLink text={"Apply"} url={"/register?ref=apply"} />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between p-2 px-6 py-4 bg-blue-100 rounded-b-lg shadow-lg ">
        <div className="menu">
          <button
            onClick={() => {
              setNavMenuOpen(!navMenuOpen);
            }}
            className="p-4 rounded-lg hover:bg-blue-200"
          >
            {navMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H5Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div className="flex justify-center w-full">
          <a href="/">
            <div className="flex flex-row items-center justify-center gap-2 text-center">
              <img
                src="https://cdn.orbitia.techlion.dev/logos/png/icon/color.png"
                className="w-16"
                alt="Orbitia Logo"
              />
              <strong className="text-2xl logo">Orbitia</strong>
            </div>
          </a>
        </div>
        <div className="flex justify-end ml-0">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
            }}
            className="flex flex-row items-center gap-2 p-2 rounded-full"
          >
            <img
              className="w-12 rounded-full"
              src={
                user.profileUrl
                  ? user.profileUrl
                  : "https://cdn0.iconfinder.com/data/icons/education-2-27/32/user_staff_person_man_profile_boss_circle-512.png"
              }
              alt="Placeholder Img"
            />
            {showProfileDropdown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {showProfileDropdown ? (
        ""
      ) : navMenuOpen ? (
        <div className="fixed z-40 top-[106px] flex flex-col gap-4">
          <div className="p-4 mx-2 -mt-4 z-[60] bg-blue-100 rounded-lg shadow-lg w-fit">
            <NavLink text={"Home"} url={"/"} />
            <NavLink text={"About Us"} url={"/about"} />
            <NavLink text={"Apply"} url={"/apply"} />
          </div>
        </div>
      ) : (
        ""
      )}
      <UserDropdown visible={showProfileDropdown} user={user} />
    </>
  );
};

export default Nav;
