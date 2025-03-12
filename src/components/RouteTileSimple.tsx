import { useNavigate } from "react-router";
import { PassengerReqList, Route } from "../utils/api";

type RouteTileProp = {
  route: Route;
  member: PassengerReqList | undefined;
  day:number
};

export function RouteTileSimple({ route, member,day}: RouteTileProp) {
  const navigate = useNavigate()
  // console.log(member)

  function handleTileClick(){
    console.log('click')
    navigate(`/myroute/${route.id}`,{state:{day}})
  }

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-4 m-2 rounded-lg shadow-md"
      onClick={handleTileClick}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <div className="font-bold text-2xl">{route.schedule.depart}</div>
          <div className="font-bold text-2xl">-</div>
          <div className="font-bold text-2xl">{route.schedule.arrival}</div>
        </div>

        <h3 className="text-xs font-bold text-right">
          {route.role.charAt(0).toUpperCase() + route.role.slice(1)}
        </h3>
      </div>
      <h1 className="text-xl">{route.route_name}</h1>
      {/* {route.role == "driver" && (
          <div className="my-2">
            <p>
              <strong>Seats:</strong> {route.avail_seat}
            </p>
            <p>
              <strong>Fare:</strong> {route.fare} USD
            </p>
          </div>
        )} */}

      {/* <div className="grid grid-cols-7 gap-1 text-gray-400">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (each, index) => (
              <div
                className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 ${
                  route.day.includes(index) &&
                  "text-black dark:text-white font-bold opacity-100"
                }`}
                key={each}
              >
                {each}
              </div>
            )
          )}
        </div> */}
      <div className="border-t flex justify-center">
        {route.role == "driver" ? (
          <div hidden={!member?.length}>
            <span>passenger</span>
            <ul>
              {member?.map((each) => (
                <li>{each.passenger_route_id.route_owner.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <span>driver name</span>
        )}
      </div>
    </div>
  );
}
