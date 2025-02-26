// import { MyRouteForm } from "../pages/MyRoute";
import { useNavigate } from "react-router";
import { Route } from "../utils/api";

type RouteTileProp = {
  route: Route;
};



export function RouteTile({ route }: RouteTileProp) {

  const navigate = useNavigate()

  function handleTileClick(){
    // console.log(route.id)
    navigate(`/myroute/${route.id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 m-2 rounded-lg shadow-md" onClick={handleTileClick}>
      <h3 className="text-xs font-bold text-right">{route.role.charAt(0).toUpperCase() + route.role.slice(1)}</h3>
      {/* <p>
        <strong>From:</strong> {route.origin.lat}
        {route.origin.lng}
      </p>
      <p>
        <strong>To:</strong> {route.destination.lat}
        {route.destination.lng}
      </p> */}
      <h1 className="text-xl">{route.route_name}</h1>
      {route.role == "driver" && (
        <div className="my-2">
          <p>
            <strong>Seats:</strong> {route.avail_seat}
          </p>
          <p>
            <strong>Fare:</strong> {route.fare} USD
          </p>
        </div>
      )}
      {/* <p>
        <strong>Days:</strong>{" "}
        {route.day
          .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d])
          .join(", ")}
      </p> */}

      <div className="grid grid-cols-7 gap-1 text-gray-400">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (each, index) => (
              <div
                className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 ${
                  route.day.includes(index) &&
                  "text-black dark:text-white font-bold opacity-100"
                }`}
                key={each}
                // onClick={() => handleDay(index)}
              >
                {each}
              </div>
            )
          )}
        </div>

      {/* <p>
        <strong>Depart:</strong> {route.schedule.depart}
      </p>
      <p>
        <strong>Arrive:</strong> {route.schedule.arrival}
      </p> */}
      <div className="flex flex-row justify-center gap-5">
          <div className="font-bold text-2xl">
          {route.schedule.depart}
          </div>
          <div className="font-bold text-2xl">-</div>
          <div className="font-bold text-2xl">
          {route.schedule.arrival}
          </div>
        </div>
    </div>
  );
}
