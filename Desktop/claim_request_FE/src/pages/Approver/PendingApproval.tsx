// import { EyeIcon, TrashIcon, CheckIcon, Trash2Icon } from "lucide-react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import styles from "./PendingApproval.module.css";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { fetchAllClaims, deleteClaim } from "@/redux/Claim/store/pendingThunk";
// import { useAppDispatch } from "@redux/index";
// import type { RootState } from "@redux/index";
// import { toast } from "react-toastify";
import TableComponent from "@/components/ui/Table/Table";

export const PendingComponent: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const claims = useSelector((state: RootState) => state.claim.data);
  // const [selectedValue, setSelectedValue] = useState("all");

  // useEffect(() => {
  //   dispatch(fetchAllClaims());
  // }, [dispatch]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  // };

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        pageLength={10}
      />
    </div>
  );
};
