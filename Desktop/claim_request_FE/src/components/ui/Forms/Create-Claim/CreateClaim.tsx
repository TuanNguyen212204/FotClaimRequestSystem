import ProjectInfo from "../Body/ProjectInfo";
import { IProjectInfoProps } from "../Body/ProjectInfo";
import StaffInfo from "@ui/Forms/Body/StaffInfo";
import Header from "@ui/Forms/Header";
import ClaimTable from "../Body/ClaimTable";
import styles from "@components/ui/Forms/Create-Claim/Claim.module.css";
import AdditionalInfo from "@ui/Forms/Body/AdditionalInfo";
export default function CreateClaim() {
  return (
    <form
      onSubmit={() => {
        console.log("submited demo");
      }}
    >
      <Header
        prepareBy={"John Doe"}
        status={"Draft"}
        title={"Create New Claim"}
      />
      <StaffInfo department="Dev" name="John Doe" staffID="#123123" />
      <ProjectInfo ProjectList={dummyProjectData.ProjectList} />
      <ClaimTable />
      <AdditionalInfo/>
      <div className="mt-6 text-left">
        <button
          type="submit"
          className={`px-6 py-3 text-white font-semibold text-center rounded-lg ${styles.submit_button}`}
        >
          Send
        </button>
      </div>
    </form>
  );
}
const dummyProjectData: IProjectInfoProps = {
  ProjectList: [
    {
      ProjectName: "E-commerce Platform Development",
      RoleInTheProject: "Frontend Developer",
      ProjectDuration: {
        from: new Date("2023-01-15"),
        to: new Date("2023-07-20"),
      },
    },
    {
      ProjectName: "Mobile App Redesign",
      RoleInTheProject: "UI/UX Designer",
      ProjectDuration: {
        from: new Date("2022-09-01"),
        to: new Date("2022-12-15"),
      },
    },
    {
      ProjectName: "Data Analytics Dashboard",
      RoleInTheProject: "Data Analyst",
      ProjectDuration: {
        from: new Date("2023-03-01"),
        to: new Date("2023-06-30"),
      },
    },
    {
      ProjectName: "Internal CRM System",
      RoleInTheProject: "Backend Developer",
      ProjectDuration: {
        from: new Date("2022-05-10"),
        to: new Date("2022-08-25"),
      },
    },
    {
      ProjectName: "Marketing Website Refresh",
      RoleInTheProject: "Web Developer",
      ProjectDuration: {
        from: new Date("2023-07-01"),
        to: new Date("2023-09-15"),
      },
    },
    {
      ProjectName: "AI Chatbot Integration",
      RoleInTheProject: "Machine Learning Engineer",
      ProjectDuration: {
        from: new Date("2023-10-01"),
        to: new Date("2024-01-30"),
      },
    },
    {
      ProjectName: "Cloud Infrastructure Migration",
      RoleInTheProject: "DevOps Engineer",
      ProjectDuration: {
        from: new Date("2023-04-15"),
        to: new Date("2023-07-20"),
      },
    },
    {
      ProjectName: "Cybersecurity Audit",
      RoleInTheProject: "Security Analyst",
      ProjectDuration: {
        from: new Date("2022-11-01"),
        to: new Date("2023-02-28"),
      },
    },
    {
      ProjectName: "Project Management System Implementation",
      RoleInTheProject: "Project Manager",
      ProjectDuration: {
        from: new Date("2023-02-01"),
        to: new Date("2023-05-15"),
      },
    },
    {
      ProjectName: "Financial Reporting Tool Development",
      RoleInTheProject: "Software Engineer",
      ProjectDuration: {
        from: new Date("2022-07-01"),
        to: new Date("2022-10-31"),
      },
    },
  ],
};
