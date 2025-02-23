import { Link } from "react-router";
import { IoIosAdd } from "react-icons/io";

import { RouteTile } from "../components/RouteTile";
import { MyRouteForm } from "../pages/MyRoute";
// import { getRoutes } from "../utils/api";
import { useGetRoutes } from "../hooks/QueryHooks";



const routes: MyRouteForm[] = [
  {
    startingPoint: {
      strAddress: "123 Main St, Sopot, Poland",
      lat: "54.4410",
      lng: "18.5664",
    },
    destination: {
      strAddress: "456 Ocean Ave, Gdańsk, Poland",
      lat: "54.3520",
      lng: "18.6466",
    },
    role: "driver",
    availSeat: 3,
    fare: 20,
    day: [1, 3, 5], // Monday, Wednesday, Friday
    timeDepart: "08:00",
    timeArrive: "09:00",
  },
  {
    startingPoint: {
      strAddress: "789 City Center, Sopot, Poland",
      lat: "54.4445",
      lng: "18.5687",
    },
    destination: {
      strAddress: "101 Park Blvd, Gdynia, Poland",
      lat: "54.5189",
      lng: "18.5305",
    },
    role: "passenger",
    availSeat: 1,
    fare: 15,
    day: [2, 4], // Tuesday, Thursday
    timeDepart: "07:30",
    timeArrive: "08:30",
  },
  {
    startingPoint: {
      strAddress: "202 Beachside Rd, Sopot, Poland",
      lat: "54.4422",
      lng: "18.5701",
    },
    destination: {
      strAddress: "303 Mall Rd, Gdańsk, Poland",
      lat: "54.3504",
      lng: "18.6498",
    },
    role: "driver",
    availSeat: 2,
    fare: 10,
    day: [1, 2, 3, 4, 5], // Weekdays
    timeDepart: "09:00",
    timeArrive: "10:00",
  },
  {
    startingPoint: {
      strAddress: "789 City Center, Sopot, Poland",
      lat: "54.4445",
      lng: "18.5687",
    },
    destination: {
      strAddress: "101 Park Blvd, Gdynia, Poland",
      lat: "54.5189",
      lng: "18.5305",
    },
    role: "passenger",
    availSeat: 1,
    fare: 15,
    day: [2, 4], // Tuesday, Thursday
    timeDepart: "07:30",
    timeArrive: "08:30",
  },
  {
    startingPoint: {
      strAddress: "789 City Center, Sopot, Poland",
      lat: "54.4445",
      lng: "18.5687",
    },
    destination: {
      strAddress: "101 Park Blvd, Gdynia, Poland",
      lat: "54.5189",
      lng: "18.5305",
    },
    role: "passenger",
    availSeat: 1,
    fare: 15,
    day: [2, 4], // Tuesday, Thursday
    timeDepart: "07:30",
    timeArrive: "08:30",
  },
];

export function MyRouteList() {
  const {data,error} = useGetRoutes()
  console.log(data)
  console.log(error)
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl text-center font-light mb-2">All Route</h1>
      </div>
      <div>
        {routes.map((route, index) => (
          <RouteTile key={index} route={route} />
        ))}
      </div>
      <div className="h-22 w-22 rounded-full bg-gray-300 dark:bg-gray-700 bottom-20 fixed right-5 flex justify-center align-middle items-center shadow-md">
        <Link to={"add"}>
          <div className="flex flex-col justify-center align-middle items-center">
            <IoIosAdd size={40} />
            <span className="text-xs">Add Route</span>
          </div>
        </Link>
      </div>

      {/* <div className="fixed bottom-20 w-full flex justify-center">
      </div> */}
    </div>
  );
}
