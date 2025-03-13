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
      onPageChange(newPage); // Gọi hàm fetch API từ component cha
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageNumbers = 5; // Số trang hiển thị tối đa
    const halfRange = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      // Nếu tổng số trang nhỏ, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu tổng số trang lớn, chỉ hiển thị trang đầu, trang cuối và xung quanh currentPage
      const startPage = Math.max(1, currentPage - halfRange);
      const endPage = Math.min(totalPages, currentPage + halfRange);

      if (startPage > 1) {
        pages.push(1); // Trang đầu
        if (startPage > 2) pages.push("..."); // Hiển thị dấu "..." nếu có khoảng cách
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages); // Trang cuối
      }
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`${styles.pagination_button} ${
            page === currentPage ? styles.activePage : ""
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className={styles.pagination_dots}>
          {page}
        </span>
      )
    );
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination_button_icon}
      >
        <ArrowLeft />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pagination_button_icon_right}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default PaginationForTable;
