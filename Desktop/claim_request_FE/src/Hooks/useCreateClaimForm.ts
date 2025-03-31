import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/Schemas/ClaimSchema";
import { FormData } from "@/types/claimForm.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { createClaim, updateClaim } from "@/redux/thunk/CreateClaim";
import { selectUserById } from "@/redux/selector/userSelector";
import { CreateClaimData } from "@/Services/Project/Project.type";
import { toast } from "react-toastify";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
interface CreateClaimFormProps {
  initialValues?: FormData;
  mode: "create" | "view" | "update";
  requestID?: string;
}

export default function useCreateClaimForm({
  initialValues,
  mode,
  requestID,
}: CreateClaimFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState,
    formState: { errors },
    setValue,
    reset,
    setError,
    clearErrors,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      currentSelectedProject: {
        projectID: "",
        projectName: "",
        RoleInTheProject: "",
        ProjectDuration: { from: "", to: "" },
      },
      claims: [{ date: "", working_hours: 0 }],
      claimRemark: "",
    },
    mode: "all",
  });
  const { t } = useTranslation("claim");

  const formValues = useWatch({ control, name: "claims" });
  if (mode === "update" && !requestID) {
    throw new Error("requestID is required for update mode");
  }

  useEffect(() => {
    console.log("Form Values:", formValues);
    console.log("Errors:", errors);
    if (Object.keys(formState.errors).length > 0) {
      console.log("Validation Errors:", formState.errors);
      trigger();
    }
  }, [JSON.stringify(formValues)]);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserById);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log(errors);

    console.log("Validation errors", formState.errors);
    const isValid = await trigger();

    if (!data.currentSelectedProject.projectID) {
      toast.error(t("toast.selectProject"));

      return;
    }

    if (!isValid || Object.keys(formState.errors).length > 0) {
      toast.error(t("toast.fixErrors"));

      return;
    }

    if (data.claims.length === 0) {
      toast.error(t("toast.addOneClaim"));

      return;
    }

    if (!user) {
      toast.error(t("toast.userUnavailable"));
      return;
    }

    const DataToSend: CreateClaimData = {
      userID: user.user_id,
      projectID: data.currentSelectedProject.projectID,
      claims: data.claims,
      claimRemark: data.claimRemark || "",
    };

    const handleSubmissionResult = (
      resultAction: any,
      successMessage: string,
      errorPrefix: string
    ) => {
      if (resultAction.type.endsWith("/fulfilled")) {
        toast.success(successMessage);
        reset();
      } else {
        const payloadError = resultAction.payload as any;
        const errorMessage = payloadError?.message || "Unknown error occurred";
        toast.error(`${errorPrefix}: ${errorMessage}`);
      }
    };

    if (mode === "create") {
      const resultAction = await dispatch(createClaim(DataToSend));
      handleSubmissionResult(
        resultAction,
        "Claim request created successfully",
        "Failed to create claim"
      );
    } else if (mode === "update") {
      if (!requestID) {
        toast.error(t("toast.updateRequestIdMissing"));

        return;
      }
      const resultAction = await dispatch(
        updateClaim({ claimData: DataToSend, requestID })
      );
      handleSubmissionResult(
        resultAction,
        "Claim request updated successfully",
        "Failed to update claim"
      );
    }
  };

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    reset,
    formState,
    setError,
    clearErrors,
    user,
    trigger,
  };
}
