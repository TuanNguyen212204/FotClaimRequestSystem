import Header from "../Header";
import StaffInfo from "../Body/StaffInfo";
import useCreateClaimForm from "@/Hooks/useCreateClaimForm";
import ClaimBody from "../Body/ClaimBody";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { createClaim } from "@/redux/thunk/CreateClaim";
import { getAllProjects } from "@/redux/thunk/CreateClaim";
import { selectProject } from "@/redux/slices/Project/projectSlice";
import { selectUserById } from "@/redux/selector/userSelector";
import { fetchUserByIdAsync } from "@/redux/thunk/User/userThunk";
import { CreateClaimData } from "@/Services/Project/Project.type";
import { toast } from "react-toastify";
import { fetchProjectByID } from "@/redux/thunk/CreateClaim";
import { ApiError } from "@/api";
export default function CreateClaim() {
  const { register, setValue, control, errors, handleSubmit, reset } =
    useCreateClaimForm();

  const dispatch = useDispatch<AppDispatch>();
  const projectList = useSelector(selectProject);
  const user = useSelector(selectUserById);

  useEffect(() => {
    dispatch(
      getAllProjects({
        page: 1,
        limit: 10,
        order: "ASC",
        sortBy: "project_id",
      }),
    );
    dispatch(fetchUserByIdAsync())
      .unwrap()
      .then(() => dispatch(fetchProjectByID()))
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data. Please refresh the page.");
      });
  }, [dispatch]);

  return user ? (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (!data.currentSelectedProject.projectID) {
          toast.error("Please select a project.");
          return;
        }

        const DataToSend: CreateClaimData = {
          userID: user.user_id,
          projectID: data.currentSelectedProject.projectID,
          startDate: data.startDate,
          endDate: data.endDate,
          totalWorkingHours: data.totalWorkingHours,
        };

        try {
          const resultAction = await dispatch(createClaim(DataToSend));
          if (createClaim.fulfilled.match(resultAction)) {
            toast.success("Claim request created successfully");
            reset();
          } else {
            const payloadError = resultAction.payload as any;
            // console.log("Error:", payloadError);
            const errorMessage =
              payloadError?.message || "Unknown error occurred";

            toast.error(`Failed to create claim: ${errorMessage}`);
          }
        } catch (error) {
          if (error instanceof ApiError) {
            console.log(error);
            console.log("API Error:", error.message, error.status, error.data);
          } else if (error instanceof Error) {
            console.log("Standard Error:", error.message);
          } else {
            console.log("Unknown Error:", error);
          }
          toast.error("Failed to create claim request");
        } finally {
          reset();
        }
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
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
      />
    </form>
  ) : (
    <div>Loading...</div>
  );
}
