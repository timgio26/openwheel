import { useState } from "react";
import { signup, login } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"register" | "login">("login");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading,setIsLoading] = useState<boolean>(false)

  // console.log(email,password)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true)
      if (mode == "register") {
        const { error } = await signup(email, password);
        if (!error) {
          localStorage.removeItem("sb-idvofmywlvmgszbnjxcm-auth-token");
          toast("please login");
          setMode("login");
        } else {
          setErrorMsg(error.message);
        }
      } else {
        const { error } = await login(email, password);
        if (!error) {
          toast("successfully logged in");
          navigate("/");
        } else {
          setErrorMsg(error.message);
        }
      }
      setIsLoading(false)
    } else {
      return;
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
            onClick={() => setMode("register")}
          >
            <span>Register</span>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              mode === "login" ? "bg-gray-50 dark:bg-gray-900" : ""
            }`}
            onClick={() => setMode("login")}
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="starting">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-b h-10 border-gray-200 focus:ring-0 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && <span className="text-red-600">{errorMsg}</span>}
          <input
            type="submit"
            value={mode == "login" ? "Login" : "Register"}
            className={`bg-gray-200 dark:bg-gray-600 my-6 py-2 rounded-full ${isLoading&&'opacity-50'}`}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
