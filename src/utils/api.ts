import { supabase } from "./supabase";
import { toast } from "react-toastify";

export async function getRoutes() {
  const { data: route, error } = await supabase.from("route").select("*");
  console.log(route)
  if (error) toast("error to get routes");
  return { route };
}

export async function signup(email:string,password:string){
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return {data,error}
}
