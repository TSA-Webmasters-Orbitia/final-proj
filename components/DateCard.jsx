import moment from "moment/moment";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import countdown from "countdown";
import { getHumanFriendlyDateDifferance } from "@/utils/Dates";

const DateCard = ({ initDate, initTitle, initId, host }) => {
  let date = new Date(initDate);
  const [relative, setRelative] = useState(moment(date).fromNow());
  setInterval(() => {
    setRelative(moment(date).fromNow());
  }, 1000);
  let formatted = moment(date).format("MMMM D, YYYY @ hh:mm A");
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [liveCountdown, setLiveCountdown] = useState(
    getHumanFriendlyDateDifferance(new Date(), date)
    );
    setInterval(() => {
        setLiveCountdown(getHumanFriendlyDateDifferance(new Date(), date))
    }, 1000);
  const [modalError, setModalError] = useState();
  const router = useRouter();
  async function handleTimeChange(e) {
    e.preventDefault();
    console.log(e.target);
    let id = initId;
    let title = initTitle;
    let newDate = e.target.time.value;
    let fres = await fetch("http://" + host + "/api/updateDate", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        title: title,
        newDate: new Date(newDate),
      }),
    });
    let jres = await fres.json();
    setShowChangeModal(false);
    router.reload();
  }
  return (
    <>
      <Modal
        errorMsg={modalError}
        isVisible={showLiveModal}
        onClose={() => {
          setShowLiveModal(false);
        }}
      >
        <h3 className="mb-5 text-xl font-semibold">
          {initTitle} Live Countdown
        </h3>
              <p className="p-8 text-center">{initTitle} {liveCountdown}</p>
      </Modal>
      <Modal
        errorMsg={modalError}
        isVisible={showChangeModal}
        onClose={() => {
          setShowChangeModal(false);
        }}
      >
        <h3 className="mb-5 text-xl font-semibold">
          Update {initTitle} Date/Time
        </h3>
        <form onSubmit={handleTimeChange}>
          <div className="mb-6">
            <label
              for="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Date/Time
            </label>
            <input
              type="datetime-local"
              id="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update!
          </button>
        </form>
      </Modal>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 m-2 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold">{initTitle}</h2>
        <div className="flex flex-col items-center justify-center gap-4 group">
          <p>{relative}</p>
          <span className="fixed hidden p-2 text-sm text-gray-100 transition-opacity bg-gray-800 rounded-md group-hover:flex">
            {formatted}
          </span>
        </div>
        <div className="flex flex-row gap-4 ">
          <button
            onClick={() => {
              setShowChangeModal(true);
            }}
            className="p-2 text-white bg-blue-500 rounded-md"
          >
            Change
          </button>
          <button
            onClick={() => {
              setShowLiveModal(true);
            }}
            className="p-2 text-black border border-gray-400 rounded-md"
          >
            Live Count Down
          </button>
        </div>
          </div>
    </>
  );
};

export default DateCard;
