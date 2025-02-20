import { useState } from "react";
import styles from "@components/common/Table.module.css";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";

export type Column = {
  key?: string;
  dataIndex: string;
  title: string;
};

export type DataRecord = {
  key?: string;
  id?: string;
};

export type TableComponentProps<T extends DataRecord> = {
  columns: Column[];
  page?: string;
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean;
  status?: boolean;
};

const TableComponent = <T extends DataRecord>({
  columns,
  dataSource,
  loading,
  page,
  pagination = false,
}: TableComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(dataSource.length / pageSize);

  // Paginate the data
  const paginatedData = pagination
    ? dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : dataSource;

  // Handle pagination change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        {loading && <div className="loading">Loading...</div>}
        <section className={styles.table_header}>{page}</section>

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
              {paginatedData.map((record) => (
                <tr key={record.key || record.id}>
                  {columns.map((col) => (
                    <td key={col.key || col.dataIndex} className={styles.td}>
                      {col.dataIndex === "status" ? (
                        <button
                          className={`${styles.status} ${
                            styles[`status-${record[col.dataIndex as keyof T]}`]
                          }`}
                        >
                          {String(record[col.dataIndex as keyof T])}
                        </button>
                      ) : (
                        String(record[col.dataIndex as keyof T])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {pagination && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.pagination}>
              <button
                style={{
                  paddingTop: "5px",
                  paddingLeft: "4px",
                  border: "0",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowLeftSquare />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={pageNum === currentPage ? styles.active : ""}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                style={{
                  paddingTop: "5px",
                  paddingLeft: "4px",
                  border: "0",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowRightSquare />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
