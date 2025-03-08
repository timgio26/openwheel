import { useLocation, useNavigate } from "react-router";
import { accRejRequest, passengerReqSchema } from "../utils/api";
import { MyMapDriverPassenger } from "../components/MyMapDriverPassenger";
import { IoIosArrowBack } from "react-icons/io";

export function PassengerRequestDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const parseResult = passengerReqSchema.safeParse(state);
  const { data } = parseResult;

  function handleBack() {
    navigate(-1);
  }

  async function handleAccept(){
    // console.log('acc')
    if(!data)return
    const {error} = await accRejRequest(data.id,'accept')
    if(!error) navigate(-1)
  }

  async function handleReject(){
    if(!data)return
    const {error} = await accRejRequest(data.id,'reject')
    if(!error) navigate(-1)
  }

  async function handleCancel(){
    if(!data)return
    const {error} = await accRejRequest(data.id,'open')
    if(!error) navigate(-1)
  }

  if (!parseResult.success || !data) return <div>there is something wrong</div>;
  return (
    <div className="h-full flex flex-col justify-between">
        <div>

        
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Request Details</h1>
      </div>
      <MyMapDriverPassenger
        latd1={data.route_id.origin_lat}
        lngd1={data.route_id.origin_lng}
        latd2={data.route_id.destination_lat}
        lngd2={data.route_id.destination_lng}
        latp1={data.passenger_route_id.origin_lat}
        lngp1={data.passenger_route_id.origin_lng}
        latp2={data.passenger_route_id.destination_lat}
        lngp2={data.passenger_route_id.destination_lng}
      />
      <div className="flex flex-col">
        <span>cust name : {data.passenger_route_id.route_owner.name}</span>
        <span>cust age : {data.passenger_route_id.route_owner.age}</span>
        <span>cust gender : {data.passenger_route_id.route_owner.gender}</span>
      </div>
      <div>ai recommendation</div>
      </div>
      <div>
        {data.status == 'open'?
        <>
        <div
          className="bg-gray-300 dark:bg-gray-900 text-center py-1 my-3 rounded shadow-xl"
          onClick={handleAccept}
        >
          accept
        </div>
        <div
          className="bg-red-400 dark:bg-red-900 text-center py-1 my-3 rounded shadow-xl"
          onClick={handleReject}
        >
          reject
        </div>
        
        </>
        :
        <div
        className="bg-red-400 dark:bg-red-900 text-center py-1 my-3 rounded shadow-xl"
        onClick={handleCancel}
      >
        cancel
      </div>
        }
      </div>
    </div>
  );
}
