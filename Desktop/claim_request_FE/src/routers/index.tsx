import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "@components/layouts/MainLayout";
import { HomePage } from "@pages/HomePage";
import { PATH } from "@constant/config";
import { UserInfoComponent } from "@ui/user/UserInfoComponent";
import LoginForm from "@ui/login/LoginForm";
import ResetPassword from "@ui/login/ResetPassword";
import CreateClaimPage from "@pages/CreateClaim";
import { PendingComponent } from "@/pages/Pending/PendingApproval";
import { DetailsComponents } from "@/pages/Pending/DetailsApproval";
import UserClaims from "@pages/User/UserClaims";
import { UserClaimDetails } from "@pages/User/UserClaimDetails";
import UserSettings from "@pages/admin/UserSettings";
import ApproveDetail from "@pages/ClaimRequest/ApproveDetail";
import ClaimStatus from "@pages/Finance/ClaimStatus";
import PaidClaims from "@pages/Finance/PaidClaims";
import ProjectInformation from "@pages/admin/ProjectInformation";
import StaffInformation from "@pages/admin/StaffInformation";
import DraftCoponent from "@/components/ui/user/DraftCoponent";
import ApprovedFinancePage from "@/pages/Finance/ApprovedFinancePage";
import ApprovedApproverPage from "@/pages/Approver/ApprovedApproverPage";
import Test from "@/pages/Test";
import TestRadio from "@/pages/Radio+TooltipTest";
import CheckBoxTest from "@/components/ui/Checkbox/Checkboxtest";
import CheckMail from "@/components/ui/login/CheckMail";
import CreateNewPassword from "@/components/ui/login/CreateNewPassword";
import  Authorization  from "@/auth/Authorization";
import { ROLE } from "@/constant/role";
const router: RouteObject[] = [
  {
    element: <CheckBoxTest />,
    path: PATH.checkbox,
  },
  {
    element: <LoginForm />,
    path: PATH.login,
  },
  {
    element: <ResetPassword />,
    path: PATH.resetPassword,
  },
  {
    element: <CheckMail />,
    path: PATH.checkToMail,
  },
  {
    element: <CreateNewPassword />,
    path: PATH.createNewPassword,
  },
  // {
  //   path: "/unauthorized",
  //   element: <UnauthorizedPage />, //không đủ quyền
  // },
  // {
  //   path: "/unauthenticated",
  //   element: <Unauthenticated />, //chưa đăng nhập
  // },

  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.draft,
        element: <DraftCoponent />,
      },
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
        path: PATH.approvedApprover,
        element: <ApprovedApproverPage />,
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
        element: (
          <Authorization roleID={[ROLE.APPROVER]}>
            <ApproveDetail />
          </Authorization>
        ),
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
      {
        path: PATH.test,
        element: <Test />,
      },
      {
        path: PATH.test2,
        element: <TestRadio />,
      }
    ],
  },
];
export const Router = () => useRoutes(router);
