import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { RouteSchema,RouteOwnerDetailSchema, addCarPool } from "../utils/api";
import { z } from "zod";
import { MyMapDriverPassenger } from "../components/MyMapDriverPassenger";


import type { RootState } from '../../store'
import { useSelector, 
  // useDispatch 
} from 'react-redux'
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
            <span className="text-right">x seat available</span>
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
