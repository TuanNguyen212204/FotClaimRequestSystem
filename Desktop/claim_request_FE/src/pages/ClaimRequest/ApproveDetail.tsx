import { Email } from "@/components/ui/Input/Input";
import TableComponent from "@/components/common/Table";
import { InputWithSubComponents } from "@/components/ui/Input/Input";
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
    <div style={{ height: "86%" }}>
      {/* <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        page="Object"
      /> */}

      <InputWithSubComponents.Password placeholder="Password" size="medium" />
    </div>
  );
};

export default ApproveDetail;
