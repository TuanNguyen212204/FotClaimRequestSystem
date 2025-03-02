import FileUpload from "@/components/ui/FileUpload/FileUpload";
import InputNumber from "@/components/ui/InputNumber/InputNumber";
import StatusTag from "@/components/ui/StatusTag/StatusTag";

function Test() {
  const handleUpload = (files: File[]) => {
    console.log("Upload nè: ", files);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <FileUpload onUpload={handleUpload} allowMultiple={false} />
      <InputNumber label="Nhập số dey" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <StatusTag status="pending" />
        <StatusTag status="approved" />
        <StatusTag status="rejected" />
        <StatusTag status="paid" />
      </div>
    </div>
  );
}

export default Test;
