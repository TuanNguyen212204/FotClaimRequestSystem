import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import Modal from "@components/ui/modal/Modal";
import styles from "@components/ui/modal/Modal.module.css";

const ConfirmModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Open Confirm Modal
      </button>
      <Modal
        open={open}
        title="Sign out"
        confirm={true}
        confirmIcon={
          <TriangleAlert
            size={60}
            fill="yellow"
            stroke="black"
            strokeWidth={1.5}
          />
        }
        onCancel={() => setOpen(false)}
        onOk={() => {
          alert("Signing out...");
          setOpen(false);
        }}
        buttonCancel="Cancel"
        buttonOk="Sign out"
      >
        <p>Are you sure you would like to sign out of your account?</p>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
