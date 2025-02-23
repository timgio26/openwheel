import { useQuery } from "@tanstack/react-query";
import { getRoutes } from "../utils/api";

export function useGetRoutes(){
    const {data,error} = useQuery({
        queryFn:getRoutes,
        queryKey:['routes']
    })
    return {data,error}
}