import { useState } from "react";
import { Zap } from "lucide-react";
import Modal from "@components/common/modal/Modal";
import styles from "@components/common/modal/Modal.module.css";

const LinkModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Open Link Modal
      </button>
      <Modal
        open={open}
        icon={<Zap size={100} color="green" strokeWidth={1.2} />}
        title="Task successfully created!"
        link="https://www.google.com/"
        linkDisplay="Personal account"
        onCancel={() => setOpen(false)}
        footer={
          <div style={{ margin: "30px 0px" }}>
            <button
              className={styles.buttonCancel}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        }
      >
        {
          "You can see the progress of your task in your {linkDisplayName}. You will be notified of its completion."
        }
      </Modal>
    </div>
  );
};

export default LinkModal;
