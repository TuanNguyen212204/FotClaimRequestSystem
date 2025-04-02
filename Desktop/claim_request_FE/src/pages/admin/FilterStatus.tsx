import React, { useState, useEffect } from "react";
import axios from "axios";
import httpClient from "@/constant/apiInstance";

interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  project_status: number;
  status: string;
}

const FilterStatus: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<string>("1");

  useEffect(() => {
    fetchProjects();
  }, [status]);

  const fetchProjects = async () => {
    try {
      const response = await httpClient.get(
        `/projects?project_status=${status}&page=1&limit=10&sortBy=project_id&order=ASC`
      );
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Project List</h2>
      <label className="block mb-2">Filter by Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="1">Active</option>
        <option value="2">Inactive</option>
        <option value="all">All</option>
      </select>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Project ID</th>
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.project_id} className="border">
              <td className="border p-2">{project.project_id}</td>
              <td className="border p-2">{project.project_name}</td>
              <td className="border p-2">{new Date(project.start_date).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(project.end_date).toLocaleDateString()}</td>
              <td className="border p-2">{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterStatus;
