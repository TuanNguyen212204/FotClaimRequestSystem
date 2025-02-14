import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";
import { UserInfoComponent } from "../components/ui/user/UserInfoComponent";
import { PendingComponent } from "../components/ui/user/PendingComponents/PendingComponent";
import { DetailsComponents } from "../components/ui/user/PendingComponents/DetailsComponents";

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
            },
            {
                path: PATH.details,
                element: <DetailsComponents />
            }
        ]
    }
]
export const Router = () => useRoutes(router)