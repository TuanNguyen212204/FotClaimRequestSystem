import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserSetting.module.css";
import TableComponent, { Column, DataRecord } from "../../components/ui/Table/Table";
import { fetchStaffAsync } from "@/redux/slices/User/userSlice"; 
import { AppDispatch } from "@/redux";
import { FilePen, Trash2 } from "lucide-react";

interface StaffData {
  id: string;
  name: string;
  department: string;
  jobRank: string;
  salary: number;
}

const StaffInformation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const staffList = useSelector((state: any) => state.staff.data);

  useEffect(() => {
    dispatch(fetchStaffAsync());
  }, [dispatch]);

  const handleEdit = (staffId: string) => {
    navigate(`/staff/edit/${staffId}`);
  };

  const handleDelete = (staffId: string) => {
    console.log(`Deleting staff ID: ${staffId}`);
  };

  const columns: Column[] = [
    { key: "id", dataIndex: "id", title: "#" },
    { key: "name", dataIndex: "name", title: "Name" },
    { key: "department", dataIndex: "department", title: "Department" },
    { key: "jobRank", dataIndex: "jobRank", title: "Job Rank" },
    { key: "salary", dataIndex: "salary", title: "Salary", cell: ({ value }) => `$${value}` },
    {
      key: "action",
      dataIndex: "id",
      title: "Action",
      cell: ({ value }) => (
        <div className={styles.actionIcons}>
          <FilePen className={styles.icon} onClick={() => handleEdit(value as string)} />
          <Trash2 className={styles.icon} onClick={() => handleDelete(value as string)} />
        </div>
      ),
    },
  ];

  const dataSource: DataRecord[] = staffList.map((staff: StaffData, index: number) => ({
    ...staff,
    key: index,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Settings</h1>
        <hr />
      </div>

      <TableComponent 
        columns={columns} 
        dataSource={dataSource} 
        pagination={true} 
        pageLength={7} 
        name="Staff List" />
    </div>
  );
};

export default StaffInformation;
