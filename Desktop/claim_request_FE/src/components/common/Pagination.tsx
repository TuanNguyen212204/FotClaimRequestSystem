import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  total: number;
  defaultPageSize?: number;
  defaultCurrent?: number;
  showTotal?: (total: number, range: [number, number]) => string;
  onChange?: (page: number, pageSize: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  defaultPageSize = 10,
  defaultCurrent = 1,
  showTotal,
  onChange,
  className = '',
}) => {
  const [current, setCurrent] = React.useState(defaultCurrent);
  const [pageSize] = React.useState(defaultPageSize);

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (current - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, total);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrent(page);
    onChange?.(page, pageSize);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)} className={styles.pageButton}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <button key="prev-ellipsis" className={`${styles.pageButton} ${styles.ellipsis}`}>
            •••
          </button>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${current === i ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <button key="next-ellipsis" className={`${styles.pageButton} ${styles.ellipsis}`}>
            •••
          </button>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={styles.pageButton}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`${styles.pagination} ${className}`}>
      {showTotal && (
        <span className={styles.total}>
          {showTotal(total, [startIndex, endIndex])}
        </span>
      )}
      <div className={styles.paginationButtons}>
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
          className={`${styles.pageButton} ${styles.prevNext}`}
        >
          ‹
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
          className={`${styles.pageButton} ${styles.prevNext}`}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;