import TableComponent from "@/components/common/Table";
import { Router } from "@/routers";
import { title } from "process";
const TableDraftPage = () => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "hello", dataIndex: "hello", key: "hello" },
  ];

  const dataSource = [
    {
      id: "1",
      name: "John Doe",
      age: 28,
      country: "USA",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 34,
      country: "UK",
      email: "nguyenvana@gmail.com",
      status: "Rejected",
    },
    {
      id: "3",
      name: "Alice Johnson",
      age: 23,
      country: "Canada",
      email: "nguyenvana@gmail.com",
      status: "Paid",
    },
    {
      id: "4",
      name: "Bob Brown",
      age: 45,
      country: "Australia",
      email: "nguyenvana@gmail.com",
      status: "Processing",
    },
    {
      id: "5",
      name: "Charlie White",
      age: 36,
      country: "Germany",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "6",
      name: "David Green",
      age: 30,
      country: "USA",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "7",
      name: "Eva Black",
      age: 27,
      country: "UK",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "8",
      name: "Frank Blue",
      age: 40,
      country: "Canada",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "9",
      name: "Grace Gray",
      age: 32,
      country: "Australia",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "10",
      name: "Harry Red",
      age: 50,
      country: "Germany",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "11",
      name: "Ivy Purple",
      age: 29,
      country: "USA",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "12",
      name: "Jack Yellow",
      age: 35,
      country: "UK",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "13",
      name: "Kara Pink",
      age: 25,
      country: "Canada",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "14",
      name: "Liam Orange",
      age: 37,
      country: "Australia",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
    {
      id: "15",
      name: "Mia Brown",
      age: 28,
      country: "Germany",
      email: "nguyenvana@gmail.com",
      status: "Approved",
    },
  ];
  return (
    <div>
      <TableComponent
        columns={columns}
        page="Object"
        dataSource={dataSource}
        loading={false}
        pagination={true}
      />
    </div>
  );
};

export default TableDraftPage;
