import React, { useState, useEffect } from "react";
import styles from "../components/ui/Forms/Claim/Claim.module.css";
import CreateClaim from "../components/ui/Forms/Claim/CreateClaim";

const CreateClaimPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>();

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  const testProjects: Project[] = [
    {
      name: "Project Alpha",
      id: "alpha-001",
      role: "Developer",
      startDate: new Date("2023-01-15"),
      endDate: new Date("2023-06-30"),
    },
    {
      name: "Project Beta",
      id: "beta-002",
      role: "Tester",
      startDate: new Date("2023-03-01"),
      endDate: new Date("2023-09-15"),
    },
    {
      name: "Project Gamma",
      id: "gamma-003",
      role: "Project Manager",
      startDate: new Date("2023-05-10"),
      endDate: new Date("2024-01-31"),
    },
    {
      name: "Project Delta",
      id: "delta-004",
      role: "Designer",
      startDate: new Date("2023-07-01"),
      endDate: new Date("2023-12-20"),
    },
    {
      name: "Project Epsilon",
      id: "epsilon-005",
      role: "Developer",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-06-30"),
    },
  ];
  //const projects = ["test1", "test2", "test3"];

  return (
    <div className={styles.container}>
      <div className="flex flex-col box-border">
        <ProjectTitle title="Claim Status" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          <ProjectSelector
            projects={testProjects}
            //selectedProject={testProjects[0]}
            setSelectedProject={setSelectedProject}
          />

          {selectedProject && (
            <>
              <ProjectDetail label="Project ID" value={selectedProject.id} />
              <ProjectDetail
                label="Project Duration"
                value={`(${
                  selectedProject.startDate.toISOString().split("T")[0]
                })-( ${selectedProject.endDate.toISOString().split("T")[0]})`}
              />
              <ProjectDetail
                label="Role In Project"
                value={selectedProject.role}
              />
            </>
          )}
        </div>

        <div className="w-full bg-lighter-gray rounded-lg p-6 box-border">
          <h2 className="text-black text-2xl font-semibold text-center mb-4">
            Create Claim
          </h2>
          <CreateClaim />
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailProps {
  label: string;
  value: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ label, value }) => (
  <div className="self-center text-left">
    <label className="text-black font-bold">{label}: </label>
    <span className="text-gray-600">{value}</span>
  </div>
);

interface ProjectTitleProps {
  title: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ title }) => (
  <div className="flex border-b-1 box-border border-black px-2 mb-8 w-full">
    <h1 className="text-black text-3xl font-semibold">{title}</h1>
  </div>
);

interface ProjectSelectorProps {
  projects: Project[];
  // selectedProject: Project;
  setSelectedProject: (project: Project) => void;
}
type Project = {
  name: string;
  id: string;
  role: string;
  startDate: Date;
  endDate: Date;
};
const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  setSelectedProject,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedProject = projects.find(
      (project) => project.id === selectedId
    );
    if (selectedProject) setSelectedProject(selectedProject);
  };

  return (
    <div className="text-left">
      <label className="text-black font-normal">Project Name: </label>
      <select
        title="select-project"
        className="rounded-lg bg-lighter-gray text-black text-left p-2"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Choose a project
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CreateClaimPage;
