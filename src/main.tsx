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
  ProtectedPage,
  FindDriverDetails,
  Confirm,
  PassengerRequest
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
                <Route path="finddriver/:id" element={<ProtectedPage><FindDriverDetails /></ProtectedPage>}/> 
                <Route path="finddriver/:id/confirm" element={<ProtectedPage><Confirm /></ProtectedPage>}/> 
                <Route path="passengerrequest" element={<ProtectedPage><PassengerRequest /></ProtectedPage>}/> 
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
