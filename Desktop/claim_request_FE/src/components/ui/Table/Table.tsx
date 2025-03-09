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
export type Column = {
  key?: string;
  dataIndex: string;
  title: string;
  cell?: ({ value, record }: { value: unknown; record: unknown }) => ReactNode;
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
  columns: Column[];
  dataSource: T[];
  loading?: boolean;
  pagination?: boolean;
  name?: string;
  sortConfig?: SortConfig;
  pageLength?: number;
};

const Cell = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
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
      pageLength = 10,
    }: TableComponentProps<T>,
    ref: React.Ref<{
      getSelectedData: () => T[];
      getSortedData: () => T[];
    }>
  ) => {
    console.log("TableComponent Props:", {
      columns,
      dataSource,
      loading,
      name,
      ref,
      pagination,
      sortConfig,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [sortOrder, setSortOrder] = useState<string | null>(
      sortConfig?.order || null
    );
    const [sortColumn, setSortColumn] = useState<string | null>(
      sortConfig?.columnKey || null
    );

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

    const totalPages = Math.ceil(sortedData.length / pageLength);

    const paginatedData = pagination
      ? sortedData.slice(
          (currentPage - 1) * pageLength,
          currentPage * pageLength
        )
      : sortedData;

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

    return (
      <div className={styles.container}>
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

        <div>
          {loading && <div className="loading">Loading...</div>}
          {filteredData.length.toString() !== "0" ? (
            <section className={styles.table_body}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>
                      {/* {checkedItems.size === dataSource.length
                          ? "Deselect All"
                          : "Select All"} */}

                      <div className="">
                        <input
                          ref={checkboxRef}
                          onClick={handleSelectAll}
                          id="default-checkbox"
                          type="checkbox"
                          checked={checkedItems.size === dataSource.length}
                          value=""
                          className=" text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                        />
                      </div>
                    </th>

                    {columns.map((col) => (
                      <th
                        key={col.key || col.dataIndex}
                        className="thead_style"
                        onClick={
                          sortConfig?.columnKey === col.dataIndex
                            ? () => handleSort(col.dataIndex)
                            : undefined
                        }
                      >
                        {col.title}
                        {sortColumn === col.dataIndex && (
                          <span>
                            {sortOrder === "asc" ? (
                              <ArrowUp className="w-4 h-4 ml-2" />
                            ) : (
                              <ArrowDown className="w-4 h-4 ml-2" />
                            )}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {paginatedData.map((record) => (
                    <tr key={record.key || record.id}>
                      <td style={{ paddingTop: "1.8rem" }}>
                        <input
                          style={{ marginBottom: "2rem" }}
                          type="checkbox"
                          checked={checkedItems.has(record.id || "")}
                          onChange={() => handleCheck(record.id || "")}
                        />
                      </td>
                      {columns.map((col) => (
                        <td key={col.key || col.dataIndex}>
                          <Cell>
                            {col.cell
                              ? col.cell({
                                  value: record[col.dataIndex as keyof T],
                                  record: record[col.dataIndex as keyof T],
                                })
                              : String(record[col.dataIndex as keyof T])}
                          </Cell>
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
          <div>
            {pagination && totalPages >= 1 && (
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
  }
);

export default TableComponent;
