import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const UserDropdown = ({ user, visible }) => {
  if (visible) {
    return (
      <>
        <div className="flex justify-center md:justify-end md:mr-4">
          <div className="fixed z-40 bg-transparent top-[80px] text-center w-full md:w-48">
            <div className="flex flex-col items-center justify-center w-full gap-2 p-4 m-2 font-bold bg-white rounded-lg shadow-lg">
              <p className="py-4 border-b-2 border-gray-300">{user.name}</p>
              <a
                className="w-full font-medium rounded-lg hover:bg-slate-100"
                href="/dashboard"
              >
                <p className="py-2">Dashboard</p>
              </a>
              <a
                className="w-full font-medium rounded-lg hover:bg-slate-100"
                href="/settings"
              >
                <p className="py-2">Settings</p>
              </a>
              <button
                className="w-full p-4 mt-2 text-red-600 bg-red-100 border-2 border-red-700 rounded-lg hover:bg-red-600 hover:text-red-100 hover:border-red-200"
                onClick={() => {
                  deleteCookie("loggedIn");
                  deleteCookie("userId");
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UserDropdown;
