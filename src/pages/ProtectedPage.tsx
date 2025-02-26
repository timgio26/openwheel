
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"
import { getUserLocal } from "../utils/helperFn"
// import { toast } from "react-toastify";

type ProtectedPageProp = {
    children:ReactNode
}

export function ProtectedPage({children}:ProtectedPageProp){
    const navigate = useNavigate()
    const profileId = getUserLocal().userLocalId
    // console.log(user)
    useEffect(()=>{
        if(!profileId){
            // toast('please login')
            navigate('/auth')
        }
    },[navigate,profileId])

    return(
        <>
        {children}
        </>
    )
}