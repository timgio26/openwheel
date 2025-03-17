// import { MyMapDriverPassenger } from "./MyMapDriverPassenger";
import { useNavigate } from "react-router";
import { RouteOwnerDetail } from "../utils/api"



import {useSelector} from 'react-redux'
// import { setday } from '../features/carPoolSlices'
import type { RootState } from '../../store'
import { distance } from "../utils/helperFn";
import { useState,useEffect} from "react";

type useGetDistanceProp = {
    route: RouteOwnerDetail
}

export function useGetDistance({route}:useGetDistanceProp){
    const navigate=useNavigate()
    const [dist,setDist] = useState<number>()

    // console.log(route)
    const curlat = useSelector((state: RootState) => state.route.curLat)
    const curlng = useSelector((state: RootState) => state.route.curLng)

    
    useEffect(()=>{
      // console.log(curlat)
      if (!curlat || !curlng) {
        navigate('/myroute');
        return;
      }

      if (!route){
        setDist(0)
      }else{
          const dist = distance(curlat, curlng, route.origin_lat, route.origin_lng);
          setDist(dist);

      }
    },[curlat,curlng,navigate,route])

    return dist
}