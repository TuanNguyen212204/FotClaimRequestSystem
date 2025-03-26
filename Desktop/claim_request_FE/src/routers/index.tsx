import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Authentication from "@/auth/Authentication";
import Authorization from "@/auth/Authorization";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "./Router.module.css";
import React from "react";
import ROLE from "@/constant/role";
import Unauthenticated from "@/auth/Unauthenticated";
import Unauthorized from "@/auth/Unauthorized";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "@/constant/routeConfig";
export const AppRoute = () => {
  const router = createBrowserRouter([
    ...PUBLIC_ROUTE.map((route) => ({
      path: route.path,
      element: (
        <Suspense
          fallback={
            <LoadingProvider>
              <LoadingOverlay />
            </LoadingProvider>
          }
        >
          {React.createElement(route.component || "div")}
        </Suspense>
      ),
    })),
    {
      element: (
        <Authentication>
          <div className={styles.main_layout_wrapper}>
            <MainLayout />
          </div>
        </Authentication>
      ),
      children: PRIVATE_ROUTE.map((route) => ({
        path: route.path,
        element: (
          <Suspense
            fallback={
              <LoadingProvider>
                <LoadingOverlay />
              </LoadingProvider>
            }
          >
            <Authorization role_id={route.role || 0}>
              {React.createElement(route.component || "div")}
            </Authorization>
          </Suspense>
        ),
      })),
    },
    // { path: "/unauthorized", element: <Unauthorized /> },
    // { path: "/unauthenticated", element: <Unauthenticated /> },
  ]);

  return <RouterProvider router={router} />;
};
