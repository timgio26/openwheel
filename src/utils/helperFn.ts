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

// export function getBufferCoordinate(lat1:number,lng1:number,lat2:number,lng2:number){
//   const leftbound = lng1<lng2?lng1:lng2
//   const upperbound = lat1>lat2?lat1:lat2
//   const lowerbound = lat1>lat2?lat2:lat1
//   const rightbound = lng1<lng2?lng2:lng1
//   return {leftbound,rightbound,upperbound,lowerbound}
// }


export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  // unit: "K" | "N" | "M"
): number {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    // if (unit == "K") {
    dist = dist * 1.609344;
    // }
    // if (unit == "N") {
    //   dist = dist * 0.8684;
    // }
    return dist;
  }
}