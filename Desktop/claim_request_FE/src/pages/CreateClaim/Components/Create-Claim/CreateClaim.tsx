import Header from "../Header";
import StaffInfo from "../Body/StaffInfo";
import useCreateClaimForm from "@/Hooks/useCreateClaimForm";
import ClaimBody from "../Body/ClaimBody";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchProject } from "@/redux/slices/Project/projectSlice";
import { useSelector } from "react-redux";
import { selectProject } from "@/redux/slices/Project/projectSlice";
export default function CreateClaim() {
  const {
    register,
    setValue,
    control,
    fields,
    append,
    remove,
    errors,
    handleSubmit,
    reset,
  } = useCreateClaimForm();
  const dispatch = useDispatch<AppDispatch>();
  const projectList = useSelector(selectProject);
  console.log(errors);
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data, "Submitted");
        reset();
      })}
    >
      <Header prepareBy="John Doe" status="Draft" title="New Claim Request" />
      <StaffInfo department="Dev" name="John Doe" staffID="#123123" />
      <ClaimBody
        ProjectList={projectList.projectList}
        append={append}
        control={control}
        errors={errors}
        fields={fields}
        register={register}
        remove={remove}
        setValue={setValue}
      />
    </form>
  );
}
