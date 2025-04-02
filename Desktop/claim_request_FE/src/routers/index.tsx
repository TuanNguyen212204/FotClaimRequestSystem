import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Authentication from "@/auth/Authentication";
import Authorization from "@/auth/Authorization";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "./Router.module.css";
import React from "react";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "@/constant/routeConfig";
import ErrorPage from "@/pages/Error/ErrorPage";
import { HTTP_STATUS, HTTP_STATUS_TEXT } from "@/constant/httpStatus";
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
    {
      path: "/error/:code",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: (
        <ErrorPage
          code={HTTP_STATUS.NOT_FOUND}
          message={HTTP_STATUS_TEXT.NOT_FOUND}
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};
