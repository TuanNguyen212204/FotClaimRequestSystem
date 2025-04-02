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

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageNumbers = 5;
    const halfRange = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - halfRange);
      const endPage = Math.min(totalPages, currentPage + halfRange);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          tabIndex={-1}
          key={index}
          onClick={() => handlePageChange(page)}
          className={styles.pageButton}
        >
          <div
            className={`${styles.pagination_button} ${
              page === currentPage ? styles.activePage : ""
            }`}
          >
            <div className="mt-2">
              <span>{page}</span>
            </div>
          </div>
        </button>
      ) : (
        <span key={index} className={styles.pagination_dots}>
          {page}
        </span>
      )
    );
  };

  return (
    <div className={`${styles.pagination} flex`}>
      <div>
        <button
          tabIndex={-1}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={` bg-transparent mt-5`}
        >
          <ArrowLeft />
        </button>
      </div>

      <div className="p-0 m-0">{renderPageNumbers()}</div>

      <div>
        <button
          tabIndex={-1}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={` bg-transparent  mt-5`}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationForTable;
