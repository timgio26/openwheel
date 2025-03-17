
import { RouteOwnerDetail } from "../utils/api"
import { FaAnglesRight } from "react-icons/fa6";
import { useGetDistance } from "../hooks/useGetDistance";


type RouteOptionTileProp = {
    route:RouteOwnerDetail;
    onClickDetails:()=>void

}

export function RouteOptionTile({route,onClickDetails}:RouteOptionTileProp){

    const dist = useGetDistance({route})

    function GoToDriverDetails(){
        onClickDetails()
    }


    return (
      <div className="flex flex-col bg-gray-100  dark:bg-gray-700 p-3 rounded shadow">
        <span>drive with {route.route_owner.name}</span>
        <span>{dist?.toFixed(2)} km away from you</span>
        <span>
          {route.schedule.depart} - {route.schedule.arrival}
        </span>
        <div className="grid grid-cols-2 items-end">
        <span className="text-2xl font-bold">{route.fare} USD / trip</span>
        {/* <span className="text-right">x seat available</span> */}

        </div>
        <div className="bg-gray-50 border dark:border-0 dark:bg-gray-600 py-2 px-3 my-1 rounded-md" onClick={GoToDriverDetails}>
          <div className="flex flex-row items-center gap-3 justify-end">
            <span>details</span>
            <FaAnglesRight />
          </div>
        </div>
        {/* <MyMapDriverPassenger/> */}
      </div>
    );
}