import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "../Body/ProjectInfo";
import Header from "../Header/index";
import StaffInfo from "../Body/StaffInfo";
import ClaimTable from "../Body/ClaimTable";
import AdditionalInfo from "../Body/AdditionalInfo";
import styles from "./Claim.module.css";
import {
  fetchProject,
  selectProject,
} from "@/redux/slices/Project/projectSlice";
import { AppDispatch } from "@/redux";
import useCreateClaimForm from "@/Hooks/useCreateClaimForm";

export default function CreateClaim() {
  const dispatch = useDispatch<AppDispatch>();
  const projectList = useSelector(selectProject);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    fields,
    append,
    remove,
    errors,
    watch,
  } = useCreateClaimForm();

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  const selectedYet = watch("currentSelectedProject");
  //console.log(selectedYet)
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Header prepareBy="John Doe" status="Draft" title="Create New Claim" />
      <StaffInfo department="Dev" name="John Doe" staffID="#123123" />
      <ProjectInfo
        control={control}
        register={register}
        setValue={setValue}
        ProjectList={projectList.projectList}
      />
      {selectedYet.ProjectName === "" ? (
        <></>
      ) : (
        <>
          <ClaimTable
            append={append}
            control={control}
            fields={fields}
            register={register}
            remove={remove}
            errors={errors}
          />
          <AdditionalInfo register={register} />
          <div className="mt-6 text-left">
            <button
              type="submit"
              className={`px-6 py-3 text-white font-semibold text-center rounded-lg ${styles.submit_button}`}
            >
              Send
            </button>
          </div>
        </>
      )}
    </form>
  );
}
