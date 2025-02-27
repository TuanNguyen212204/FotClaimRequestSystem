import { useState } from "react";
import { Cookie } from "lucide-react";
import Modal from "@components/common/modal/Modal";
import styles from "@components/common/modal/Modal.module.css";

const FilledButtonModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Open Filled Button Modal
      </button>
      <Modal
        icon={<Cookie size={120} color="grey" strokeWidth={1} />}
        open={open}
        title="Cookies!"
        filled={true}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        buttonCancel="Privacy Policy"
        buttonOk="Got it"
      >
        <p>This website uses cookies to make your experience better.</p>
      </Modal>
    </div>
  );
};

export default FilledButtonModal;
