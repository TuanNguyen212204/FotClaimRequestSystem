import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/Schemas/ClaimSchema";
import { FormData } from "@/types/claimForm.type";

export default function useCreateClaimForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSelectedProject: {
        projectID: "",
        projectName: "",
        RoleInTheProject: "",
        ProjectDuration: { from: "", to: "" },
      },
      startDate: "",
      endDate: "",
      totalWorkingHours: 1,
    },
  });

  return {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    reset,
  };
}
