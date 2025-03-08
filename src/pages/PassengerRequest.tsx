import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
// import { getUserLocal } from "../utils/helperFn";
import { getPassengerReq, PassengerReqList } from "../utils/api";
import { ReqTile } from "../components/ReqTile";

export function PassengerRequest() {
    const navigate = useNavigate();
    const [selectedDay,setSelectedDay] = useState<number>()
    const {id} = useParams()
    const [reqData,setReqData] = useState<PassengerReqList>()

    // console.log(reqData)

    function handleBack() {
        navigate(-1);
      }

    function handleSelectDay(day:number){
      setSelectedDay(day)
    }

    useEffect(() => {
      async function getRequest() {
        console.log(id,selectedDay)
        if (!id || selectedDay === undefined) return;
        const { data } = await getPassengerReq(Number(id), selectedDay);
        console.log(data);
        setReqData(data);
      }
      getRequest();
    }, [selectedDay, id]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-center items-center relative">
        <div className="absolute left-0" onClick={handleBack}>
          <IoIosArrowBack size={30} />
        </div>

        <h1 className="text-2xl font-light mb-2">Passenger Request</h1>
      </div>
      <div className="grid grid-cols-7 gap-1 dark:text-gray-400 my-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (each, index) => (
            <div
              className={`bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center rounded-md opacity-50 
                ${
                  selectedDay == index &&
                  "border-2 border-orange-500 opacity-100"
                }
              `}
              key={index}
              onClick={() => handleSelectDay(index)}
            >
              {each}
            </div>
          )
        )}
      </div>
      {reqData ? 
        reqData.map((each) => <ReqTile data={each} key={each.day}/>)
       : 
       selectedDay?
        <h1>no request</h1>:
        <h1>please select a day</h1>
      }
      {/* {reqData?.map} */}
    </div>
  );
}
