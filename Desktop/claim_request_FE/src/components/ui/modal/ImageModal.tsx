import { useState } from "react";
import image2 from "@components/ui/modal/anh_cua_anh_dung_gui_modal_mau.png";
import Modal from "@components/ui/modal/Modal";
import styles from "@components/ui/modal/Modal.module.css";

const ImageModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Open Image Modal
      </button>
      <Modal
        open={open}
        title="Yeahhhh 🎉"
        image={image2}
        imagePosition="top" 
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        buttonOk="Got it"
        buttonCancel="Settings"
      >
        <p>
          Thank you for your subscription. You will be sent the next issue of
          our newsletter shortly.
        </p>
      </Modal>
    </div>
  );
};

export default ImageModal;
