// import { useState, useCallback } from 'react';
// import httpClient from '../constant/apiInstance';
// import { DataRecord, SortConfig, Column } from '../components/ui/Table/Table';

// interface TableState<T> {
//   data: T[];
//   loading: boolean;
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     pageSize: number;
//     total: number;
//   };
//   sortConfig: {
//     columnKey: string | null;
//     order: 'asc' | 'desc' | null;
//   };
//   checkedItems: Set<string>;
//   selectedStatus: string;
//   isDropdownOpen: boolean;
// }

// interface UseTableProps<T> {
//   initialPageSize?: number;
//   defaultSortConfig?: SortConfig;
//   columns: Column[];
//   name?: string;
//   initialData?: T[];
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T[];
//   pagination?: {
//     total: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//   };
// }

// export function useTable<T extends DataRecord>({ 
//   initialPageSize = 10,
//   defaultSortConfig,
//   columns,
//   name,
//   initialData = []
// }: UseTableProps<T>) {
//   const [state, setState] = useState<TableState<T>>({
//     data: initialData,
//     loading: false,
//     pagination: {
//       currentPage: 1,
//       totalPages: 0,
//       pageSize: initialPageSize,
//       total: 0
//     },
//     sortConfig: {
//       columnKey: defaultSortConfig?.columnKey || null,
//       order: defaultSortConfig?.order || null
//     },
//     checkedItems: new Set<string>(),
//     selectedStatus: 'All',
//     isDropdownOpen: false
//   });

//   const fetchData = useCallback(async (url: string) => {
//     setState(prev => ({ ...prev, loading: true }));
//     try {
//       const params = {
//         page: state.pagination.currentPage,
//         pageSize: state.pagination.pageSize,
//         sortBy: state.sortConfig.columnKey,
//         sortOrder: state.sortConfig.order,
//         status: state.selectedStatus !== 'All' ? state.selectedStatus : undefined
//       };

//       const response = await httpClient.get<ApiResponse<T>>(url, params);
      
//       setState(prev => ({
//         ...prev,
//         data: response.data?.data || [],
//         loading: false,
//         pagination: {
//           ...prev.pagination,
//           ...(response.data?.pagination || {}),
//         }
//       }));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setState(prev => ({ ...prev, loading: false }));
//     }
//   }, [state.pagination.currentPage, state.pagination.pageSize, state.sortConfig, state.selectedStatus]);

//   const setPage = useCallback((page: number) => {
//     setState(prev => ({
//       ...prev,
//       pagination: {
//         ...prev.pagination,
//         currentPage: page
//       }
//     }));
//   }, []);

//   const handleSort = useCallback((columnKey: string) => {
//     setState(prev => ({
//       ...prev,
//       sortConfig: {
//         columnKey,
//         order: prev.sortConfig.columnKey === columnKey && 
//                prev.sortConfig.order === 'asc' ? 'desc' : 'asc'
//       }
//     }));
//   }, []);

//   const toggleDropdown = useCallback(() => {
//     setState(prev => ({
//       ...prev,
//       isDropdownOpen: !prev.isDropdownOpen
//     }));
//   }, []);

//   const handleStatusSelect = useCallback((status: string) => {
//     setState(prev => ({
//       ...prev,
//       selectedStatus: status,
//       isDropdownOpen: false,
//       pagination: {
//         ...prev.pagination,
//         currentPage: 1
//       }
//     }));
//   }, []);

//   const handleCheck = useCallback((id: string) => {
//     setState(prev => {
//       const newCheckedItems = new Set(prev.checkedItems);
//       if (newCheckedItems.has(id)) {
//         newCheckedItems.delete(id);
//       } else {
//         newCheckedItems.add(id);
//       }
//       return {
//         ...prev,
//         checkedItems: newCheckedItems
//       };
//     });
//   }, []);

//   const handleSelectAll = useCallback(() => {
//     setState(prev => ({
//       ...prev,
//       checkedItems: prev.checkedItems.size === prev.data.length ?
//         new Set() :
//         new Set(prev.data.map(item => item.id || ''))
//     }));
//   }, []);

//   return {
//     dataSource: state.data,
//     loading: state.loading,
//     pagination: state.pagination,
//     sortConfig: state.sortConfig,
//     checkedItems: state.checkedItems,
//     selectedStatus: state.selectedStatus,
//     isDropdownOpen: state.isDropdownOpen,
//     columns,
//     name,
//     setPage,
//     handleSort,
//     toggleDropdown,
//     handleStatusSelect,
//     handleCheck,
//     handleSelectAll,
//     fetchData
//   };
// }