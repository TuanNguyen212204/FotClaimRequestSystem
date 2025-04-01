import React, { useEffect, useState } from "react";
import styles from "./DraftApproval.module.css";
import {EyeIcon, EyeOffIcon} from "lucide-react
import TableComponent, { Column, DataRecord } from "@ui/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDraftClaimAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@/redux";
import { selectAllDraft, selectAllDraftTotalPages } from "@/redux/selector/draftSelector.ts";
import { useTranslation } from "react-i18next";
export const DraftApproval: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const claimList = useSelector(selectAllDraft);
    const totalPages = useSelector(selectAllDraftTotalPages);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit] = useState(10);
    
    useEffect(() => {
        setLoading(true);
        dispatch(
            fetchAllDraftClaimAsync({
                page: currentPage.toString(),
                limit: limit.toString(),
            })
        ).finally(() => setLoading(false));
    }, [currentPage]);

    const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (newPage: number) => {
    console.log("New Page: ", newPage);
    setCurrentPage(newPage);
  };
  
  const columns: Column<DataRecord>[] = [
    {
        key: "user_name",
        dataIndex: "user_full_name",
        title: "Full Name",
    }
  ]
   const dataSource: DataRecord[] = claimList.map((claim) => ({
      key: claim.request_id,
      ...claim,
      user_full_name: claim.user.full_name,
      user_email: claim.user.email,
      user_salary: claim.user.salary,
      user_ot_rate: claim.user.ot_rate,
    }));
  

    return (
        <div>
            <TableComponent
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    totalPage={totalPages}
                    pagination={true}
                    name="Claims"
                    onPageChange={handlePageChange}
                  />
        </div>
    )
}

export default DraftApproval;