import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Claim {
  claimId: string;
  projectName: string;
  duration: string;
  staffName: string;
  projectId: string;
}

const useTable = (data: Claim[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<Claim[]>([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    setTableData(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [data, currentPage, pageSize]);

  return { tableData, currentPage, pageSize, setCurrentPage };
};

export default useTable;
