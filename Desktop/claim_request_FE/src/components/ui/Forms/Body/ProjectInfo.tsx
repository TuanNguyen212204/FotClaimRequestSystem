import { useSelector, useDispatch } from "react-redux";
import { selectProject,selectedProject } from "@/redux/slices/Project/projectSlice";
export type TProjectInfo = {
  ProjectName: string;
  RoleInTheProject: string;
  ProjectDuration: {
    from: string;
    to: string;
  };
};
export interface IProjectInfoProps {
  ProjectList: TProjectInfo[];
}
export default function ProjectInfo({
  ProjectList,
}: IProjectInfoProps): JSX.Element {
  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  function formatDateRange(from: string, to: string): string {
    console.log(from )
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const fromMonth = fromDate.toLocaleString("default", { month: "short" });
    const fromYear = fromDate.getFullYear();
    const toMonth = toDate.toLocaleString("default", { month: "short" });
    const toYear = toDate.getFullYear();
  
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
              dispatch(selectedProject(project));
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
          value={project?.selectedProject.RoleInTheProject|| ""}
        />
      </div>

      <div className="mb-2.5">
        <span className="block mb-1 font-bold"></span>
        <input
          disabled
          placeholder="Project Duration"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={
            project.selectedProject.ProjectDuration
              ? `${formatDateRange(
                  project.selectedProject.ProjectDuration.from,
                  project.selectedProject.ProjectDuration.to
                )}`
              : ""
          }
        />
      </div>
    </div>
  );
}
