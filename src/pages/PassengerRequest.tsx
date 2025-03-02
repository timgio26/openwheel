import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
export function PassengerRequest() {
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
      }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Passenger Request</h1>
      </div>
      <div className="grid grid-cols-7 gap-1 text-gray-400 my-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (each, index) => (
            <div
            //   className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 
            //     ${
            //       data.day.includes(index) &&
            //       "text-black dark:text-white font-bold opacity-100"
            //     }
            //     ${selectedDay == index && "border-2 border-orange-500"}
            //   `}
              key={index}
            //   onClick={() => handleSelectDay(index)}
            >
              {each}
            </div>
          )
        )}
      </div>
    </div>
  );
}
