import { useState } from "react";
import { signup } from "../utils/api";
import {toast} from 'react-toastify'

export function Auth() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email,setEmail] = useState<string>()
  const [password,setPassword] = useState<string>()

  // console.log(email,password)
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(mode == 'register' && email && password){
      const {error} = await signup(email,password)
      if(!error) {
        toast('please login')
        setMode('login')
      }
    }else{
      return
    }
  }


  return (
    <div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-row bg-gray-200 dark:bg-gray-700 gap-4 px-2 py-2 rounded-full">
          <div
            className={`px-4 py-2 rounded-full ${
              mode === "register" ? "bg-gray-50 dark:bg-gray-900" : ""
            }`}
            onClick={()=>setMode("register")}
          >
            <span>Register</span>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              mode === "login" ? "bg-gray-50 dark:bg-gray-900" : ""
            }`}
            onClick={()=>setMode("login")}
          >
            <span>Login</span>
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col my-11">
          <label htmlFor="starting">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="starting">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input
            type="submit"
            value={mode=="login"?"Login":'Register'}
            className="bg-gray-200 dark:bg-gray-600 my-6 py-2 rounded-full"
          />
        </form>
      </div>
    </div>
  );
}
