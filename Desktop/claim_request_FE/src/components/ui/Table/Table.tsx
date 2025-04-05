import {
  ReactNode,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import styles from "./Table.module.css";
import { ArrowDown, ArrowUp } from "lucide-react";
import PaginationForTable from "./PaginationForTable";
import React from "react";
import { LoadingProvider } from "../Loading/LoadingContext";
import LoadingOverlay from "../Loading/LoadingOverlay";
import { Plus } from "lucide-react";
export type Column<T> = {
  key?: string;
  dataIndex?: keyof T | string;
  title: string;
  cell?: ({ value, record }: { value: any; record: T }) => ReactNode;
};

export type DataRecord = {
  key?: string | number;
  id?: string;
  status?: string;
  checked?: boolean;
};

export type SortConfig = {
  columnKey: string;
  order: "asc" | "desc";
};

export type TableComponentProps<T extends DataRecord> = {
  columns: Column<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean;
  name?: string;
  sortConfig?: SortConfig;
  // pageLength?: number;
  totalPage?: number;
  isHaveCheckbox?: boolean;
  createButton?: boolean;
  onCreateButtonClick?: () => void;
  onPageChange?: (newPage: number) => void;
};

const Cell = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      tabIndex={-1}
      className={`justify-left ${className} flex pt-1 text-sm`}
    >
      {children}
    </div>
  );
};

