import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/claimForm.type";
interface AdditionalInfoProps {
  register : UseFormRegister<FormData>
}
export default function AdditionalInfo({register}:AdditionalInfoProps) {
  return (
    <div className="mb-5 box-border">
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Claim Remarks</span>
        <textarea
          {...register('claimRemark')}
          rows={4}
          placeholder="Enter addtional remarks"
          className="w-full p-2 mb-2.5 border-2 border-gray-400 box-border rounded-sm"
        ></textarea>
      </div>

      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Audit Trail</span>
        <textarea
          rows={4}
          readOnly
          placeholder="System audit trail"
          className="w-full p-2 mb-2.5 border-2 border-gray-400 box-border rounded-sm"
        ></textarea>
      </div>
    </div>
  );
}
