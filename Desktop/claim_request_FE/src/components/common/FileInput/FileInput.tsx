import React, { ChangeEvent, useState } from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept,
  multiple,
}) => {
  const [fileInfos, setFileInfos] = useState<
    { name: string; url?: string; status: string }[]
  >([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onUpload(files);
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        url: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        status: "Uploaded",
      }));

      setFileInfos((prev) => [...prev, ...newFiles]);
      event.target.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <div className={styles.fileList}>
        {fileInfos.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            {file.url && (
              <img src={file.url} alt={file.name} className={styles.preview} />
            )}
            <span>
              {file.name} - {file.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
