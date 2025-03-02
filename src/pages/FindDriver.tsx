import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { z } from "zod";
import { getDriver, RouteSchema,RouteOwnerDetailList, RouteOwnerDetail} from "../utils/api";
import { useState } from "react";
import { RouteOptionTile } from "../components/RouteOptionTile";

import {useDispatch} from 'react-redux'
import { setday } from '../features/carPoolSlices'

const StateSchema = z.object({
  route: z.object({
    data: RouteSchema,
  }),
});

export function FindDriver() {
  // const selectedDayRdx = useSelector((state: RootState) => state.day.day)
  const navigate = useNavigate();
  const { state } = useLocation();
  const parseResult = StateSchema.safeParse(state);
  const [selectedDay,setSelectedDay] = useState<number>()
  const [allDriverRoute,setAllDriverRoute] = useState<RouteOwnerDetailList>()

  const dispatch=useDispatch()




  const {data:parsedata}= parseResult
  
  if(!parseResult.success || !parsedata){
    return(
        <span>there is an error in parsing data, please try again later</span>
    )
  }

  const {route:{data}} = parsedata

  function handleBack() {
    navigate(-1);
  }

  async function handleSelectDay(daynum:number){
    if(!data.day.includes(daynum))return
    setSelectedDay(daynum)
    dispatch(setday(daynum))
    const {route} = await getDriver(Number(daynum),data.origin_lat,data.origin_lng,data.destination_lat,data.destination_lng)
    if(!route?.data)return
    setAllDriverRoute(route.data)
    // console.log(route)
  }

  function goToDriverRouteDetail(routeid:number,driverRoute:RouteOwnerDetail){
    navigate(`${routeid}`,{state:{data,driverRoute}})
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Find Driver</h1>
      </div>
      <div className="flex flex-col items-center my-4">
        <span className="font-bold text-3xl font-mono">
          {data.route_name.toUpperCase()}
        </span>
        <div className="flex flex-row justify-center gap-5">
          <div>{data.schedule.depart}</div>
          <div>-</div>
          <div>{data.schedule.arrival}</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-gray-400 my-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (each, index) => (
            <div
              className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 
                ${
                  data.day.includes(index) &&
                  "text-black dark:text-white font-bold opacity-100"
                }
                ${selectedDay == index && "border-2 border-orange-500"}
              `}
              key={each}
              onClick={() => handleSelectDay(index)}
            >
              {each}
            </div>
          )
        )}
      </div>
      <div className="h-full">
        {!allDriverRoute ? (
          <div className="text-center my-7">Please select a day</div>
        ) : (
          allDriverRoute?.map((each) => (
            <RouteOptionTile
              key={each.id}
              route={each}
              onClickDetails={() => goToDriverRouteDetail(each.id, each)}
            />
          ))
        )}
      </div>
    </div>
  );
}
