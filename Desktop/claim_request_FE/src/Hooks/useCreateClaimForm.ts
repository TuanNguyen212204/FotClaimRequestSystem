import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateClaimHours } from "@/utils/claimHelpers";
import { formSchema } from "@/Schemas/ClaimSchema";
import { useEffect } from "react";
import { FormData } from "@/types/claimForm.type";
export default function useCreateClaimForm() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      currentSelectedProject: {
        projectName: "",
        RoleInTheProject: "",
        ProjectDuration: {
          from: "",
          to: "",
        },
      },
      claims: [{ date: "", from: "", to: "", hours: 0, remarks: "" }],
      totalHours: 0,
      claimRemark: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "claims",
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      //console.log(value);
      if (name?.includes(".from") || name?.includes(".to")) {
        const index = parseInt(name.split(".")[1]);
        if (isNaN(index)) return;

        const currentClaim = value.claims?.[index];
        console.log(currentClaim);
        if (!currentClaim) return;

        const { from, to } = currentClaim;
        if (from && to) {
          const calculatedHours = calculateClaimHours(from, to);
          setValue(`claims.${index}.hours`, calculatedHours);
        } else {
          return;
        }

        const total = value.claims?.reduce(
          (sum, claim) => sum + (claim ? claim.hours || 0 : 0),
          0,
        );
        setValue("totalHours", total || 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);
  return {
    control,
    register,
    handleSubmit,
    setValue,
    watch, //debug
    fields,
    append,
    remove,
    errors,
    formSchema,
    reset,
  };
}
