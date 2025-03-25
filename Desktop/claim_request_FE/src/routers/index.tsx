import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { useRoute } from "@Hooks/useRoute";
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

export const AppRoute = () => {
  const routes = useRoute();
  const publicRoutes = routes.filter((route) => !route.protected);
  const privateRoutes = routes.filter((route) => route.protected);

  const router = createBrowserRouter([
    ...publicRoutes.map((route) => ({
      path: route.path,
      element: (
        <Suspense
          fallback={
            <div>
              <LoadingProvider>
                <LoadingOverlay />
              </LoadingProvider>
            </div>
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
      children: [
        ...privateRoutes.map((route) => ({
          path: route.path,
          element: (
            <Suspense
              fallback={
                <div>
                  <LoadingProvider>
                    <LoadingOverlay />
                  </LoadingProvider>
                </div>
              }
            >
              <Authorization role_id={route.role || [ROLE.CLAIMER]}>
                {React.createElement(route.component || "div")}
              </Authorization>
            </Suspense>
          ),
        })),
      ],
    },
    // { path: "/unauthorized", element: <Unauthorized /> },
    // { path: "/unauthenticated", element: <Unauthenticated /> },
  ]);

  return <RouterProvider router={router} />;
};
