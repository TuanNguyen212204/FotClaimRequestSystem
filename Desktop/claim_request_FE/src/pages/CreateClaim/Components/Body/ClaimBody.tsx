import { JSX } from "react/jsx-runtime";
import Card from "../Card";
import ProjectInfo from "./ProjectInfo";
import { ClaimTableProps } from "./ClaimTable";
import { AdditionalInfoProps } from "./AdditionalInfo";
import { IProjectInfoProps } from "./ProjectInfo";
import ClaimTable from "./ClaimTable";
// import AdditionalInfo from "./AdditionalInfo";
import ButtonGroup from "./ButtonGroup";
interface IClaimBodyProps
  extends ClaimTableProps,
    IProjectInfoProps,
    AdditionalInfoProps {}
export default function ClaimBody({
  ProjectList,
  control,
  errors,
  register,
  setValue,
}: IClaimBodyProps): JSX.Element {
  return (
    <Card>
      <ProjectInfo
        control={control}
        register={register}
        setValue={setValue}
        ProjectList={ProjectList}
      />
      <ClaimTable control={control} register={register} errors={errors} />
      {/* <AdditionalInfo register={register} /> */}
      <ButtonGroup />
    </Card>
  );
}
