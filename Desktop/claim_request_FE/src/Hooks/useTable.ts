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
        currentPage: 1 // Reset to first page when changing page size
      }
    }));
  }, []);

  const fetchData = useCallback(async (url: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await httpClient.get<T[]>(url);
      const data = response.data;
      
      setState(prev => ({
        data,
        loading: false,
        pagination: {
          ...prev.pagination,
          total: data.length,
          totalPages: Math.ceil(data.length / prev.pagination.pageSize)
        }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

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