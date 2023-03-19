import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";
const FlightTypeCard = ({ type, initId, host }) => {
  const router = useRouter();
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [modalError, setModalError] = useState();
  async function handleShipTypeChange(e) {
    e.preventDefault();

    let newShipType = e.target.shipType.value;
    if (newShipType === "Select A Ship Type:") {
      setModalError("Please Select A Spaceship Type!");
      return;
    }
    console.log(newShipType);
    let fres = await fetch("/api/updateShipType", {
      method: "POST",
      body: JSON.stringify({
        id: initId,
        newShipType: newShipType,
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
        isVisible={showChangeModal}
        onClose={() => {
          setShowChangeModal(false);
        }}
      >
        <h3 className="mb-5 text-xl font-semibold">
          Change Your Spaceship Type
        </h3>
        <form
          onSubmit={handleShipTypeChange}
          onChange={() => {
            setModalError();
          }}
        >
          <div className="mb-6">
            <label
              for="shipType"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              New Spaceship Type
            </label>
            <select
              required
              id="shipType"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected className={"font-bold text-center italic"}>
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
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Update!
          </button>
        </form>
      </Modal>

      <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 my-4 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold">Your Ship Type</h2>
        <div className="flex flex-col items-center justify-center gap-4 group">
          <p>{type === "FirstClass" ? "First Class" : type}</p>
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
        </div>
      </div>
    </>
  );
};

export default FlightTypeCard;
