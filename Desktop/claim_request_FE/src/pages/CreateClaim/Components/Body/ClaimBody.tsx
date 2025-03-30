import { JSX } from "react";
import Card from "../Card";
import ProjectInfo from "./ProjectInfo";
import { ClaimTableProps } from "./ClaimTable";
import { AdditionalInfoProps } from "./AdditionalInfo";
import { IProjectInfoProps } from "./ProjectInfo";
import ClaimTable from "./ClaimTable";
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
      <div className="mb-8 box-border">
        <ProjectInfo
          mode={mode}
          control={control}
          register={register}
          setValue={setValue}
          ProjectList={ProjectList}
        />
      </div>

      <div className="mb-8 box-border">
        <ClaimTable
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <ButtonGroup mode={mode} control={control} />
    </Card>
  );
}
