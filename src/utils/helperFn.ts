import { z } from "zod";

const userLocalSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
});


export function getUserLocal(){
    const userLocal = localStorage.getItem("sb-idvofmywlvmgszbnjxcm-auth-token")
    if(!userLocal)return {userLocalParse:null}
    // console.log(userLocal)
    const parseResult =  userLocalSchema.safeParse(JSON.parse(userLocal))
    const userLocalId = parseResult.data?.user.id
    // const userLocalParse = JSON.parse(userLocal)
    return {userLocalId}
    
}