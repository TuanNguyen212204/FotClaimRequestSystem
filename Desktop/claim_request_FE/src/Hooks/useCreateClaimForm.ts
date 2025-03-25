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
import { ApiError } from "@/api";
import { useEffect } from "react";
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
    watch,
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
    },
    mode: "all",
  });
  const formValues = watch("claims");
  useEffect(() => {
    console.log("Form Values:", formValues);
    console.log("Errors:", errors);
    // if (Object.keys(errors).length > 0) {
    //   console.log("Validation Errors:", errors);
    // }
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
      toast.error("Please select a project.");
      return;
    }

    if (!isValid || Object.keys(formState.errors).length > 0) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    if (data.claims.length === 0) {
      toast.error("Please add at least one claim.");
      return;
    }

    if (!user) {
      toast.error("User information not available.");
      return;
    }

    const DataToSend: CreateClaimData = {
      userID: user.user_id,
      projectID: data.currentSelectedProject.projectID,
      claims: data.claims,
    };
    if (mode === "create") {
      try {
        const resultAction = await dispatch(createClaim(DataToSend));
        if (createClaim.fulfilled.match(resultAction)) {
          toast.success("Claim request created successfully");
          reset();
        } else {
          const payloadError = resultAction.payload as any;
          const errorMessage =
            payloadError?.message || "Unknown error occurred";
          toast.error(`Failed to create claim: ${errorMessage}`);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          console.log("API Error:", error.message, error.status, error.data);
        } else if (error instanceof Error) {
          console.log("Standard Error:", error.message);
        } else {
          console.log("Unknown Error:", error);
        }
        toast.error("Failed to create claim request");
      }
    } else if (mode === "update") {
      try {
        if (!requestID) {
          toast.error("No requestID");
          return;
        }
        const resultAction = await dispatch(
          updateClaim({ claimData: DataToSend, requestID: requestID })
        );
        if (updateClaim.fulfilled.match(resultAction)) {
          toast.success("Claim request updated successfully");
          reset();
        } else {
          const payloadError = resultAction.payload as any;
          const errorMessage =
            payloadError?.message || "Unknown error occurred";
          toast.error(`Failed to update claim: ${errorMessage}`);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          console.log("API Error:", error.message, error.status, error.data);
        } else if (error instanceof Error) {
          console.log("Standard Error:", error.message);
        } else {
          console.log("Unknown Error:", error);
        }
        toast.error("Failed to update claim request");
      }
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