const TableComponent = forwardRef(
  <T extends DataRecord>(
    {
      columns,
      dataSource,
      loading,
      name,
      pagination = false,
      sortConfig,
      isHaveCheckbox,
      createButton,
      totalPage = 3,
      // pageLength = 10,
      onCreateButtonClick,
      onPageChange,
    }: TableComponentProps<T>,
    ref: React.Ref<{
      getSelectedData: () => T[];
      getSortedData: () => T[];
    }>,
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [sortOrder, setSortOrder] = useState<string | null>(
      sortConfig?.order || null,
    );
    const [sortColumn, setSortColumn] = useState<string | null>(
      sortConfig?.columnKey || null,
    );
    const [isLoading, setIsLoading] = useState(loading);

    const uniqueStatuses = [
      "All",
      ...new Set(dataSource.map((item) => item.status)),
    ];

    const filteredData =
      selectedStatus !== "All"
        ? dataSource.filter((record) => record.status === selectedStatus)
        : dataSource;

    const sortedData = sortOrder
      ? [...filteredData].sort((a, b) => {
          if (a[sortColumn as keyof T] < b[sortColumn as keyof T])
            return sortOrder === "asc" ? -1 : 1;
          if (a[sortColumn as keyof T] > b[sortColumn as keyof T])
            return sortOrder === "asc" ? 1 : -1;
          return 0;
        })
      : filteredData;

    const totalPages = totalPage;

    const paginatedData = sortedData;
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedStatus]);

    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPage) {
        setCurrentPage(newPage);
        if (onPageChange) {
          onPageChange(newPage);
        }
      }
    };
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusSelect = (status: string) => {
      setSelectedStatus(status);
      setIsDropdownOpen(false);
    };

    const handleCheck = (id: string) => {
      setCheckedItems((prev) => {
        const newCheckedItems = new Set(prev);
        if (newCheckedItems.has(id)) {
          newCheckedItems.delete(id);
        } else {
          newCheckedItems.add(id);
        }
        return newCheckedItems;
      });
    };
    const handleSort = (columnKey: string) => {
      setSortColumn(columnKey);
      setSortOrder((prev) => {
        if (sortColumn === columnKey) {
          return prev === "asc" ? "desc" : "asc";
        }
        return "asc";
      });
    };
    const handleSelectAll = () => {
      const allChecked = checkedItems.size === dataSource.length;
      if (allChecked) {
        setCheckedItems(new Set());
      } else {
        setCheckedItems(new Set(dataSource.map((record) => record.id || "")));
      }
    };
    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (checkboxRef.current) {
        const someChecked = checkedItems.size > 0;
        const allChecked = checkedItems.size === dataSource.length;
        checkboxRef.current.indeterminate = someChecked && !allChecked;
      }
    }, [checkedItems, dataSource.length]);

    useImperativeHandle(ref, () => ({
      getSelectedData: () => {
        return dataSource.filter((record) => checkedItems.has(record.id || ""));
      },
      getSortedData: () => {
        if (!sortOrder) return dataSource;
        return [...dataSource].sort((a, b) => {
          if (a[sortColumn as keyof T] < b[sortColumn as keyof T])
            return sortOrder === "asc" ? -1 : 1;
          if (a[sortColumn as keyof T] > b[sortColumn as keyof T])
            return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      },
    }));
    useEffect(() => {
      if (loading) {
        setIsLoading(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false);
      }
    }, [loading]);
    useEffect(() => {
      setCurrentPage(1);
    }, [totalPages]);

    if (isLoading) {
      return (
        <div className="flex min-h-[300px] items-center justify-center">
          <LoadingProvider>
            <LoadingOverlay></LoadingOverlay>
          </LoadingProvider>
          {/* <h1>Loading...</h1> */}
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div style={{ display: "flex" }}>
          {/* <section className={styles.filter_section}>
            <div className={styles.filterStatusP}>
              <p>Filter By {name}:</p>
            </div>
            <div
              className="relative inline-block text-left"
              style={{ marginTop: "15px", marginLeft: "15px" }}
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
          </section> */}
          {createButton && (
            <div style={{ marginLeft: "auto" }}>
              <button
                tabIndex={-1}
                className={styles.create_button}
                onClick={() => onCreateButtonClick && onCreateButtonClick()}
                aria-label="Create new record"
              >
                <span className={styles.create_button_content}>
                  <Plus className={styles.create_button_icon} />
                  <span className={styles.create_button_text}>Add New</span>
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 p-0">
          <section className={styles.table_body}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  {isHaveCheckbox && (
                    <th className={styles.th}>
                      <div>
                        <input
                          ref={checkboxRef}
                          onClick={handleSelectAll}
                          id="default-checkbox"
                          type="checkbox"
                          checked={checkedItems.size === dataSource.length}
                          value=""
                          onChange={handleSelectAll}
                          className="rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                      </div>
                    </th>
                  )}
                  {columns.map((col) => (
                    <th
                      key={String(col.key || col.dataIndex)}
                      onClick={
                        sortConfig?.columnKey === col.dataIndex
                          ? () => handleSort(String(col.dataIndex))
                          : undefined
                      }
                      className={styles.th}
                    >
                      {col.title}
                      {sortColumn === col.dataIndex && (
                        <span>
                          {sortOrder === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-2 h-4 w-4" />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {filteredData.length > 0 ? (
                  paginatedData.map((record) => (
                    <tr key={record.key || record.id}>
                      {isHaveCheckbox && (
                        <td tabIndex={-1} className="p-2 pt-[4rem]">
                          <div className={styles.checkbox}>
                            <input
                              type="checkbox"
                              checked={checkedItems.has(record.id || "")}
                              onChange={() => handleCheck(record.id || "")}
                            />
                          </div>
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          className={`p-2`}
                          key={String(col.key || col.dataIndex)}
                          tabIndex={-1}
                        >
                          <Cell
                          // className={`${col.key === "action" ? "justify-center" : ""} ${col.key === "claim_status" ? "justify-center" : ""} `}
                          >
                            {col.cell
                              ? col.cell({
                                  value: record[col.dataIndex as keyof T],
                                  record: record,
                                })
                              : String(record[col.dataIndex as keyof T])}
                          </Cell>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (isHaveCheckbox ? 1 : 0)}
                      style={{ textAlign: "center", paddingLeft: "200px" }}
                    >
                      <h1>No Data</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <div>
            {pagination && totalPages >= 1 && filteredData.length > 0 && (
              <PaginationForTable
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default TableComponent;
