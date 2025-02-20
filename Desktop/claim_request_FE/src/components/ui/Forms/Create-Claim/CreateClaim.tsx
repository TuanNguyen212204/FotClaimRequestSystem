import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "../Body/ProjectInfo";
import Header from "@ui/Forms/Header";
import StaffInfo from "@ui/Forms/Body/StaffInfo";
import ClaimTable from "../Body/ClaimTable";
import AdditionalInfo from "@ui/Forms/Body/AdditionalInfo";
import styles from "@components/ui/Forms/Create-Claim/Claim.module.css";
import {
  fetchProject,
  selectProject,
} from "@/redux/slices/Project/projectSlice";
import { AppDispatch } from "@/redux";
import { useForm, SubmitHandler } from "react-hook-form";
export default function CreateClaim() {
  const dispatch = useDispatch<AppDispatch>();
  const projectList = useSelector(selectProject);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submitted demo");
      }}
    >
      <Header prepareBy="John Doe" status="Draft" title="Create New Claim" />
      <StaffInfo department="Dev" name="John Doe" staffID="#123123" />
      <ProjectInfo ProjectList={projectList.projectList} />
      <ClaimTable />
      <AdditionalInfo />
      <div className="mt-6 text-left">
        <button
          type="submit"
          className={`px-6 py-3 text-white font-semibold text-center rounded-lg ${styles.submit_button}`}
        >
          Send
        </button>
      </div>
    </form>
  );
}
