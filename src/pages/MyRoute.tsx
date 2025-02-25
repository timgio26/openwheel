import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { MyMap } from "../components/MyMap";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { addRoute } from "../utils/api";
// import { useRef } from "react";

type PointData = {
  strAddress: string;
  lat: string;
  lng: string;
};

export type MyRouteForm = {
  startingPoint: PointData;
  destination: PointData;
  role: "driver" | "passenger";
  availSeat: number;
  fare: number;
  day: number[];
  timeDepart: string;
  timeArrive: string;
};

export function MyRoute() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MyRouteForm>();
  const watchAllField = watch();
  // console.log(watchAllField);
  console.log(errors);

  function handleClick(value: "driver" | "passenger") {
    setValue("role", value);
    if (value == "passenger") setValue("availSeat", 0);
  }

  function handleMapClick(
    point: "startingPoint" | "destination",
    lat: string,
    lng: string
  ): void {
    if (point == "destination") {
      setValue("destination.lat", lat);
      setValue("destination.lng", lng);
    } else {
      setValue("startingPoint.lat", lat);
      setValue("startingPoint.lng", lng);
    }
  }

  function handleDay(num: number) {
    if (!watchAllField.day) {
      setValue("day", [num]);
    } else {
      if (watchAllField.day.includes(num)) {
        setValue(
          "day",
          [...watchAllField.day].filter((each) => each !== num)
        );
        // return
      } else {
        setValue("day", [...watchAllField.day, num]);
      }
    }
  }

  // function handleBack

  async function onSubmit(data: MyRouteForm) {
    if (!data.startingPoint || !data.destination || !data.day.length) {
      console.log("no poin");
      return;
    }
    const { error } = await addRoute(data);
    if (!error) navigate("/myroute");
    // console.log(error)
  }

  return (
    <div>
      <div className="flex flex-row justify-center items-center relative">
        <Link className="absolute left-0" to={"/myroute"}>
          <IoIosArrowBack size={30} />
        </Link>

        <h1 className="text-2xl font-light mb-2">Add Route</h1>
      </div>
      <MyMap
        lat1={watchAllField.startingPoint?.lat}
        lng1={watchAllField.startingPoint?.lng}
        lat2={watchAllField.destination?.lat}
        lng2={watchAllField.destination?.lng}
        onMapClick={handleMapClick}
      />
      {/* {errors.startingPoint?.type==""} */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="my-1">
          <span>Role</span>
          <div className="grid grid-cols-2 gap-4 text-gray-400">
            <div
              className={`dark:text-gray-600  bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md ${
                watchAllField.role == "driver" && "dark:text-white text-black"
              }`}
              onClick={() => handleClick("driver")}
            >
              <TbSteeringWheelFilled size={45} />
              Driver
            </div>
            <div
              className={`dark:text-gray-600 bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md ${
                watchAllField.role == "passenger" &&
                "dark:text-white text-black"
              }`}
              onClick={() => handleClick("passenger")}
            >
              <MdOutlineAirlineSeatReclineNormal size={45} />
              Passenger
            </div>
          </div>

          <input
            type="text"
            id="role"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            {...register("role", { required: true })}
            hidden
          />
        </div>

        <div
          className="flex flex-col my-1"
          hidden={watchAllField.role != "driver"}
        >
          <label htmlFor="availseat">Available Seat</label>
          <input
            type="number"
            id="availseat"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            min={0}
            max={8}
            step="1"
            {...register("availSeat", {
              required: watchAllField.role == "driver",
              min: 0,
            })}
          />
        </div>

        <div
          className="flex flex-col my-1"
          hidden={watchAllField.role != "driver"}
        >
          <label htmlFor="fare">Single Fare (USD)</label>
          <input
            type="number"
            // name="fare"
            id="fare"
            min="0"
            step={"any"}
            {...register("fare", {
              required: watchAllField.role == "driver",
              min: 0,
            })}
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="my-1">
          <span>Day</span>
          <div className="grid grid-cols-7 gap-1 text-gray-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (each, index) => (
                <div
                  className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md ${
                    watchAllField.day &&
                    watchAllField.day.includes(index) &&
                    "text-black dark:text-white font-bold"
                  }`}
                  key={each}
                  onClick={() => handleDay(index)}
                >
                  {each}
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col my-1">
          <label htmlFor="time">Departure Time</label>
          <input
            type="time"
            // name="timeDepart"
            id="timeDepart"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            {...register("timeDepart", { required: true })}
          />
        </div>

        <div className="flex flex-col my-1">
          <label htmlFor="time">Arrival Time</label>
          <input
            type="time"
            // name="timeArrive"
            id="timeArrive"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            {...register("timeArrive", {
              required: true,
              min: watchAllField.timeDepart,
            })}
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-gray-200 dark:bg-gray-600 my-2 py-2 rounded-full"
        />
      </form>
    </div>
  );
}
