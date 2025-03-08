import { useNavigate } from "react-router";
import { PassengerReq } from "../utils/api"
import { FaAnglesRight } from "react-icons/fa6";

type ReqTileProp = {
    data:PassengerReq
}

export function ReqTile({data}:ReqTileProp){
    const navigate = useNavigate()

    function handleClickDetails(){
        navigate(`/request_details`,{state:data})
    }
    return (
      <div className="flex flex-col border px-3 py-1.5 rounded gap-1 mt-1">
        <div className="flex justify-between">
          <span>{data.created_at.slice(0, 10)}</span>
          <span className="uppercase">{data.status}</span>
        </div>
        <span className="text-xl font-bold">
          {data.passenger_route_id.route_owner.name} |{" "}
          {data.passenger_route_id.route_owner.gender} |{" "}
          {data.passenger_route_id.route_owner.age}
        </span>
        <div
          className="bg-gray-50 border dark:border-0 dark:bg-gray-600 py-2 px-3 my-1 rounded-md"
          onClick={() => handleClickDetails()}
        >
          <div className="flex flex-row items-center gap-3 justify-end">
            <span>details</span>
            <FaAnglesRight />
          </div>
        </div>
      </div>
    );
}