import TableComponent from "@/components/common/Table";
import { useRef } from "react";
import { DataRecord, SortConfig } from "@/components/common/Table";
const ApproveDetail: React.FC = () => {
  const tableRef = useRef<{
    getSelectedData: () => DataRecord[];
    getCheckedData: () => DataRecord[];
    getSortedData: () => DataRecord[];
  }>(null);
  const handleGetSelectedData = () => {
    if (tableRef.current) {
      const selectedData = tableRef.current.getSelectedData();
      console.log("Selected Data:", selectedData);
    }
  };
  const handleGetCheckedData = () => {
    if (tableRef.current) {
      const checkedData = tableRef.current.getCheckedData();
      console.log("Checked Data:", checkedData);
    }
  };
  const handleGetSortedData = () => {
    if (tableRef.current) {
      const sortedData = tableRef.current.getSortedData();
      console.log("Sorted Data:", sortedData);
    }
  };
  const sortConfig: SortConfig = {
    columnKey: "id",
    order: "asc",
  };
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Total Hours", dataIndex: "totalH", key: "totalH" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      cell: ({ value }: { value: unknown }) => {
        const stringValue = value as string;
        const style = stringValue === "Approved" ? { color: "green" } : {};
        return <div style={style}>{stringValue}</div>;
      },
    },

    { title: "Action", dataIndex: "action", key: "action" },
  ];

  const dataSource = [
    {
      id: "1",
      name: "Nguyen Tuan An",
      totalH: "8",
      status: "Approved",
      action: "",
    },
    {
      id: "2",
      name: "Nguyen Tuan B",
      totalH: "8",
      status: "Approved",
      action: "",
    },
    {
      id: "3",
      name: "Nguyen Tuan B",
      totalH: "8",
      status: "Approved",
      action: "",
    },
    {
      id: "4",
      name: "Nguyen Tuan B",
      totalH: "8",
      status: "Approved",
      action: "",
    },
    {
      id: "5",
      name: "Nguyen Tuan B",
      totalH: "8",
      status: "Approved",
      action: "",
    },
  ];
  return (
    <div>
      <TableComponent
        ref={tableRef}
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        name={"ApproveDetail"}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default ApproveDetail;
