import { JSX } from "react";
import Card from "../Card";
import ProjectInfo from "./ProjectInfo";
import { ClaimTableProps } from "./ClaimTable";
import { AdditionalInfoProps } from "./AdditionalInfo";
import { IProjectInfoProps } from "./ProjectInfo";
import ClaimTable from "./ClaimTable";
import ButtonGroup from "./ButtonGroup";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("claim");
  return (
    <Card>
      <h2 className="text-[1.225rem] text-left font-medium mb-4 text-[#26a69a]">
        {t("claimTable.detailsTitle")}
      </h2>
      <div className="mb-8 box-border">
        <ProjectInfo
          mode={mode}
          control={control}
          register={register}
          setValue={setValue}
          ProjectList={ProjectList}
        />
      </div>

      <div className="mb-8 box-borde text-left">
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
