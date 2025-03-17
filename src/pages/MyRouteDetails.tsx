import { useEffect, useState,  } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router";
import { useGetRoute } from "../hooks/QueryHooks";
import { z } from "zod";

import { distance } from "../utils/helperFn";
import {
  deleteRouteSingle,
  // getCarPoolReqCount,
  getPassengerReq,
  PassengerReqList,
} from "../utils/api";
import { MyMapStatic } from "../components/MyMapStatic";

import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

import { useDispatch } from 'react-redux'
import {setCurLat,setCurLng} from '../features/myRouteSlices'
// import type { RootState } from '../../store'


const stateSchema = z.object({
  day:z.number()
});


export function MyRouteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetRoute(id || "");
  const [selectedDay,setSelectedDay] = useState<number>()
  const [dataPassenger,setDataPassenger] = useState<PassengerReqList>()
  const {state} = useLocation()
  const dispatch = useDispatch()

  // console.log(data)
  const parseResult = stateSchema.safeParse(state)

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

    async function handleSelectDay(day: number) {
      if (!data?.route.data?.day.includes(day) || !id) return;
      setSelectedDay(day);
      const { data: dataPassenger, error } = await getPassengerReq(
        Number(id),
        day
      );
      // console.log(dataPassenger,error)
      if (!dataPassenger) return;
      const filteredDataPassenger = dataPassenger.filter(
        (each) => each.status == "accept"
      );
      if (error) {
        toast.error("error getting passenger list");
        return;
      }
      setDataPassenger(filteredDataPassenger);
    }
  

  useEffect(()=>{
    async function getCarPoolReqCountFn(){
      // if(!id)return
      // const {count:carPoolReqCount,error} = await getCarPoolReqCount(Number(id))

      dispatch(setCurLat(Number(data?.route.data?.origin_lat)))
      dispatch(setCurLng(Number(data?.route.data?.origin_lng)))
    }
    // if(parseResult.success){
    //   handleSelectDay(parseResult.data.day)
    // }
    
    getCarPoolReqCountFn()
  },[data,dispatch])

  

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
          zoom={dist * -0.6 + 15.2}
        />
        <div className="text-center font-mono text-2xl">
          {data.route.data?.route_name}
        </div>

        {!parseResult.success && (
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
        )}

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
                  }
                  ${
                    selectedDay == index &&
                    "border-2 border-orange-500 opacity-100"
                  }
                  `}
                  key={each}
                  onClick={() => handleSelectDay(index)}
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

        {dataPassenger && dataPassenger.length > 0 && (
          <div>
            {/* <span>{dataPassenger}</span> */}
            <span>passenger :</span>
            <ul className="list-disc list-inside">
              {dataPassenger.map((each) => (
                <li key={each.id}>
                  {each.passenger_route_id.route_owner.name}
                </li>
              ))}
            </ul>

            {/* </ul> */}
          </div>
        )}
      </div>

      {!parseResult.success && (
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
      )}
    </div>
  );
}
