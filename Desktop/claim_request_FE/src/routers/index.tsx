import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";

const router: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: PATH.home,
                element: <HomePage />,
            }, 
            {
                path: PATH.draft,
                element: <DraftCoponent />
            }
        ]
    }
]
export const Router = () => useRoutes(router)