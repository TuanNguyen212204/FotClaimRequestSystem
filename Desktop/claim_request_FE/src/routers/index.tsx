import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";
import { UserInfoComponent } from "../components/ui/user/UserInfoComponent";
import { PendingComponent } from "../components/ui/user/PendingComponent";

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
            },
            {
                path: PATH.userinfo,
                element: <UserInfoComponent />
            },
            {
                path: PATH.pending,
                element: <PendingComponent />
            }
        ]
    }
]
export const Router = () => useRoutes(router)