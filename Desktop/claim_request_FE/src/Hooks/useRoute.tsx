import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
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
import UpdateProject from "@/pages/admin/UpdateProject";
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
import Test from "@/pages/Test";
import ChangePassword from "@/components/ui/login/ChangePassword";
import ApprovedDetailFinancePage from "@/pages/Finance/ApprovedDetailFinancePage";
import path from "path";
import { CiFaceSmile } from "react-icons/ci";
import { ROLES } from "@/enums/ROLES";
import {
  House,
  Smile,
  BriefcaseBusiness,
  CircleX,
  UserPen,
  EyeClosed,
  EyeIcon,
  Plus,
  Pencil,
  Compass,
} from "lucide-react";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import ROLE from "@constant/role";
export interface RouteConfig {
  icon?: React.ReactNode;
  children?: RouteConfig[];
  path?: string | undefined;
  label?: string;
  component?: React.LazyExoticComponent<React.FC>;
  protected?: boolean;
  role?: (typeof ROLE)[keyof typeof ROLE][];
  element?: React.ReactNode;
}
export const useRoute = (): RouteConfig[] => {
  return [
    {
      component: lazy(() => import("@ui/login/LoginForm")),
      path: PATH.login,
      label: "Login",
      protected: false,
    },
    {
      component: lazy(() => import("@ui/login/ResetPassword")),
      path: PATH.resetPassword,
      label: "Reset Password",
      protected: false,
    },
    {
      component: lazy(() => import("@ui/login/CheckMail")),
      path: PATH.checkToMail,
      label: "Check Mail",
      protected: false,
    },
    {
      component: lazy(() => import("@ui/login/CreateNewPassword")),
      path: PATH.createNewPassword,
      label: "Create New Password",
      protected: false,
    },
    {
      component: lazy(() => import("@ui/login/ChangePassword")),
      path: PATH.changePassword,
      label: "Change Password",
      protected: false,
    },
    // {
    //   path: "/unauthorized",
    //   component: lazy(() => import("@auth/Unauthorized.tsx")),
    //   label: "Unauthorized",
    //   role: [ROLES.USER],
    // },
    // {
    //   path: "/unauthenticated",
    //   component: lazy(() => import("@auth/Unauthenticated")),
    //   label: "Unauthenticated",
    //   role: [ROLES.USER],
    // },

    {
      path: PATH.approvedClaimWithUserID,
      component: lazy(() => import("@pages/ApprovedClaimPage")),
      label: "Approved Claim",
      role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.rejectedClaimWithUserID,
      component: lazy(() => import("@pages/RejectedClaimPage")),
      label: "Rejected Claim",
      role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.pendingClaimByUserID,
      component: lazy(() => import("@pages/PendingClaimPage")),
      label: "Pending Claim",
      icon: <MdOutlinePendingActions size={20} />,
      role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.draftClaimByUserID,
      protected: true,
      component: lazy(() => import("@pages/DraftClaimPage")),
      label: "Draft Claim",
      icon: <Pencil size={20} />,
      role: [ROLE.CLAIMER],
    },
    {
      path: PATH.createRequest,
      protected: true,
      component: lazy(() => import("@pages/CreateClaim")),
      icon: <Plus size={20} />,
      label: "Create Request",
      role: [ROLE.CLAIMER],
    },
    {
      path: PATH.claimDetail,
      component: lazy(() => import("@pages/ClaimDetail")),
      label: "Claim Detail",
      role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.myClaims,
      component: lazy(() => import("@pages/User/UserClaimsPage")),
      label: "My Claims",
      icon: <Compass size={20} />,
      role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.userClaimDetails,
      component: lazy(() => import("@pages/User/UserClaimDetailsPage")),
      label: "Claim Details",
      // role: [ROLE.CLAIMER],
      protected: true,
    },
    {
      path: PATH.userInfo,
      component: lazy(() => import("@ui/user/UserInfoComponent")),
      icon: <UserPen />,
      protected: true,
      label: "User Information",
      role: [ROLE.CLAIMER, ROLE.FINANCE, ROLE.APPROVER, ROLE.ADMIN],
    },
    {
      path: PATH.approvedFinance,
      component: lazy(() => import("@pages/Finance/ApprovedFinancePage")),
      icon: <FaCheck />,
      protected: true,
      label: "Approved Finance",
      role: [ROLE.FINANCE],
    },
    {
      path: PATH.approvedApprover,
      component: lazy(() => import("@pages/Approver/ApprovedApproverPage")),
      protected: true,
      icon: <FaCheck />,
      label: "Approved Approver",
      role: [ROLE.APPROVER],
    },
    {
      path: PATH.pending,
      component: lazy(() => import("@pages/Approver/ApprovedApproval")),
      protected: true,
      label: "Pending",
      icon: <MdOutlinePendingActions size={20} />,
      role: [ROLE.APPROVER],
    },
    {
      path: PATH.rejectedClaim,
      component: lazy(() => import("@pages/Approver/RejectedApproval")),
      protected: true,
      label: "Rejected",
      icon: <CircleX size={20} />,
      role: [ROLE.APPROVER],
    },
    {
      path: PATH.allUserInformation,
      component: lazy(() => import("@pages/admin/AllUserInformationPage")),
      protected: true,
      icon: <EyeClosed />,
      label: "All User Information",
      role: [ROLE.ADMIN],
    },
    {
      path: PATH.dashboard,
      component: lazy(() => import("@pages/admin/Dashboard")),
      protected: true,
      icon: <House size={20} />,
      label: "Dashboard",
      role: [ROLE.ADMIN],
    },
    {
      path: PATH.projectInformation,
      component: lazy(() => import("@pages/admin/ProjectInformation")),
      protected: true,
      icon: <BriefcaseBusiness size={20} />,
      label: "Project Information",
      role: [ROLE.ADMIN],
    },
    // {
    //   path: PATH.updateProject,
    //   component: lazy(() => import("@pages/admin/UpdateProject")),
    // },
    // {
    //   path: PATH.createProject,
    //   component: lazy(() => import("@pages/admin/")),
    // },
    {
      path: PATH.paidClaim,
      component: lazy(() => import("@pages/Finance/PaidClaims")),
      protected: true,
      icon: <MdPaid size={20} />,
      label: "Paid Claims",
      role: [ROLE.FINANCE],
    },
    {
      path: PATH.approvedDetailFinance,
      component: lazy(() => import("@pages/Finance/ApprovedDetailFinancePage")),
      protected: true,
      label: "Approved Detail",
      role: [ROLE.FINANCE],
    },
  ];
};
export default useRoute;
