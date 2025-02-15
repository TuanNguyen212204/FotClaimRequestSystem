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
        path: PATH.draft,
        element: <DraftCoponent />,
      },
      {
        path: PATH.userinfo,
        element: <UserInfoComponent />,
      },
      {
        path: PATH.pending,
        element: <PendingComponent />,
      },
      {
        path: PATH.details,
        element: <DetailsComponents />,
      },
    ],
  },
];
export const Router = () => useRoutes(router);
