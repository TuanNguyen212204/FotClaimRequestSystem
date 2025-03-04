import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Table.module.css";

interface PaginationForTableProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
const PaginationForTable: React.FC<PaginationForTableProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination_button_icon}
        // style={{ marginRight: "10px" }}
      >
        <ArrowLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${styles.pagination_button} ${
            page === currentPage ? styles.activePage : ""
          }`}
          //   style={{ paddingTop: "2px" }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pagination_button_icon}
        style={{ paddingRight: "20px" }}
        className={styles.pagination_button_icon_right}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
export default PaginationForTable;
