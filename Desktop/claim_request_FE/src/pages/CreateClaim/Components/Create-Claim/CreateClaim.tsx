import Header from "../Header";
import StaffInfo from "../Body/StaffInfo";
import useCreateClaimForm from "@/Hooks/useCreateClaimForm";
import ClaimBody from "../Body/ClaimBody";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchProject } from "@/redux/slices/Project/projectSlice";
import { selectProject } from "@/redux/slices/Project/projectSlice";
import { toast } from "react-toastify";
import { selectUserById } from "@/redux/selector/userSelector";
import { fetchUserByIdAsync } from "@/redux/thunk/User/userThunk";

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
  const user = useSelector(selectUserById);

  useEffect(() => {
    dispatch(fetchUserByIdAsync()).then(() => {
      dispatch(fetchProject());
    });
  }, [dispatch]);

  return user ? (
    <form
      onSubmit={handleSubmit((data) => {
        toast.success("Claim Submitted Successfully");
        reset();
      })}
    >
      <Header
        prepareBy={user?.full_name}
        status="Draft"
        title="New Claim Request"
      />
      <StaffInfo
        department={user?.job_rank}
        name={user?.full_name}
        staffID={user?.user_id}
      />
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
  ) : (
    <div>Loading...</div>
  );
}
