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
    AdditionalInfoProps {}
export default function ClaimBody({
  ProjectList,
  append,
  control,
  errors,
  fields,
  register,
  remove,
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
      <ClaimTable
        append={append}
        control={control}
        fields={fields}
        register={register}
        remove={remove}
        errors={errors}
      />
      <AdditionalInfo register={register} />
      <ButtonGroup />
    </Card>
  );
}
