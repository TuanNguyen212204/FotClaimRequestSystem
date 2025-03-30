import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import Header from "../Header";
import StaffInfo from "../Body/StaffInfo";
import useCreateClaimForm from "@/Hooks/useCreateClaimForm";
import ClaimBody from "../Body/ClaimBody";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { selectProject } from "@/redux/slices/Project/projectSlice";
import { fetchUserByIdAsync } from "@/redux/thunk/User/userThunk";
import { toast } from "react-toastify";
import { fetchProjectByID } from "@/redux/thunk/CreateClaim";
import { FormData } from "@/types/claimForm.type";
interface CreateClaimProps {
  mode: "create" | "view" | "update";
  initialValues?: FormData;
  formStatus: "Draft" | "Pending" | "Approved" | "Rejected" | "Paid";
  requestID?: string;
}
export default function CreateClaim({
  mode,
  initialValues,
  formStatus,
  requestID,
}: CreateClaimProps) {
  const {
    register,
    setValue,
    control,
    errors,
    handleSubmit,
    onSubmit,
    setError,
    clearErrors,
    user,
  } = useCreateClaimForm({ initialValues, mode, requestID });

  const dispatch = useDispatch<AppDispatch>();
  const projectList = useSelector(selectProject);

  const claims = useWatch({ control, name: "claims" });

  useEffect(() => {
    const seenDates = new Set();
    claims.forEach((claim, index) => {
      const date = claim.date;
      if (date) {
        if (seenDates.has(date)) {
          setError(`claims.${index}.date`, {
            type: "manual",
            message: "This date is already chosen",
          });
        } else {
          //   console.log("clearing error");
          seenDates.add(date);
          clearErrors(`claims.${index}.date`);
        }
      }
    });
  }, [claims, setError, clearErrors]);

  useEffect(() => {
    dispatch(fetchUserByIdAsync())
      .unwrap()
      .then(() => dispatch(fetchProjectByID()))
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data. Please refresh the page.");
      });
  }, [dispatch]);

  return user ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        prepareBy={user?.full_name}
        status={formStatus}
        title={mode === "create" ? "Create Claim" : mode === "view" ? "View Claim" : "Update Claim"}
      />
      <StaffInfo
        department={user?.department}
        name={user?.full_name}
        staffID={user?.user_id}
      />
      <ClaimBody
        ProjectList={projectList.projectList}
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        mode={mode}
      />
    </form>
  ) : (
    <div>Loading...</div>
  );
}
