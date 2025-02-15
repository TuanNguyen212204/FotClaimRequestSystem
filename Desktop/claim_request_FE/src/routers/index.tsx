import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";

const router: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: PATH.home,
                element: <HomePage />,
            }, 
        ]
    }
]
export const Router = () => useRoutes(router)