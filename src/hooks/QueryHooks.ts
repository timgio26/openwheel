import { useQuery } from "@tanstack/react-query";
import { getProfile, getRoutes } from "../utils/api";

export function useGetRoutes(){
    const {data,error} = useQuery({
        queryFn:getRoutes,
        queryKey:['routes']
    })
    return {data,error}
}

export function useGetProfile(id:string){
    const {data,error} = useQuery({
        queryFn:()=>getProfile(id),
        queryKey:['profile']
    })
    return {data,error}
}