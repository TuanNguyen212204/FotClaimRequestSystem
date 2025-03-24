import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useRoute } from "@Hooks/useRoute";
import Authentication from "@/auth/Authentication";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "./Router.module.css";
import React from "react";
export const AppRoute = () => {
  const routes = useRoute();
  const publicRoutes = routes.filter((route) => !route.protected);
  const privateRoutes = routes.filter((route) => route.protected);

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {React.createElement(route.component)}
            </Suspense>
          }
        />
      ))}

      <Route
        element={
          <Authentication>
            <div className={styles.main_layout_wrapper}>
              <MainLayout />
            </div>
          </Authentication>
        }
      >
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {React.createElement(route.component)}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
