import React, { useState, useEffect } from "react";
//import "./CSS/Request.css";
//import "./App.css";
import styles from "../components/ui/Forms/Claim/Claim.module.css";
import CreateClaim from "../components/ui/Forms/Claim/CreateClaim";
function CreateClaimPage() {
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  const projects = ["test1", "test2", "test3"];

  return (
    <div className={styles.container}>
      <div className=" flex flex-col box-border ">
        <div className="flex flex-row-reverse border-b-2 box-border border-black px-2.5 mb-8 w-full">
          <h1 className="text-black text-3xl font-semibold">Claim Status</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          <div className="text-left">
            <label className="text-black font-normal">Project Name: </label>
            <select
              title="select-project"
              className="rounded-lg bg-lighter-gray text-black text-left p-2"
              onChange={(e) => setSelectedProject(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Choose a project
              </option>
              {projects.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          {selectedProject && (
            <>
              <ProjectDetail label="Project ID" value={selectedProject} />
              <ProjectDetail
                label="Project Duration"
                value={`date (${selectedProject})`}
              />
              <ProjectDetail label="Role In Project" value={selectedProject} />
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
}

interface ProjectDetailProps {
  label: string;
  value: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ label, value }) => (
  <div className="self-center text-left">
    <label className="text-black font-normal">{label}: </label>
    <span className="text-black">{value}</span>
  </div>
);

export default CreateClaimPage;
