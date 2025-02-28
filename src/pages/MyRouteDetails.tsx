import { useNavigate, useParams,Link} from "react-router";
import { useGetRoute } from "../hooks/QueryHooks";
import { deleteRouteSingle } from "../utils/api";
import { MyMapStatic } from "../components/MyMapStatic";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

export function MyRouteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetRoute(id || "");
  //   console.log(data, error);

  async function handleDelete() {
    if (!id) return;
    const { error } = await deleteRouteSingle(id);
    if (!error) navigate("/myroute");
  }

  function handleFindDriver(){
    navigate('finddriver',{state:data})
  }

  if (!data || error)
    return (
      <>
        <span>No data, please try again</span>
      </>
    );

  const {route} = data
  return (
    <div>
      <div className="flex flex-row justify-center items-center relative">
        <Link className="absolute left-0" to={"/myroute"}>
          <IoIosArrowBack size={30} />
        </Link>

        <h1 className="text-2xl font-light mb-2">Route Details</h1>
      </div>
      {/* <h1 className="text-2xl text-center font-light mb-2">Route Details</h1> */}
      {/* <div className="flex flex-col"> */}
      <MyMapStatic
        lat1={route.data?.origin_lat}
        lng1={route.data?.origin_lng}
        lat2={route.data?.destination_lat}
        lng2={route.data?.destination_lng}
      />

      <div className="my-4 gap-1 flex flex-col items-center">
        <span>Role</span>
        <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 p-3 rounded-2xl">
          {data.route.data?.role == "passenger" && (
            <MdOutlineAirlineSeatReclineNormal size={40} />
          )}
          {data.route.data?.role == "driver" && (
            <TbSteeringWheelFilled size={40} />
          )}
          <span>{data.route.data?.role}</span>
        </div>

        {data.route.data?.role =="driver"&&<>
        
        <span>Seat available: {data.route.data?.avail_seat}</span>
        <span>Fare: {data.route.data?.fare} USD</span>
        </>}
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
      <div className="mt-10 border-t">
        {data.route.data?.role == "passenger" && (
          <div
            className="bg-gray-400 dark:bg-gray-900 text-center py-1 my-3 rounded shadow-xl"
            onClick={handleFindDriver}
          >
            find driver
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
