import { useNavigate, useParams, Link } from "react-router";
import { useGetRoute } from "../hooks/QueryHooks";
import { deleteRouteSingle, getCarPoolReqCount } from "../utils/api";
import { MyMapStatic } from "../components/MyMapStatic";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { distance } from "../utils/helperFn";
import { useEffect,  } from "react";

export function MyRouteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetRoute(id || "");
  // const [activeBooking,setActiveBooking] = useState<boolean>(false)

  async function handleDelete() {
    if (!id) return;
    const { error } = await deleteRouteSingle(id);
    if (!error) navigate("/myroute");
  }

  function handleFindDriver() {
    navigate("finddriver", { state: data });
  }

  function handlePassengerRequest() {
    navigate("passengerrequest");
  }

  useEffect(()=>{
    async function getCarPoolReqCountFn(){
      if(!id)return
      console.log(id)
      const {count:carPoolReqCount,error} = await getCarPoolReqCount(Number(id))
      // if(carPoolReqCount)setActiveBooking(true)
      console.log(carPoolReqCount,error)
    }
    getCarPoolReqCountFn()
  },[id])

  

  if (!data || error)
    return (
      <>
        <span>No data, please try again</span>
      </>
    );
    
  const { route } = data;

  if(!route.success)
    return (
      <>
        <span>No data, please try again</span>
      </>
    );

  const dist = distance(route.data.origin_lat,route.data.origin_lng,route.data.destination_lat,route.data.destination_lng)

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-row justify-center items-center relative">
        <Link className="absolute left-0" to={"/myroute"}>
          <IoIosArrowBack size={30} />
        </Link>

        <h1 className="text-2xl font-light mb-2">Route Details</h1>
      </div>

      <div className="flex-1">
        <MyMapStatic
          lat1={route.data.origin_lat}
          lng1={route.data.origin_lng}
          lat2={route.data.destination_lat}
          lng2={route.data.destination_lng}
          zoom={(dist*-0.6 )+ 15.2}
        />
        <div className="text-center font-mono text-2xl">{data.route.data?.route_name}</div>

        <div className="my-4 gap-1 flex flex-row items-center justify-around">
          <div className="flex flex-col items-center">

          {/* <span>Role</span> */}
          <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 p-3 rounded-2xl">
            {data.route.data?.role == "passenger" && (
              <MdOutlineAirlineSeatReclineNormal size={40} />
            )}
            {data.route.data?.role == "driver" && (
              <TbSteeringWheelFilled size={40} />
            )}
            <span>{data.route.data?.role}</span>
          </div>
          </div>

          {data.route.data?.role == "driver" && (
            <div className="flex flex-col">
              <span>Seat available: {data.route.data?.avail_seat}</span>
              <span>Fare: {data.route.data?.fare} USD</span>
            </div>
          )}
        </div>
        {/* </div> */}
        <div className="my-4 gap-1 flex flex-col">
          <div className="flex justify-center">
            <span>Schedule</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-gray-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (each, index) => (
                <div
                  className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 ${
                    data.route.data?.day.includes(index) &&
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
          <div className="flex flex-row justify-center gap-5">
            <div className="font-bold text-2xl">
              {data.route.data?.schedule.depart}
            </div>
            <div className="font-bold text-2xl">-</div>
            <div className="font-bold text-2xl">
              {data.route.data?.schedule.arrival}
            </div>
          </div>
        </div>
      </div>




      <div className="border-t">
        {data.route.data?.role == "passenger" && (
          <div
            className="bg-gray-300 dark:bg-gray-900 text-center py-1 my-3 rounded shadow-xl"
            onClick={handleFindDriver}
          >
            find driver
          </div>
        )}

      {data.route.data?.role == "driver" && (
          <div
            className="bg-gray-300 dark:bg-gray-900 text-center py-1 my-3 rounded shadow-xl"
            onClick={handlePassengerRequest}
          >
            passenger request
          </div>
        )}

        <div
          className="bg-red-400 dark:bg-red-900 text-center py-1 my-3 rounded shadow-xl"
          onClick={handleDelete}
        >
          delete route
        </div>
      </div>
    </div>
  );
}
