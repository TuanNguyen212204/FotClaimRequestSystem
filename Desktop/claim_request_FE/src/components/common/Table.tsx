import { useState } from "react";
import styles from "@components/common/Table.module.css";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export type Column = {
  key?: string;
  dataIndex: string;
  title: string;
};

export type DataRecord = {
  key?: string;
  id?: string;
  status: string; // Cột status trong mỗi record
};

export type TableComponentProps<T extends DataRecord> = {
  columns: Column[];
  page?: string;
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean;
};

const TableComponent = <T extends DataRecord>({
  columns,
  dataSource,
  loading,
  pagination = false,
}: TableComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>("All"); // Mặc định là "All"
  const pageSize = 8;
  const totalPages = Math.ceil(dataSource.length / pageSize);

  // Lấy tất cả các trạng thái duy nhất từ dataSource
  const uniqueStatuses = [
    "All",
    ...new Set(dataSource.map((item) => item.status)),
  ];

  const paginatedData = pagination
    ? dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : dataSource;

  const filteredData =
    selectedStatus && selectedStatus !== "All"
      ? paginatedData.filter((record) => record.status === selectedStatus)
      : paginatedData;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle status selection from dropdown
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false); // Đóng dropdown khi chọn trạng thái
  };

  // Helper function to get className based on status
  // const getStatusClass = (status: string) => {
  //   console.log(status); // For debugging
  //   switch (status) {
  //     case "Approved":
  //       return "status_Approved";
  //     case "Processing":
  //       return "status_Processing";
  //     case "Paid":
  //       return "status_Paid";
  //     case "Rejected":
  //       return "status_Rejected";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div>
      <div className={styles.container}>
        {loading && <div className="loading">Loading...</div>}
        <section className={styles.filter_section}>
          <div className={styles.filterStatusP}>
            <p>Filter By Status:</p>
          </div>
          <div className="relative inline-block text-left  ">
            {/* Dropdown button */}
            <button
              onClick={toggleDropdown}
              style={{
                marginTop: "1.2rem",
                backgroundColor: "white",
                marginLeft: "1rem",
              }}
              className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
            >
              <span>{selectedStatus}</span>
              <ArrowDown className="w-4 h-4 ml-2" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg w-48">
                <div className="py-1">
                  {uniqueStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusSelect(status)}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className={styles.table_body}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                {columns.map((col) => (
                  <th key={col.key || col.dataIndex} className={styles.th}>
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.key || record.id}>
                  {columns.map((col) => (
                    <td
                      key={col.key || col.dataIndex}
                      style={{
                        ...(col.dataIndex === "status"
                          ? record.status === "Approved"
                            ? {
                                color: "green",
                                padding: "1rem 2rem",
                              }
                            : record.status === "Processing"
                            ? {
                                color: "#ffa500",
                                padding: "1rem 2rem",
                              }
                            : record.status === "Paid"
                            ? {
                                color: "crimson",
                                padding: "1rem 2rem",
                              }
                            : record.status === "Rejected"
                            ? {
                                color: "red",
                                padding: "1rem 2rem",
                              }
                            : {}
                          : {}),
                      }}
                    >
                      {record[col.dataIndex as keyof T]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Pagination */}
        {pagination && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <p style={{ marginTop: "0rem" }}>
                <ArrowLeft />
              </p>
            </button>

            {/* Hiển thị các số trang */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.paginationButton} ${
                    pageNumber === currentPage ? styles.activePage : ""
                  }`}
                >
                  <p style={{ marginTop: "0rem" }}>{pageNumber}</p>
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <p style={{ marginTop: "0rem" }}>
                <ArrowRight />
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
