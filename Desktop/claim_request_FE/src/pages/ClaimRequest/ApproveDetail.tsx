import TableComponent from "@/components/common/Table";
import { PasswordInput } from "@/components/ui/Input/Input";
const ApproveDetail: React.FC = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Overtime Duration", dataIndex: "odu", key: "odu" },
    { title: "Overtime Date", dataIndex: "oda", key: "oda" },
    { title: "Total Hours", dataIndex: "totalH", key: "totalH" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];
  const dataSource = [
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
    {
      id: "001",
      odu: "From 1/5/2025 To:1/15/2025",
      oda: "1/5/2025",
      totalH: "5 hours",
      status: "Approved",
    },
  ];
  return (
    <div>
      {/* <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        page="Object"
      /> */}
      <PasswordInput
        placeholder="Enter the password"
        disable={false}
        size="small"
      />
    </div>
  );
};

export default ApproveDetail;
