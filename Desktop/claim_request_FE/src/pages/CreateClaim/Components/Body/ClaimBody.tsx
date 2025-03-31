import { JSX } from "react/jsx-runtime";
import Card from "../Card";
import ProjectInfo from "./ProjectInfo";
import { ClaimTableProps } from "./ClaimTable";
import { AdditionalInfoProps } from "./AdditionalInfo";
import { IProjectInfoProps } from "./ProjectInfo";
import ClaimTable from "./ClaimTable";
import AdditionalInfo from "./AdditionalInfo";
import ButtonGroup from "./ButtonGroup";

interface IClaimBodyProps
  extends ClaimTableProps,
    IProjectInfoProps,
    AdditionalInfoProps {
  mode: "create" | "view" | "update";
}

export default function ClaimBody({
  ProjectList,
  control,
  errors,
  register,
  setValue,
  mode,
}: IClaimBodyProps): JSX.Element {
  return (
    <Card>
      <ProjectInfo
        mode={mode}
        control={control}
        register={register}
        setValue={setValue}
        ProjectList={ProjectList}
      />
      <ClaimTable
        control={control}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <AdditionalInfo register={register} />
      <ButtonGroup mode={mode} />
    </Card>
  );
}
