import { useEffect, useState } from "react"
import { getDailyPassengerReq, getRoutes, PassengerReqList, RouteList } from "../utils/api"
// import { RouteTile } from "../components/RouteTile"
import { RouteTileSimple } from "../components/RouteTileSimple"

export function FindWheel(){
    const day = new Date()
    const dayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day.toDateString().split(' ')[0])
    // console.log(dayIdx)

    const [myRoutesToday,setMyRoutesToday] = useState<RouteList>()
    const [myRoutesMember,setMyRoutesMember] = useState<PassengerReqList>()
    // console.log(myRoutesToday)

    useEffect(()=>{
        async function getMyRoutes(){
            const {route} = await getRoutes()
            const {data:routeMember,error} = await getDailyPassengerReq(dayIdx)
            // console.log(routeMember,error)
            if(!route || error) return
            const {data} = route
            if(!data) return
            const dataForToday = data.filter((each)=>each.day.includes(dayIdx)).sort()
            setMyRoutesToday(dataForToday)
            setMyRoutesMember(routeMember)
        }
        getMyRoutes()
    },[dayIdx])
    return(
        <div>
            <div className="flex flex-col items-center">
            {/* <h1>today,</h1> */}
            <h1 className="text-8xl font-bold">{day.toDateString().slice(0,4).toUpperCase()}</h1>
            <h1 className="font-light">{day.toDateString().slice(4).toUpperCase()}</h1>
            </div>
            {myRoutesToday&&
            myRoutesToday.map((each)=>{
                const passenger = myRoutesMember?.filter((eachm)=>eachm.route_id.id==each.id)
                return(
                    <RouteTileSimple route={each} key={each.id} member={passenger} day={dayIdx}/>
                )
            }
                // <div>
                //     {each.route_name}
                // </div>
            )}
        </div>
    )
}