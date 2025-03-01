import { useLocation, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { RouteSchema,RouteOwnerDetailSchema } from "../utils/api";
import { z } from "zod";
import { MyMapDriverPassenger } from "../components/MyMapDriverPassenger";

const DriverPassengerSchema = z.object({
  data: RouteSchema,
  driverRoute: RouteOwnerDetailSchema,
});

export function FindDriverDetails() {
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state)
  const parseResult = DriverPassengerSchema.safeParse(state);
  const data = parseResult.data;

  console.log(data);

  function handleBack() {
    navigate(-1);
  }

  if (!data) return <h1>No data. try again later</h1>;
  return (
    <div>
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Details</h1>
      </div>
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
      <div className="border dark:border-0 bg-gray-100 dark:bg-gray-800 text-center py-2 px-4 rounded my-1">
        request carpooling
      </div>
    </div>
  );
}
