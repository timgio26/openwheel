import { supabase } from "./supabase";
import { toast } from "react-toastify";
import { z } from "zod";

const profileSchema = z.object({
  age: z.number(),
  created_at: z.string(),
  gender: z.string(),
  id: z.number(),
  name: z.string(),
  user_id: z.string(),
});

export async function getRoutes() {
  const { data: route, error } = await supabase.from("route").select("*");
  console.log(route);
  if (error) toast("error to get routes");
  return { route };
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
  const parseResult = profileSchema.safeParse(profile);
  return { profile: parseResult, error };
}

export async function addProfile(user_id:string,name:string,gender:'male'|'female',age:number) {
  const { data, error } = await supabase
    .from("profile")
    .insert([{user_id,name,gender,age}])
    .select();
  return { data, error };
}
