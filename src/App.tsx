// import './App.css'
import { Outlet, NavLink } from "react-router";
// import { CiDark,CiLight } from "react-icons/ci";
// import {  } from "react-router";
import { FaRoute, FaHome, FaCarSide, FaUser } from "react-icons/fa";
import { useTheme, Theme } from "./components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient,QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function isTheme(value: string): value is Theme {
  return ["dark", "light", "system"].includes(value);
}

function App() {
  const { setTheme, theme } = useTheme();

  function themeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    if (isTheme(e.target.value)) setTheme(e.target.value);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between h-svh dark:bg-gray-950 dark:text-gray-200">
        <div className=" px-3 py-4 flex flex-row justify-between items-center">
          <header className=" dark:text-gray-200">OpenWheel</header>
          <select
            name="theme"
            id="theme"
            onChange={themeHandler}
            value={theme}
            className="dark:bg-gray-950 size-min focus:ring-0 focus:outline-none"
          >
            <option value="dark">🌙</option>
            <option value="light">☀️</option>
            {/* <option value="system">System</option> */}
          </select>
          {/* <h1>{theme}</h1> */}
        </div>
        <div className="flex-1 px-3 overflow-scroll">
          <Outlet />
        </div>
        <footer className="flex justify-between px-3 py-4 dark:bg-gray-900 bg-gray-100">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black items-center flex flex-col dark:text-gray-200"
                : "text-gray-500 items-center flex flex-col"
            }
            to={"/"}
          >
            <FaHome />
            <h1 className="text-xs">home</h1>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black items-center flex flex-col dark:text-gray-200"
                : "text-gray-500 items-center flex flex-col"
            }
            to={"/myroute"}
          >
            <FaRoute />
            <h1 className="text-xs">my route</h1>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black items-center flex flex-col dark:text-gray-200 "
                : "text-gray-500 items-center flex flex-col"
            }
            to={"/findwheel"}
          >
            <FaCarSide />
            <h1 className="text-xs">find wheel</h1>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black items-center flex flex-col dark:text-gray-200"
                : "text-gray-500 items-center flex flex-col"
            }
            to={"/profile"}
          >
            <FaUser />
            <h1 className="text-xs">profile</h1>
          </NavLink>
        </footer>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
