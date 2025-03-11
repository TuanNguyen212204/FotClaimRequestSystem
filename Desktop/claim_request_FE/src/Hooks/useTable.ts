import { useState, useCallback } from 'react';
import httpClient from '../constant/apiInstance';

interface TableState<T> {
  data: T[];
  loading: boolean;
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
  data: T[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
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
    setState(prev => ({ ...prev, loading: true }));
    try {
      const params = {
        page: state.pagination.currentPage,
        pageSize: state.pagination.pageSize
      };

      const response = await httpClient.get<ApiResponse<T>>(url, params);
      
      setState(prev => ({
        ...prev,
        data: response.data?.data || [],
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

  const addData = useCallback((newData: T) => {
    setState(prev => ({
      ...prev,
      data: [...prev.data, newData],
    }));
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