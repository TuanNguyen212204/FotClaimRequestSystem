import styles from "./FileUpload.module.css";
import uploadIcon from "../../../assets/UploadIcon.png";
import { useRef, useState, ChangeEvent, DragEvent } from "react";

type FileUploadProps = {
  onUpload: (files: File[]) => void;
  allowMultiple?: boolean; // ✅ Thêm prop mới
};

function FileUpload({ onUpload, allowMultiple = true }: FileUploadProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.add(styles.dragover);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove(styles.dragover);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove(styles.dragover);
    if (e.dataTransfer.files.length > 0) {
      const files = allowMultiple
        ? Array.from(e.dataTransfer.files) // ✅ Cho phép chọn nhiều file
        : [e.dataTransfer.files[0]]; // ✅ Chỉ lấy file đầu tiên nếu allowMultiple = false
      handleFiles(files);
    }
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = allowMultiple
        ? Array.from(e.target.files)
        : [e.target.files[0]];
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const updatedList = allowMultiple ? [...fileList, ...files] : files; // ✅ Nếu không cho phép multiple, chỉ lưu danh sách mới
    setFileList(updatedList);
    setPreviewUrls(updatedList.map((file) => URL.createObjectURL(file)));
    onUpload(updatedList);
  };

  const fileRemove = (file: File) => {
    const updatedList = fileList.filter((item) => item.name !== file.name);
    setFileList(updatedList);
    setPreviewUrls(updatedList.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.header}>Drop & Drag</h2>
        <div
          className={styles.drop_file_container}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div>
            <img src={uploadIcon} alt="Upload" className={styles.upload_icon} />
          </div>
          <input type="file" multiple={allowMultiple} onChange={onFileDrop} />
          <p className={styles.drop_file_label}>Drag & drop your files here</p>
        </div>
        {fileList.length > 0 && (
          <div className={styles.drop_file_preview}>
            <p className={styles.drop_file_preview_title}>Ready to upload</p>
            {fileList.map((item, index) => (
              <div key={index} className={styles.drop_file_preview_item}>
                <img src={previewUrls[index]} alt={item.name} />
                <div className={styles.drop_file_preview_item_info}>
                  <p className={styles.name}>
                    {item.name.length > 30
                      ? `${item.name.slice(0, 20)}...`
                      : item.name}
                  </p>
                  <p className={styles.size}>
                    {(item.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <span
                  className={styles.drop_file_preview_item_remove}
                  onClick={() => fileRemove(item)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
