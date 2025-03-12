import { useState, useCallback } from 'react';
import httpClient from '../constant/apiInstance';
import { DataRecord, SortConfig, Column } from '../components/ui/Table/Table';

interface TableState<T> {
  data: T[];
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    total: number;
  };
  sortConfig: {
    columnKey: string | null;
    order: 'asc' | 'desc' | null;
  };
  checkedItems: Set<string>;
  selectedStatus: string;
  isDropdownOpen: boolean;
  filteredData: T[];
}

interface UseTableProps<T> {
  initialPageSize?: number;
  defaultSortConfig?: SortConfig;
  columns: Column[];
  name?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export function useTable<T extends DataRecord>({ 
  initialPageSize = 10,
  defaultSortConfig,
  columns,
  name
}: UseTableProps<T>) {
  const [state, setState] = useState<TableState<T>>({
    data: [],
    loading: false,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: initialPageSize,
      total: 0
    },
    sortConfig: {
      columnKey: defaultSortConfig?.columnKey || null,
      order: defaultSortConfig?.order || null
    },
    checkedItems: new Set<string>(),
    selectedStatus: 'All',
    isDropdownOpen: false,
    filteredData: []
  });

  const fetchData = useCallback(async (url: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const params = {
        page: state.pagination.currentPage,
        pageSize: state.pagination.pageSize,
        sortBy: state.sortConfig.columnKey,
        sortOrder: state.sortConfig.order,
        status: state.selectedStatus !== 'All' ? state.selectedStatus : undefined
      };

      const response = await httpClient.get<ApiResponse<T>>(url, params);
      
      const newData = response.data?.data || [];
      setState(prev => ({
        ...prev,
        data: newData,
        filteredData: state.selectedStatus === 'All' ? newData : 
          newData.filter(item => item.status === state.selectedStatus),
        loading: false,
        pagination: {
          ...prev.pagination,
          ...(response.data?.pagination || {}),
        }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.pagination.currentPage, state.pagination.pageSize, state.sortConfig, state.selectedStatus]);

  const setPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        currentPage: page
      }
    }));
  }, []);

  const handleSort = useCallback((columnKey: string) => {
    setState(prev => ({
      ...prev,
      sortConfig: {
        columnKey,
        order: prev.sortConfig.columnKey === columnKey && 
               prev.sortConfig.order === 'asc' ? 'desc' : 'asc'
      }
    }));
  }, []);

  const toggleDropdown = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen
    }));
  }, []);

  const handleStatusSelect = useCallback((status: string) => {
    setState(prev => ({
      ...prev,
      selectedStatus: status,
      isDropdownOpen: false,
      pagination: {
        ...prev.pagination,
        currentPage: 1
      },
      filteredData: status === 'All' ? prev.data : 
        prev.data.filter(item => item.status === status)
    }));
  }, []);

  const handleCheck = useCallback((id: string) => {
    setState(prev => {
      const newCheckedItems = new Set(prev.checkedItems);
      if (newCheckedItems.has(id)) {
        newCheckedItems.delete(id);
      } else {
        newCheckedItems.add(id);
      }
      return {
        ...prev,
        checkedItems: newCheckedItems
      };
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      checkedItems: prev.checkedItems.size === prev.data.length ?
        new Set() :
        new Set(prev.data.map(item => item.id || ''))
    }));
  }, []);

  const getSelectedData = useCallback(() => {
    return state.data.filter(record => state.checkedItems.has(record.id || ''));
  }, [state.data, state.checkedItems]);

  const getSortedData = useCallback(() => {
    if (!state.sortConfig.order || !state.sortConfig.columnKey) return state.filteredData;
    return [...state.filteredData].sort((a, b) => {
      const aValue = a[state.sortConfig.columnKey as keyof T];
      const bValue = b[state.sortConfig.columnKey as keyof T];
      return state.sortConfig.order === 'asc' ? 
        (aValue < bValue ? -1 : 1) : 
        (aValue < bValue ? 1 : -1);
    });
  }, [state.filteredData, state.sortConfig]);

  return {
    data: getSortedData(),
    loading: state.loading,
    pagination: state.pagination,
    sortConfig: state.sortConfig,
    checkedItems: state.checkedItems,
    selectedStatus: state.selectedStatus,
    isDropdownOpen: state.isDropdownOpen,
    columns,
    name,
    setPage,
    handleSort,
    toggleDropdown,
    handleStatusSelect,
    handleCheck,
    handleSelectAll,
    getSelectedData,
    fetchData
  };
}