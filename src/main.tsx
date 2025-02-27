import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Home,
  Profile,
  FindWheel,
  MyRoute,
  Auth,
  MyRouteList,
  MyRouteDetails,
  FindDriver,
  ProtectedPage
} from "./pages/index.ts";
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
              <Route index element={<ProtectedPage><MyRouteList /></ProtectedPage>} />
              <Route path="add" element={<ProtectedPage><MyRoute /></ProtectedPage>} />
              <Route path=":id">
                <Route index element={<ProtectedPage><MyRouteDetails /></ProtectedPage>}/>
                <Route path="finddriver" element={<ProtectedPage><FindDriver /></ProtectedPage>}/>
              </Route>
            </Route>
            <Route path="/findwheel" element={<ProtectedPage><FindWheel /></ProtectedPage>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
