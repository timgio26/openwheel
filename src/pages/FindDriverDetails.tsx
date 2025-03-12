import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { RouteSchema,RouteOwnerDetailSchema, addCarPool, getPassengerReq } from "../utils/api";
import { z } from "zod";
import { MyMapDriverPassenger } from "../components/MyMapDriverPassenger";


import type { RootState } from '../../store'
import { useSelector, 
  // useDispatch 
} from 'react-redux'
import { useEffect, useState } from "react";
import { getUserLocal } from "../utils/helperFn";
// import { setday } from '../features/carPoolSlices'

const DriverPassengerSchema = z.object({
  data: RouteSchema,
  driverRoute: RouteOwnerDetailSchema,
});

export function FindDriverDetails() {
  const navigate = useNavigate();

  const { state } = useLocation()
  const parseResult = DriverPassengerSchema.safeParse(state);
  const data = parseResult.data;

  const selectedDay = useSelector((state: RootState) => state.day.day)
  // const dispatch = useDispatch()
  const [filledSeat,setFilledSeat] = useState<number>()

  // console.log(data)
  function handleBack() {
    navigate(-1);
  }
  
  async function handleReqCarPool(){
    console.log(selectedDay)
    if(!data||selectedDay === undefined)return
    console.log(selectedDay)
    const {data:addCarPoolData,error} = await addCarPool(data.driverRoute.id,selectedDay,data.data.id)

    console.log(addCarPoolData,error)
    if(!error)navigate('confirm')
  }


  useEffect(()=>{
    async function getPsg(){
      if(!data || selectedDay == undefined)return
      console.log(data.data.id,selectedDay)
      const {data:psgData,error} = await getPassengerReq(data.driverRoute.id,selectedDay)
      console.log(psgData,error)
      if(!psgData)return
      const id = getUserLocal().userLocalId
      const ln = psgData.filter((each)=>each.status!=='cancel').length
      console.log(psgData.filter((each)=>each.passenger_route_id.route_owner.user_id==id))
      setFilledSeat(ln)
      // console.log(psgData,error)
    }
    getPsg()
  },[data,selectedDay])

  if (!data) return <h1>No data. try again later</h1>;
  
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Details</h1>
      </div>
      {/* <span>{selectedDay}</span> */}
      <div className="flex-1">
        <MyMapDriverPassenger
          latd1={data.driverRoute.origin_lat}
          lngd1={data.driverRoute.origin_lng}
          latd2={data.driverRoute.destination_lat}
          lngd2={data.driverRoute.destination_lng}
          latp1={data.data.origin_lat}
          lngp1={data.data.origin_lng}
          latp2={data.data.destination_lat}
          lngp2={data.data.destination_lng}
        />
        <div className="flex flex-col">
          <span>drive with {data.driverRoute.route_owner.name}</span>
          <span>x km away from you</span>
          <span>
            {data.driverRoute.schedule.depart} -{" "}
            {data.driverRoute.schedule.arrival}
          </span>

          <div className="grid grid-cols-2 items-end">
            <span className="text-2xl font-bold">
              {data.driverRoute.fare} USD / trip
            </span>
            <span className="text-right">{data.driverRoute.avail_seat - Number(filledSeat)} seat available</span>
          </div>
        </div>
      </div>

      <div
        className="border dark:border-0 bg-gray-200 dark:bg-gray-800 text-center py-2 px-4 rounded my-1"
        onClick={handleReqCarPool}
      >
        request carpooling
      </div>
    </div>
  );
}
