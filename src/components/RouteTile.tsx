import { MyRouteForm } from "../pages/MyRoute";


type RouteTileProp = {
    route :MyRouteForm
}

export function RouteTile({route}:RouteTileProp) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 m-2 rounded-lg shadow-md">
      <h3 >
        {route.role.charAt(0).toUpperCase() + route.role.slice(1)}
      </h3>
      <p>
        <strong>From:</strong> {route.startingPoint.strAddress}
      </p>
      <p>
        <strong>To:</strong> {route.destination.strAddress}
      </p>
      <p>
        <strong>Seats:</strong> {route.availSeat}
      </p>
      <p>
        <strong>Fare:</strong> {route.fare} PLN
      </p>
      <p>
        <strong>Days:</strong>{" "}
        {route.day
          .map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d])
          .join(", ")}
      </p>
      <p>
        <strong>Depart:</strong> {route.timeDepart}
      </p>
      <p>
        <strong>Arrive:</strong> {route.timeArrive}
      </p>
    </div>
  );
}
