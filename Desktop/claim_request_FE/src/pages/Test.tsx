import FileUpload from "@/components/ui/FileUpload/FileUpload";
import ApprovedDetailFinanceModal from "@/components/ui/finance/ApprovedDetailFinanceModal";
import InputNumber from "@/components/ui/InputNumber/InputNumber";
import StatusTag from "@/components/ui/StatusTag/StatusTag";

function Test() {
  const handleUpload = (files: File[]) => {
    console.log("Upload nè: ", files);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <FileUpload
        onUpload={handleUpload}
        allowMultiple={true}
        accept="image/*"
      />
      <InputNumber label="Nhập số dey" min={1} max={500} value={50} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <StatusTag status="PENDING" />
        <StatusTag status="APPROVED" />
        <StatusTag status="REJECTED" />
        <StatusTag status="PAID" />
        <ApprovedDetailFinanceModal
          isOpen={true}
          onClose={false}
          requestId={"f752218c-4d43-4af2-a032-cded27124ffe"}
          currentPage={"1"}
          limit={"7"}
        />
      </div>
    </div>
  );
}

export default Test;
