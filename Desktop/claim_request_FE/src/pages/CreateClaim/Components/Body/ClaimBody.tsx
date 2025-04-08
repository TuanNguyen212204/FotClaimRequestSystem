import { JSX } from "react";
import Card from "../Card";
import ProjectInfo from "./ProjectInfo";
import { ClaimTableProps } from "./ClaimTable";
import { AdditionalInfoProps } from "./AdditionalInfo";
import { IProjectInfoProps } from "./ProjectInfo";
import ClaimTable from "./ClaimTable";
import ButtonGroup from "./ButtonGroup";
import { UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormData } from "@/types/claimForm.type";
interface IClaimBodyProps
  extends ClaimTableProps,
    IProjectInfoProps,
    AdditionalInfoProps {
  mode: "create" | "view" | "update";
  reset: UseFormReset<FormData>;
}

export default function ClaimBody({
  ProjectList,
  control,
  errors,
  register,
  setValue,
  reset,
  mode,
}: IClaimBodyProps): JSX.Element {
  const { t } = useTranslation("claim");
  return (
    <Card>
      <h2 className="mb-4 text-left text-[1.225rem] font-medium text-[#26a69a]">
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

      <div className="box-borde mb-8 text-left">
        <ClaimTable
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          reset={reset}
          mode={mode}
        />
      </div>

      <ButtonGroup mode={mode} control={control} />
    </Card>
  );
}
