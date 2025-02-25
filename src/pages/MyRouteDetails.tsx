import { useNavigate, useParams } from "react-router"
import { useGetRoute } from "../hooks/QueryHooks"
import { deleteRouteSingle } from "../utils/api"

export function MyRouteDetails(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {data,error}= useGetRoute(id||'')
    console.log(data,error)

    async function handleDelete(){
        if(!id)return
        const {error} = await deleteRouteSingle(id)
        if(!error)navigate('/myroute')
    }

    return(
        <div>
            <h1 className="text-2xl text-center font-light mb-2">Route Details</h1>
            <div className="flex flex-col">

            <span>{data?.route.data?.origin.lat},{data?.route.data?.origin.lng}</span>
            <span>{data?.route.data?.destination.lat},{data?.route.data?.destination.lng}</span>
            <span>{data?.route.data?.role}</span>
            </div>

            <div className="bg-red-400 dark:bg-red-900 text-center py-1 my-3 rounded shadow-xl" onClick={handleDelete}>
                delete route
            </div>
        </div>
    )
}