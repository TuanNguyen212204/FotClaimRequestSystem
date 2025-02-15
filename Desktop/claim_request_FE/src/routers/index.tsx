import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";
import { UserInfoComponent } from "../components/ui/user/UserInfoComponent";
import PaidClaims from "../pages/Finance/PaidClaims";
import ClaimStatus from "../pages/Finance/ClaimStatus";

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
                path: PATH.paidClaims,
                element: <PaidClaims />
            },
            {
                path: PATH.claimStatus,
                element: <ClaimStatus />
            }
        ]
    }
]
export const Router = () => useRoutes(router)