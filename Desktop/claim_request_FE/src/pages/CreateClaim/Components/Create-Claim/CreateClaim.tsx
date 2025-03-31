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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("createClaim");
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
            message: t("date_already_chosen_error"),
          });
        } else {
          seenDates.add(date);
          clearErrors(`claims.${index}.date`);
        }
      }
    });
  }, [claims, setError, clearErrors, t]);

  useEffect(() => {
    dispatch(fetchUserByIdAsync())
      .unwrap()
      .then(() => dispatch(fetchProjectByID()))
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        toast.error(t("failed_to_load_data"));
      });
  }, [dispatch, t]);

  return user ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        prepareBy={user?.full_name}
        status={formStatus}
        title={
          mode === "create"
            ? t("create_claim_title")
            : mode === "view"
            ? t("view_claim_title")
            : t("update_claim_title")
        }
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
    <div>{t("loading")}</div>
  );
}
