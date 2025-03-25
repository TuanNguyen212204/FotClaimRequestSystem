import { RouteObject, useRoutes } from "react-router-dom";
import { MainLayout } from "@components/layouts/MainLayout";
import { PATH } from "@constant/config";
import { UserInfoComponent } from "@ui/user/UserInfoComponent";
import LoginForm from "@ui/login/LoginForm";
import ResetPassword from "@ui/login/ResetPassword";
import CreateClaimPage from "@pages/CreateClaim";
import { PendingComponent } from "@pages/Approver/PendingApproval";
import AllUserInformationPage from "@/pages/admin/AllUserInformationPage";
import ApproveDetail from "@pages/ClaimRequest/ApproveDetail";
import ClaimStatus from "@pages/Finance/ClaimStatus";
import PaidClaims from "@pages/Finance/PaidClaims";
import ProjectInformation from "@/pages/admin/ProjectInformation";
import { UpdateProject } from "@/pages/Project/UpdateProject";
import { CreateProject } from "@pages/Project/CreateProject";
import StaffInformation from "@/pages/admin/StaffInformation";
import Dashboard from "@/pages/admin/Dashboard";
import CheckMail from "@components/ui/login/CheckMail";
import CreateNewPassword from "@components/ui/login/CreateNewPassword";
import ApprovedFinancePage from "@pages/Finance/ApprovedFinancePage";
import ApprovedApproverPage from "@pages/Approver/ApprovedApproverPage";
import UnauthorizedPage from "@auth/Unauthorized.tsx";
import Authentication from "@auth/Authentication.tsx";
import Authorization from "@auth/Authorization";
import Unauthenticated from "@auth/Unauthenticated";
import { ROLE } from "@constant/role";
import UserClaims from "@/components/ui/claimer/UserClaims";
import ApprovedDetailFinancePage from "@/pages/Finance/ApprovedDetailFinancePage";
import UserClaimsPage from "@pages/User/UserClaimsPage";
import UserClaimDetailsPage from "@pages/User/UserClaimDetailsPage";
import { UpdateUser } from "@pages/User/UpdateUser";
import { CreateUser } from "@pages/User/CreateUser";
import ClaimDetail from "@pages/ClaimDetail";
import PengdingClaimForUserPage from "@/pages/PendingClaimPage";
import ApprovedClaimForUserPage from "@/pages/ApprovedClaimPage";
import RejectedClaimByUserPage from "@/pages/RejectedClaimPage";
import RejectedComponent from "@/pages/Approver/RejectedApproval";
import DraftClaimPage from "@/pages/DraftClaimPage";
// import { ApprovedClaimByUserID } from "@/pages/User/ApprovedClaimByUserID";
// import { RejectedClaimByUserID } from "@/pages/User/RejectedClaimByUserID";
// import { PendingClaimByUserID } from "@/pages/User/PendingClaimByUserID";
import Test from "@/pages/Test";
import ChangePassword from "@/components/ui/login/ChangePassword";
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
    element: <ChangePassword />,
    path: PATH.changePassword,
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
        path: PATH.approvedClaimWithUserID,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <ApprovedClaimForUserPage />
          </Authorization>
        ),
      },
      {
        path: PATH.rejectedClaimWithUserID,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <RejectedClaimByUserPage />
          </Authorization>
        ),
      },
      {
        path: PATH.pendingClaimByUserID,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <PengdingClaimForUserPage />
          </Authorization>
        ),
      },
      {
        path: PATH.draftClaimByUserID,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <DraftClaimPage />
          </Authorization>
        ),
      },
      {
        path: PATH.createRequest,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <CreateClaimPage />
          </Authorization>
        ),
      },
      {
        path: PATH.createUser,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <CreateUser />
          </Authorization>
        ),
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
        path: PATH.claimDetail,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <ClaimDetail />
          </Authorization>
        ),
      },
      {
        path: PATH.myClaims,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <UserClaimsPage />
          </Authorization>
        ),
      },
      {
        path: PATH.userClaimDetails,
        element: (
          <Authorization role_id={[ROLE.CLAIMER]}>
            <UserClaimDetailsPage />
          </Authorization>
        ),
      },
      {
        path: PATH.userInfo,
        element: (
          <Authorization
            role_id={[ROLE.CLAIMER, ROLE.APPROVER, ROLE.FINANCE, ROLE.ADMIN]}
          >
            <UserInfoComponent />
          </Authorization>
        ),
      },
      {
        path: PATH.approvedFinance,
        element: (
          <Authorization role_id={[ROLE.FINANCE]}>
            <ApprovedFinancePage />
          </Authorization>
        ),
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
        path: PATH.rejectedClaim,
        element: (
          <Authorization role_id={[ROLE.APPROVER]}>
            <RejectedComponent />
          </Authorization>
        ),
      },
      // {
      //   path: PATH.details,
      //   element: <DetailsComponents />,
      // },
      {
        path: PATH.allUserInformation,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <AllUserInformationPage />
          </Authorization>
        ),
      },
      {
        path: PATH.dashboard,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <Dashboard />
          </Authorization>
        ),
      },
      {
        path: PATH.projectInformation,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <ProjectInformation />
          </Authorization>
        ),
      },
      {
        path: PATH.updateProject,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <UpdateProject />
          </Authorization>
        ),
      },
      {
        path: PATH.createProject,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <CreateProject />
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
        element: (
          <Authorization role_id={[ROLE.FINANCE]}>
            <ClaimStatus />
          </Authorization>
        ),
      },
      {
        path: PATH.paidClaim,
        element: (
          <Authorization role_id={[ROLE.FINANCE]}>
            <PaidClaims />
          </Authorization>
        ),
      },
      {
        path: PATH.staffInformation,
        element: (
          <Authorization role_id={[ROLE.ADMIN]}>
            <StaffInformation />
          </Authorization>
        ),
      },
      {
        path: PATH.approvedDetailFinance,
        element: <ApprovedDetailFinancePage />,
      },
      {
        path: PATH.test,
        element: <Test />,
      },
    ],
  },
];
export const Router = () => useRoutes(router);
