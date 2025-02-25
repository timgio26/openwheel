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
      <h3>{route.role.charAt(0).toUpperCase() + route.role.slice(1)}</h3>
      <p>
        <strong>From:</strong> {route.origin.lat}
        {route.origin.lng}
      </p>
      <p>
        <strong>To:</strong> {route.destination.lat}
        {route.destination.lng}
      </p>
      {route.role == "driver" && (
        <>
          <p>
            <strong>Seats:</strong> {route.avail_seat}
          </p>
          <p>
            <strong>Fare:</strong> {route.fare} PLN
          </p>
        </>
      )}
      <p>
        <strong>Days:</strong>{" "}
        {route.day
          .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d])
          .join(", ")}
      </p>
      <p>
        <strong>Depart:</strong> {route.schedule.depart}
      </p>
      <p>
        <strong>Arrive:</strong> {route.schedule.arrival}
      </p>
    </div>
  );
}
