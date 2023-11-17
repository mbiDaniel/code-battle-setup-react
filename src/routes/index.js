import React from "react";
import { Route, Routes } from "react-router-dom";
import mainRoutes from "./main.routes";

export default function Router() {
  return (
    <Routes>
      {Object.values(mainRoutes).map((route) => {
        const Component = route.component;
        return (
          <Route path={route.path} key={route.path} element={<Component />} />
        );
      })}
    </Routes>
  );
}
