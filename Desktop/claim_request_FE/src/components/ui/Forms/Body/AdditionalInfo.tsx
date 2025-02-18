//TODO : Su dung rich text editor
export default function AdditionalInfo() {
  return (
    <div className="mb-5 box-border">
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Claim Remarks</span>
        <textarea
          rows={4}
          placeholder="Enter addtional remarks"
          className="w-full p-2 mb-2.5 border border-gray-400 box-border rounded-sm"
        ></textarea>
      </div>

      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Audit Trail</span>
        <textarea
          rows={4}
          readOnly
          placeholder="System audit trail"
          className="w-full p-2 mb-2.5 border border-gray-400 box-border rounded-sm"
        ></textarea>
      </div>
    </div>
  );
}
