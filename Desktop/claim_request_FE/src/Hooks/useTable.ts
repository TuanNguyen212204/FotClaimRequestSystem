import { useState, useEffect, useRef } from "react";
import { Column, DataRecord, SortConfig } from "../components/ui/Table/Table";

interface UseTableProps<T extends DataRecord> {
  dataSource: T[];
  pageLength?: number;
  sortConfig?: SortConfig;
  loading?: boolean;
  pagination?: boolean;
  name?: string;
}

interface UseTableReturn<T extends DataRecord> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  selectedStatus: string;
  handleStatusSelect: (status: string) => void;
  checkedItems: Set<string>;
  handleCheck: (id: string) => void;
  handleSelectAll: () => void;
  sortOrder: string | null;
  sortColumn: string | null;
  handleSort: (columnKey: string) => void;
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  uniqueStatuses: string[];
  getSelectedData: () => T[];
  getSortedData: () => T[];
  checkboxRef: React.RefObject<HTMLInputElement>;
}

export function useTable<T extends DataRecord>({
  dataSource,
  pageLength = 10,
  sortConfig,
  pagination = false
}: UseTableProps<T>): UseTableReturn<T> {
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
  const checkboxRef = useRef<HTMLInputElement>(null);

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
        const aValue = a[sortColumn as keyof T];
        const bValue = b[sortColumn as keyof T];
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / pageLength);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageLength, currentPage * pageLength)
    : sortedData;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  useEffect(() => {
    if (checkboxRef.current) {
      const someChecked = checkedItems.size > 0;
      const allChecked = checkedItems.size === dataSource.length;
      checkboxRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [checkedItems, dataSource.length]);

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

  const getSelectedData = () => {
    return dataSource.filter((record) => checkedItems.has(record.id || ""));
  };

  const getSortedData = () => {
    if (!sortOrder) return dataSource;
    return [...dataSource].sort((a, b) => {
      if (a[sortColumn as keyof T] < b[sortColumn as keyof T])
        return sortOrder === "asc" ? -1 : 1;
      if (a[sortColumn as keyof T] > b[sortColumn as keyof T])
        return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  return {
    currentPage,
    setCurrentPage,
    isDropdownOpen,
    toggleDropdown,
    selectedStatus,
    handleStatusSelect,
    checkedItems,
    handleCheck,
    handleSelectAll,
    sortOrder,
    sortColumn,
    handleSort,
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    handlePageChange,
    uniqueStatuses,
    getSelectedData,
    getSortedData,
    checkboxRef: checkboxRef as React.RefObject<HTMLInputElement>    // Removed trailing comma
  };
}