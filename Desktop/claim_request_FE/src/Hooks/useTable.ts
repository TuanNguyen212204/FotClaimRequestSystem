import { useState, useCallback, useEffect } from 'react';
import httpClient from '../constant/apiInstance';

interface TableState<T> {
  data: T[];
  loading: boolean;
  lastUrl?: string; // Add this property
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    total: number;
  };
}

interface UseTableProps {
  initialPageSize?: number;
}

interface ApiResponse<T> {
  success: boolean;
  claims: T[];
}

export function useTable<T>({ initialPageSize = 10 }: UseTableProps = {}) {
  const [state, setState] = useState<TableState<T>>({
    data: [],
    loading: false,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: initialPageSize,
      total: 0
    }
  });

  const fetchData = useCallback(async (url: string) => {
    setState(prev => ({ ...prev, loading: true, lastUrl: url }));
    try {
      const params = {
        page: state.pagination.currentPage,
        pageSize: state.pagination.pageSize
      };

      const response = await httpClient.get<ApiResponse<T>>(url, params);
      
      // Update to match API response structure
      const responseData = response.data?.claims || [];
      
      setState(prev => ({
        ...prev,
        data: responseData,
        loading: false,
        pagination: {
          ...prev.pagination,
          total: responseData.length,
          totalPages: Math.ceil(responseData.length / prev.pagination.pageSize)
        }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.pagination.currentPage, state.pagination.pageSize]);

  const setPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        currentPage: page
      }
    }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: size,
        currentPage: 1
      }
    }));
  }, []);

  // Refetch when page or pageSize changes
  useEffect(() => {
    if (state.lastUrl) {
      void fetchData(state.lastUrl);
    }
  }, [state.pagination.currentPage, state.pagination.pageSize]);

  const addData = useCallback((newData: T) => {
    setState(prev => {
      const updatedData = [...prev.data, newData];
      return {
        ...prev,
        data: updatedData,
        pagination: {
          ...prev.pagination,
          total: updatedData.length,
          totalPages: Math.ceil(updatedData.length / prev.pagination.pageSize)
        }
      };
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    pagination: state.pagination,
    setPage,
    setPageSize,
    fetchData,
    addData
  };
}