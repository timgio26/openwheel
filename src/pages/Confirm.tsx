import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

export function Confirm(){
    const url = useLocation()
    const navigate = useNavigate()
    const curUrl = url.pathname.split('/')
    function handleback(){
        navigate(`/${curUrl[1]}/${curUrl[2]}`)
    }
    return(
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
            <FaCheckCircle size={225}/>
            <span className="text-xl font-bold">Request Created</span>
            {/* <div> */}
                <div className="shadow-2xl bg-gray-300 dark:bg-gray-600 px-5 py-1 rounded-full mt-3" onClick={handleback}>
                    back to MyRoute
                </div>
            {/* </div> */}
            </div>
        </div>
    )
}