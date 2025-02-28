import { supabase } from "./supabase";
import { toast } from "react-toastify";
import { z } from "zod";
import { FormEditData } from "../pages/Profile";
import { MyRouteForm } from "../pages/MyRoute";
import { getUserLocal, distance } from "./helperFn";
// import { latLng } from "leaflet";

const ProfileSchema = z.object({
  age: z.number(),
  created_at: z.string(),
  gender: z.string(),
  id: z.number(),
  name: z.string(),
  user_id: z.string(),
});

export const RouteSchema = z.object({
  id: z.number(),
  route_owner: z.string(),
  route_name: z.string(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  role: z.string(),
  avail_seat: z.number(),
  fare: z.number(),
  day: z.array(z.number()),
  schedule: z.object({
    arrival: z.string(),
    depart: z.string(),
  }),
});

export type Route = z.infer<typeof RouteSchema>;

const RouteListSchema = z.array(RouteSchema);

export type RouteList = z.infer<typeof RouteListSchema>;

export async function getRoutes() {
  const profileId = getUserLocal().userLocalId;
  if (!profileId) return { route: null, error: "no id" };
  const { data: route, error } = await supabase
    .from("route")
    .select("*")
    .eq("route_owner", profileId);
  // console.log(route);
  const parseResult = RouteListSchema.safeParse(route);
  // console.log(parseResult.success)
  if (error || !parseResult.success) toast("error to get routes");
  return { route: parseResult };
}

//lat1:number,lng1:number,lat2:number,lng2:number
export async function getDriver(
  day: number,
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const profileId = getUserLocal().userLocalId;
  const dist = distance(lat1, lng1, lat2, lng2) * 0.01;
  console.log("origin_lat", lat1 - 0.01, dist);
  if (!profileId) return { route: null, error: "no id" };
  const { data: route, error } = await supabase
    .from("route")
    .select("*")
    .eq("role", "driver")
    .gte("origin_lat", lat1 - dist)
    .gte("origin_lng", lng1 - dist)
    .lte("origin_lat", lat1 + dist)
    .lte("origin_lng", lng1 + dist)
    .gte("destination_lat", lat2 - dist)
    .gte("destination_lng", lng2 - dist)
    .lte("destination_lat", lat2 + dist)
    .lte("destination_lng", lng2 + dist)
    .contains("day", [day])
    .neq("route_owner", profileId);
  // console.log(route);
  const parseResult = RouteListSchema.safeParse(route);
  // console.log(parseResult.success);
  if (error || !parseResult.success) toast("error to get routes");
  return { route: parseResult };
}

export async function getRoutesSingle(id: string) {
  const { data: route, error } = await supabase
    .from("route")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();
  // console.log(route);
  const parseResult = RouteSchema.safeParse(route);
  // console.log(parseResult.success)
  if (error || !parseResult.success) toast("error to get routes");
  return { route: parseResult };
}

export async function deleteRouteSingle(id: number | string) {
  const { error } = await supabase.from("route").delete().eq("id", Number(id));
  if (error) toast("error delete route");
  return { error };
}

export async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getProfile(userid: string) {
  // console.log(userid);
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userid)
    .limit(1)
    .single();
  const parseResult = ProfileSchema.safeParse(profile);
  return { profile: parseResult, error };
}

export async function addProfile(
  user_id: string,
  name: string,
  gender: "male" | "female",
  age: number
) {
  const { data, error } = await supabase
    .from("profile")
    .insert([{ user_id, name, gender, age }])
    .select();
  return { data, error };
}

export async function updateProfile(
  profileData: FormEditData,
  user_id: string | number
) {
  const { data, error } = await supabase
    .from("profile")
    .update(profileData)
    .eq("user_id", user_id)
    .select();
  return { data, error };
}

export async function addRoute(formData: MyRouteForm) {
  // const schJson = {depart:formData.timeDepart,arrival:formData.timeArrive}
  const profileId = getUserLocal().userLocalId;
  if (!profileId) return { data: null, error: "no id" };
  console.log(profileId);
  const { data, error } = await supabase
    .from("route")
    .insert([
      {
        route_name: formData.routeName,
        route_owner: profileId,
        // origin: formData.startingPoint,
        origin_lat: formData.startingPoint.lat,
        origin_lng: formData.startingPoint.lng,
        // destination: formData.destination,
        destination_lat: formData.destination.lat,
        destination_lng: formData.destination.lng,
        role: formData.role,
        avail_seat: formData.availSeat,
        fare: Number(formData.fare),
        day: formData.day,
        schedule: { depart: formData.timeDepart, arrival: formData.timeArrive },
      },
    ])
    .select();
  return { data, error };
}
