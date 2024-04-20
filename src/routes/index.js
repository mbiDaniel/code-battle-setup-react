import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import mainRoutes from "./main.routes";
import authRoutes from "./auth.routes";

export default function Router() {

  return (
    <Routes>
      {Object.values(authRoutes).map((route) => {
        const Component = route.component;
        return (
          <Route path={route.path} key={route.path} element={<Component />} />
        );
      })}
      {Object.values(mainRoutes).map((route) => {
        const Component = route.component;
        return (
          <Route path={route.path} key={route.path} element={<Component />} />
        );
      })}

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

const Home = () => {
  useEffect(() => {
    window.location = authRoutes.Login.path;
  })

  return <></>
}
