import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { PATH } from "../constant/config";
import DraftCoponent from "../components/ui/user/DraftCoponent";
import { UserInfoComponent } from "../components/ui/user/UserInfoComponent";
import LoginForm from "../components/ui/login/LoginForm";
import ResetPassword from "../components/ui/login/ResetPassword";
import CreateClaimPage from "../pages/CreateClaim";
import { PendingComponent } from "../components/ui/approve/PendingApproval";
import { DetailsComponents } from "../components/ui/approve/DetailsApproval.tsx";
import UserClaims from "../pages/User/UserClaims.tsx";
import { UserClaimDetails } from "../pages/User/UserClaimDetails.tsx";
import UserSettings from "../pages/admin/UserSettings.tsx";
import ApproveDetail from "../pages/ClaimRequest/ApproveDetail.tsx";
import { Approved } from "../pages/Approved/Approved";
const router: RouteObject[] = [
  {
    element: <LoginForm />,
    path: PATH.login,
  },
  {
    element: <ResetPassword />,
    path: PATH.resetPassword,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.home,
        element: <HomePage />,
      },
      {
        path: PATH.createRequest,
        element: <CreateClaimPage />,
      },
      {
        path: PATH.myClaims,
        element: <UserClaims />,
      },
      {
        path: PATH.userClaimDetails,
        element: <UserClaimDetails />,
      },
      {
        path: PATH.draft,
        element: <DraftCoponent />,
      },
      {
        path: PATH.userInfo,
        element: <UserInfoComponent />,
      },
      {
        path: PATH.approved,
        element: <Approved />,
      },
      {
        path: PATH.pending,
        element: <PendingComponent />,
      },
      {
        path: PATH.details,
        element: <DetailsComponents />,
      },
      {
        path: PATH.userSettings,
        element: <UserSettings />,
      },
      {
        path: PATH.approveDetails,
        element: <ApproveDetail />,
      },
      {
        path: PATH.claimStatus,
        element: <ClaimStatus />,
      },
      {
        path: PATH.paidClaim,
        element: <PaidClaims />,
      },
      {
        path:PATH.projectInformation,
        element:<ProjectI
      }
    ],
  },
];
export const Router = () => useRoutes(router);
