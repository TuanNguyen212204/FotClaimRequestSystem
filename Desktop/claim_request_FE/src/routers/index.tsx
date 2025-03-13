import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "@components/layouts/MainLayout";
import { PATH } from "@constant/config";
import { UserInfoComponent } from "@ui/user/UserInfoComponent";
import LoginForm from "@ui/login/LoginForm";
import ResetPassword from "@ui/login/ResetPassword";
import CreateClaimPage from "@pages/CreateClaim";
import { PendingComponent } from "@pages/Approver/PendingApproval";
import { DetailsComponents } from "@pages/Approver/DetailsApproval";
import UserClaims from "@pages/User/UserClaims";
import { UserClaimDetails } from "@pages/User/UserClaimDetails";
import AllUserInformation from "@/pages/admin/AllUserInformation";
import ApproveDetail from "@pages/ClaimRequest/ApproveDetail";
import ClaimStatus from "@pages/Finance/ClaimStatus";
import PaidClaims from "@pages/Finance/PaidClaims";
import ProjectInformation from "@/pages/admin/ProjectInformation";
import StaffInformation from "@/pages/admin/StaffInformation";
import CheckMail from "@components/ui/login/CheckMail";
import CreateNewPassword from "@components/ui/login/CreateNewPassword";
import ApprovedFinancePage from "@pages/Finance/ApprovedFinancePage";
import ApprovedApproverPage from "@pages/Approver/ApprovedApproverPage";
import UnauthorizedPage from "@auth/Unauthorized.tsx";
import Authentication from "@auth/Authentication.tsx";
import Authorization from "@auth/Authorization";
import Unauthenticated from "@auth/Unauthenticated";
import { ROLE } from "@constant/role";
import { UpdateUser } from "@/pages/User/UpdateUser";
const router: RouteObject[] = [
  // {
  //   element: <CheckBoxTest />,
  //   path: PATH.checkbox,
  // },
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
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />, //không đủ quyền
  },
  {
    path: "/unauthenticated",
    element: <Unauthenticated />, //chưa đăng nhập
  },
  {
    element: (
      <Authentication>
        <MainLayout />
      </Authentication>
    ),
    children: [
      // {
      //   path: PATH.draft,
      //   element: <DraftCoponent />,
      // },
      // {
      //   path: PATH.home,
      //   element: <HomePage />,
      // },
      {
        path: PATH.createRequest,
        element: <CreateClaimPage />,
      },
      {
        path: PATH.updateUser,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <UpdateUser />
          </Authorization>
        ),
      },
      {
        path: PATH.myClaims,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <UserClaims />
          </Authorization>
        ),
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
        element: (
          <Authorization role_id={[ROLE.APPROVER]}>
            <ApprovedApproverPage />
          </Authorization>
        ),
      },
      {
        path: PATH.pending,
        element: (
          <Authorization role_id={[ROLE.APPROVER]}>
            <PendingComponent />
          </Authorization>
        ),
      },
      {
        path: PATH.details,
        element: <DetailsComponents />,
      },
      {
        path: PATH.allUserInformation,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <AllUserInformation />
          </Authorization>
        ),
      },
      {
        path: PATH.approveDetails,
        element: (
          <Authorization role_id={[ROLE.APPROVER]}>
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
      // {
      //   path: PATH.test,
      //   element: <Test />,
      // },
    ],
  },
];
export const Router = () => useRoutes(router);
