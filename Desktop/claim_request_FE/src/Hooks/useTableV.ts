import { useState, useEffect, useRef } from "react";
import { DataRecord, SortConfig } from "../components/ui/Table/Table";

export const useTable = <T extends DataRecord>(
  dataSource: T[],
  sortConfig?: SortConfig,
  loading?: boolean
) => {
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

  const paginatedData = sortedData;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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

  return {
    currentPage,
    isDropdownOpen,
    selectedStatus,
    checkedItems,
    sortOrder,
    sortColumn,
    isLoading,
    uniqueStatuses,
    filteredData,
    sortedData,
    paginatedData,
    handlePageChange,
    toggleDropdown,
    handleStatusSelect,
    handleCheck,
    handleSort,
    handleSelectAll,
    checkboxRef,
  };
};
