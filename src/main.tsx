import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Home, Profile, FindWheel, MyRoute, Auth,MyRouteList} from "./pages/index.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/myroute">
              <Route index element={<MyRouteList/>} />
              <Route path="add" element={<MyRoute/>} />
            </Route>
            <Route path="/findwheel" element={<FindWheel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
