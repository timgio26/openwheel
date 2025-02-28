import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { z } from "zod";
import { getDriver, RouteSchema,RouteList} from "../utils/api";
import { useState } from "react";
import { MyMapDriverPassenger } from "../components/MyMapDriverPassenger";
// import { useEffect, useLayoutEffect } from "react";

const StateSchema = z.object({
  route: z.object({
    data: RouteSchema,
  }),
});

export function FindDriver() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const parseResult = StateSchema.safeParse(state);
  const [selectedDay,setSelectedDay] = useState<number>()
  const [allDriverRoute,setAllDriverRoute] = useState<RouteList>()


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
    const {route} = await getDriver(Number(daynum),data.origin_lat,data.origin_lng,data.destination_lat,data.destination_lng)
    if(!route?.data)return
    setAllDriverRoute(route.data)
    // console.log(route)
  }

  return (
    <div>
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
      <div className="grid grid-cols-7 gap-1 text-gray-400">
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
      <span>
        {selectedDay}

        {allDriverRoute?.map((each) => (
          <MyMapDriverPassenger
            latd1={each.origin_lat}
            lngd1={each.origin_lng}
            latd2={each.destination_lat}
            lngd2={each.destination_lng}
            latp1={data.origin_lat}
            lngp1={data.origin_lng}
            latp2={data.destination_lat}
            lngp2={data.destination_lng}
          />
        ))}
      </span>
    </div>
  );
}
