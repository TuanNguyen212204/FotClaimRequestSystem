import { useEffect, useState } from "react";
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
  status: string;
};

export type TableComponentProps<T extends DataRecord> = {
  columns: Column[];
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean;
  name: string;
};

const TableComponent = <T extends DataRecord>({
  columns,
  dataSource,
  loading,
  name,
  pagination = false,
}: TableComponentProps<T>) => {
  console.log("TableComponent Props:", {
    columns,
    dataSource,
    loading,
    name,
    pagination,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const pageSize = 10;
  const uniqueStatuses = [
    "All",
    ...new Set(dataSource.map((item) => item.status)),
  ];

  const filteredData =
    selectedStatus !== "All"
      ? dataSource.filter((record) => record.status === selectedStatus)
      : dataSource;

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Status Filter */}
      <section className={styles.filter_section}>
        <div className={styles.filterStatusP}>
          <p>Filter By {name}:</p>
        </div>
        <div
          className="relative inline-block text-left"
          style={{ marginTop: "12px", marginLeft: "15px" }}
        >
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            <span>{selectedStatus}</span>
            <ArrowDown className="w-4 h-4 ml-2" />
          </button>

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

      <div className={styles.table_container}>
        {loading && <div className="loading">Loading...</div>}
        {filteredData.length !== 0 ? (
          <section className={styles.table_body}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key || col.dataIndex} className={styles.th}>
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((record) => (
                  <tr key={record.key || record.id}>
                    {columns.map((col) => (
                      <td
                        key={col.key || col.dataIndex}
                        style={{
                          ...(col.dataIndex === "status"
                            ? record.status === "Approved"
                              ? { color: "green", padding: "1rem 2rem" }
                              : record.status === "Processing"
                              ? { color: "#ffa500", padding: "1rem 2rem" }
                              : record.status === "Paid"
                              ? { color: "crimson", padding: "1rem 2rem" }
                              : record.status === "Rejected"
                              ? { color: "red", padding: "1rem 2rem" }
                              : { padding: "1rem 2rem" }
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
        ) : (
          <h1>No data</h1>
        )}
      </div>
      <div>
        {pagination && totalPages >= 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pagination_button_icon}
              style={{ marginRight: "10px" }}
            >
              <ArrowLeft />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.pagination_button} ${
                    pageNumber === currentPage ? styles.activePage : ""
                  }`}
                  style={{ paddingTop: "2px" }}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pagination_button_icon}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
