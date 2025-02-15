import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";
import { UserInfoComponent } from "../components/ui/user/UserInfoComponent";
import UserClaims from "../pages/User/UserClaims";
import { UserClaimDetails } from "../pages/User/UserClaimDetails";

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
                path: PATH.myclaims,
                element: <UserClaims />
            },
            {
                path: PATH.userclaimdetails,
                element: <UserClaimDetails/>
            },
            {
                path: PATH.userinfo,
                element: <UserInfoComponent />
            }
        ]
    }
]
export const Router = () => useRoutes(router)