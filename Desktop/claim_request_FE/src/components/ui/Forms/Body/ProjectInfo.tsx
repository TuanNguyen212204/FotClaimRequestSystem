import { useState } from "react";

type TProjectInfo = {
  ProjectName: string;
  RoleInTheProject: string;
  ProjectDuration: {
    from: Date;
    to: Date;
  };
};
export interface IProjectInfoProps {
  ProjectList: TProjectInfo[];
}
export default function ProjectInfo({
  ProjectList,
}: IProjectInfoProps): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<TProjectInfo>();
  function formatDateRange(from: Date, to: Date): string {
    const fromMonth = from.toLocaleString('default', { month: 'short' });
    const fromYear = from.getFullYear();
    const toMonth = to.toLocaleString('default', { month: 'short' });
    const toYear = to.getFullYear();
  
    return `${fromMonth} ${fromYear} - ${toMonth} ${toYear}`;
  }

  return (
    <div className="mb-5 box-border">
      <h2 className="text-lg pb-1.5 mb-4 border-b-1 border-gray-400">
        Project Information
      </h2>
      <div className="mb-2.5">
        <span className="block mb-1 font-bold"></span>
        <select
          title="Projects"
          className="w-full p-3.5 mb-2.5 text-base border-2 border-gray-200 box-border rounded-sm"
          defaultValue={""}
          onChange={(e) => {
            const project = ProjectList.find(
              (p) => p.ProjectName === e.target.value
            );
            if (project) {
              setSelectedProject(project);
              console.log(project);
            }
          }}
        >
          <option value="" disabled>
            Select a Project
          </option>
          {ProjectList.map((project) => (
            <option key={project.ProjectName} value={project.ProjectName}>
              {project.ProjectName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2.5">
        <span className="block mb-1 font-bold"></span>
        <input
          disabled
          placeholder="Role in Project"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={selectedProject?.RoleInTheProject || ""}
        />
      </div>

      <div className="mb-2.5">
        <span className="block mb-1 font-bold"></span>
        <input
          disabled
          placeholder="Project Duration"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={
            selectedProject
              ? `${formatDateRange(selectedProject.ProjectDuration.from,selectedProject.ProjectDuration.to)}`
              : ""
          }
        />
      </div>
    </div>
  );
}
