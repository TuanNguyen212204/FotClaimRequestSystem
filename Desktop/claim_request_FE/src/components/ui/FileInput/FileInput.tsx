import React, { ChangeEvent, useState } from "react";
import styles from "./FileInput.module.css";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileInput: React.FC<FileUploadProps> = ({
  onUpload,
  accept,
  multiple,
}) => {
  const [fileInfos, setFileInfos] = useState<
    { id: number; name: string; url?: string; status: string }[]
  >([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      onUpload(filesArray);
      const newFiles = filesArray.map((file, index) => ({
        id: Date.now() + index, // Tạo ID duy nhất
        name: file.name,
        url: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        status: "Uploaded",
      }));
      setFileInfos((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: number) => {
    setFileInfos((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.fileInput}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <div className={styles.fileList}>
        {fileInfos.map((file) => (
          <div key={file.id} className={styles.fileItem}>
            {file.url && (
              <img src={file.url} alt={file.name} className={styles.preview} />
            )}
            <span>
              {file.name.length > 10
                ? `${file.name.slice(0, 10)}...`
                : file.name}{" "}
              - {file.status}
            </span>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveFile(file.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInput;
