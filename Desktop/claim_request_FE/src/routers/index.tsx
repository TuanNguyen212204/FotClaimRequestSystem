import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "@components/layouts/MainLayout";
import { HomePage } from "@pages/HomePage";
import { PATH } from "@constant/config";
import { UserInfoComponent } from "@ui/user/UserInfoComponent";
import LoginForm from "@ui/login/LoginForm";
import ResetPassword from "@ui/login/ResetPassword";
import CreateClaimPage from "@pages/CreateClaim";
import { PendingComponent } from "@ui/approve/PendingApproval";
import { DetailsComponents } from "@ui/approve/DetailsApproval";
import UserClaims from "@/components/ui/claimer/UserClaims";
import { UserClaimDetails } from "@/components/ui/claimer/UserClaimDetails";
import UserSettings from "@pages/Admin/UserSettings";
import ApproveDetail from "@pages/ClaimRequest/ApproveDetail";
import ClaimStatus from "@pages/Finance/ClaimStatus";
import PaidClaims from "@pages/Finance/PaidClaims";
import ProjectInformation from "@pages/Admin/ProjectInformation";
import StaffInformation from "@pages/Admin/StaffInformation";
import ApprovedFinancePage from "@/pages/Finance/ApprovedFinancePage";
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
        path: PATH.userInfo,
        element: <UserInfoComponent />,
      },
      {
        path: PATH.approvedFinance,
        element: <ApprovedFinancePage />,
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
        path: `${PATH.claimStatus}/:id`,
        element: <ClaimStatus />,
      },
      {
        path: PATH.paidClaim,
        element: <PaidClaims />,
      },
      {
        path: PATH.projectInformation,
        element: <ProjectInformation />,
      },
      {
        path: PATH.staffInformation,
        element: <StaffInformation />,
      },
    ],
  },
];
export const Router = () => useRoutes(router);
