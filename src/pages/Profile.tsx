import { useLayoutEffect } from "react"
import { useNavigate } from "react-router"

export function Profile(){
    const navigate = useNavigate()

    useLayoutEffect(
        ()=>{
            const localStrUser = localStorage.getItem('user')
            if(!localStrUser) navigate('/auth')

        },
        [navigate]
    )
    return(
        <div>
            <h1>Profile</h1>
        </div>
    )
}